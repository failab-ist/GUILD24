const { chromium } = require('playwright');
const { spawn } = require('child_process');

const PORT = 3036;
const server = spawn('npx', ['http-server', 'dist', '-p', PORT, '-c-1'], { shell: true });

setTimeout(async () => {
  let browser, context;
  try {
    const EXECUTABLE = process.env.QA_CHROMIUM || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    browser = await chromium.launch({ executablePath: EXECUTABLE, headless: true });
    context = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    
    let consoleErrors = 0;
    let pageErrors = 0;
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors++; });
    page.on('pageerror', () => { pageErrors++; });

    let attempts = 0;
    while(attempts < 10) {
      try {
        await page.goto('http://127.0.0.1:'+PORT+'/index.html');
        break;
      } catch(e) {
        attempts++;
        await new Promise(r => setTimeout(r, 500));
      }
    }
    
    await page.evaluate(() => localStorage.clear());
    await page.reload({waitUntil:'load'});

    // Wait for the DOM to be ready
    await page.waitForTimeout(1000);
    
    // Jump straight into the game by calling game functions
    await page.evaluate(() => {
      const g = window.Guild24.game;
      g.start('qa-strict-17'); // start game
      
      // We might have a modal open. Close it if needed.
      if (document.querySelector('#modal-root [data-action="buy-relic"]')) {
         document.querySelector('#modal-root [data-action="buy-relic"]').click();
      }
      
      // Advance phases
      g.open();
      g.contract();
      window.Guild24.render();
    });
    
    await page.waitForTimeout(1000); // give it time to render the SALE phase
    
    const preCheck = await page.evaluate(async () => {
      const g = window.Guild24.game;
      const r = g.run;
      if (r.phase !== 'sell') return { error: 'Phase is not sell, it is ' + r.phase };
      if (r.queue.length < 2) return { error: 'Queue < 2' };
      
      const beforeCursor = r.cursor;
      const beforeCurrentId = r.queue[beforeCursor];
      const beforeNextId = r.queue[beforeCursor + 1];
      const nextNpc = r.npcs.find(n => n.id === beforeNextId);
      const expectedNextSrc = window.Scene.npcArt(nextNpc);
      
      const preloads = document.querySelectorAll('img[style="display:none"][aria-hidden="true"]');
      if (preloads.length !== 1) return { error: 'Expected exactly 1 preload img, found ' + preloads.length };
      
      const preload = preloads[0];
      if (!preload.src.endsWith(expectedNextSrc)) return { error: 'preload src mismatch' };
      if (!preload.complete || preload.naturalWidth === 0) return { error: 'preload not complete' };
      
      const departBtn = document.querySelectorAll('[data-action="depart"]');
      if (departBtn.length !== 1) return { error: 'Expected exactly 1 depart button, found ' + departBtn.length };
      
      return { pass: true, beforeCursor, beforeCurrentId, beforeNextId, expectedNextSrc };
    });
    
    if (preCheck.error) {
      console.error(preCheck.error);
      process.exit(1);
    }
    
    await page.click('[data-action="depart"]');
    await page.waitForTimeout(500);
    
    const postCheck = await page.evaluate(async (preCheck) => {
      const g = window.Guild24.game;
      const r = g.run;
      
      if (r.cursor !== preCheck.beforeCursor + 1) return { error: 'Cursor did not advance correctly' };
      if (r.queue[r.cursor] !== preCheck.beforeNextId) return { error: 'Current ID does not match next ID' };
      
      const fig = document.querySelector('.who .figure');
      if (!fig) return { error: 'No visible portrait' };
      if (!fig.src.endsWith(preCheck.expectedNextSrc)) return { error: 'Visible portrait src mismatch' };
      if (!fig.complete || fig.naturalWidth === 0) return { error: 'Visible portrait not loaded' };
      
      return { pass: true };
    }, preCheck);
    
    if (postCheck.error) {
      console.error(postCheck.error);
      process.exit(1);
    }
    
    if (consoleErrors > 0 || pageErrors > 0) {
      console.error(`Found errors: ${consoleErrors} console, ${pageErrors} page`);
      process.exit(1);
    }
    
    console.log(JSON.stringify({
      success: true,
      beforeCursor: preCheck.beforeCursor,
      afterCursor: preCheck.beforeCursor + 1,
      beforeNextId: preCheck.beforeNextId,
      "visible portrait src match": true,
      consoleErrors,
      pageErrors
    }, null, 2));
    
    await context.close();
    await browser.close();
    server.kill();
    process.exit(0);
  } catch (err) {
    console.error(err);
    if(server) server.kill();
    process.exit(1);
  }
}, 3000);
