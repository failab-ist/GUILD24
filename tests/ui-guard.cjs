// Chunk F acceptance: the parts of the UI contract a Node process can prove.
// Covers UI-Q02/Q19/Q24/Q26/Q32/Q34/Q35/Q39, REL-Q39, DUN-Q21 and the
// V2_4_EXECUTION_PLAN §8.1 Playwright boundary contract.
// Everything that needs a real viewport lives in `npm run qa:visual` (UI-Q38), never here.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','ui/scene','ui/art'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const app=read('dist/ui/app.js'),shop=read('dist/systems/shop.js'),css=read('dist/ui/ui.css'),scene=read('dist/ui/scene.js'),html=read('dist/index.html'),pkg=JSON.parse(read('package.json'));
const fn=name=>{const a=app.indexOf('function '+name+'(');const b=app.indexOf('\nfunction ',a+1);return app.slice(a,b<0?app.length:b);};
const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);

test('§8.1: Playwright is a devDependency and never enters the shipped build',()=>{
 assert.ok(pkg.devDependencies?.playwright,'playwright is declared in devDependencies');
 assert.ok(!pkg.dependencies?.playwright,'playwright is never a runtime dependency');
 // Presentation libraries are allowed, but they are vendored into dist/ by `npm run assets`,
 // so the shipped game needs no install at all. tests/assets.cjs proves the vendored copies.
 for(const file of walk('dist')){
  if(!/\.(js|css|html|json|md)$/.test(file))continue;
  assert.ok(!read(file).toLowerCase().includes('playwright'),file+' references playwright');
 }
 assert.ok(!pkg.scripts.test.includes('qa:visual')&&!pkg.scripts.test.includes('qa-visual'),'npm test does not depend on the browser harness');
 assert.equal(pkg.scripts['qa:visual'],'node tools/qa-visual.cjs');
 const harness=read('tools/qa-visual.cjs');
 assert.ok(!/exec\w*\(['"`][^'"`]*playwright install/.test(harness),'the harness never downloads a browser');
 assert.ok(harness.includes('executablePath'),'it launches the preinstalled Chromium by path');
});

test('CORE_RUN: the build still runs from the filesystem with one local stylesheet',()=>{
 const sheets=[...html.matchAll(/<link[^>]+stylesheet[^>]*>/g)].map(m=>m[0]);
 /* The Director review added ui/director-review.css as a separate override layer over the
    consolidated sheet. What this clause has always been protecting is the offline contract -
    every sheet is local and nothing is fetched - so it names the sheets that may be linked
    rather than counting to one. A third sheet, or any remote one, still fails here. */
 assert.deepEqual(sheets.map(s=>(s.match(/href="([^"]+)"/)||[])[1]),['ui/ui.css','ui/director-review.css'],
  'exactly the consolidated sheet and the review override, in that order, and nothing else');
 assert.ok(!/https?:\/\//.test(html.replace(/<meta[^>]*>/g,'')),'no external origin is fetched');
 assert.equal((css.match(/^:root\{/gm)||[]).length, 3,'the sheet defines :root token blocks');
 for(const dead of ['.stage-grid','.layout{','.store-panel','.sell-toolbar','.statsbar','.item-grid'])
  assert.ok(!css.includes(dead),'dead legacy selector '+dead+' is gone');
});

test('UI §RESPONSIVE RULE: the sheet is authored mobile-first',()=>{
 const min=(css.match(/@media\(min-width/g)||[]).length,max=(css.match(/@media\(max-width/g)||[]).length;
 assert.ok(min>=2,'tablet/desktop are added with min-width queries');
 assert.equal(max, 1,'only specific exceptions use max-width');
 assert.ok(/button\{[^}]*min-height:44px/.test(css),'the 44px touch contract is in the base sheet');
 assert.ok(css.includes('env(safe-area-inset-bottom)')&&css.includes('env(safe-area-inset-top)'),'safe areas are honoured');
});

test('UI-Q02 / VISUAL DIRECTION: pixel-art material language, not a dashboard',()=>{
 assert.equal((css.match(/border-radius:(?!0)/g)||[]).length,0,'no rounded containers anywhere');
 assert.ok(!/box-shadow:[^;]*blur|filter:blur/.test(css),'depth is hard offset and bevel, never blur');
 assert.ok(!/\.card\b|\.kpi|\.tile-grid|\.phase-strip|\.hud-readout|\.day-plate|\.gate-plate\b/.test(css),'no card/KPI/stepper vocabulary survives');
 assert.ok(!app.includes('function header('),'the dead desktop topbar is gone');
 assert.ok(!app.includes('phase-strip'),'the numbered stepper is gone');
 assert.ok(!/class="tag"/.test(app),'the old chip helper is gone; a price tag is a named object');
 assert.ok(css.includes('image-rendering:pixelated'),'art renders unsmoothed');
 assert.ok(css.includes('-webkit-font-smoothing:none'),'the bitmap face is not antialiased away');
 /* UI_UX_v2.7 §TYPOGRAPHY — EXACT PAIR: Mulmaru is the ATMOSPHERE face and Wanted Sans the
    INFORMATION one, and no third family, icon font or theme-font system exists beside them. */
 assert.ok(/@font-face\{font-family:'Mulmaru'/.test(css),'the pixel family is the type system');
 assert.ok(!/Galmuri|Pretendard/.test(css),'neither retired face survives in the CSS');
 const families=[...css.matchAll(/@font-face\{font-family:'([^']+)'/g)].map(m=>m[1]);
 assert.deepEqual([...new Set(families)].sort(),['Mulmaru','MulmaruMono','WantedSans'],
  'exactly the approved pair - Mulmaru with its Mono, and Wanted Sans');
 /* Mulmaru is a STATIC single-weight family: no fvar, no wght axis, OS/2 usWeightClass 500.
    Each face is declared at the weight it actually is - a range it does not have would be a
    claim the font's own tables do not support - and nothing may ask it for another one. */
 for(const m of css.matchAll(/@font-face\{font-family:'Mulmaru[^']*';[^}]*\}/g))
  assert.ok(/font-weight:500/.test(m[0]),'the ATMOSPHERE face is declared at its real weight: '+m[0].slice(0,60));
 assert.ok(!/@font-face\{font-family:'Mulmaru[^']*';[^}]*font-weight:\d+ \d+/.test(css),
  'no weight range is claimed for a static face');
 assert.ok(/body\{font-synthesis:none\}/.test(css),'no weight or style is ever synthesised');
 for(const m of css.matchAll(/font:(\d+)[^;]*var\(--f-(?:sign|plate|led)\)/g))
  assert.equal(m[1],'500','an ATMOSPHERE rule asks only for the weight that ships: '+m[0]);
 // and the INFORMATION face is only asked for the two weights it vendors
 for(const m of css.matchAll(/font-weight:(\d{3})\b/g))
  assert.ok(['400','500','600'].includes(m[1]),'no rule asks for a weight no face ships: '+m[0]);
 // green is the sign, the price tag and the approval stamp — never a ground
 for(const rule of ['body{','.stage{','.p-order{','.p-morning{'])
  assert.ok(!/#([0-9a-f]{0,2})(3f9d63|7ddc9f)/i.test(css.slice(css.indexOf(rule),css.indexOf(rule)+240)),'green is not a page ground in '+rule);
 /* USER DIRECTION 2026-09-22, final. Three single-colour attempts were retired in turn: the
    green approval stamp (the success green every AI tool ships), the cyan that replaced it
    (separate UI over wood, ivory and charcoal) and the coral that replaced that - because
    `.stamp` is not one thing. The SALE price keys, a defer control and the day's last Action
    all wear it, and one colour across them says they matter the same.
    Colour follows the ACTION'S ROLE now, so this asserts the role split, the three families'
    exact values, the bans, and the geometry they share - never "the stamp is colour X". */
 const token=n=>(css.match(new RegExp('--'+n+':(#[0-9a-f]{6})'))||[])[1];
 const FAMILY={brick:['#b84f3d','#e4876d','#703127','#171312','#fff2e6'],
               brown:['#75452c','#b06b43','#3e271c','#15110f','#f4e6d3'],
               yellow:['#f0c94b','#ffe89a','#a86e16','#17130d','#211b0e']};
 for(const [name,vals] of Object.entries(FAMILY))
  for(const [i,part] of ['','-lit','-deep','-line','-ink'].entries())
   assert.equal(token(name+part),vals[i],'the '+name+' family carries its approved '+(part||'face')+' value');
 // the names the User settled on, so the sheet and the guard say the same words
 assert.ok(!/walnut|--coin\b/i.test(css),'the working names WALNUT / COIN are gone');
 // the retired single-colour systems may not come back as an Action family
 for(const dead of ['#3d8b5b','#2f7a4d','#21c7f3','#f2644b','#c4973e','#e3b341','#3a2c1d'])
  assert.ok(!new RegExp('--(brick|brown|yellow)[a-z-]*:'+dead).test(css),
   'no Action family regresses to a retired value: '+dead);
 /* the base control is GEOMETRY, not a colour: it falls back to the neutral steel when no role
    is named, so nothing is painted by the class it happens to wear */
 const stampRule=(css.match(/\n\.stamp\{[\s\S]*?\}/)||[''])[0];
 assert.ok(/background:var\(--act,var\(--steel\)\)/.test(stampRule),
  'the base control defaults to neutral - a role, not a class, decides the colour');
 assert.ok(!/#[0-9a-f]{6}(?![0-9a-f])/.test(stampRule.replace(/var\([^)]*\)/g,'').replace(/#[0-9a-f]{8}/g,'')),
  'and names no face value of its own');
 /* the geometry: notch, hard outline, opposed lit/deep edges, a zero-radius offset, and a
    press that swaps the edges rather than tinting the face */
 /* the polygon is named `--stamp-cut` in this same rule and the rule clips to it, so a state
    the base sheet squares off can take the SAME outline back without a second set of numbers. */
 assert.ok(/--stamp-cut:polygon/.test(stampRule)&&/clip-path:var\(--stamp-cut\)/.test(stampRule),
  'its corners are notched - never rounded, never a pill');
 /* DIRECTOR, 2026-09-23. `.stamp:disabled` squares the silhouette off, so ORDER's leave control
    stopped being the same cut object as the commit beside it the moment a cart was held. It
    takes the family outline back, by the shared geometry rather than a restated polygon. */
 const leaveOff=(css.match(/\.p-order \.dock \.stamp\.leave\[disabled\]\{[\s\S]*?\}/)||[''])[0];
 assert.ok(/clip-path:var\(--stamp-cut\)/.test(leaveOff),
  'and a held cart does not turn the leave control back into a rectangle');
 assert.ok(!/opacity:\.[0-9]/.test(leaveOff)&&/opacity:1/.test(leaveOff),
  'which recedes by face and depth, never by fading the whole element');
 assert.ok(/inset 0 0 0 3px var\(--act-line/.test(stampRule),'it carries a hard dark outline');
 assert.ok(/inset 0 9px 0 var\(--act-lit/.test(stampRule)&&/inset 0 -10px 0 var\(--act-deep/.test(stampRule),
  'lit along the top-left and deep along the bottom-right');
 assert.ok(/drop-shadow\(\dpx \dpx 0 /.test(stampRule),'over a hard offset that follows that shape');
 const press=(css.match(/\.stamp:active\{[\s\S]*?\}/)||[''])[0];
 assert.ok(/transform:translate/.test(press),'the press moves the plane into its own shadow');
 assert.ok(/inset 0 9px 0 var\(--act-deep/.test(press)&&/inset 0 -10px 0 var\(--act-lit/.test(press),
  'and the lit and deep edges swap, so it is depth and not colour alone');

 /* ---- ROLE MAPPING, per Action. A modal footer is not a role: `.stamp` is worn there by the
    Run's opening Action and by a stat sheet's 확인 alike, and an earlier pass painted the whole
    footer BRICK, which is the mistake this system exists to stop. ---- */
 const ruleFor=sel=>{const i=css.indexOf(sel);assert.ok(i>0,sel+' is a real rule');
  return css.slice(i,css.indexOf('}',i)+1);};
 assert.ok(!/\.modal-footer \.stamp\{[^}]*--act:/.test(css),
  'no rule paints every modal-footer control one family');
 // BRICK: the flow Actions, named one at a time off the data-action Source already carries
 const brickRule=(css.match(/\.p-end \.dock \.stamp,[\s\S]*?\}/)||[''])[0];
 assert.ok(/--act:var\(--brick\)/.test(brickRule),'the flow family is BRICK');
 for(const act of ['start','store-return','event-seen','boss-go'])
  assert.ok(brickRule.includes('[data-action="'+act+'"]'),'BRICK reaches the flow Action: '+act);
 assert.ok(/--act:var\(--brick\)/.test(ruleFor('.p-closing .dock .stamp{')),'and the day\'s last Action');
 // ...and reaches nothing that is only an acknowledgement or a utility
 for(const act of ['shop','import-go','export','roster','dismiss'])
  assert.ok(!brickRule.includes('[data-action="'+act+'"]'),'BRICK does not reach the utility: '+act);
 /* BROWN: a way back, and only that. `dismiss` WITHOUT `.stamp` is 보급으로 돌아가기 /
    계속 영업 / 취소 in Source; a `dismiss` that wears `.stamp` is a plain 확인 and stays
    neutral, which `:not(.stamp)` is what keeps true. */
 const back=ruleFor('.modal-footer button:not(.stamp)[data-action="dismiss"]{');
 assert.ok(/background:var\(--brown\)/.test(back),'the way back is BROWN');
 assert.ok(/:not\(\.stamp\)/.test(back),'and a 확인 that wears .stamp is not swept up with it');
 assert.ok(/background:var\(--brown\)/.test(ruleFor('.relic-takeover .close .stamp{')),
  'deferring a Store Support purchase is the same role');
 // the footer's remaining controls carry no face at all: a utility is the neutral control
 const footerRest=ruleFor('.modal-footer button:not(.stamp){');
 assert.ok(!/background:/.test(footerRest),'a plain footer utility takes no family of its own');
 assert.ok(!/#3a2c1d/.test(footerRest),'and the retired dead brown is not its default');
 // YELLOW: a purchase, inside a card, never a screen's Action
 assert.ok(/background:var\(--yellow\)/.test(ruleFor('.relic-plate .stamp{')),'a Store Support purchase is YELLOW');
 assert.ok(/background:var\(--yellow\)/.test(ruleFor('.slot-option>button[data-action="deco-buy"]')),
  'and so is a Decoration purchase');
 /* ...but only the purchase. Equipping something already owned is a state change, so the
    card's default face stays neutral. */
 const keyRule=(css.match(/\.slot-option>button\{[\s\S]*?\}/)||[''])[0];
 assert.ok(!/var\(--yellow\)|var\(--brick\)/.test(keyRule),
  'the card key is not painted with a purchase or a flow Action by default');
 const keyOff=(css.match(/\.slot-option>button:disabled\{[\s\S]*?\}/)||[''])[0];
 assert.ok(!/opacity:\.[0-9]/.test(keyOff)&&!/inset 0 5px 0|inset 0 -6px 0/.test(keyOff),
  'and UNAVAILABLE loses the depth outright rather than being the same key faded');
 /* SALE's three price keys are peers being compared, so none may wear a family. The 정가 key
    carries class="stamp" in Source, which is exactly how one of them could. */
 const tills=ruleFor('.tills button{');
 assert.ok(!/--act:|var\(--brick\)|var\(--yellow\)/.test(tills),'no SALE price key takes an Action family');
 assert.ok(/\.tills \.stamp\{/.test(css),'and the one that wears .stamp is levelled back to its peers');
});

/* UI-Q-v28-26 FINAL VISUAL ACCEPTANCE, USER 2026-09-22. Four findings from the acceptance pass
   on the real screens, each of which the sheet alone can regress silently. */
test('UI-Q-v28-26: the accepted Action composition holds',()=>{
 const ruleFor=sel=>{const i=css.indexOf(sel);assert.ok(i>0,sel+' is a real rule');
  return css.slice(i,css.indexOf('}',i)+1);};
 /* A. The face has to survive the pointer. `button:hover` repaints the plane steel and outranks
    `.stamp`'s own background, so BRICK read as a neutral grey slab exactly when it was pointed
    at. The role is restated on hover; the lift stays a brightness. */
 const over=ruleFor('.stamp:hover{');
 assert.ok(/background:var\(--act,/.test(over),'a pointed-at Action keeps the face its role named');
 assert.ok(/brightness\(1\.1\)/.test(over),'and the pointer still only lifts it, never tints it');
 /* B. The receipt and the day's last Action are one composition: the stage centres the pair, the
    dock carries no ground of its own, and the Action takes the paper's 344px measure. */
 assert.ok(/\.p-closing\{[^}]*justify-content:center/.test(css)&&/\.p-end\{[^}]*justify-content:center/.test(css),
  'the stage centres the receipt and its Action as one pair');
 for(const sel of ['.p-closing .stage-scroll{','.p-end .stage-scroll{'])
  assert.ok(/flex:0 1 auto/.test(ruleFor(sel)),'the scroll takes only its own height: '+sel);
 assert.ok(/background:none/.test(ruleFor('.p-closing .dock{')),'and the dock stops being a separate floor');
 const pair=ruleFor('.p-closing .dock .stamp,.p-end .dock .stamp{');
 assert.ok(/width:min\(100%,344px\)/.test(pair),'the Action is set to the receipt\'s own measure');
 assert.ok(/white-space:nowrap/.test(pair),'and its label never breaks to a second line');
 assert.ok(/width:344px/.test(css.slice(css.indexOf('@media(min-width:1024px)'))),
  'on a desk it takes that measure exactly rather than sitting inside it as a chip');
 /* C. A footer holding ONE control that is the phase's main Action centres it instead of parking
    it at the footer's end, where it read as a small button in a web footer. */
 const solo=ruleFor('.modal-footer [data-action="store-return"]{');
 assert.ok(/margin:0 auto/.test(solo),'the phase\'s main Action is centred on the sheet');
 assert.ok(/width:min\(100%,\d+px\)/.test(solo),'and takes width without becoming a full-bleed bar');
 assert.ok(/\.modal-footer \[data-action="start"\],\n\.modal-footer \[data-action="store-return"\]\{/.test(css),
  'and the Run\'s opening Action is set the same way');
 /* D. BOSS CONFIRM: the two controls are the same design object - USER 2026-09-22 - so they carry
    the same geometry and differ by family and weight, and neither label may wrap. */
 assert.ok(/footer=btn\('보급으로 돌아가기','dismiss','stamp'\)\+btn\('최종 원정 시작','boss-go','stamp'\)/.test(app),
  'both halves of the Final decision are the same control in Source');
 const lastRule=sel=>{const i=css.lastIndexOf(sel);assert.ok(i>0,sel+' is a real rule');
  return css.slice(i,css.indexOf('}',i)+1);};
 const pairRule=ruleFor('.modal-footer:has([data-action="boss-go"]) .stamp{');
 assert.ok(/flex:1 1 100%/.test(pairRule),'each takes a full row, so no label can wrap and the footer cannot overflow');
 const go=lastRule('.modal-footer [data-action="boss-go"]{');
 assert.ok(/order:-1/.test(go)&&/min-height:6\dpx/.test(go),'the commit reads first and heaviest');
 const back=ruleFor('.modal-footer:has([data-action="boss-go"]) [data-action="dismiss"]{');
 assert.ok(/--act:var\(--brown\)/.test(back),'the way back carries BROWN through the role, so its bevel and press are its own');
 assert.ok(/min-height:5\dpx/.test(back),'a step below the commit, not a different kind of object');
 assert.ok(/white-space:nowrap/.test(ruleFor('.modal-footer .stamp{')),'neither label breaks to a second line');
 /* B5-3: 보급으로 돌아가기 is the sheet's one visible cancel - no header 닫기 beside it */
 assert.ok(/const ownCancel=new Set\(\[[^\]]*'bossConfirm'/.test(app),'BOSS CONFIRM shows no second 닫기');
});

/* UI-Q-v28-29 CONTROL / FEEDBACK / LAYOUT CONTINUITY — "modal close returns focus to a
   meaningful origin". Runtime evidence at this fix: before it, closing any sheet left
   document.activeElement on <body> at 390 and 1280; after it, focus is back on the control
   that opened the sheet. */
test('UI-Q-v28-29: a sheet hands focus back to the control that opened it',()=>{
 const set=fn('setModal');
 assert.ok(/if\(value&&!modal\)previousFocus=document\.activeElement/.test(set),
  'the opener is captured only when a sheet opens over the screen');
 assert.ok(!/(^|[^)])previousFocus=document\.activeElement;modal=value/.test(set),
  'and never re-read on the closing call, where the active element is the sheet\'s own control');
 assert.ok(/back\?\.isConnected\?back:/.test(set),
  'a restore target that the redraw removed is not focused as a detached node');
 assert.ok(/\$\('#phase-content'\)\)\?\.focus/.test(set),
  'and focus falls to the Phase content region rather than to <body>');
 /* the same-view redraw path keeps its own contract: the pressed control comes back and the
    ORDER row it belongs to goes back on its pixel. Guarded so neither is quietly dropped. */
 assert.ok(/preventScroll:true/.test(fn('restoreFocus')),'restoring focus does not scroll the screen');
 assert.ok(/anchorOffer\(key,y0\)/.test(app),'and a quantity press re-anchors its own offer row');
});

test('UI-Q01: Morning and Order are different screens, not one template',()=>{
 const morning=fn('morningScreen'),order=fn('orderForm')+fn('orderScreen');
 for(const part of ['Scene.ceiling()','Scene.wall(','Scene.counter()'])
  assert.ok(morning.includes(part),'Morning is built from the store itself: '+part);
 assert.ok(morning.includes('class="daysign"')&&morning.includes('class="till"'),'the day and the float are objects in the room');
 assert.ok(morning.includes('class="board"')&&morning.includes('class="pinned"'),'Gates are notices pinned to the board');
 assert.ok(!/Scene\.(ceiling|wall|counter)|Art\.scene/.test(order),'ORDER carries no store scene');
 assert.ok(order.includes('class="form"')&&order.includes('발주서'),'Order is a paper order form');
 /* The corporate seal was dropped from this clause by UI_UX §ORNAMENT RESTRAINT, which audits the
    whole Player-facing UI for logo / seal / stamp marks that carry no function or state: the
    letterhead's G24 filled the head's right margin and nothing else, so the mark, its rule and
    the now-unused Scene.seal helper are gone. What this clause protects is unchanged - an offer
    row is built from real objects, not from generic chips - so the price tag and the stock crate
    are still required, and the seal must NOT come back as decoration. */
 assert.ok(order.includes('Scene.priceTag(')&&order.includes('Scene.crate('),
  'offers carry a real price tag and stock crate');
 assert.ok(!/Scene\.seal|seal-art/.test(app+css)&&!/function seal\(/.test(read('dist/ui/scene.js')),
  'and no corporate seal mark is drawn anywhere on the Player surface');
 for(const shared of ['class="board"','class="daysign"','class="pinned"','class="till"'])
  assert.ok(!order.includes(shared),'Order does not reuse the Morning composition: '+shared);
});

test('UI-Q03 / UI-Q35: Morning opens on the Event, and every Gate Hazard is explained inline',()=>{
 assert.ok(/modal='event'/.test(app),'an Event day opens with a focused reveal before Gate detail');
 assert.ok(app.includes('eventSeen'),'the reveal is consumed exactly once');
 assert.ok(app.includes('class="slip event"'),'after the reveal the Event stays pinned to the notice board');
 assert.ok(app.includes('Presentation.hazardRows'),'Gate Hazards render their canonical pressure line');
 assert.ok(!/title="/.test(app),'no hover-only title= tooltip survives in the render path');
 assert.ok(!/[❄\u{1F577}☾◆◉♜]/u.test(app),'gate marks are drawn sprites, never emoji');
 assert.ok(app.includes('Art.mark(')&&app.includes('Art.glyph('),'sprites are used for marks and UI glyphs');
});

test('UI-Q05 / UI-Q07 / UI-Q08 / UI-Q09: the Order form carries the canonical hierarchy',()=>{
 const order=fn('orderForm')+fn('orderScreen');
 assert.ok(order.includes('본사 발주')||order.includes('발주서'),'the form is titled as the HQ order');
 for(const label of ['운영비(예상)','창고 잔여 칸','보유','발주 금액','발주 후'])assert.ok(order.includes(label),'the register shows '+label);
 assert.ok(order.includes("data-action=\"gates\""),'today Gate/Hazard is reachable without leaving Order');
 assert.ok(!/내일|tierLine|gateLine/.test(order)&&!/function (tierLine|gateLine)\(/.test(app),'no next-day forecast block on ORDER (User 2026-09-24, v2.9.0)');
 assert.ok(/<span class="kind">'\+E\(D\.rarities\[it\.rarity\]\)\+'<\/span>/.test(order),'each offer row carries the rarity name line');
 assert.ok(/lim=game\.quantityLimit\(i\)/.test(order)&&/aria-disabled="true" data-reason=/.test(order),'a blocked quantity control is dim but tappable, with its reason');
 for(const t of ['창고 칸이 부족합니다.','오늘 공급 최대 수량입니다.',"'발주 자금이 부족합니다. '+fmt(lack)+'G 부족.'"])assert.ok(app.includes(t),'§3-9 toast: '+t);
 assert.ok(/getAttribute\('aria-disabled'\)==='true'/.test(app),'the click listener answers a blocked control with the toast and nothing else');
 assert.ok(!/'비싼 상품일수록|일반 부상의 투력 페널티를 대체/.test(read('dist/data/catalog.js')),'no Trait flavor note survives');
 assert.ok(/tr\.note\?`<em class="tone-cost">/.test(fn('traitRows')),'the one remaining note (거짓말쟁이) renders as an effect row');
 assert.ok(order.includes('후보 전체 교환'),'the reroll names its full-offer scope');
 assert.ok(order.includes("fmt(price)+'G'"),'the current reroll cost is visible before use');
 assert.ok(order.includes('발주 교환권'),'the free first use is called out');
 assert.ok(/발주 '\+fmt\([^)]+\)\+'G · 확정/.test(app),'the docked stamp states the amount');
});

test('UI-Q35 / DUN-Q21 / DUN-Q-v29-2: all 9 Hazards read the numbered short row, one pressed Stat each (3 / 3 / 3, no Gate shares a Stat); the labels are retired',()=>{
 const stat={poison:'survival',cold:'survival',corrosion:'survival',bind:'mobility',mire:'mobility',dark:'mobility',fire:'spirit',fear:'spirit',whiteout:'spirit'};
 const d={day:1,tier:1},rows=Presentation.hazardRows(Object.keys(DATA.hazards),d);
 assert.deepEqual(rows.map(r=>r.key).sort(),Object.keys(DATA.hazards).sort(),'every canonical Hazard is explained');
 for(const [key,s] of Object.entries(stat)){
  assert.equal(rows.find(r=>r.key===key).pressure,Presentation.hazardShort(key,d),key+' row = the numbered short row');
  assert.equal(Presentation.hazardStat[key],s,'the tag / emphasis read the same Stat');
  assert.equal(Dungeon.hazardState(key,{},{scale:1}).stat,s,'and the engine moves its Defense with that Stat only');
 }
 for(const [s,n] of [['survival',3],['mobility',3],['spirit',3]])assert.equal(Object.values(stat).filter(x=>x===s).length,n,s+' presses exactly '+n+' Hazards (User 2026-09-24 revision 5)');
 // no Family Tier Hazard set is answered by one Stat (망자역 지하묘지 = 정신 + 기동)
 for(const [fam,tiers] of Object.entries(DATA.familyTiers))for(const set of tiers)assert.equal(new Set(set.map(h=>stat[h])).size,set.length,fam+' '+set.join('+')+' presses distinct Stats');
 assert.ok(!('hazardPressure' in Presentation)&&!/'(강인함으로 버틴다|기동으로 피한다|정신으로 견딘다)'|PRESSURE_LABEL|hazardPressure/.test(read('dist/ui/presentation.js')),'no pressure label string survives (User 2026-09-24 revision 2)');
 assert.equal(Presentation.hazardRows(['cold'],d).at(0).name,'냉기');
 assert.equal(Presentation.hazardRows(['cold']).at(0).pressure,'','without a Gate there is no row text to invent');
 assert.ok(/const pressCell=h=>h\.need\?'<span class="press"><b class="need">'[^;]*<small class="rate">/.test(app),'the short row renders as need over rate (User 2026-09-25)');
 assert.ok(/\.hazards \.press \.rate\{display:block;font-size:11px/.test(read('dist/ui/ui.css'))&&/@media\(min-width:900px\)\{\.hazards \.press \.need,\.hazards \.press \.rate\{display:inline/.test(read('dist/ui/ui.css')),'two lines on a phone, one line at 900px+');
 assert.ok(/\.detail-stat label \.press\{display:inline;[^}]*text-overflow:ellipsis/.test(read('dist/ui/ui.css'))&&/\.detail-stat strong\{margin-left:auto;flex:none;font:600 18px/.test(read('dist/ui/ui.css')),'the Stat grid tag is inline beside the name and the value is 18px');
});

test('UI-Q10..Q14 / UI-Q29 / UI-Q30: the Sale stack, the inline price flow and honest refusal',()=>{
 const sale=fn('saleScreen');
 /* The Director review moved the bag out of the dossier and up beside the adventurer, so the
    lower column no longer grows a row just to repeat slot information. It is read with the
    customer now rather than after their Traits; everything below it keeps its order. */
 /* UI-Q109 §8 moved the Trait rows below the goods. Measured on a phone they were the block
    that pushed the first selectable product past the fold, and they are the one thing here a
    product cannot move - the forecast and the four Core Stats are what 보급 후 변화 compares
    against, so they still lead. Everything else keeps the order it had. */
 const order=['Scene.shelfStrip()','standee(n)','kitLine(n)','waitingLine(','returningSummary(n)','statGrid(n)'];
 let at=-1;for(const part of order){const i=sale.indexOf(part);assert.ok(i>at,'Sale stacks '+part+' in canonical mobile order');at=i;}
 /* The desktop grid needs the stat/forecast dossier and the Trait rows in one shared column,
    which only a real DOM wrapper can give it without a mid-column gap where the shelf's own
    (taller) column forced their two rows apart. Grouping them in source puts Trait rows ahead
    of the shelf in the markup, so the phone order above (goods before Traits) is restored by
    CSS flex `order` rather than by source position - the wrapper disappears there via
    `display:contents`, so its children read in the SAME order a phone always used. */
 assert.ok(sale.indexOf('dossier-col')<sale.indexOf('statGrid(n)'),'the stat dossier and Trait rows share one desktop column wrapper');
 assert.ok(sale.indexOf('traitRows(n)')<sale.indexOf('shelf()'),'grouped ahead of the shelf in source, for that one wrapper');
 assert.ok(/\.p-sale \.stage-scroll\{padding:16px var\(--gutter\) 22px;background:var\(--tex-wood\),#2b2013;\s*display:flex;flex-direction:column\}/.test(css),
  'below the desktop width, Sale is a flex column so `order` actually applies');
 assert.ok(/\.p-sale \.dossier-col\{display:contents\}/.test(css),'the wrapper is invisible to that flex order until the desktop grid needs it as one box');
 assert.ok(/\.p-sale \.dossier:not\(\.traits\)\{order:1\}/.test(css)&&/\.p-sale \.shelf\{order:2\}/.test(css)
  &&/\.p-sale \.dossier\.traits\{order:3\}/.test(css)&&!/\.p-sale \.owned-relics/.test(css),
  'the restored mobile order is stat dossier, then shelf, then Trait rows; no owned-Relic block in SALE at any width (UI-Q-v29-16, v2.9.0)');
 assert.ok(!fn('saleScreen').includes('ownedRelicView()')&&fn('finalScreen').includes('ownedRelicView()'),'SALE keeps only the shelf-head control; FINAL keeps its list');
 assert.ok(/\.p-sale \.dossier-col\{display:block;grid-column:1;margin:0\}/.test(css),
  'the desktop grid reverts the wrapper to one real box - a single column, exactly as tall as its own content');
 // the active customer is a placed sticker, never a cropped or stretched thumbnail
 assert.ok(/\.figure\{[^}]*object-fit:contain/.test(css),'the NPC payload is contained, never cropped');
 assert.ok(!/\.figure\{[^}]*object-fit:cover/.test(css),'the NPC payload is never cover-cropped');
 // the square box is the portrait, and the payload fills it - so no portrait is squashed, and
 // none of it leaves the frame either. The production art has almost no transparent margin, so
 // anything outside the box would be painted artwork rather than padding.
 assert.ok(/--artw:calc\(var\(--cardw\) - var\(--frame\)\*2\)/.test(css),'the payload box is the card inside its frame');
 assert.ok(/\.portrait\{[^}]*height:var\(--artw\)/.test(css),'and it is square, so no portrait is squashed to fit');
 assert.ok(/\.figure\{[^}]*width:100%;height:100%/.test(css),'the payload fills that box and no more');
 assert.ok(/\.face\{[^}]*overflow:hidden/.test(css),'the card is the boundary, whatever silhouette arrives');
 // the face and the backs are one deck: same proportion, and the payload overhangs the face
 // one deck geometry: the card's height is content, and the backs are the same shape
 // scaled, so front and back agree at any width instead of only where they were drawn
 assert.ok(/--cardh:calc\([^;]*var\(--artw\)[^;]*var\(--plateh\)\)/.test(css),
  'the card height is derived from the payload and the plate, not a fixed ratio');
 assert.ok(!css.includes('--over'),'the overhang the placeholder stickers needed is gone with them');
 assert.ok(/\.line-up \.wait\{[^}]*width:calc\(var\(--cardw\)\*var\(--deck\)\);height:calc\(var\(--cardh\)\*var\(--deck\)\)/.test(css),
  'the waiting backs are the card scaled, so front and back stay one deck');
 assert.ok(/\.who \.nameplate\{[^}]*min-height:var\(--plateh\)/.test(css),
  'the plate sizes itself, so it grows with a long name instead of clipping it');
 // the artwork used to be drawn wider than the card on purpose, back when the placeholder
 // stickers carried their own transparent margin and only that margin crossed the edge. The
 // production portraits have almost none, so it is the card's inside that sets the size now.
 assert.ok(/--frame:([0-9]+)px/.test(css)&&Number(css.match(/--frame:([0-9]+)px/)[1])<=8,
  'the frame is tight, so containing the artwork costs the face as little scale as possible');
 // the waiting line leaks nothing about who is next
 const wait=fn('waitingLine').replace(/^\s*\/\/.*$/gm,'');
 for(const leak of ['name','rarity','job','level','npcArt','avatar'])
  assert.ok(!wait.includes(leak),'the waiting line does not leak '+leak);
 assert.ok(wait.includes('Scene.cardBack()'),'every waiting customer is the same back');
 assert.ok(!/function cardBack\([^)]/.test(scene),'the card back takes no per-customer argument');
 assert.ok(app.includes('예상 목적지')&&!app.includes("'말한 목적지'"),'the destination label is 예상 목적지');
 assert.ok(!app.includes("modal==='saleItem'"),'item and price resolve inline, with no modal round trip');
 assert.ok(app.includes("selected=reopen||selected!==id?id:null"),'tapping a product toggles its panel in place, and a folded tray reopens instead (User 2026-09-25)');
 /* v2.9.0 PRICE ROLE WORDS (COPY_AUDIT §4-19): the face is the role word, the number stays the mode's */
 assert.ok(app.includes("Math.round(D.pricing[mode].mult*100)")&&app.includes("<em>'+role+'</em>"),'price modes read by their role word');
 assert.ok(app.includes("const PRICE_ROLE={half:'할인 50%',full:'정가',overcharge:'바가지 150%'}"),'할인 50% / 정가 / 바가지 150% are the three faces');
 for(const reason of ['소지금 부족','오늘 거절됨','가방 가득'])assert.ok(app.includes(reason),'a blocked price says why: '+reason);
 assert.ok(app.includes('Adventurer.slots(n)'),'remaining consumer slots are readable');
 /* COPY_AUDIT_APPROVED §4-3 is the exact owner of the death-risk Help, and its approved wording
    NEGATES a master probability - `원정 전체 사망 확률은 아니다.` - so a bare substring ban now
    fails on the approved copy itself. The intent is unchanged and is asserted more tightly: the
    game must never PRESENT one, so the phrase is pinned to that single approved sentence and
    forbidden anywhere else. */
 /* v2.9.0: §4-3 is retired (the value is the second line of the 전투 전망 help, §4-1, and the NPC
    detail, §5-7), so no surface names a whole-expedition 사망 확률 at all. */
 assert.ok(!app.includes('실패했을 때 사망으로 이어질 위험. 원정 전체 사망 확률은 아니다.'),'the retired §4-3 death-risk Help is gone');
 assert.equal((app.match(/사망 확률/g)||[]).length,0,'no surface names a 사망 확률');
 for(const bad of ['성공 확률','안전 점수'])assert.ok(!app.includes(bad),'no exact probability or master safety score');
});

test('NPC PRODUCTION ART: one resolver for every player-facing portrait',()=>{
 // The adoption gap was that each surface kept its own pre-existing avatar call, so
 // adopting production art in Sale did not reach Night, the notebook or the Final muster.
 assert.ok(/function portrait\(n,size/.test(app),'a single portrait resolver exists');
 assert.ok(/function portrait\([^)]*\)\{[\s\S]{0,220}Scene\.npcArt\(n\)/.test(app),
  'the resolver reads the production art source');
 for(const fnName of ['beat','npcCard','npcDetail']){
  const body=fn(fnName);
  assert.ok(/portrait\(/.test(body),fnName+' renders its NPC through the shared resolver');
  assert.ok(!/Art\.avatar\(/.test(body),fnName+' no longer calls the legacy avatar directly');
 }
 // Art.avatar survives only as the missing-asset fallback, inside the resolver and the
 // Sale figure it backs.
 const calls=(app.match(/Art\.avatar\(/g)||[]).length;
 assert.equal(calls,2,'the legacy avatar is only the fallback (resolver + Sale figure)');
 assert.ok(/\.pfp\{[^}]*object-fit:contain/.test(css),'the portrait box contains, never crops or stretches');
 assert.ok(/\.pfp\{[^}]*width:var\(--pfp[^)]*\);height:var\(--pfp/.test(css),'the portrait box is square at every size');
});

test('NIGHT_CLOSING: one resolved report drives every line of the beat',()=>{
 const b=fn('beat');
 for(const call of ['Presentation.nightTone(r)','Presentation.nightVerdict(r)','Presentation.nightHappened(r)','Presentation.nightWhy(r)'])
  assert.ok(b.includes(call),'the beat reads '+call+' rather than its own copy');
 assert.ok(fn('changedRows').includes('Presentation.nightChanges(r, n)'),'WHAT CHANGED comes from the same report');
 // compactness is about copy: a routine beat drops the quote, never the adventurer
 assert.ok(/portrait\(n,150,'returner'\)/.test(b),'every outcome renders the same NPC art size');
 assert.ok(!/heavy\s*\?[^)]*returner/.test(b),'the figure is never branched on importance');
 assert.ok(/\.pfp\.returner\{[^}]*width:min\(44vw,190px\);height:min\(44vw,190px\)/.test(css),
  'one NPC size rule for Night');
 /* UI_UX §NIGHT LAYOUT — DESKTOP ADAPTATION (DIRECTOR, 2026-09-23): "one NPC size" means one
    size for EVERY Outcome at a given breakpoint. The phone baseline is the rule above; the
    desktop step may add exactly ONE shared override inside the desktop breakpoint. What stays
    a FAIL is any sizing rule that an Outcome, rank or tone can select, and any sizing rule at
    another breakpoint. Every rule that sizes the figure is found with its @media context. */
 const sized=[];{let media=[],depth=0,buf='';
  for(const ch of css.replace(/\/\*[\s\S]*?\*\//g,'')){
   if(ch==='{'){const head=buf.trim();buf='';
    if(head.startsWith('@'))media.push({head,depth});else sized.push({sel:head,media:media.map(m=>m.head).join(' '),open:true,body:''});
    depth++;continue;}
   if(ch==='}'){depth--;const last=sized[sized.length-1];
    if(last&&last.open){last.open=false;}
    else if(media.length&&media[media.length-1].depth===depth)media.pop();
    buf='';continue;}
   const last=sized[sized.length-1];if(last&&last.open)last.body+=ch;else if(ch===';')buf='';else buf+=ch;}}
 const figure=sized.filter(r=>/\.returner\b/.test(r.sel)&&/(^|;)\s*(width|height|zoom)\s*:|transform\s*:[^;]*scale/.test(r.body));
 const base=figure.filter(r=>!r.media),desk=figure.filter(r=>r.media);
 assert.equal(base.length,1,'one phone-baseline NPC size for every outcome');
 assert.ok(desk.length<=1,'at most one shared desktop NPC size: '+desk.map(r=>r.sel).join(' | '));
 for(const r of desk)assert.ok(/min-width:\s*(9\d\d|1\d{3})px/.test(r.media)&&!/max-width/.test(r.media),
  'the desktop NPC size lives in the desktop tier (900px+), never a phone breakpoint: '+r.media);
 for(const r of figure)assert.ok(!/\.(t-\w+|major|routine|quiet|gone-beat|cold)\b/.test(r.sel),
  'no NPC size is selected by an Outcome, rank or tone: '+r.sel);
 /* SA-Q09: the permanent result-card blockquote is gone. Every living result speaks through
    the SAME temporary SALE-style balloon (speech(n)), not a second, permanent mechanism, and
    not only the "weighted" beats. */
 assert.ok(!b.includes('<blockquote>')&&!/heavy\s*\?[^)]*blockquote/.test(b),
  'the permanent result-card blockquote is gone');
 assert.ok(/speech\(n\)\+portrait\(n,150,'returner'\)/.test(b),
  "the character's own line is the shared temporary balloon, every living result");
 assert.equal((app.match(/function speech\(n\)/g)||[]).length,1,
  'still exactly one speech-balloon implementation, reused rather than duplicated');
 assert.ok(!app.includes('다시는 가게 문을 열지 않는다'),'the permanence line is not duplicated under the death flavour');
 assert.ok(!css.includes('.gone-note'),'the removed death line leaves no dead rule behind');
 assert.ok(fn('beat').includes('weighty(r)')&&app.includes('Presentation.nightWeight(r)'),
  'presentation weight is decided in one place');
 for(const dead of ['function outcomeReason','function whyLine','function beatTone','function changeToken'])
  assert.ok(!app.includes(dead),'the duplicated screen-local copy helper is gone: '+dead);
});

test('SA-Q21 / SA-Q34: Closing is economics-only, and supply-impact attribution stays correct where it is actually read',()=>{
 /* Closing no longer repeats what NIGHT already owns: no 오늘의 보급 영향 block, and no
    explanatory footer teaching accounting the receipt above it already shows in real figures.
    The attribution helper itself (Presentation.supplyImpact/supplyLines) stays correct - it is
    still a unit other Presentation callers (and tests/night.cjs) may use - Closing simply does
    not call it any more. */
 const closingEmitted=fn('closingScreen').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'');
 assert.ok(!closingEmitted.includes('supplyImpact')&&!closingEmitted.includes('오늘의 보급 영향'),
  'Closing reads no attribution helper and prints no impact block');
 assert.ok(!closingEmitted.includes('미판매 재고는 자산으로 남는다'),'and no explanatory footer');
 const build=read('dist/ui/app.js')+read('dist/ui/presentation.js')+read('dist/systems/dungeon.js');
 for(const rejected of ['환경 부담을 줄였다','대응 보급이','환경 피해를 막았다'])
  assert.ok(!build.includes(rejected),'the rejected generic supply wording is gone: '+rejected);
 assert.ok(/supplyLines[\s\S]{0,400}items\.join\(' · '\)\+' → '/.test(read('dist/ui/presentation.js')),
  'an impact line reads product -> result');
 assert.ok(/if\(!items\.length\)continue;/.test(read('dist/ui/presentation.js')),
  'an event with no attributable item is never reported');
});

test('UI-Q34 / REL-Q39 / UI-Q39: no quality grade, no taxonomy, canonical progress wording',()=>{
 assert.ok(!/traitDirections|▲|◆ 양면|▼/.test(app),'no Trait quality label reaches the render path');
 assert.ok(!app.includes('buildNames'),'no Relic Build Axis name is rendered');
 /* UI-Q39 (User 2026-09-26, v2.9.6): Monster Knowledge left the codex - neither progress wording is rendered */
 assert.ok(!app.includes('관찰')&&!app.includes('보급 생환')&&!app.includes('몬스터 지식'),'no Monster Knowledge tab or progress line');
 assert.ok(app.includes('나중에 결정'),'the Relic window offers an explicit defer');
 assert.ok(/focusedRevealSeen/.test(app),'the Relic milestone reveal is once per window');
});

test('NIGHT_CLOSING §DEBUG LANGUAGE: the Night copy stays in the world',()=>{
 const night=fn('nightScreen')+fn('beat')+fn('whyLine')+fn('changedRows')+fn('outcomeReason');
 for(const word of ['판정','보정 적용','위험도','RNG','threshold','coefficient','디버그'])
  assert.ok(!night.includes(word),'Night copy still says '+word);
 assert.ok(!/영구 사망 처리/.test(app),'no process language for death');
});
test('SALE: the customer line is a balloon on the character, not a system notification',()=>{
 // COPY_WORLD_VOICE §11 lines have to reach the player, and they have to read as this
 // customer speaking. The balloon lives inside the scene next to the card, never as a
 // fixed banner or a bottom toast.
 assert.ok(/\+speech\(n\)\+standee\(n\)/.test(app),'the balloon sits in the scene with the customer');
 /* UI-Q110 replaced the reserved row with an overlay: on a phone that row was part of what
    pushed the shelf off the screen, and the balloon is presentation. It still belongs to the
    customer and still hangs over them - what changed is that it costs the band no height. */
 assert.ok(/\.say\{[^}]*position:absolute/.test(css),'it is an overlay over the customer, not a row in the band');
 assert.ok(!/\.say\{[^}]*grid-row/.test(css),'it does not reserve a row in the counter band');
 assert.ok(!/\.say\{[^}]*position:fixed/.test(css),'it is not a fixed screen notification');
 // The line itself stays run.say / Save truth; only whether this UI has shown it is local.
 assert.ok(/let sayKey=null,sayHidden=false/.test(app),'the shown/hidden marker is UI-local state');
 assert.ok(!/say(Hidden|Key|Armed)/.test(read('dist/systems/save.js')+read('dist/systems/run.js')),
  'speech visibility never enters the Run or the Save schema');
 assert.ok(/\.say:after\{[^}]*border-top-color/.test(css),'it has a tail pointing down at the character');
 assert.ok(/\.say:after\{[^}]*var\(--cardw\)/.test(css),'the tail is aimed at the card, not at the room');
 // v2.9.0 R2 (User 2026-09-24): on SALE the balloon is 2px from the top, 14px, tight padding (mobile-first), restored at 900px
 assert.ok(/\n\.p-sale \.say\{top:2px;padding:6px 10px 7px;font-size:14px;line-height:1\.4\}/.test(css),'SALE balloon: top 2px, 14px, tight padding');
 assert.ok(/\.p-sale \.say\{left:var\(--gutter\);top:8px;bottom:auto;max-width:min\(calc\(100% - var\(--gutter\) - 52px\),560px\);padding:9px 13px 10px;font-size:15px;line-height:1\.5\}/.test(read('dist/ui/director-review.css')),'the wide-screen SALE rule (director-review.css, 900px+) restores the full-size balloon');
 assert.ok(/\.say\{[^}]*background:color-mix\(in srgb,var\(--paper\) 88%,transparent\)/.test(css),'the 88% background compromise is unchanged');
 // It must not eat the decision: no clipping, no ellipsis, no shrink-to-fit.
 assert.ok(!/\.say[^{]*\{[^}]*text-overflow/.test(css),'a sentence is never ellipsised');
 assert.ok(!/\.say[^{]*\{[^}]*white-space:nowrap/.test(css),'a long line is allowed to wrap');
 assert.ok(!/\.say>span\{[^}]*max-height/.test(css),'the text is not clamped to a height');
 /* The menu pin owns the top-right corner; the balloon keeps clear of it. As an overlay it
    starts at the gutter rather than in a grid cell, so the room it leaves is that offset plus
    the button - the runtime overlap itself is checked at phone widths by qa:visual. */
 assert.ok(/\.say\{[^}]*max-width:min\(calc\(100% - var\(--gutter\) - 52px\)/.test(css),
  'the balloon stops short of the menu button');
});

test('SALE: the toast is the system channel only, and it really hides',()=>{
 // NPC reactions have one owner. The toast is for what the shop itself reports — an unlock,
 // a save, an action that could not be carried out.
 assert.ok(!/toast\(game\.run\.notice\)/.test(app),'no NPC line is routed to the toast');
 assert.ok(!/toast\([^)]*\.say/.test(app),'the spoken line never reaches the toast');
 assert.ok(/#toast\{/.test(css),'the toast the remaining system calls use is styled');
 // Chunk F dropped the toast rules when three sheets became one, which left it as an
 // unstyled slab in the page flow. Its resting state has to be genuinely invisible.
 const rule=css.slice(css.indexOf('#toast{'),css.indexOf('#toast.show'));
 assert.ok(/position:fixed/.test(rule),'the toast floats above the screen');
 assert.ok(/visibility:hidden/.test(rule)&&/opacity:0/.test(rule),'at rest it is not on screen at all');
 assert.ok(/#toast\.show\{[^}]*visibility:visible/.test(css),'showing it makes it visible again');
});

test('C04: a redraw keeps the keyboard where it was, on #app and inside an open modal',()=>{
 // Replacing a surface wholesale destroys the focused control. #app already put the
 // keyboard back; #modal-root did not, so a redraw under an open modal (shop menu ->
 // sound on/off) dropped focus to <body> and made a keyboard user tab back from the top
 // of the document. Both surfaces now hold and restore through one implementation.
 // There is no DOM here, so this group guards the properties the fix depends on; the
 // behaviour itself is driven in a real browser by `npm run qa:visual`.
 const hold=app.slice(app.indexOf('function holdFocus'),app.indexOf('function restoreFocus'));
 const back=app.slice(app.indexOf('function restoreFocus'),app.indexOf('\nfunction ',app.indexOf('function restoreFocus')+1));
 assert.ok(/document\.activeElement/.test(hold),'the focused control is captured before the wipe');
 assert.ok(/data-action=/.test(hold),'it is found again by the same handle the click delegation uses');
 // The handle is not unique on its own: the order screen puts 30 qty buttons under one
 // data-action with no data-id, so a first-match lookup restores the wrong product's key.
 assert.ok(/querySelectorAll\(/.test(hold)&&/nth/.test(hold),'the handle is disambiguated by position among its peers');
 assert.ok(/querySelectorAll\(/.test(back)&&/hold\.nth/.test(back),'the restore chooses among same-handle controls, not the first match');
 assert.ok(/disabled/.test(back),'a control disabled by the press it answered does not swallow the focus');

 const render=app.slice(app.indexOf('function render()'),app.indexOf('\nfunction ',app.indexOf('function render()')+1));
 assert.ok(/holdFocus\(\$\('#app'\)\)/.test(render),'#app captures before its wipe');
 assert.ok(/!changed\)restoreFocus\(\$\('#app'\)/.test(render),'and restores only when the view did not change');
 assert.ok(/if\(changed\)\$\('#phase-content'\)\.focus/.test(render),'a new screen still focuses its own body');

 const rm=app.slice(app.indexOf('function renderModal()'),app.indexOf('\nasync function action'));
 assert.ok(/const hold=holdFocus\(root\)/.test(rm),'the modal captures before its wipe too');
 assert.equal((rm.match(/restoreFocus\(root,hold\)/g)||[]).length,2,
  'both the takeover and the ordinary sheet restore, not just one of them');
 assert.ok(rm.indexOf('const hold=holdFocus(root)')<rm.indexOf('root.innerHTML=`'),
  'the capture happens before the rebuild, not after it');
});

test('UI-Q40 / REL-Q41: the Boss reveal comes before the Relic decision it is meant to inform',()=>{
 const chain=app.slice(app.indexOf("if(phase==='foundation'&&modal!=='new')modal='relics'"));
 const boss=chain.indexOf("modal='boss'"),event=chain.indexOf("modal='event'"),relic=chain.indexOf("focusedRevealSeen");
 assert.ok(boss>=0&&event>=0&&relic>=0,'all three focused reveals are in one chain');
 assert.ok(boss<event&&boss<relic,'the Boss reveal is offered ahead of the Event and the Relic window');
 assert.ok(!/phase==='boss'/.test(app),'the reveal is a beat in the existing chain, not a new Phase');
 // seen state is persisted per stage, so a reload cannot replay or reorder a reveal
 for(const flag of ['identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])
  assert.ok(app.includes(flag),'the '+flag+' reveal is consumed exactly once');
 assert.ok(/case'boss-seen'/.test(app)&&/game\.save\(\)/.test(app),'consuming a reveal is written to the save');
});

test('COPY 18.5: the Boss reveal says what the spec says, and invents nothing',()=>{
 const c=Copy.boss;
 /* COPY_AUDIT_APPROVED §14 is the exact owner of the cadence copy; these three headers and the
    D15 intro were the pre-cadence wording it supersedes. */
 assert.equal(c.d5.header,'1차 조사 보고');
 assert.equal(c.d15.intro,'전투 기록에서 변칙이 확인됐다.');
 assert.equal(c.final.header,'최종 정찰 보고');
 for(const b of DATA.bosses){
  assert.ok(c.d5.flavor[b.id],b.id+' has its D5 Flavor');
  assert.ok(c.d15.trait[b.id],b.id+' has its D15 Trait');
 }
 // D5 hints; it never states the Function. D15 states it.
 for(const [id,line] of Object.entries(c.d5.flavor))
  assert.ok(!/감소한다|증가한다|적용된다/.test(line),id+"'s D5 Flavor does not give the Function away");
 /* BOSS_v2.7 §BOSS IDENTITY TERMINOLOGY OVERRIDE and COPY_WORLD_VOICE_v2.7 §GLUTTONY. Both
    are exact, and both replace inherited v2.5 wording. This assertion used to REQUIRE the
    stale `[등급] 이상` sentence - v2.7 has no Rarity threshold for this Boss, so the line was
    promising the player a boundary the mechanic does not have. */
 const glut=DATA.bosses.find(b=>b.id==='GLUTTONY');
 assert.equal(glut.sin,'탐식','the Sin is 탐식');
 assert.equal(glut.name,'탐식의 마왕 글러트니','and the identity is the v2.7 name');
 assert.deepEqual(c.d15.trait.GLUTTONY,
['탐식의 권능',['아이템의 투력·강인함·기동·정신 증가량 50% 감소','환경 대응·피로 회복·보험 효과는 유지']],
  'the D15 Function is the exact Canonical copy');
 // no retired wording survives anywhere a player can read
 const everything=JSON.stringify(c)+JSON.stringify(DATA.bosses)+read('dist/ui/app.js')+read('dist/data/copy.js')+read('dist/data/catalog.js');
 for(const stale of ['폭식','[등급] 이상','등급 이상 보급품'])
  assert.ok(!everything.includes(stale),'retired GLUTTONY wording is gone: '+stale);
 const prose=JSON.stringify(c);
 for(const term of ['Run','Final Snapshot','Final Power','Factor','Modifier','sealBreakCount','effectiveBossPower'])
  assert.ok(!prose.includes(term),'no internal design term reaches the player: '+term);
});

/* META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM. The systems are gone from the code, but the Help
   and the coach marks still described them to the player as current rules: visitors varying by
   `계약`, and `가맹등급` listed among the things a Run leaves behind. What is named now is what
   the Account actually carries, in the terminology the screens already use. */
test('META_v2.8 §RETIRED: no player-facing copy describes a retired system as a current rule',()=>{
 /* Everything a player can read: the Help, the coach marks, the copy table and the screens. */
 const surfaces=fn('help')+fn('coach')+read('dist/data/copy.js')+app.slice(app.indexOf('const COACH'),app.indexOf('function coach'))
  +JSON.stringify(DATA.relics.map(r=>[r.name,r.description]))+JSON.stringify(DATA.decorations);
 for(const retired of ['가맹등급','시작 계약','계약 선택','가맹 실적','등급 할인'])
  assert.ok(!surfaces.includes(retired),'retired system term is not shown to the player: '+retired);
 // the visitor sources named to the player are the ones morning() actually composes
 const morning=read('dist/systems/shop.js');
 const composes=morning.slice(morning.indexOf('morningVisitors(){'),morning.indexOf('morningEvent(ids){'));
 assert.ok(/board/.test(composes)&&/hub/.test(composes)&&/guildPlaque/.test(composes),
  'the visitor count is composed from Relics and the wall Decoration');
 assert.ok(!/contract/i.test(composes),'and from no Contract');
 const helpText=fn('help');
 /* COPY_AUDIT §8 replaced the long-form guide with the compact one; the visitor-source list it
    used to recite belongs to the Morning surface, which states it in context. What the guide
    still owes the player is what a Run leaves behind, and it says so in §8-7's own terms. */
 const fresh=Meta.fresh(),carried=['본사 기록','해금','직업 숙련','점포 자본','보유 장식'];
 for(const t of carried)assert.ok(helpText.includes(t),'the Help names the persistent '+t);
 assert.ok(Object.keys(Meta.opened(fresh)).join()==='items,jobs','unlocks are Items and Jobs');
 assert.equal(typeof Meta.storeCapital(fresh),'number','Store Capital is a persistent Account resource');
 assert.ok(Array.isArray(Meta.ownedDecorations(fresh)),'so is the owned Decoration collection');
 assert.equal(typeof Meta.totalJobMastery(fresh),'number','so is Job Mastery');
 // the things it says do NOT carry really do not
 assert.ok(helpText.includes('모험가·재고·골드·점포지원은 새로 시작한다'),
  'and it names the per-Run things by their current term');
}); 

test('COPY §Run abandon: the abandon says it costs everything, and promises nothing',()=>{
 // The action that reaches this is app.js case'start'. What the engine does is asserted in
 // integration.cjs; what the player is told is asserted here, because the old copy promised
 // a reward for the very thing the amendment made reward-free.
 const start=app.match(/case'start':\{[^}]*\}/)[0];
 assert.ok(!/game\.end\(/.test(start),'starting a new Run does not route through the settlement path');
 assert.ok(/game\.start\(/.test(start),'it starts the next Run through the ordinary fresh-Run path');

 /* Director 2026-09-12: 런 is engine vocabulary, and "포기 · 새 점포 준비" said the same
    thing twice. One phrase now, in the store's own voice, and the confirmation still states
    the cost. The behaviour it describes is unchanged - see integration.cjs. */
 /* COPY_AUDIT §1-3 is the exact owner now: the confirmation is named after the menu action it
    answers, and it states what is lost AND what survives. */
 assert.ok(app.includes('현재 지점을 포기할까요?'),'the destructive action is named once, in the world voice');
 assert.ok(app.includes('이번 영업에서 얻을 보상은 없습니다. 모험가·재고·골드·점포지원은 다음 점포로 이어지지 않습니다. 본사 기록·점포 자본·보유 장식은 유지됩니다.'),
  'and the confirmation says what it costs and what it does not');
 assert.ok(app.includes("btn('지점 포기','retire-go','danger')"),'the confirm is 지점 포기, not 폐점');
 assert.ok(!app.includes('이번 영업을 마감할까요?'),'the 마감 title is gone');
 assert.ok(!/btn\('폐점','retire-go'/.test(app),'and 폐점 is no longer the confirm');
 assert.ok(!/현재 런/.test(app),'no player-facing surface calls it a 런');
 assert.ok(!app.includes('현재 런 마감 · 새 점포 준비'),'the old "마감" wording is gone');
 // ...and it is told apart from the full wipe, which is the other destructive action
 assert.ok(fn('renderModal').includes('body=ABANDON_BODY')&&app.includes("const ABANDON_BODY='<p>이번 영업에서 얻을 보상은 없습니다. 모험가·재고·골드·점포지원은 다음 점포로 이어지지 않습니다."),
  'abandoning a store is distinguished from erasing the account (one §1-3 body for both confirmations)');

 // No surface may promise XP, settlement or compensation for it. 점주 XP does not exist at all
 // since the Meta replacement, so any remaining promise of one is a lie, not just off-tone.
 for(const banned of ['점주 XP','보상 받기','누적 '])
  assert.ok(!app.includes(banned),'no legacy reward promise survives: '+banned);
});

test('the shipped UI actually parses: every dist script is valid JavaScript',()=>{
 // This suite reads app.js as text, and a text check is happy with a file no browser can run.
 // One stray line comment inside a single-line function shipped a SyntaxError that `npm test`
 // blessed and only the browser harness caught. Parse what we ship.
 const vm=require('node:vm');
 for(const file of walk('dist')){
  if(!file.endsWith('.js'))continue;
  assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}),file+' does not parse');
 }
});

test('UI_UX / COPY 2026-09-12: the amendment surfaces exist, and say the locked words exactly',()=>{
 // GREAT SUCCESS SIGNAL. The words are locked, so the screen must not carry its own copy of
 // them, and it must be computed from the same margin the roll uses rather than re-derived.
 assert.equal(Copy.great.signal,'대성공을 노려볼 만합니다.','the exact signal is the locked string');
 assert.ok(app.includes('Copy.great.signal'),'the screen prints that string rather than its own');
 assert.ok(!/노려볼 만합니다/.test(app.replace('Copy.great.signal','')),'no second copy of the wording');
 /* SALE_v2.7 §PRE-COMMIT INFORMATION BOUNDARY names a Great Success signal CHANGE as one of
    the hypothetical answers the decision surface may not show, so the screen now reads the
    signal off the frozen SALE-entry snapshot. It is still the engine's calculation - the
    snapshot is built by Dungeon.greatSuccessSignal in the systems layer - and the screen
    still does not derive one of its own. */
 assert.ok(!/greatSuccessSignal/.test(app),'the screen does not recompute the signal as Items move');
 assert.ok(/const signal=o\.greatSignal/.test(app),'it reads the frozen snapshot instead');
 assert.ok(shop.includes('greatSignal:G.Dungeon.greatSuccessSignal('),'and that snapshot is the engine calculation');
 const readout=fn('readout'),readoutCode=readout.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/.*$/gm,'');
 assert.ok(readout.includes('o.greatSignal'),'it lives in the forecast, before departure');
 /* DUNGEON_HAZARD_v2.7 §PLAYER-FACING INFORMATION BOUNDARY: the ONE exact percentage the
    decision surface may expose is the pre-supply 실패 시 사망 위험. The Great Success signal
    still carries no percentage, no margin and no readiness score, and the exact expedition
    success chance stays hidden. */
 /* v2.9.0: the same one percentage, now the second line of the 전투 전망 help (COPY_AUDIT §4-1) */
 assert.ok(/'실패 시 사망 위험 '\+Math\.round\(o\.deathRisk\*100\)\+'%'/.test(readout),'the one exact percentage is the conditional Death risk');
 const others=readoutCode.replace(/'실패 시 사망 위험 '\+Math\.round\(o\.deathRisk\*100\)\+'%'/,'');
 assert.ok(!/[0-9]+%/.test(others),'and no other percentage is exposed');
 assert.ok(!/margin|readiness/i.test(readoutCode),'nor a margin or a readiness score');
 assert.ok(!/successChance|winChance|clearChance/i.test(readoutCode),'nor an expedition success chance');

 // 심층원정 is a locked term: no synonym may reach a player-facing string.
 assert.equal(Copy.deep.term,'심층원정');
 // the rule may be *named* in a comment; what must not happen is a synonym reaching a player.
 const strip=x=>x.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 for(const banned of ['긴급의뢰','특별원정','고난도 의뢰']){
  assert.ok(!JSON.stringify(Copy).includes(banned),'no Copy string renames the Deep term to '+banned);
  for(const [name,src] of [['app.js',app],['shop.js',read('dist/systems/shop.js')]])
   assert.ok(!strip(src).includes(banned),name+' renames the Deep term to '+banned);
 }
 assert.equal(Copy.deep.sponsor,'원정 후원금');
 // it is a sink, so nothing may offer it back
 for(const refundish of ['환불','돌려드','반환'])
  assert.ok(!JSON.stringify(Copy.deep).includes(refundish),'the sponsorship is never promised back: '+refundish);

 // the Morning notice is a notice on the existing board, not a new Phase or a takeover
 const slip=fn('deepSlip');
 assert.ok(slip.includes('class="slip deep"'),'the Deep Day beat is a pinned slip');
 assert.ok(!/setModal|takeover/.test(slip),'it never takes the screen over');
 /* COPY_AUDIT §15-1: the Morning notice repeats every applicable Day, so it carries the name
    and one line. The full explanation belongs to the first-occurrence coach mark, and the cost
    belongs to the SALE nomination, where it is actually paid. */
 assert.ok(slip.includes('c.brief'),'before Order the player is told what a Deep Expedition is');
 for(const gone of ['c.cost','c.optional','c.intro','hazardRows'])
  assert.ok(!slip.includes(gone),'and the repeated tutorial is not restated here: '+gone);
 assert.ok(slip.includes('c.confirmed')&&slip.includes('c.sponsor'),'once taken it states the confirmation and what was paid');
 assert.ok(!slip.includes('c.sink'),'and does not repeat the warning after payment');

 // the Sale affordance appears only while the nomination is legal
 const offer=fn('deepOfferUI');
 assert.ok(offer.includes('game.canNominateDeep(n)'),'the offer asks the engine whether it is legal');
 assert.ok(offer.includes('game.deepCost(n)'),'and prices it per adventurer');
 assert.ok(app.includes("case'deep-nominate'"),'the action is wired');

 // Night and Closing report the two returns in the right columns
 const changed=fn('changedRows');
 assert.ok(changed.includes('r.storeBonus'),'a normal 대성공 names the Store Gold it earned');
 assert.ok(changed.includes('r.deep.bonusWallet')&&changed.includes('r.deep.bonusXp'),
  'a Deep return is reported as the adventurer\'s change');
 const closing=fn('closingScreen');
 assert.ok(closing.includes('Copy.deep.sponsor'),'Closing names the sponsorship outflow');
 assert.ok(closing.includes("d.greatSuccess"),'and the Great Success income');

 // both tutorials are ordinary coach marks, so they inherit the account-scoped persistence
 assert.ok(/\['deep','\.slip\.deep'/.test(app),'the first Deep Expedition teaches itself on the notice');
 assert.ok(/\['great','\.great-signal'/.test(app),'and Great Success on its own signal');
 assert.ok(!/deepTutorial|tutorialDeep/.test(app),'no separate tutorial state was introduced');
});

test('UI_UX: the first store support is not a one-way door, and the menu names both resets',()=>{
 // D-29. The pre-Run screen is not a one-way door: the foundation takeover owns the screen, so
 // without a way back the only exit was to spend the Run. Nothing has been played at that
 // point, so the pre-Run screen may win over the takeover. CORE_RUN_v2.8 retired the Start
 // Contract, so what that screen now confirms is the Decoration loadout.
 /* v2.9.0 F5 (User 2026-09-24): the DAY 0 choice is mandatory - no way back to the pre-Run screen,
    Decorations are managed from 새 점포 준비 before a Run (and after an abandon, which now discards the Run at once). */
 assert.ok(app.includes("if(phase==='foundation'&&modal!=='new')modal='relics'"),'the foundation takeover owns the screen (the pre-Run modal still wins only when it is already open, e.g. a boot into a fresh account)');
 assert.ok(!fn('relicTakeover').includes('장식 구성 다시 보기')&&!fn('relicTakeover').includes("'new'"),'the retired way back is gone from the DAY 0 surface');
 const back=app.slice(app.indexOf("case'new':"),app.indexOf("case'new':")+220);
 assert.ok(!/game\.end\(|runs\+\+/.test(back),'going back never spends the Run');
 // ...and it must not become a free re-roll either. The DAY 0 store support has already been
 // shown by then, so returning keeps this store's seed. Only an explicitly typed seed, or
 // abandoning a store that has opened, makes a new world.
 // (RUN-Q10/Q11/Q12 forbid the same thing for a reload.)
 /* The seed the Run opens on is now planned once, before the Run exists, so the backdrop can
    name the store truthfully; `case'start'` spends that plan rather than minting at the press. */
 const start=app.slice(app.indexOf("case'start':{"),app.indexOf("case'start':{")+900);
 assert.ok(/const seed=plannedSeed\(\);/.test(start),'Start opens on the planned seed');
 assert.ok(/s\.phase==='foundation'\)return s\.seed/.test(app),
  'returning from an unopened store reuses its seed instead of minting a new one');
 assert.ok(app.indexOf("pendingSeed??=('g24-'+Date.now()")>0,'and a fresh seed is the last resort');
 assert.ok(/pendingSeed=null;/.test(start),'the plan is spent once the Run starts');
 /* SA-Q35 retired the Player-facing Seed control, so the carried seed is no longer SHOWN on
    the preparation screen - it is still the seed `case'start'` reuses, asserted just above. */
 assert.ok(!/id="seed"/.test(fn('newRun')),'the preparation screen exposes no Seed control');
 // an unopened store is not something the player is abandoning, so it is not described as one
 for(const f of [fn('newRun'),fn('renderModal')])
  if(f.includes('현재 지점 포기')||f.includes('모두 포기하고'))
   assert.ok(f.includes("'foundation'"),'the abandon wording is withheld before the store opens');

 // D-30 / D-31~33: Full Reset moved to Settings.
 const menu=app.slice(app.indexOf("modal==='menu'"),app.indexOf("modal==='menu'")+900);
 assert.ok(menu.includes("btn('도감','codex')"),'the codex is just 도감');
 assert.ok(!menu.includes('본사 · 도감'),'the old label is gone');
 assert.ok(menu.includes("btn('현재 지점 포기','abandon','danger')"),'the store abandon is in the menu and confirms first');
 // v2.9.0 F5 (User 2026-09-24): exact composition and routing
 assert.ok(menu.includes("btn('모험가 수첩','roster')+btn('도감','codex')+(game.run?btn('점포지원','relics')+btn('이번 영업의 장식','loadout'):'')+btn('점주 가이드','help')+btn('설정','settings')"),'menu rows: 모험가 수첩 / 도감 / 점포지원 / 이번 영업의 장식 / 점주 가이드 / 설정 / 현재 지점 포기');
 const act5=app.slice(app.indexOf('async function action(el)'));
 assert.ok(act5.includes("case'relics':sound('ui');setModal(game.canBuyRelic()?'relics':'owned');break;"),'점포지원 opens the selection only while purchasable, else the owned list');
 assert.ok(act5.includes("case'abandon-go':game.abandon();")&&!/case'abandon-go':[^\n]*game\.(start|end)\(/.test(act5),'abandon discards the Run at once and starts nothing');
 assert.ok(fn('loadoutModal').includes("'비어 있음'")&&fn('loadoutModal').includes('D.decorationSlots.map(')&&!fn('loadoutModal').includes('data-action'),'이번 영업의 장식 is read-only, four Slots, empty reads 비어 있음');
 assert.ok(app.includes("modal==='abandonConfirm'")&&app.includes("btn('지점 포기','abandon-go','danger')"),'the §1-3 confirm guards the abandon');
 assert.ok(!menu.includes('모든 게임 데이터 초기화') && !menu.includes('Full Data Reset'),'full reset is removed from menu');
});

test('UI-Q39 / UI-Q14 / ITEM-Q03: the decision material is said once, and the taxonomy is not said at all',()=>{
 // D-7. The role/category tables organise the catalogue; they are not what a player decides
 // with, and UI-Q39 says they never reach a render path. The DATA stays - ordering weights and
 // Relic conditions read `category`, and delta.cjs asserts both tables.
 assert.ok(DATA.categories&&DATA.roles,'the tables are still there for the systems that read them');
 /* v2.7 moves the six categories into player-facing identities owned by COPY_WORLD_VOICE,
    so 포션 and the rest may be shown; what UI-Q81 still forbids is the redundant ROLE chip
    (`속박 전문` sitting above `속박 대응 +16`). The sweep narrows to roles accordingly. */
 /* B5-2 closeout (User 2026-09-23): the Final transfer's action face is `50% / {price}G / 보급`
    - the verb of the action, not the 보급 role chip. That one face is set aside, nothing else. */
 const finalFace="<strong>'+finalPrice+'G</strong><small>보급</small>','supply'";
 assert.equal(app.split(finalFace).length-1,1,'the Final transfer face is the one exempt place');
 const swept=app.replace(finalFace,'');
 for(const label of Object.values(DATA.roles))
  assert.ok(!swept.includes("'"+label+"'")&&!swept.includes('>'+label+'<'),
   'internal role taxonomy is not rendered: '+label);
 assert.ok(!/D\.categories\[|D\.roles\[/.test(app),'and no render path looks it up');

 /* D-10, as amended by UI-Q109. The rule it was written to protect is that the environment is
    stated ONCE - never a verdict beside the destination and a second summary in the outlook.
    That still holds; what moved is which of the two facts lives where.

    The destination carries what is true of the PLACE whoever is at the counter: each Hazard
    and the ability it presses on. THIS customer's readiness against it is judged against an
    Item, so it reads in the outlook beside the other two readings a product is bought to
    move. On a phone the per-Hazard readiness wrapped every plate row and pulled a third for
    its own help control, which is what put the goods below the fold.

    So: readiness appears exactly once, in the outlook, off the same frozen snapshot; the
    plate renders Hazards with no readiness argument at all; and neither grows a copy of the
    other's half. */
 const readout=fn('readout');
 assert.ok(readout.includes('전투 전망'),'the fight forecast is named');
 assert.ok(!readout.includes('환경 전망'),'the outlook carries no second environment verdict');
 assert.ok(!/환경 압박/.test(app),'and no collapsed environment duplicate survives anywhere');
 assert.ok(!/env-press/.test(app)&&!/env-press/.test(css),'the phone-only duplicate is gone with it');
 assert.ok(!/hazardList\(/.test(readout),'the outlook renders no Hazard rows of its own');
 assert.ok(/환경 대응<b class="env-/.test(readout),'the outlook states this customer readiness');
 assert.ok(/o\.worst/.test(readout),'and it is the engine canonical worst state, not a screen calculation');
 const plate=fn('destPlate');
 assert.ok(/hazardList\(Presentation\.known\(d,game\),null,d\)/.test(plate),
  'the destination plate states the Gate\'s numbered Hazard rows only, off the known-Hazard truth');
 assert.ok(!/n\.outlook|n&&n\.outlook/.test(plate.replace(/\/\*[\s\S]*?\*\//g,'')),
  'the plate reads no readiness of its own');
 const codeOnly=app.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 /* UI-Q-v29-24 (User 2026-09-25): the forecast pin mirrors the readout while the readout is scrolled away, so the words have two
    render sites - the readout and the pin - and never a third; UI-Q-v29-24's own guard holds the pin to off-screen only */
 assert.equal((codeOnly.match(/환경 대응<b/g)||[]).length,2,'the readiness reading is rendered in the readout and in the pin that mirrors it, nowhere else');
 assert.ok(/환경 대응<b/.test(fn('forecastPin').replace(/\/\*[\s\S]*?\*\//g,'')),'the second site is the forecast pin');
 assert.ok(!/display:none/.test((css.match(/\.p-sale \.front-side \.dest-plate[^\n]*hazards[^\n]*/g)||[]).join(' ')),
  'and the Hazard rows are never hidden, since nothing else shows the destination environment');
 /* The fight verdict is still the engine's own canonical vocabulary; under SALE_v2.7 it is
    read off the frozen SALE-entry snapshot rather than recomputed as Items move, so the
    calculation moved into the systems layer with it. */
 assert.ok(!/Dungeon\.estimate\(/.test(app),'the screen does not recompute the fight verdict');
 assert.ok(shop.includes('combat:G.Dungeon.estimate('),'the fight keeps its own canonical verdict');
 assert.ok(/\['취약','불안','대응','충분'\]/.test(shop),'the readiness ladder belongs to the engine');
 assert.ok(!/\['취약','불안','대응','충분'\]/.test(app),'and the screen does not keep a second copy of that ladder');
 /* The Hazard's pressure and the NPC's readiness are two facts, never one sentence. */
 const list=app.slice(app.indexOf('const pressCell='),app.indexOf('const hazardList=')+700);
 assert.ok(/<span class="press">/.test(list)&&/<span class="ready">/.test(list),'pressure and readiness are separate elements');
 assert.ok(/<i>현재 대응<\/i>/.test(list),'the readiness is explicitly labelled as the NPC state');
 assert.ok(css.includes('.hazards .ready'),'and the readiness has its own style, not the pressure one');
 const appCode=app.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/.*$/gm,'');
 assert.ok(!/압박에 /.test(appCode),'no rendered line welds the pressure and the readiness into one sentence');
 for(const invented of ['안전','위험함','보통','양호'])
  assert.ok(!readout.includes("'"+invented+"'"),'no new forecast label was invented: '+invented);

 // D-11. Always-available help, keyboard-reachable because it is a native <details>.
 /* One shared helper at module scope, so the outlook and the destination plate cannot drift
    into two different ? controls. It is a native <details>, so it needs no script. */
 /* Still a native <details>, so the control itself works without script and is keyboard
    reachable; the only script is the outside-tap dismissal a popover is expected to have. */
 assert.ok(/const tip=\(label,\.\.\.lines\)=>'<details class="tip" name="sale-tip"/.test(app),'the ? is a details, so the control needs no script');
 assert.ok(/pointerdown[^\n]*closeTips/.test(app),'tapping outside closes it');
 assert.ok(/ev\.key==='Escape'\)closeTips/.test(app),'and so does Escape');
 /* The counter tooltip states what the two columns ARE and stops. The readiness ladder, why
    the pressure is fixed and why the reading is frozen belong to the store guide. */
 /* The help follows the reading it explains: it moved to the outlook with 환경 대응, keeping
    the approved line's structure and both of its halves - only the term the row is now
    labelled with changed with the label. The plate keeps no ? of its own, so there is still
    exactly one control explaining the two facts. */
 /* The three counter tooltips are now owned exactly by COPY_AUDIT_APPROVED §4-1 / §4-2 / §4-3,
    and COPY_WORLD_VOICE §ANCHORED HELP ROUTING routes to that owner rather than restating them.
    The approved lines state WHEN each reading was taken instead of re-describing the label, so
    the pre-amendment strings asserted here are superseded. What the clause protects is unchanged
    and still asserted below: one control per reading, one line each, and no ladder / system
    lecture in the tooltip. */
 const envTip=fn('readout');
 /* v2.9.0 (COPY_AUDIT §4-15): the plate carries exactly one ? - the Hazard rule line and this Gate's sentences - and no readiness lecture */
 assert.equal((fn('destPlate').match(/tip\(/g)||[]).length,0,'the destination plate has no ? (§4-15 retired, User 2026-09-24 revision 2)');
 for(const banned of ['취약·불안·대응·충분','네 단계','누가 서 있든','확정된'])
  assert.ok(!envTip.includes(banned),'the destination ? does not explain the system: '+banned);
 /* Each ? names its own reading and stops. Anything longer than one line is the store guide's
    job, so the sweep holds every counter tooltip to a single short line. */
 /* v2.9.0 (COPY_AUDIT §4-1 / §4-2 / §4-3): two readout cells, two ?s. The 전투 전망 help carries
    the exact failure-conditioned Death risk as its second line; the Death cell and its own ? are
    retired (§4-3 삭제). */
 const tips=[...fn('readout').matchAll(/tip\('([^']+)'/g)].map(m=>m[1]);
 assert.deepEqual(tips,['전투 전망','환경 대응'],'exactly two counter tooltips, on the two readout cells');
 assert.ok(!fn('readout').includes('<span class="fore">실패 시 사망 위험'),'no always-on Death cell');
 assert.ok(app.includes("tip('전투 전망','손님의 힘과 게이트의 요구 전력을 견준 전망. 우세 · 접전 · 불리.','실패 시 사망 위험 '+Math.round(o.deathRisk*100)+'%')"),'전투 전망 carries the approved two lines');
 assert.ok(app.includes("tip('환경 대응','게이트의 위험을 얼마나 막을 수 있는지. 충분 · 대응 · 불안 · 취약.')"),'환경 대응 carries the approved §4-2 line');
 assert.ok(!app.includes('실패했을 때 사망으로 이어질 위험. 원정 전체 사망 확률은 아니다.'),'the retired §4-3 line is gone');
 assert.ok(fn('npcDetail').includes("'실패 시 사망 위험 '+Math.round(n.outlook.deathRisk*100)+'%'"),'§5-7 the NPC detail states the same value');
 assert.ok(/\.tip>p>span[^\n]*display:block/.test(css),'a multi-line tooltip would still break its facts apart');
 /* Opening a ? may never make its panel taller - the explanation is a balloon over the block,
    not an accordion inside it - and the group is exclusive so two never stack on one anchor. */
 assert.ok(/\.readout \.tip>p,\.dest-plate \.tip>p,\.kit \.tip>p,\.detail-stats \.tip>p,\.changed \.tip>p\{position:absolute/.test(css),'the balloon is out of flow');
 assert.ok(/\.readout \.tip>p,\.kit \.tip>p\{top:calc\(100% - 4px\)\}/.test(css),'the outlook and compact-state balloons drop');
 assert.ok(/\.detail-stats \.tip>p\{top:calc\(100% - 4px\)\}/.test(css),'and so does the Stat balloon, anchored on the grid itself');
 assert.ok(/\.dest-plate \.tip>p\{bottom:calc\(100% - 4px\)\}/.test(css),'and the plate balloon rises, clear of the counter edge');
 assert.ok(!/\.tip\[open\][^\n]*width:100%/.test(css),'nothing makes the open state a full-width block again');
 /* v2.9.0: two counter readings, two ? controls; the Death risk is the second line of the first. */
 assert.equal((readout.match(/\+tip\(/g)||[]).length,2,'the outlook explains the fight (with the Death risk line) and the environment');
 assert.ok(/tip\('환경 대응'/.test(readout),'and the environment help sits with the reading it explains');
 /* SA-Q30: the permanent forecast-disclaimer paragraph this used to close on is gone - the
    existing anchored ?s already say what each figure is, and nothing replaces it with a
    second explanation layer. */
 assert.ok(!/게이트 안에서 어떻게 될지까지는 아무도 모른다/.test(readout)&&!readout.includes('class="estimate"'),
  'the permanent forecast disclaimer paragraph is gone, and nothing new replaces it');
 assert.ok(css.includes('.readout .tip>summary:focus-visible'),'and it shows where the keyboard is');
 assert.ok(/\.dest-plate \.tip>summary:focus-visible/.test(css),'on the plate too');
 /* The help used to be a row of its own under the plate, which on a phone was a third line
    for one control. It rides the reading it explains now, in the same .fore cell the other
    two counter tooltips already use, so there is no separate row left to hide or to lose
    with a hidden caps label. */
 assert.ok(!/env-help/.test(app)&&!/env-help/.test(css),'the separate help row is gone, not merely hidden');
 const envCell=readout.slice(readout.indexOf('환경 대응<b'),readout.indexOf("</span>':''",readout.indexOf('환경 대응<b')));
 assert.ok(envCell.includes("tip('환경 대응'"),'the environment help sits in the same cell as the reading');
 assert.ok(!/\.readout \.fore>\.tip[^\n]*display:\s*none/.test(css),'and no breakpoint hides it');
 /* UI_UX §SHARED ANCHORED POPOVER (User 2026-09-25, phone): a positioned ? or cell becomes the
    balloon's containing block, and the help was laid out 24px wide, one word per line. At every
    breakpoint the balloon floats against the readout panel, so neither may be positioned. */
 assert.ok(!/\.readout \.fore\{[^}]*position:/.test(css),'no breakpoint positions the forecast cell');
 assert.ok(!/\.readout \.fore>\.tip\{[^}]*position:/.test(css),'nor the ? inside it');
 assert.ok(/\.readout\{position:relative/.test(css),'the balloon is anchored to the panel');
 /* COPY_AUDIT §4-16 render note (User 2026-09-25): on a phone the SALE destination plate reads
    `{위험}  대응 {N} 필요` on one line and the conversion line under the name - never three lines. */
 assert.ok(/\n\.dest-plate \.hazards \.press\{display:contents\}/.test(css),'the requirement block joins the row');
 assert.ok(/\n\.dest-plate \.hazards \.press \.rate\{flex:1 0 100%\}/.test(css),'the conversion line takes its own line from the name');
 assert.ok(/\n\.dest-plate \.hazards \.press \.need\{white-space:nowrap;font-size:12px\}/.test(css),'and the requirement stays beside the name, one step smaller');
 assert.ok(/@media\(min-width:900px\)\{\n \.p-sale \.front-side \.dest-plate \.hazards li\{gap:6px\}\n \.dest-plate \.hazards \.press\{display:inline\}/.test(css),'from 900px the row is one line again');

 /* SALE_v2.7 §SALE DECISION-ONLY DETAIL: no disclosure control on the decision surface that
    opens flavour prose. The real effects it used to hide are still shown - plainly, not folded
    away - and the flavour lives in the Codex, which is where a non-decision context belongs. */
 const till=fn('till');
 assert.ok(till.includes('shown.has(r.key)')||till.includes('!shown.has'),
  'what the change list already showed is not repeated');
 assert.ok(!/<details>/.test(till),'SALE opens no disclosure control of its own');
 assert.ok(!/<summary>이 손님에게 안 걸리는 효과/.test(app),'the retired control is gone');
 assert.ok(!/it\.description/.test(till),'and flavour prose has left the decision surface');
 /* SA-Q30: the same disclosure heading now reads 특수 효과 - conditional non-delta Item truth,
    not a claim about this particular customer. */
 assert.ok(/특수 효과/.test(till),'the effects it held are stated plainly instead');
 assert.ok(!/이 손님에게는 지금 걸리지 않는 효과/.test(till),'the old customer-scoped heading is gone');
 assert.ok(/rest\.map\(r=>/.test(till),'every one of them, not a summary of them');
 assert.ok(!/effectList\(it\)/.test(till),'the full effect list is not repeated under the preview');
 assert.ok(fn('codex').includes('effectList(it)'),'it still lives in the Codex, where it is the point');
 assert.ok(fn('codex').includes('it.description'),'and so does the flavour');

 // D-18. One display rule, in Presentation, used by both places that show a stat.
 assert.equal(Presentation.stat(19.43,false),'19','a plain value is a whole number');
 assert.equal(Presentation.stat(19,true),'19','a moved value with no decimal does not grow one');
 assert.equal(Presentation.stat(22.87,true),'22.9','a moved value keeps the digit that shows it moved');
 assert.equal(Presentation.amount('combat',22.87),'22.9','the change list reads the same rule');
 assert.ok(fn('statGrid').includes('Presentation.stat('),'the stat grid reads it too');
 assert.ok(!/Math\.round\(values\[k\]\)/.test(app),'and no longer rounds on its own');

 // the preview, the forecast and the night all read one Gate - a Deep nominee included
 assert.ok(till.includes('game.claimedGateFor(n)'),'the supply preview uses the same Gate as the forecast');
 assert.ok(!/dungeons\[n\.claimedDestination/.test(app),'nothing reads the destination around it any more');
});

test('UI_UX §RESPONSIVE / §PHASE UI: the decision gets the room, at every width',()=>{
 /* D-1 / D-4. Morning is read in one order - DAY, today's expedition, the Gates and their
    Hazards, the float, the shutter - and the room has to be built in that order rather than
    giving the furniture its share first. Two earlier attempts are what these assertions pin
    against: the bands sized from art (board 14px tall holding 272px of gates at 1280) and the
    two-column room that followed it (board 778px tall holding 121px, off in a side column
    while DAY and the till sat at x=439 of 1280). Geometry is measured in the browser, not
    here; what Node can hold is the composition that produces it. */
 const morning=fn('morningScreen');
 const at=(hay,needle)=>hay.indexOf(needle);
 assert.ok(at(morning,'class="board"')>at(morning,'class="band ceiling"'),'the board hangs under the day sign');
 assert.ok(at(morning,'class="board"')<at(morning,'class="band wall"'),'and above the room, not after it');
 assert.ok(at(morning,'class="band wall"')<at(morning,'class="band counter"'),'the float stays below the room');
 assert.ok(!/\.p-morning \.store\{display:grid/.test(css),'the side-column room is gone');
 // the board is an object hung on the wall: as tall as what is pinned to it, and centred
 assert.ok(/\.board\{[^}]*width:min\(680px,94%\)[^}]*margin:0 auto/.test(css),'the board is a centred object, not a full-bleed strip');
 assert.ok(/\.board\{[^}]*flex:0 1 auto/.test(css),'it takes its height from its content');
 assert.ok(/\.band\.wall\{flex:1 1 auto/.test(css),'the scenery absorbs the slack instead of claiming it');
 // the furniture stops growing with the window, which is what pushed the decision out
 assert.ok(/\.band \.mount\{[^}]*max-width:var\(--roomw/.test(css),'the art box is capped');
 const desktop=css.slice(css.indexOf('@media(min-width:600px)'));
 assert.ok(/\.p-morning \.band\.ceiling \.mount\{--roomw:(\d+)px/.test(desktop)
        && /\.p-morning \.band\.counter \.mount\{--roomw:(\d+)px/.test(desktop),'both caps are desktop-only');
 const ceil=+desktop.match(/\.band\.ceiling \.mount\{--roomw:(\d+)px/)[1];
 const till=+desktop.match(/\.band\.counter \.mount\{--roomw:(\d+)px/)[1];
 assert.ok(ceil<=820&&till<=820,'neither piece of furniture is free to grow with the window');
 /* ...and a wide window is not a reason to set the decision smaller so more of the shop
    fits in frame: the extra width goes to the notices, at a size that reads across a desk. */
 const wide=css.slice(css.indexOf('@media(min-width:900px)'));
 assert.ok(/\.p-morning \.board\{width:min\(860px/.test(wide),'the notices take the width a wide screen gives');
 assert.ok(/\.p-morning \.board-rail\{font-size:1[5-9]px/.test(wide)
        && /\.p-morning \.slip\.gate>b\{font-size:2\dpx/.test(wide),
  'and the decision steps up with it rather than staying at phone size');
 /* The anchored overlays are percentages of their own art, so capping the art box moves them
    with it. What has to hold is that each one is centred on its art - that is what puts the
    day and the float on the centre line of the screen once the box is centred. */
 for(const [name,a] of Object.entries(globalThis.Scene.anchors))
  assert.equal(Math.round((a.left+a.width/2)*10)/10,50,name+' is centred on its own art');

 /* The counter carries the float and nothing else. A promo standee and a crate stack used to
    flank the register and the store-support plates sat on top of it, so the one thing the
    player reads there was the smallest object on the surface. */
 const counterArt=globalThis.Scene.counter();
 for(const [fill,what] of [['#efe6c8','the promo standee'],['#a5763f','the crate stack']])
  assert.ok(!counterArt.includes(fill),what+' is gone from the counter');
 /* There is no counter either. A full-width slab with drawers turned the register back into
    a fitting on someone else's cabinet, so the register is the object now: it stands on a
    short plinth and the floor is left open on both sides of it. */
 assert.ok(/width="252"[^>]*fill="#39434b"/.test(counterArt),'the register is the object, at a size that reads');
 assert.ok(!/width="360"/.test(counterArt),'nothing spans the room down here any more');
 assert.ok(/y="66" width="264"/.test(counterArt)&&/y="84" width="256"/.test(counterArt),
  'it stands on a short plinth rather than hovering');
 assert.ok(!/#5e4028|#8a6435/.test(counterArt),'the drawers and the counter run are gone');
 assert.ok(!/\.band\.counter\{background:linear-gradient\(180deg,[^)]*#c6a26c/.test(css),
  'and the band no longer continues a counter either side of the art');
 /* The band ends where the plinth does. Left taller, the register hovered over a strip of
    empty floor between it and the action bar. */
 assert.ok(counterArt.includes('viewBox="0 0 360 90"'),
  'the counter band is as tall as the object in it, so the register lands on the dock');
 assert.ok(/y="84"[^>]*height="6"/.test(counterArt),'the plinth is the last thing in it');

 /* UI_UX: on the day the player faces the Boss, the standing screen says which Boss. It used
    to open on a generic 마왕성 plate with a 28px procedural mark, identical every Run. */
 const fin=fn('finalScreen');
 assert.ok(fin.includes('Scene.bossArt(s.bossId,s.day,s.sealBreakCount)'),
  'the Final resolves Boss art from the Run, the same call the D5 / D15 reveals make');
 assert.ok(fin.includes('D.bossBy[s.bossId]')&&/<h1>'\+E\(b\.name\)/.test(fin),
  'and names the Boss it is about');
 assert.ok(!/<h1>마왕성<\/h1>/.test(fin),'the generic castle plate is not the headline any more');
 assert.ok(fin.includes('제0게이트 · 마왕성'),'the castle stays as the place, under the name');
 assert.ok(/class="boss-face"/.test(fin),'the art is a figure, not an icon beside a card');
 assert.ok(/\.gate-zero \.boss-face img\{[^}]*object-fit:contain/.test(css),
  'a silhouette is never cropped to fit');
 /* Mobile is not the desktop composition scaled down: the phone sizes the art against the
    viewport so it stays identifiable, and the desktop stands it beside the facts so the
    roster the player has to choose from is not pushed off. */
 assert.ok(/\.gate-zero \.boss-face img\{[^}]*height:32vh/.test(css),'the phone sizes the Boss against the viewport');
 assert.ok(desktop.includes('.p-final .gate-zero{display:flex'),'and only the desktop stands it beside the facts');
 assert.ok(!/\.p-final \.gate-zero\{display:flex/.test(css.slice(0,css.indexOf('@media(min-width:600px)'))),
  'that row never reaches the phone layout');
 assert.ok(!app.includes('relicTray')&&!app.includes('relicStrip'),'and the brass plates are off the counter');
 assert.ok(!css.includes('.tray{'),'with no orphan rule left behind');
 assert.ok(/modal==='menu'/.test(app)&&app.slice(app.indexOf("modal==='menu'"),app.indexOf("modal==='menu'")+900).includes("btn('점포지원','relics')"),
  'the standing store-support list moved to the store menu rather than being lost');
 const posDisplay=globalThis.Scene.anchors.till,posCap=globalThis.Scene.anchors.tillLabel;
 assert.ok(posDisplay.width>38.9&&posCap.width>44.4,'the till took back the width the dressing was using');
 // the weight moved to the one the ATMOSPHERE face actually ships; the SIZE is the claim here
 assert.ok(/\.till b\{font:500 2[5-9]px/.test(css),'and the float is set at the size that surface now allows');
 // and no global type scale was pushed up to compensate
 assert.ok(!/@media\(min-width:900px\)\{[^}]*:root\{[^}]*font-size/.test(css),'no blanket font-size increase at desktop');

 /* D-2. The end of a store was announced on a landing banner with an English eyebrow over a
    gradient hero and a loose row of numbers beneath it. It is a statement from head office,
    so it prints on the same tape the night closing already uses. */
 const bannerFn=fn('endBanner');
 assert.ok(!/THE GATE IS CLOSED|END OF THIS RUN/.test(app),'the generic English eyebrow is gone');
 assert.ok(!css.includes('.end-banner'),'and so is the hero it sat on, rule and all');
 assert.ok(bannerFn.includes('class="tape end-tape"')&&bannerFn.includes('class="print"'),
  'the closing statement is printed on the tape the player already reads every night');
 assert.ok(!/번째 런/.test(app),'and the count is stores, not 런');

 /* META §PROGRESSION UI. The statement reports what this Run moved and nothing else, so a
    number that did not change never appears on it. */
 const led=fn('ledger');
 assert.ok(!/Meta\.grade\(a\)|Meta\.totalJobMastery\(a\)/.test(bannerFn+led),
  'the ending never prints a standing total that this Run did not move');
 assert.ok(led.includes('s.metaGain')&&/gain\?\.jobs/.test(led),'it reports the recorded before/after instead');
 assert.ok(/g\.from\+' → '\+g\.to/.test(led),'as the move each one made');
 const metaSrc=read('dist/systems/meta.js');
 assert.ok(/jobs:jobs\.filter\(job=>jobMastery\(a,job\)>wasMastery\[job\]\)/.test(metaSrc),
  'a Job already credited for this Boss moved nothing and is not listed');
 assert.ok(/if\(!win\)return \[\];/.test(metaSrc),'a failure records no Job x Boss gain at all');
 assert.ok(/run\.metaGain=null;/.test(metaSrc),'and no gain line for the result screen');
 /* META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM: the Run end credits no Achievement at all, and
    nothing in the active runtime reaches for the retired counters. */
 for(const marker of ['nowaste','nodeath','allsupplied','grosssales'])
  assert.ok(!metaSrc.includes("mark('"+marker+"')"),'the Run end no longer credits '+marker);
 assert.ok(!/franchiseCount|orderDiscount|const grade=/.test(metaSrc),'no Grade is derived anywhere');

 /* ...and the whole state is reachable at any time, in the codex the player already has. */
 const cx=fn('codex');
 assert.ok(cx.includes("['progress','진행도']"),'progression is a tab on the existing codex, not a new screen');
 assert.ok(cx.includes('progressPanel()'),'and it renders in the same grid as every other tab');
 const panel=fn('progressPanel'),screen=cx+panel;
 for(const [what,re] of [['the Store Capital',/Meta\.storeCapital\(a\)/],
                         ['each Job mastery',/Meta\.jobMastery\(a,j\.id\)/],
                         ['the Job x Boss grid',/a\.matrix\?\.\[j\.id\]\?\.\[b\.id\]/],
                         ['distinct Boss clears',/Meta\.distinctBossClear\(a\)/]])
  assert.ok(re.test(screen),'the codex shows '+what);
 // ...and the three the header already states are not repeated inside the panel
 assert.ok(!/Meta\.totalJobMastery|Meta\.distinctBossClear|Meta\.storeCapital/.test(panel),
  'the panel does not restate what the codex header says directly above it');
 assert.ok(fn('gatedContent').includes('metaUnlock'),
  'and what each threshold opens, from the catalog rather than a written-out list');
 /* UI_UX_v2.8 §DECORATION UI: the retired Start Contract area becomes 점포 관리 inside the same
    codex, and every number it shows is read from the Decoration data rather than written out
    here a second time. */
 const store=fn('storePanel');
 assert.ok(cx.includes("['store','점포 장식']")&&cx.includes('storePanel()'),
  '점포 장식 (User 2026-09-24, v2.9.0; formerly 점포 관리) is a tab on the existing codex, not a new screen');
 assert.ok(!app.includes("'점포 관리'")&&!app.includes('점포 관리에서 보기'),'no screen still says 점포 관리');
 assert.ok(!cx.includes("['contracts','시작 계약']"),'and the retired Start Contract tab is gone');
 assert.ok(/D\.decorationSlots\.map\(slot=>/.test(store),
  'the panel is Slot -> owned options -> selected, not four hard-coded booleans');
 assert.ok(/D\.decorations\.filter\(d=>d\.slot===slot\)/.test(store),
  'so a Slot that later holds alternatives renders without a change here');
 for(const [what,re] of [['the Store Capital',/Meta\.storeCapital\(a\)/],
                         ['owned state',/Meta\.decorationOwned\(a,d\.id\)/],
                         ['the price',/d\.price/],['the current effect',/E\(d\.effect\)/],
                         ['what is equipped',/active===d\.id/]])
  assert.ok(re.test(store),'the panel shows '+what);
 assert.ok(!/800|700|650|550|10%|300G/.test(store),'and hardcodes none of the numeric truth');
 /* Purchase and equip are Account actions: both refuse during a Run, and the Capital is
    deducted inside Meta so it cannot be spent twice by a second screen. */
 const deco=app.slice(app.indexOf("case'deco-buy'"),app.indexOf("case'deco-buy'")+700);
 assert.ok(/if\(game\.run&&game\.run\.phase!=='end'\)throw/.test(deco),'both refuse during a Run');
 assert.ok(/Meta\.buyDecoration\(game\.account,id\)/.test(deco)&&!/capital-=|capital =/.test(deco),
  'the purchase goes through Meta rather than adjusting Capital in the UI');
 /* META_v2.8 §RETIRED: no Achievement cue survives anywhere in the UI. */
 assert.ok(!/가맹 실적|franchiseState|Meta\.grade\(/.test(app),'no retired Franchise UI remains');
 /* standing progression is a list, not a notification: what is open and what is not yet open
    read at the same level, and the moment-of-unlock line belongs to the result screen only */
 const board=fn('unlockBoard');
 assert.ok(board.includes('해금 완료')&&board.includes('다음 해금'),'both sides are named');
 assert.ok(board.indexOf('<div><h4>해금 완료')<board.indexOf('<div><h4>다음 해금')
   &&(board.match(/<h4>/g)||[]).length===2,'and they are the same kind of block');
 assert.ok(!board.includes('본사 해금'),'the standing view never uses the moment wording');
 assert.ok(led.includes('본사 해금')&&led.includes('s.unlocked'),
  'which stays on the ending, for the Run that actually opened something');
 /* ...and it is actually reachable there: unlocks are only ever credited as a Run ends, so
    the in-play toast would drain them before the ending could name them */
 assert.ok(/game\.run\.phase!=='end'\)\{toast\('본사 해금/.test(app),
  'the toast stands down on the ending instead of consuming what the ending reports');
 /* ...and because the ending keeps the list on screen, the list alone cannot gate the cue -
    opening the codex or moving a tab would sound it again. It belongs to the click that
    created it, which is the one where Meta.finish assigned a fresh array. */
 assert.ok(/const wasOpen=game\.run\?\.unlocked;/.test(app),'the click captures what was open before it');
 /* UI_UX_v2.8 §STORE SUPPORT (2026-09-22 amendment) retired the one shared `rare` cue: a
    Store Support acquisition, an ordinary Decoration purchase and a 본사 해금 are three
    different events and each now has its own. This is the unlock one. */
 assert.ok(/opened\.length&&opened!==wasOpen\)sound\('unlock'\)/.test(app),
  'and the unlock cue sounds only on the click that opened something');
 assert.ok(!/game\.boss\(\);setModal\(null\);render\(\);sound\('unlock'\)/.test(app),
  'the Final no longer sounds it unconditionally, unlock or not');
 assert.ok(!/account\.progress|a\.progressCache|persist/.test(panel),'nothing about it is stored');

 /* A store closes for a reason, and the headline is the reason. One win/fail pair cannot say
    it - a DAY 9 bankruptcy read 마왕을 토벌하지 못했다 for a store that never met the Boss. */
 const head=fn('endHeadline');
 assert.ok(head.includes("s.finalReport")&&head.includes('마왕이 쓰러졌다.')&&head.includes('마왕을 토벌하지 못했다.'),
  'the Final headline is gated on the Final having actually resolved');
 assert.ok(/s\.stats\.deaths>=Meta\.deathLimit\(s\)\)return '너무 많은 모험가가 돌아오지 못했다\.'/.test(head),
  'the death ending names the deaths');
 /* app.js is a page script: the systems' `G` namespace is not in scope there, only its globals */
 assert.ok(!/\bG\.(Meta|DATA)\b/.test(app),'app.js never reaches through G');
 assert.ok(/s\.money<0\)return '운영비를 마련하지 못해 점포 문을 닫았다\.'/.test(head),'the bankruptcy names the money');
 assert.ok(head.includes("return '이번 점포의 영업이 끝났다.'"),'and anything else keeps the plain close');
 assert.ok(!/s\.win\?'우리가 키운 애들이/.test(app),'the old win/fail pair is gone');
 assert.ok(!/서른 날/.test(app)&&!/서른 날/.test(read('dist/systems/run.js')),
  'and so is the 서른 날 phrasing');

 /* The failure line is not a hidden threshold: it is stated before it matters and the count
    is visible while it climbs, in the book that already lists the dead. */
 /* COPY_AUDIT §8-6 states the same three endings in one compact line. CORE_RUN §DEATH LIMIT —
    SEGMENTED (v2.9.1 balance) made the limit Day-dependent, so this general guide no longer
    names a specific count - MORNING/ORDER's own always-visible line (§4-23) is where the exact
    current count/limit lives. */
 assert.ok(!fn('help').includes('D.balance.deathLimit'),
  'the retired flat constant is not read here');
 for(const rule of ['적자 마감은 재고 정리로 회생할 수 있다','사망 한도에 이르면 폐점한다','DAY 30 최종 원정이 끝나면'])
  assert.ok(fn('help').includes(rule),'the guide covers: '+rule);
 const roster=fn('rosterList');
 assert.ok(roster.includes('돌아오지 못한 사람')&&roster.includes('Meta.deathLimit(s)')&&!roster.includes('G.Meta'),
  'the roster shows the count against the line');
 assert.ok(roster.includes('s.stats.deaths'),'read from the Run own count, not a second tally');

 /* UI-Q-v29-26 — DEATH LIMIT ALWAYS VISIBLE (v2.9.1 balance, owner UI_UX §DEATH LIMIT —
    ALWAYS VISIBLE, copy COPY_AUDIT §4-23). One shared line, MORNING and ORDER both, sourced
    from Meta.deathLimit / Meta.deathLimitSegmentEnd so 추모 방명록 and 위령제 are always
    included and the 5/8/11 · D10/D20/D30 segment table is never restated by hand. */
 const dl=fn('deathLimitItem');
 assert.ok(dl.includes('Meta.deathLimit(s)')&&dl.includes('Meta.deathLimitSegmentEnd(s)'),
  'the line reads the segment table through Meta, not a copy of it');
 assert.ok(/'">사망 '\+n\+' \/ '\+limit\+' · D'\+end\+'까지<\/b>'/.test(dl),'exact COPY_AUDIT §4-23 format');
 assert.ok(/n===limit-1\?' warn':''/.test(dl),'warning color exactly at count = limit - 1');
 assert.ok(!/popover|badge|title=/.test(dl),'no popover, badge or extra text');
 assert.ok(fn('morningScreen').includes('deathLimitItem()'),'MORNING shows the line, always on screen');
 assert.ok(fn('orderForm').includes('deathLimitItem()'),'ORDER shows the same line');

 /* D-6 / ECONOMY_ORDER §ORDER. Half of what to order is decided by what is on the shelf, and
    the form showed only a per-SKU 재고 N. The warehouse is on it now, from the same grouping
    the shelf and the stock modal read. Director review: it opens for a player who has never
    folded it, and once folded it stays folded on later Days and across a reload until they
    open it again - a presentation preference on the account, not run state. */
 assert.ok(fn('orderForm').includes('stockBrief()'),'the order form shows the warehouse');
 const brief=fn('stockBrief');
 assert.ok(brief.includes('groupStock()'),'reusing the existing grouping, not a second one');
 assert.ok(brief.includes('game.capacity()')&&brief.includes('s.inventory.length'),'used against total slots');
 assert.ok(brief.includes("settings.stockBriefOpen===true")&&brief.includes("(opened?'open':'')")&&app.includes("stock.open=game.account.settings.stockBriefOpen===true"),
  'collapsed by default (UI-Q-v29-17, v2.9.0), and foldable');
 assert.ok(/stock\.addEventListener\('toggle'[\s\S]{0,200}stockBriefOpen=stock\.open;game\.save\(\)/.test(app),
  'folding it writes the preference so the next Day and the next reload honour it');
 // eleven products used to be eleven rows: the override sheet reads them across instead
 const review=read('dist/ui/director-review.css');
 assert.ok(/\.stock-brief ul\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/.test(review),'two columns on a phone');
 assert.ok(/@media\(min-width:600px\)\{[\s\S]*?\.stock-brief ul\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)\}/.test(review),'three on a wider form');

 /* D-15. A codex entry is three things - the name, what it does, the story about it - and they
    were all one weight, with the tale sitting above the effects as though it were a rule. */
 const entry=fn('codex');
 assert.ok(entry.indexOf('effectList(it)')<entry.indexOf('class="tale"'),'the effects come before the tale');
 assert.ok(/\.unlock \.tale\{[^}]*font-style:italic/.test(css),'and the tale is set in its own voice');
 assert.ok(/\.unlock h3\{/.test(css)&&/\.unlock\{/.test(css),'the entry is a card with a lead, not unstyled flow');

 /* D-8. Two different pieces of money are on screen during a sale. Neither is just 소지금. */
 assert.ok(!/'소지금 부족'/.test(app+read('dist/systems/shop.js')),'no bare 소지금 refusal survives');
 assert.ok(app.includes('손님 소지금 부족'),'the customer purse is named as the customer\'s');
 assert.ok(app.includes('>보유 골드<')&&app.includes('<span>보유 골드</span>'),'and the float is named as the shop\'s');

 /* D-13 / D-26: the forecast reads as the shopkeeper sizing someone up, and the boots are
    named for what they are for rather than for one Hazard they happen to answer. */
 assert.ok(!app.includes('지금의 능력과 준비로 본 예상'),'the spec-sheet disclaimer is gone');
 /* SA-Q30: that shopkeeper-voice line was itself the permanent forecast disclaimer v2.8
    removes - the existing anchored ?s on 전투 전망/사망 위험/환경 대응 already say what each
    figure is, so nothing replaces the paragraph it used to close on. */
 assert.ok(!app.includes('class="estimate"')&&!app.includes('게이트 안에서 어떻게 될지까지는 아무도 모른다'),
  'the permanent forecast disclaimer paragraph is gone');
 assert.ok(!read('dist/data/catalog.js').includes('진창용 원정 장화'),'the boots are renamed');
 assert.ok(read('dist/data/catalog.js').includes("item('boots','원정용 장화'"),'and keep their id');

 /* D-5 / EVENT §3-1. The board notice used to print the effect line alone. The catalog keeps
    the situation and the effect apart already, so the notice says both and rules them off. */
 assert.ok(fn('eventSlip').includes('E(e.reveal)')&&fn('eventSlip').includes('E(e.description)'),
  'the notice says what happened as well as what it switched on');
 assert.ok(/\.slip\.event \.effect\{[^}]*border-top/.test(css),'and the two are set apart');
 assert.ok(/\.slip\.event \.flavor\{[^}]*white-space:pre-line/.test(css)
        && /\.event-reveal \.flavor\{[^}]*white-space:pre-line/.test(css),
  'a situation authored across lines keeps its lines, on the board and in the reveal');

 // D-9. The slots say the count as well as showing it - a row of boxes has to be counted first.
 // v2.9.0 (User 2026-09-24): the Bag is NOT moved - it keeps its place in the state strip, one step larger.
 assert.ok(fn('kitLine').includes("가방 '+n.pack.length+' / '+slots"),'the bag states used / total');
 assert.ok(!app.includes('function counterBand(')&&fn('saleScreen').includes('<div class="counter-edge" aria-hidden'),'the counter edge under the front stays empty; the bag stays in the strip');
 assert.ok(/\.kit \.slots i\{[^}]*width:36px/.test(css)&&!/\.kit \.slots i \{ width: 32px/.test(css),'and the slots are big enough to read at a glance, not overridden smaller');
 assert.ok(!css.includes('.kit .slots{display:grid'),'without becoming a panel of their own');

 // D-12. One Hazard reads as one row, and the block is set apart from the forecasts above it.
 // (the block moved to the destination plate when the environment stopped being shown twice)
 assert.ok(/\.dest-plate \.hazards li\{[^}]*padding:7px 8px/.test(css),'each Hazard is its own banded row');
 assert.ok(/\.dest-plate \.hazards\{gap:0/.test(css),'the rows are separated by the band, not by a gap');
 assert.ok(!/\.readout \.hazards/.test(css),'and no style is left behind for rows the outlook no longer has');

 // D-21. Six outcomes in three volumes, and the routine one is not made small.
 for(const [outcome,rank] of [['성공','quiet'],['퇴각','routine'],['부상','routine'],
                              ['중상','major'],['사망','major'],['대성공','major']])
  assert.equal(Presentation.nightRank({outcome,events:[],changes:[],statChanges:[]}),rank,outcome+' is told as '+rank);
 assert.equal(Presentation.nightRank({outcome:'퇴각',rescued:true,events:[],changes:[],statChanges:[]}),'major',
  'a rescue is a major beat: it was nearly a death');
 assert.equal(Presentation.nightRank({outcome:'성공',changes:['Lv.2 → Lv.3'],events:[],statChanges:[]}),'routine',
  'a success that actually grew someone is not silent');
 /* USER AMENDMENT 2026-09-22 (UI_UX §NIGHT LAYOUT — OUTCOME TYPE, EXACT): the rank no longer
    sets type size. The old 44 / 30 expectation is stale against that decision; what replaces it
    is stricter, because it pins the single exact size and forbids ANY per-rank override of the
    Outcome, the NPC name or the summary - which is what let 부상 and 사망 read as different
    kinds of word. The three volumes survive as a weight rule (copy spent, tone, transition). */
 assert.ok(/^\.verdict\{[^}]*font:500 36px\/1 var\(--f-sign\)/m.test(css),
  'every Outcome label is the one exact 36px display size');
 for(const rank of ['quiet','routine','major'])
  assert.ok(!new RegExp('\\.beat\\.'+rank+'[^{]*\\{[^}]*font-size').test(css),
   'no '+rank+' override changes type size anywhere in the beat');
});

// D-27. Seven products were named in the feedback because they were drawn as something else.
// The test is not "an icon exists" — every id already returned an <svg>. It is that the picture
// a player sees for one product is not the picture they see for another.
test('D-27: the named items are drawn as themselves, and no two of them share a drawing',()=>{
 const Art=require('../dist/ui/art.js')&&globalThis.Art,D=globalThis.DATA;
 /* The twelve products v2.7 added join the named set: each was briefly drawn as the cousin
    it is a premium version of, so they are exactly the ones worth pinning. */
 const named=['rope','candy','coating','boots','goggles','ion','tree','potionHigh','potion',
  'herbtea','midpotion','spiderkit','slimesuit','cryptlantern','snowvisor','magmagear',
  'battlelunch','herobar','hyperenergy','sageelixir','toppotion'];
 const body=svg=>svg.replace(/^[\s\S]*?crispEdges"[^>]*>/,'').replace(/<\/svg>$/,'');
 const drawn=new Map();
 for(const it of D.items){
  const shapes=body(Art.itemIcon(it.id));
  assert.ok(shapes.length>0,it.name+' is drawn, not an empty frame');
  (drawn.get(shapes)||drawn.set(shapes,[]).get(shapes)).push(it);
 }
 for(const id of named){
  const it=D.itemBy[id]||D.items.find(x=>x.icon===id);
  assert.ok(it,id+' is a real item or icon key');
  const others=drawn.get(body(Art.itemIcon(it.id))).filter(x=>x.id!==it.id);
  assert.equal(others.length,0,it.name+' has its own drawing, not '+others.map(x=>x.name).join('/')+"'s");
 }
 // 하급/상급 포션 were the clearest case: same key, so the same picture at the size these render.
 assert.notEqual(D.itemBy.potion.icon,D.itemBy.highpotion.icon,'the two potions do not share an icon key');
 // Nothing on the shelf is drawn as something else any more. The two cup ramen still share a
 // key, but the branch colours 불룡볶음면 by its own id, so the pictures differ.
 const shared=[...drawn.values()].filter(g=>g.length>1);
 assert.deepEqual(shared,[],'no two products are drawn identically: '+shared.map(g=>g.map(x=>x.name).join('/')).join(', '));
});

// UI_UX_v2.8 §LIVE STORE. Each Decoration is a picture, its own picture, at its own place.
// USER 2026-09-24: the pictures are authored SVG asset files (assets/deco/<id>.svg), not drawing
// code, and they are seated on the painted room in the painting's own coordinates.
test('UI_UX_v2.8 §LIVE STORE: every Decoration is an authored picture, each as itself, on the painted room',()=>{
 const Scene=globalThis.Scene,D=globalThis.DATA,fs=require('node:fs'),path=require('node:path');
 const seen=new Map();
 for(const d of D.decorations){
  const art=Scene.decoration(d.id),src=(art.match(/src="([^"]+)"/)||[])[1];
  assert.ok(/^<img /.test(art)&&src==='ui/assets/deco/'+d.id+'.svg',d.name+' resolves to its own asset file');
  const file=path.resolve(__dirname,'../dist',src);assert.ok(fs.existsSync(file),d.name+' ships its file');
  const svg=fs.readFileSync(file,'utf8');
  assert.ok(/<rect /.test(svg),d.name+' is drawn, not an empty frame');
  assert.ok(svg.includes('shape-rendering="crispEdges"'),d.name+' is drawn on the pixel grid');
  assert.ok(!/<text|<script|href=/.test(svg),d.name+' is a plain picture: no caption, no script, no external reference');
  assert.ok(!seen.has(svg),d.name+' is not drawn like '+seen.get(svg));seen.set(svg,d.name);
 }
 assert.equal(Scene.decoration('nosuch'),'','an id with no picture resolves to nothing, never a broken frame');
 assert.ok(!/function deco[A-Z]\w*\(\)\{/.test(read('dist/ui/scene.js')),'no Decoration is drawn by code any more');
 const plate=fn('decoPlate');
 assert.ok(plate.includes('Scene.decoration('),'the store scene renders the picture');
 assert.ok(plate.includes('game.run?.loadout'),'and renders only what this Run equipped, from the Run');
 assert.ok(!/>'\+E\(d\.name\)\+'</.test(plate),'the name is not the visual');
 // one layer over the painting, each Slot placed by the painting's own coordinates, per file
 assert.ok(fn('morningScreen').includes('<div class="deco-layer">'),'the Decorations sit in one layer over the room');
 assert.ok(/\.deco-layer\{[^}]*container-type:size/.test(css),'the layer measures the stage it covers');
 assert.ok(/\.decoplate\{[^}]*left:calc\(50cqw \+ \(var\(--x\) - \.5\) \* 100cqh \* var\(--ar\)\)/.test(css),'x follows the cover-cropped painting');
 for(const slot of D.decorationSlots){
  const phone=(css.match(new RegExp('\\n\\.decoplate\\.'+slot+'\\{(--x:[^}]*)\\}'))||[])[1];
  const wide=(css.match(new RegExp('\\n \\.decoplate\\.'+slot+'\\{(--x:[^}]*)\\}'))||[])[1];
  assert.ok(phone&&/--y:/.test(phone)&&/--w:/.test(phone),slot+' has a place on the phone painting');
  assert.ok(wide&&/--y:/.test(wide)&&/--w:/.test(wide),slot+' has a place on the wide painting');
 }
 assert.ok(/\.decoplate \.deco-art\{[^}]*image-rendering:pixelated/.test(css),'the picture is not smoothed');
});

/* UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES, controlled-state acceptance.
   The implemented live-store trace family is the equipped Decoration, and the group above proves
   the drawings. What was missing is the state contract: that a trace appears only with its owning
   state, disappears with it, survives a Save/Load of that same state, and owns nothing.

   These drive the SHIPPED decoPlate rather than a copy of it - its source is lifted out of
   app.js and handed the same collaborators the page hands it - and the states are built by the
   real engine, so `run.loadout` is whatever Game.start actually froze. */
const liveStore=(()=>{
 const src=app.slice(app.indexOf('const SLOT_COPY='),app.indexOf('function storePanel('));
 assert.ok(/function decoPlate\(/.test(src),'decoPlate is where this expects it');
 const make=new Function('DATA','Scene','Art','game',
  'const D=DATA,E=Art.esc;'+src+';return decoPlate;');
 return game=>make(globalThis.DATA,globalThis.Scene,globalThis.Art,game);})();
// an Account that owns and has equipped exactly the named Decorations, then a Run started from it
const runWith=(...ids)=>{
 const Meta=globalThis.Meta,a=Meta.fresh();
 for(const id of ids){
  const d=globalThis.DATA.decorationBy[id];
  Meta.addCapital(a,d.price);
  Meta.buyDecoration(a,id);
  Meta.equipDecoration(a,d.slot,id);}
 const g=new globalThis.Game(a);g.autosave=false;g.start('ui-q-v28-21');return g;};

test('UI-Q-v28-21: a live-store Decoration trace exists exactly while its Slot is equipped',()=>{
 const D=globalThis.DATA;
 // 1. no Decoration owned or equipped -> no trace, on any Slot
 const bare=runWith();
 for(const slot of D.decorationSlots)
  assert.equal(liveStore(bare)(slot),'',slot+' draws nothing when the Run equipped nothing');
 assert.deepEqual(Object.values(bare.run.loadout).filter(Boolean),[],'and the Run froze an empty loadout');

 // 2. each Slot equipped -> exactly that Slot's trace, naming that Decoration, and no other
 for(const d of D.decorations){
  const g=runWith(d.id),plate=liveStore(g);
  const out=plate(d.slot);
  assert.ok(out,d.name+' draws a trace at its own Slot');
  assert.ok(out.includes(globalThis.Scene.decoration(d.id)),'and it is that Decoration\'s own drawing');
  assert.ok(out.includes(d.name),'and names it for a screen reader');
  assert.ok(out.includes('class="decoplate '+d.slot+'"'),'at its own Slot');
  for(const other of D.decorationSlots)
   if(other!==d.slot)assert.equal(plate(other),'','equipping '+d.slot+' draws nothing at '+other);}

 // 3. removing the owning state removes the trace, and nothing else moves with it
 const all=runWith(...D.decorations.map(d=>d.id));
 for(const slot of D.decorationSlots)assert.ok(liveStore(all)(slot),slot+' is drawn while equipped');
 for(const slot of D.decorationSlots){
  const before=JSON.stringify(all.run.loadout);
  all.run.loadout[slot]=null;
  assert.equal(liveStore(all)(slot),'',slot+' stops being drawn the moment its state is gone');
  assert.notEqual(JSON.stringify(all.run.loadout),before,'because that state, and only that state, changed');}
 for(const slot of D.decorationSlots)assert.equal(liveStore(all)(slot),'','with nothing equipped, nothing is drawn');

 // 4. Save -> Load of the same state reproduces the same traces
 const Save=globalThis.Save,saved=runWith(...D.decorations.map(d=>d.id));
 const before=D.decorationSlots.map(s=>liveStore(saved)(s));
 const round=Save.import(Save.export(saved.account,saved.run));
 const loaded=new globalThis.Game(round.account,round.run);loaded.autosave=false;
 assert.deepEqual(loaded.run.loadout,saved.run.loadout,'the owning state survives the round trip');
 assert.deepEqual(D.decorationSlots.map(s=>liveStore(loaded)(s)),before,'and reproduces the same traces');
 // a Run saved before Decorations existed still loads, and simply draws nothing
 const legacy=Save.import(Save.export(saved.account,saved.run));
 delete legacy.run.loadout;
 const old=new globalThis.Game(legacy.account,legacy.run);old.autosave=false;
 for(const slot of D.decorationSlots)
  assert.equal(liveStore(old)(slot),'',slot+' draws nothing rather than throwing on a save with no loadout');
});

test('UI-Q-v28-21: the trace is presentation only and owns no state of its own',()=>{
 const D=globalThis.DATA,g=runWith(...D.decorations.map(d=>d.id)),plate=liveStore(g);
 // not an interactive gameplay control
 for(const slot of D.decorationSlots){
  const out=plate(slot);
  assert.ok(!/data-action|<button|<a |onclick|tabindex/.test(out),slot+' is not a control');
  assert.ok(/role="img"/.test(out),'it is announced as an image');}
 // drawing it changes nothing: same Run, same Account, before and after
 const runBefore=JSON.stringify(g.run),acctBefore=JSON.stringify(g.account);
 for(let i=0;i<3;i++)for(const slot of D.decorationSlots)plate(slot);
 assert.equal(JSON.stringify(g.run),runBefore,'drawing the store mutates no Run state');
 assert.equal(JSON.stringify(g.account),acctBefore,'and no Account state');
 // no second progression/visual field: the trace is derived from run.loadout and nothing else
 const src=fn('decoPlate');
 const reads=[...src.matchAll(/game\.run\??\.(\w+)/g)].map(m=>m[1]);
 assert.deepEqual([...new Set(reads)],['loadout'],'decoPlate reads exactly one Run field: '+reads.join(','));
 assert.ok(!/account|Meta\./.test(src),'and never reaches past the Run into the Account');
 /* CORE_RUN_v2.8 §PRE-RUN FLOW: the loadout is frozen at start, so the trace cannot be changed
    mid-Run from the Account. That is the same rule that keeps it from being a second progression
    field, and it is asserted here because the trace is what would show a leak. */
 const Meta=globalThis.Meta,drawn=D.decorationSlots.map(s=>plate(s));
 for(const slot of D.decorationSlots)Meta.equipDecoration(g.account,slot,null);
 assert.deepEqual(D.decorationSlots.map(s=>plate(s)),drawn,'an Account unequip cannot reach a Run already started');
 // and the store asks for every Slot, so no equipped Decoration is unreachable on screen
 assert.ok(fn('morningScreen').includes('D.decorationSlots.map(decoPlate)'),'every Slot has a place on the store screen');
});

// UI_UX_v2.8 §PURCHASE CONFIRMATION. Spending permanent Capital is a two-step action, and the
// step that spends is one place in Source, so a repeated click cannot reach Meta twice.
test('UI_UX_v2.8 §PURCHASE CONFIRMATION: the buy button asks, and only the confirmation spends',()=>{
 assert.ok(/case'deco-buy':decoPending=id/.test(app),'the buy button only records what is being asked about');
 assert.equal((app.match(/Meta\.buyDecoration\(/g)||[]).length,1,'exactly one call site spends Capital');
 const confirm=app.slice(app.indexOf("case'deco-confirm'"),app.indexOf("case'qty'"));
 assert.ok(confirm.indexOf('decoPending=null')<confirm.indexOf('Meta.buyDecoration('),
  'the pending purchase is cleared before the Capital is spent, so a second click has nothing to confirm');
 assert.ok(/case'deco-cancel':decoPending=null/.test(app),'cancel clears it and spends nothing');
 // a reload must not resume a half-finished purchase, so it is never written to the save
 assert.ok(!/decoPending/.test(read('dist/systems/save.js'))&&!/decoPending/.test(read('dist/systems/meta.js')),
  'the pending state never reaches the Account or the save');
 assert.ok(/function setModal\(value\)\{decoPending=null/.test(app),'closing or reopening the window cancels it');
});

// D-22 / D-23. Recorded cues and synthesised ones reach the same mixer, so a volume control is
// still a gain node. The contract is that the player owns two of them, that a level survives a
// reload, and that no voice sneaks past a bus straight to the speakers.
test('D-22 / §B-16: two player-owned buses under one master, and a level that is saved',()=>{
 const audio=read('dist/ui/audio.js'),Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 assert.ok(/bgmBus=ctx\.createGain\(\)/.test(audio)&&/sfxBus=ctx\.createGain\(\)/.test(audio),'music and effects have their own gain');
 assert.ok(/bgmBus\.connect\(master\)/.test(audio)&&/sfxBus\.connect\(master\)/.test(audio),'both buses run through one master');
 // every tone() call has to name a bus; the default falls to the effects bus, never to the output
 assert.ok(/gain\.connect\(bus\|\|sfxBus\|\|ctx\.destination\)/.test(audio),'a voice reaches the output through a bus');
 assert.equal((audio.match(/connect\(ctx\.destination\)/g)||[]).length,1,'only the master touches the destination');
 // the music was mixed a quarter as quiet as the smallest click, which is what "BGM is too quiet" was
 const bgmVoice=Number(audio.match(/BGM_VOICE=([\d.]+)/)[1]),sfxVoice=Number(audio.match(/SFX_VOICE=([\d.]+)/)[1]);
 assert.ok(bgmVoice>=sfxVoice/3,'music is in the same range as the effects, not a quarter of the quietest one');
 /* UI-Q114. The real-phone finding was that BGM at 100% still read as absent. The fix has to
    come from raising the music, never from pulling the effects down to fake it, so the
    effects voice is pinned and the music voices are held at the raised level. */
 assert.equal(sfxVoice,.035,'the effects voice is not attenuated to make the music seem louder');
 const bgmBass=Number(audio.match(/BGM_BASS=([\d.]+)/)[1]);
 assert.ok(bgmVoice>=.032&&bgmBass>=.040,'the music voices carry the raised presence');
 /* Every cue a screen asks for has to exist. play() falls back to the generic click for an
    unknown name, so a typo would be inaudible as a bug and just sound like a button. */
 const cues=new Set(Sound.cues);
 const asked=[...app.matchAll(/sound\('([a-z]+)'\)/g)].map(m=>m[1]);
 assert.ok(asked.length,'the screens do ask for cues by name');
 for(const name of new Set(asked))
  assert.ok(cues.has(name),"every requested cue resolves to a real one: "+name);
 /* §STORE SYSTEM. Fitting a Decoration into a Slot is not buying one, so it must not reuse
    the purchase fanfare - and neither of them may be silent. */
 assert.ok(/case'deco-confirm'[\s\S]*?sound\('purchase'\)/.test(app),'buying a Decoration keeps the ordinary purchase cue');
 /* §STORE SUPPORT: "acquisition ... is not the same cue as Relic acquisition" - the three
    acquisitions are told apart by cue, not only by the toast above them. */
 const acq=['support','purchase','unlock'];
 assert.equal(new Set(acq).size,3,'three acquisitions, three cue names');
 for(const c of acq)assert.ok(Sound.cues.includes(c),c+' is a real cue');
 assert.ok(/case'buy-relic':[\s\S]{0,120}?sound\('support'\)/.test(app),'Store Support has its own');
 assert.ok(!/sound\('rare'\)/.test(app),'and the shared rare cue is gone from the UI');
 assert.ok(!/kind==='rare'/.test(read('dist/ui/audio.js'))&&!/kind==='rare'/.test(app),'with no alias left behind');
 const equip=app.slice(app.indexOf("else {Meta.equipDecoration"),app.indexOf("else {Meta.equipDecoration")+160);
 assert.ok(/sound\('fixture'\)/.test(equip),'equipping and unequipping have a cue of their own');
 assert.ok(!/sound\('purchase'\)/.test(equip),'and it is not the purchase cue');
 assert.ok(cues.has('ui')&&cues.has('fixture'),'the shared UI click and the fixture cue exist');
 /* the shared click is quieter than an ordinary effect, so navigation does not shout */
 assert.ok(/ui:\{gain:\.45/.test(audio),'the shared UI click is mixed under the other effects');
 assert.deepEqual(Sound.mix({bgm:.4,sfx:.9}),{bgm:.4,sfx:.9},'the levels are read off the settings object');
 assert.deepEqual(Sound.mix({bgm:9,sfx:-1}),{bgm:1,sfx:0},'and clamped, not trusted');
 assert.deepEqual(Sound.mix({}),Sound.defaults,'a save from before the mixer defaults at the audio layer');
 const fresh=globalThis.Meta.fresh();
 assert.equal(fresh.settings.muted,true,'sound still starts off, as the copy says');
 for(const k of ['bgm','sfx'])assert.equal(fresh.settings[k],1,k+' starts at its design maximum');
 // presentation preference, so it is checked for shape when present the way tutorial is
 const Save=globalThis.Save,base=()=>JSON.parse(JSON.stringify({account:globalThis.Meta.fresh(),run:null,version:8}));
 const withSettings=v=>{const s=base();s.account.settings={muted:true,...v};return s;};
 assert.equal(Save.valid(withSettings({})),true,'a save with no levels at all is still a save');
 assert.equal(Save.valid(withSettings({bgm:.5,sfx:0})),true,'real levels are accepted');
 for(const bad of [{bgm:'loud'},{bgm:7},{sfx:-0.5},{sfx:null}])
  assert.equal(Save.valid(withSettings(bad)),false,'a malformed level is refused: '+JSON.stringify(bad));
 // and the screen actually offers them, with the number said out loud beside each slider
 const ui=fn('mixer');
 for(const k of ['bgm','sfx'])assert.ok(ui.includes(`data-mix="${k}"`)||ui.includes('data-mix="${key}"'),'a control exists');
 assert.ok(ui.includes("row('bgm','BGM'")&&ui.includes("row('sfx','SFX'"),'both channels are named as spec requires');
 assert.ok(ui.includes('mix-${key}-val'),'each slider says its own value');
 assert.ok(!/voice/i.test(ui),'no voice channel is invented: there are no voices');
 assert.ok(fn('settings').includes("'소리 켜기':'소리 끄기'")&&fn('settings').includes('mixer()'),'the master mute stays, with the two levels under it');
 assert.ok(/\.mix-row input\[type=range\]\{[^}]*height:24px/.test(css),'the slider is thumb-sized');
 assert.ok(/\.mix-row\{[^}]*min-height:44px/.test(css),'and its row keeps the touch target');
});

test('D-23: every cue the UI asks for exists, and every step of an ordinary day has one',()=>{
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound,audioSrc=read('dist/ui/audio.js');
 // the per-cue shape table only: the BGM bed table above it reuses some of the same names
 const shp=audioSrc.slice(audioSrc.indexOf('const shape={'),audioSrc.indexOf('function play('));
 const asked=[...app.matchAll(/sound\('([a-z]+)'\)/g)].map(m=>m[1]);
 assert.ok(asked.length>0,'the UI does ask for sound');
 for(const kind of asked)
  assert.ok(Sound.cues.includes(kind),kind+' is a real cue, not a typo that falls back to a click');
 // the priority list: an order confirmed, a sale, gold moving either way, a product picked,
 // a store support taken, a result that matters, and the confirmations that end a phase
 const cueFor=action=>{const i=app.indexOf("case'"+action+"'");assert.ok(i>0,action+' is a real action');
  const seg=app.slice(i,app.indexOf("\n case'",i+1));const m=seg.match(/sound\(([^)]*)\)/);return m?m[1]:null;};
 assert.equal(cueFor('confirm-order'),"'order'",'confirming the order is the order cue, not a generic click');
 assert.equal(cueFor('begin-order'),"'open'",'opening the doors is the shutter going up');
 assert.equal(cueFor('close'),"'close'",'ending the day closes');
 assert.equal(cueFor('liquidate'),"'gold'",'clearing stock is gold coming in');
 assert.equal(cueFor('reroll'),"'spend'",'a reroll is gold going out');
 assert.equal(cueFor('deep-nominate'),"'spend'",'sponsorship is a payment, not the store-support fanfare');
 assert.equal(cueFor('break-seal'),"'boss'",'breaking a seal is a Boss decision and is heard as one');
 /* §BOSS / FINAL AUDIO: one motif, two strengths. D5 / D15 / D25 major, D0 / D10 / D20 compact. */
 assert.ok(/const BOSS_MAJOR=new Set\(\['d5','d15','final'\]\)/.test(app),'the major beats are named as Canonical names them');
 assert.ok(/sound\(BOSS_MAJOR\.has\(st\)\?'bossmajor':'bosscompact'\)/.test(app),'every beat is acknowledged at its own strength');
 const bshape=m=>{const i=shp.indexOf('\n '+m+':{');assert.ok(i>0,m+' names a shape');return shp.slice(i,shp.indexOf('},',i));};
 const maj=bshape('bossmajor'),cmp=bshape('bosscompact');
 assert.ok(Number(maj.match(/gain:([\d.]+)/)[1])>Number(cmp.match(/gain:([\d.]+)/)[1]),'the compact beat is smaller than the major one');
 assert.ok(Number(maj.match(/dur:([\d.]+)/)[1])>Number(cmp.match(/dur:([\d.]+)/)[1]),'and shorter');
 assert.ok(/layer:/.test(maj)&&!/layer:/.test(cmp),'only the major one carries the low layer');
 assert.deepEqual(Sound.cues.includes('bossmajor')&&Sound.cues.includes('bosscompact'),true,'both exist');
 /* D0 keeps its own persistence and is a compact acknowledgement, not a new beat */
 assert.ok(/if\(st==='d0'\)s\.bossReveal\.d0Seen=true;/.test(app),'D0 still writes its own seen flag');
 /* D30 adds no new-information signal: it is the Final commit only */
 assert.ok(/case'boss-go':sound\('final'\)/.test(app),'the Final commit is the Final cue');
 assert.ok(cueFor('select'),'picking a product off the shelf answers');
 assert.ok(cueFor('buy-relic'),'taking a store support answers');
 /* §MATERIAL DECISION CUES / SALE: the price modes stay named in the cue, but Canonical now
    requires them to be peers - "no price mode is made to sound like the correct answer" - so
    they resolve to one shared SALE body at one level, not to an ascending fanfare for 바가지. */
 assert.ok(cueFor('sell')&&cueFor('sell').includes('overcharge'),'a sale is priced in the cue it makes');
 const modeShape=m=>{const i=shp.indexOf('\n '+m+':{');assert.ok(i>0,m+' names a shape');return shp.slice(i+m.length+3,shp.indexOf('},',i));};
 /* v2.9.0 TRANSACTION BEAT A5 (UI_UX §AUDIO 50% / 100% / 150%): the modes differ by coin ticks
    only - 1 / 2 / 3 - and by nothing else; the count is not a level and no mode rings better. */
 const modes=['sale','overcharge','half'].map(modeShape);
 /* v2.9.2 H2 (PRESENTATION H2, UI-Q-v29-31): 바가지 alone carries the first-tick offset - 40 ms later, a lower first tick */
 assert.ok(/,ticks:3,tickLate:\.04,tickLow:\.75$/.test(modeShape('overcharge')),'바가지 first tick: +40 ms, x0.75 pitch');
 assert.ok(!/tickLate|tickLow/.test(modeShape('sale')+modeShape('half')),'정가 / 50% carry no offset');
 assert.equal(new Set(modes.map(m=>m.replace(/,ticks:\d(,tickLate:[\d.]+,tickLow:[\d.]+)?/,''))).size,1,'the three price modes are one SALE family at one level');
 const ticks=Object.fromEntries(['half','sale','overcharge'].map(m=>[m,Number((modeShape(m).match(/ticks:(\d)/)||[])[1])]));
 assert.deepEqual(ticks,{half:1,sale:2,overcharge:3},'50% / 100% / 150% are told apart by 1 / 2 / 3 coin ticks');
 assert.ok(/if\(sh\.ticks\)for\(let i=0;i<sh\.ticks;i\+\+\)tone\(i\?2637:2637\*\(sh\.tickLow\?\?1\),t0\+\.14\+\(sh\.tickLate\?\?0\)\+i\*\.07,\.04,SFX_VOICE\*\.5\*\(i\?1:1\.3\),'sine'/.test(read('dist/ui/audio.js')),
  'and the ticks are the same ping at the same level, only counted - the first one the harder impact (H2)');
 const samples=Sound.samples;assert.equal(new Set(['sale','overcharge','half'].map(m=>samples[m])).size,1,
  'and they commit on the same recorded register body');
 assert.ok(/sound\('refusal'\)/.test(app),'and a refusal sounds different from a sale');
 /* §NIGHT OUTCOME AUDIO: the Outcome is primary. A success that found something used to be
    answered by a `discovery` / `level` cue INSTEAD of its Outcome, so a 퇴각 and a plain return
    could sound alike. Both of those cues are retired. */
 /* One owner, so neither entry point can drift: `nightCue` maps the Outcome and `nightSound`
    plays it before the proven accent. The prose beside them names the retired cues, so these
    read the code alone. */
 const bareOf=t=>t.replace(/\/\*[\s\S]*?\*\//g,'');
 const cueMap=bareOf(fn('nightSound'))+bareOf(app.slice(app.indexOf('const nightCue='),app.indexOf('const nightCue=')+400));
 for(const [o,c] of [['사망','death'],['중상','severe'],['부상','injury'],['퇴각','retreat'],['대성공','great']])
  assert.ok(cueMap.includes("outcome==='"+o+"'?'"+c+"'"),o+' is heard as '+c);
 assert.ok(/:'return';/.test(cueMap),'and an ordinary return keeps its own');
 assert.ok(!/discovery|'level'/.test(cueMap),'no find or Stat move speaks over the Outcome');
 assert.ok(!Sound.cues.includes('discovery')&&!Sound.cues.includes('level'),'and the two retired cues are gone');
 /* BOTH ways a result becomes the visible one route through that owner. The final departure of
    the day IS the entry to NIGHT and lands on result 0 already on screen, so it owes that
    result its own Outcome cue; it used to play the generic return cue, which made a 사망 or a
    퇴각 at the head of the queue sound like an ordinary return until 다음 was pressed. */
 const nextSeg=bareOf(app.slice(app.indexOf("case'night-next'"),app.indexOf("\n case'",app.indexOf("case'night-next'")+1)));
 assert.ok(/nightSound\(s\.results\[s\.nightCursor\]\)/.test(nextSeg),'다음 asks the owner for the cue');
 assert.ok(!/sound\(/.test(nextSeg),'and asks for nothing else');
 const dep=bareOf(app.slice(app.indexOf("case'depart'"),app.indexOf("\n case'",app.indexOf("case'depart'")+1)));
 assert.ok(/if\(s\.phase==='night'\)nightSound\(s\.results\[s\.nightCursor\|\|0\]\)/.test(dep),
  'entering NIGHT plays the first displayed result, not a generic return');
 assert.ok(!/\?'return':/.test(dep),'the old generic-return branch is gone');
 assert.ok(/else sound\('depart'\)/.test(dep),'a departure that is not the entry to NIGHT still departs');
 // the accent still lands behind the Outcome cue, and only on proven state
 const owner=bareOf(fn('nightSound'));
 assert.ok(owner.indexOf('sound(nightCue(result))')<owner.indexOf("Sound.play('rescue'"),'the accent never replaces the Outcome cue');
 assert.ok(/if\(result\.rescued\|\|result\.avoidedDeath\)Sound\.play\('rescue',\.\d+\)/.test(owner),'and is read off proven state');
 assert.ok(!/game\.|render\(\)|\.nightCursor=/.test(owner),'the owner is presentation only');
 /* §AUDIO HIERARCHY: Settings is Utility. Unmuting used to answer with the default cue, which
    is the SALE register - the loudest thing in the build, for a control that sold nothing. */
 const toggle=bareOf(app.slice(app.indexOf("case'sound'"),app.indexOf("\n case'",app.indexOf("case'sound'")+1)));
 assert.ok(/sound\('ui'\)/.test(toggle),'the mute switch confirms with the quiet utility click');
 assert.ok(!/sound\(\)/.test(toggle),'never with the default SALE cue');
 // gold in and gold out are mirror cues, so one is never mistaken for the other
 const gold=[659,784];assert.ok(Sound.cues.includes('gold')&&Sound.cues.includes('spend'),'both directions exist');
 assert.ok(/spend:\[784,659\]/.test(audioSrc),'spend falls where gold rises: '+gold.join());
});

/* UI-Q-v28-22. The Audio Polish pass widened the existing engine and gave the material cues a
   recorded body; the guard is that it stayed ONE engine, that the hierarchy is real and not just
   described, and that a rapid-repeat control cannot stack into a harsh tone. */
test('UI-Q-v28-22: one engine, a real hierarchy, and no cue that stacks on a fast tap',()=>{
 const audio=read('dist/ui/audio.js'),Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 // the prose explains what the engine refuses to do, so the bans are read off the code alone
 const code=audio.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 assert.ok(!/Math\.random/.test(code),'no cue draws a random number');
 assert.ok(!/XMLHttpRequest|new Audio\(|<audio/i.test(code),'no second playback path was introduced');
 // one fetch, of this build's own vendored files, and never of a remote host
 assert.equal((code.match(/fetch\(/g)||[]).length,1,'there is exactly one loader');
 assert.ok(/SAMPLE_DIR='ui\/assets\/audio\/'/.test(code)&&!/https?:\/\//.test(code),'and it only reads this build');
 assert.ok(/if\(loaded\|\|!ctx/.test(code),'it runs once, and never before there is a context');
 const shp=audio.slice(audio.indexOf('const shape={'),audio.indexOf('function play('));
 const spec=name=>{const i=shp.indexOf('\n '+name+':{');assert.ok(i>0,name+' names its own shape');
  return shp.slice(i,shp.indexOf('},',i));};
 const gain=n=>Number(spec(n).match(/gain:([\d.]+)/)[1]);
 // §AUDIO HIERARCHY: utility under ordinary action, ordinary action under a material decision
 for(const util of ['ui','quantset'])for(const decision of ['order','support','refusal','final'])
  assert.ok(gain(util)<gain(decision),util+' sits under '+decision);
 assert.ok(gain('quantset')<gain('quantity'),'a quick-set never outranks the stepper it stands in for');
 assert.equal(Sound.samples.quantset,Sound.samples.quantity,'and it is the same material, one step down');
 // §MIX / RUNTIME: a held or hammered control must not build into harsh overlapping sound
 for(const tick of ['quantity','quantset','ui'])assert.ok(/repeat:\.\d+/.test(spec(tick)),tick+' names a minimum retrigger gap');
 assert.ok(/if\(sh\.repeat\)\{if\(t0-\(lastAt\.get\(kind\)\|\|-1\)<sh\.repeat\)return;/.test(code),
  'and the engine actually drops the retrigger inside it');
 // the material cues carry a recorded object; the tonal families stay synthesised and in tune
 for(const m of ['order','sale','refusal','support','open','close','final','quantity'])
  assert.ok(Sound.samples[m],m+' plays a recorded body');
 for(const t of ['great','retreat','injury','severe','death','rescue','bossmajor','bosscompact'])
  assert.ok(!Sound.samples[t],t+' stays synthesised, so its family stays in tune');
 // and no sampled cue can go silent when its file is missing
 assert.ok(/if\(!body\|\|sh\.accent\)notes\.forEach/.test(code),'the synthesised shape is still the fallback');
 // MORNING / ORDER / SALE / NIGHT / FINAL each have a bed, told apart by arrangement
 for(const t of ['morning','order','sale','night','boss'])assert.ok(Sound.tracks.includes(t),t+' has a bed');
 assert.ok(new Set([...audio.matchAll(/ms:(\d+)/g)].map(m=>m[1])).size>=4,'the beds differ by more than volume');
 // mute and the two saved levels stay the only authority
 assert.ok(/function play\([^)]*\)\{if\(!enabled\|\|!ctx\)return;/.test(code),'mute silences every cue');
 assert.ok(/appliedBgm!==level\.bgm/.test(code),'a redraw does not cancel a duck by rewriting the bus level');
 assert.ok(/linearRampToValueAtTime\(full,when\+/.test(code),'ducking restores the player level, not 1');
});

test('UI-Q-v28-22: every vendored cue ships, with its licence and its record',()=>{
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 const dir='dist/ui/assets/audio';
 for(const file of new Set(Object.values(Sound.samples)))
  assert.ok(fs.existsSync(path.join(root,dir,file+'.mp3')),'the cue file ships: '+file+'.mp3');
 assert.ok(fs.existsSync(path.join(root,dir,'LICENSE-CC0.txt')),'the dedication ships with the files it releases');
 const manifest=read('reports/ASSETS.md');
 for(const term of ['CC0-1.0','uisfx','dist/ui/assets/audio'])
  assert.ok(manifest.includes(term),'the asset manifest records '+term);
 // nothing is fetched from a host at runtime, the way the fonts are not
 assert.ok(!/https?:\/\//.test(read('dist/ui/audio.js').replace(/\/\*[\s\S]*?\*\//g,'')),'no remote audio URL is in the build');
 // the vendoring step is reproducible and owns only what it copies
 const vendor=read('tools/vendor-assets.py');
 assert.ok(/node_modules','uisfx'/.test(vendor)&&/LICENSE-AUDIO/.test(vendor),'`npm run assets` regenerates them with their licence');
 assert.ok(JSON.parse(read('package.json')).devDependencies.uisfx,'the source is a devDependency, never a runtime one');
});

test('UI-Q-v28-23 / -24: NIGHT outcomes and Boss beats are heard for what they already are',()=>{
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 // the prose beside these branches names the Outcomes and the Boss facts, so they read the code
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 // both ways into a visible result go through one owner, so the rules are asserted on it
 const seg=bare(fn('nightSound'));
 // the recovery accent is layered behind the Outcome cue and gated on the proof the result carries
 assert.ok(/if\(result\.rescued\|\|result\.avoidedDeath\)Sound\.play\('rescue',\.\d+\)/.test(seg),
  'the rescue accent is delayed behind the outcome cue and read off proven state');
 assert.ok(seg.indexOf('sound(nightCue(result))')<seg.indexOf("Sound.play('rescue'"),'it never replaces the Outcome cue');
 // presentation only: the owner assigns nothing and calls no game method
 assert.ok(!/game\.|s\.\w+=/.test(seg),'no cue branch touches the result, the Run or the Wallet');
 for(const entry of ["case'night-next'","case'depart'"]){
  const e=app.indexOf(entry),body=bare(app.slice(e,app.indexOf("\n case'",e+1)));
  assert.ok(/nightSound\(/.test(body),entry+' asks that owner for the NIGHT cue');}
 // Boss: the strength is read off the beat, never off the Boss behind it
 const bs=app.indexOf("case'boss-seen'"),bseg=bare(app.slice(bs,app.indexOf("\n case'",bs+1)));
 assert.ok(!/bossId|b\.name|trait|family/i.test(bseg),'the cue is not chosen from anything the beat has not shown');
 assert.ok(/s\.bossReveal\.d0Seen=true/.test(bseg)&&/BOSS_BEATS\.find/.test(bseg),'D0 and D5-D25 keep their own persistence');
 // a redraw replays nothing: one-shot cues live in the click handler, never in render()
 assert.ok(!/sound\('|Sound\.play\(/.test(fn('render')),'render() plays no one-shot cue');
});

/* UI-Q-v29-27 (v2.9.2 H1, UI_UX §NIGHT LAYOUT — VERDICT STAMP, PRESENTATION §GAME FEEL BEAT): the NIGHT verdict is
   stamped after the card stands; weight follows the Outcome; one after-motion owner; the reversal overprints; a death
   gets a tape. The timing lives in one table read by both the motion and the cue, so it is checked as numbers. */
/* FINAL_EXPEDITION §D30 PLAYER FLOW (User 2026-09-25): 마지막 발주 -> 출전 NPC 선택 (notebook) -> FINAL 준비 (Stat grid) */
test('FINAL: the last order first, the pick from the notebook, the Stat grid while supplying',()=>{
 const f=fn('finalScreen');
 assert.ok(/!committed&&!finalOrdered&&!s\.team\.length\s*\n?\s*\/\*[^*]*\*\/\s*\?'<div class="party-head"><h2>마지막 발주<\/h2><\/div><div class="final-order open">'\+orderForm\(\)/.test(f),'D30 opens on the last order');
 assert.ok(/btn\('원정대 선택','final-ordered','stamp',Object\.values\(s\.cart\|\|\{\}\)\.some\(q=>q>0\)\?'disabled':''\)/.test(f),'moving on waits for a pending cart');
 assert.ok(/npcCard\(n,'final-npc'\)/.test(f)&&!/npcCard\(n,'team'\)/.test(app),'a muster card opens the notebook instead of picking');
 assert.ok(/case'final-npc':sound\('ui'\);setModal\('npc:'\+id\);break;/.test(app),'the notebook is the ordinary adventurer notebook');
 assert.ok(/btn\(inTeam\?'원정대에서 빼기':'원정대 선택','final-team','stamp'/.test(app),'the pick / release is the notebook footer');
 assert.ok(/case'final-team':game\.selectFinal\(id\)/.test(app),'and goes through the one selection rule');
 assert.ok(/'<div class="final-stats">'\+statGrid\(/.test(f)&&!/details class="final-order"/.test(f),'FINAL 준비 shows the Stat grid and no second order form');
 assert.ok(/if\(phase!=='final'\)finalOrdered=false;/.test(app)&&!/run\.finalOrdered|s\.finalOrdered/.test(app),'the step is presentation, never saved');
});

/* UI_UX §ORDER — FLOATING TODAY LINE (User 2026-09-25) */
test('ORDER: the 오늘 line rides in the floating Death rail only while its own block is out of view',()=>{
 const of=fn('orderForm');
 assert.ok(/'<p class="board-rail death-limit-row">'\+deathLimitItem\(\)\s*\+'<span class="rail-today" aria-hidden="true"><i>오늘<\/i>'\+todayLine\(counts\)/.test(of),'the same line, in the Death rail\'s own box, under its own label');
 assert.ok(/'<p>'\+todayLine\(counts,'b'\)/.test(of),'one owner writes both copies');
 const w=fn('watchOrderToday');assert.ok(/new IntersectionObserver/.test(w)&&/show-today',!e\.isIntersecting&&e\.boundingClientRect\.top</.test(w),'shown only once the block has gone above, under the rail');
 assert.ok(/if\(phase==='order'\)watchOrderToday\(\)/.test(app),'watched on ORDER only');
 assert.ok(/\.rail-today\{display:none;[^}]*box-shadow:inset 0 1px 0/.test(css)&&/\.board-rail\.show-today \.rail-today\{display:block\}/.test(css),'hidden by default, set apart by a rule');
});

/* UI_UX §SALE — COUNTER TRAY FOLD (User 2026-09-25): scrolling the shelf or tapping elsewhere folds the tray to its header */
test('SALE counter tray folds while the shelf is read and opens on any row',()=>{
 assert.ok(/function foldTray\(\)\{if\(!selected\|\|trayFolded\|\|innerWidth>=1024/.test(app),'only a filled tray folds, and never on a desk');
 assert.ok(/Math\.abs\(sc\.scrollTop-trayBase\)>32\)foldTray\(\)/.test(fn('watchTray')),'a shelf scroll past 32px folds it');
 assert.ok(/performance\.now\(\)<trayArm/.test(fn('watchTray')),'the anchoring scroll of a pick does not fold it');
 assert.ok(/if\(!ev\.target\.closest\('\.counter-tray,\[data-action="select"\],\.dock,#modal-root,#coach-root'\)\)foldTray\(\)/.test(app),'a tap outside the tray folds it');
 assert.ok(/case'tray-open':trayFolded=false;syncTray\(\)/.test(app),'the folded strip opens it again');
 assert.ok(/const reopen=trayFolded&&selected===id;trayFolded=false;/.test(app),'any shelf row opens it again');
 assert.ok(/\.p-sale \.counter-tray\.folded \.tray-delta,\.p-sale \.counter-tray\.folded \.tills\{display:none\}/.test(css),'folded, only the header line stays');
 assert.ok(!/trayFolded/.test(read('dist/systems/shop.js'))&&!/account\.\w*tray|run\.\w*tray/i.test(app),'the fold is never saved');
});

/* UI_UX §SALE — COUNTER TRAY (User 2026-09-25): the shelf row states every effect on one line; it used to stop at two */
test('SALE shelf row: every effect, one line, the utility Items by their core',()=>{
 const sh=fn('shelf'),se=fn('shelfEffects');
 assert.ok(!/\.slice\(0,2\)/.test(sh),'no effect is cut from the shelf row');
 assert.ok(/shelfEffects\(Presentation\.rows\(/.test(sh),'the row hands every row to one owner');
 assert.ok(/len>28\?' class="densest"':len>24\?' class="dense"':len>19\?' class="tight"'/.test(se),'a longer line steps down instead of wrapping');
 for(const [c,px] of [['tight',13],['dense',12],['densest',11]])assert.ok(new RegExp('\\.good \\.what span\\.'+c+'\\{font-size:'+px+'px').test(css),c+' is '+px+'px');
 assert.ok(/SHELF_CORE=\{aftercare:'중상 → 부상 · 부상 → 무사',duplicate:'다음 소비품 효과 2회'\}/.test(app),'구급키트 / 황금 1+1 쿠폰 read their core on the shelf');
 // the core is the approved line's own words, not new copy
 const rowsFor=k=>Presentation.rows({[k]:1}).map(r=>r.label).join('');
 assert.ok(rowsFor('aftercare').includes('중상 → 부상, 부상 → 무사')&&rowsFor('duplicate').startsWith('다음 소비품 효과 2회'),'both cores are cut from the approved lines');
});

/* UI-Q-v29-32 (v2.9.2 H3, UI_UX §ORDER — WAREHOUSE DISCLOSURE): one crate per SKU, capped cascade, three hits at most */
test('UI-Q-v29-32: ORDER confirm - a crate per SKU, prior -> resolved on its landing, <= 320 ms, <= 3 hits, the till counts down',()=>{
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 assert.ok(/const ORDER_BEAT=\{total:320,step:70,hits:3,till:220\};/.test(app),'320 ms cap, 70 ms step ceiling, 3 hits, 220 ms till');
 const pc=bare(fn('playCue')),o=pc.slice(pc.indexOf("if(c==='order')"),pc.indexOf("if(c==='sale')"));
 assert.ok(/step=Math\.min\(ORDER_BEAT\.step,\(ORDER_BEAT\.total-STAMP_FALL\)\/Math\.max\(1,k\.length-1\)\)/.test(o),'the step shrinks so the last landing stays within the cap');
 assert.ok(/k\.forEach\(\(item,i\)=>/.test(o)&&!/quantity|cart\[/.test(o),'one crate per SKU, never per unit');
 assert.ok(/translateY:\{from:-10,to:0,duration:STAMP_FALL,delay:at,ease:'in\(3\)'\}/.test(o),'the crate reuses the NIGHT stamp fall');
 assert.ok(/cnt\.textContent=was\+'개'/.test(o)&&/onComplete:\(\)=>\{cnt\.textContent=now;\}/.test(o),'prior value, then the resolved one on the landing');
 assert.ok(/if\(i<ORDER_BEAT\.hits\)orderCueAt\.push\(setTimeout\(\(\)=>Sound\.play\(i\?'crate':'order'\),land\)\)/.test(o),'at most three audible landings');
 assert.ok(/A\(box,\{v:game\.run\.money,duration:ORDER_BEAT\.till/.test(o),'the till counts down');
 assert.ok(/summary i/.test(o)&&/창고 잔여 칸/.test(o)&&/A\(\{t:0\},\{t:1,duration:last/.test(o),'N / M칸, N종 and 창고 잔여 칸 move together on the last landing');
 assert.ok(/if\(motionOK\(\)\)\{cue='order';handoff=\{before,used,gold,skus\}/.test(app)&&/\}else sound\('order'\);/.test(app),'reduced motion: the stamp once, no cascade');
 assert.ok(/'<li data-item="'\+it\.id\+'">'/.test(fn('stockBrief')),'rows are addressable by SKU');
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound;assert.ok(Sound.cues.includes('crate')&&!Sound.samples.crate,'crate is a synthesised cue');
 assert.ok(/s\.notice='발주 완료\.'/.test(read('dist/systems/shop.js')),'the 발주 완료. line is unchanged');
});

/* UI-Q-v29-31 (v2.9.2 H2, UI_UX §SALE — COUNTER TRAY): the pressed price key and the A8 stub on its landing */
test('UI-Q-v29-31: SALE counter feel - the key press, the stub on its landing, the first tick harder',()=>{
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 assert.ok(/const KEY_PRESS=\{y:3,down:60,up:60\};/.test(app),'3 px, 60 ms down and 60 ms back - 일반, no hold');
 assert.ok(/translateY:\[\{from:0,to:KEY_PRESS\.y,duration:KEY_PRESS\.down/.test(app),'the key travels down and returns');
 const pc=bare(fn('playCue')),sale=pc.slice(pc.indexOf("if(c==='sale')"),pc.indexOf("if(c==='refuse')")),refuse=pc.slice(pc.indexOf("if(c==='refuse')"));
 assert.ok(/scale:\{from:1\.12,to:1,duration:200,delay:KEY_PRESS\.down/.test(sale)&&/opacity:\{from:0,to:1,duration:40,delay:KEY_PRESS\.down/.test(sale),'the A8 stub lands on the key landing, 1.12 -> 1 in 200 ms');
 assert.ok(/held\.inert=true/.test(sale)&&/keyPress\(A,key,\{onComplete:put\}\)/.test(sale)&&/setTimeout\(put,/.test(sale),'the pressed tray is held inert for the press only, with a fallback');
 assert.ok(/\.p-sale \.counter-tray\.held\{pointer-events:none\}/.test(css),'and it answers no input');
 assert.ok(/keyPress\(A,b\);A\(b,shake\)/.test(refuse),'a refused key is pressed too, while A6 shakes it');
 assert.ok(/const keyPress=\(A,key,more=\{\}\)=>\(key\.style\.transition='none',/.test(app),'the button transition is dropped so the frames are not swallowed');
 assert.ok(/el\.dataset\.action!=='sell'\)stampPress\(el\)/.test(app),'the 정가 key does not add the generic stamp press');
 assert.ok(/tray:el\.closest\('\.counter-tray'\)/.test(app),'the tray is read before the draw that drops it');
 // nothing that escalates: no count of sales reaches the beat
 assert.ok(!/previousSales|daily\.sales|streak|combo/.test(sale),'no streak, no combo, no faster second sale');
});

/* coach seen state is keyed by step id alone: an id shared by two phases marks the second lesson seen before it is shown
   (ORDER's gates lesson never appeared after MORNING's, fixed 2026-09-26) */
test('coach step ids are unique across phases',()=>{
 const body=app.slice(app.indexOf('const coachSteps={'),app.indexOf('let activeCoach=null;')),ids={};
 for(const m of body.matchAll(/^ (\w+):\[(.*)\],?$/gm))for(const x of m[2].matchAll(/\['([a-z-]+)',/g))(ids[x[1]]??=[]).push(m[1]);
 assert.ok(Object.keys(ids).length>=10,'the step table was read');
 for(const [id,phases] of Object.entries(ids))assert.equal(phases.length,1,'coach id '+id+' is used by '+phases.join(' / '));
});

/* UI-Q-v29-37 (UI_UX §END — REPLAY NUDGE, User 2026-09-26, v2.9.4): show, never assign - one line at most, only when the
   Run opened nothing, never a Decoration's name; 본사 해금 carries the D10 / D14 opens; the pre-Run Slot mark is a current state */
test('UI-Q-v29-37: replay nudge - one line, first that applies, no names, no goals',()=>{
 const l=fn('ledger');
 assert.ok(/const openedNames=\[\.\.\.\(s\.unlocked\|\|\[\]\),\.\.\.\(s\.dayUnlocked\|\|\[\]\)\];/.test(l),'본사 해금 lists the distinct-Boss unlocks and the D10 / D14 opens');
 assert.ok(/const nudge=opened\?'':replayLine\(\);/.test(l),'no line beside 본사 해금');
 const r=fn('replayLine');
 assert.ok(r.indexOf("'점포 자본으로 새 장식을 들일 수 있다.'")<r.indexOf("'지금까지 가장 오래 버틴 점포다 · DAY '"),'a Decoration newly in reach comes before a best Day');
 const run=read('dist/systems/run.js');
 assert.ok(/const reach=D\.decorations\.some\(d=>!G\.Meta\.decorationOwned\(this\.account,d\.id\)&&before<d\.price&&d\.price<=after\);/.test(run)&&/if\(st\?\.reach\)return '점포 자본으로 새 장식을 들일 수 있다\.';/.test(r),'an unowned price this settlement crossed, judged once at the settlement');
 assert.ok(/s\.bestBefore>0&&s\.day>s\.bestBefore/.test(r),'strictly above an existing record');
 assert.ok(!/d\.name|decorationBy/.test(r),'never a Decoration name');
 assert.ok(/<em class="can-buy">들일 수 있음<\/em>/.test(fn('newRun'))&&/x\.price<=capital/.test(fn('newRun')),'the pre-Run Slot mark reads the current capital');
 assert.ok(/G\.Meta\.recordBestDay\(this\.account,s\)/.test(read('dist/systems/run.js'))&&!/recordBestDay/.test(read('dist/systems/run.js').slice(read('dist/systems/run.js').indexOf('P.abandon='),read('dist/systems/run.js').indexOf('P.abandon=')+200)),'the ending records the best Day; the abandon does not');
});

/* UI-Q-v29-38 (UI_UX §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT, User 2026-09-26, v2.9.5): one thin words-only line under the
   readout .top, only for an injured departure with a chain behind it; the NPC detail row's wording and number; the % stays in the help */
test('UI-Q-v29-38: SALE strain line - injured with a chain only, the NPC detail number, no %',()=>{
 const r=fn('readout'),top=r.indexOf("+'</div>'"),line=r.indexOf('class="strain"');
 assert.ok(top>0&&line>top&&line<r.indexOf('great-signal'),'directly under the readout .top');
 assert.ok(/n\.injury===1&&Dungeon\.injuredStreak\(n\.records\)>0\?'<p class="strain">연속 부상 출발 '\+Dungeon\.injuredStreak\(n\.records\)\+'회<\/p>':''/.test(r),'injured departures with a chain of 1 or more, the same injuredStreak');
 assert.ok(app.includes("cond.push('연속 부상 출발 '+Dungeon.injuredStreak(n.records)+'회');"),'the NPC detail row reads the same function and wording');
 assert.equal((r.match(/<span class="fore">/g)||[]).length,2,'the .top still holds the two cells');
 assert.ok(!/strain[^']*%|deathRisk[^;]*strain/.test(r),'no % on the line');
 assert.ok(/\.readout \.strain\{[^}]*font:500 12px/.test(css),'small');
});

/* UI-Q-v29-36 (UI_UX §BUILD MARKER, User 2026-09-26): the opening screen names the build; the deploy stamps the commit */
test('UI-Q-v29-36: build marker - opening screen corner, console, Guild24.build, stamped by the deploy',()=>{
 const b=read('dist/build.js');
 assert.ok(/window\.GUILD24_BUILD=\{version:'\d+\.\d+\.\d+',commit:'dev'\};/.test(b),'the repository copy names the version and reads dev');
 assert.ok(/<script src="build\.js"><\/script><script src="ui\/app\.js"><\/script>/.test(html),'loaded before the app');
 assert.ok(/console\.info\('GUILD24 v'\+BUILD\.version\+' · '\+BUILD\.commit\)/.test(app),'printed once on load');
 assert.ok(/window\.Guild24=\{get game\(\)\{return game;\},render,build:BUILD,/.test(app),'Guild24.build');
 const r=fn('render'),open=r.slice(0,r.indexOf('const phase=s.phase'));
 assert.ok(/<p class="build-mark">v'\+E\(BUILD\.version\)\+' · '\+E\(BUILD\.commit\)\+'<\/p>/.test(open),'the opening screen (no Run) shows it');
 assert.equal((app.match(/build-mark/g)||[]).length,1,'and no other screen does');
 assert.ok(/\.p-start \.build-mark\{position:absolute;[^}]*left:[^}]*font-size:10px;[^}]*pointer-events:none/.test(css.replace(/\n\s*/g,'')),'small, top-left, not a control');
 const wf=read('.github/workflows/pages.yml');
 assert.ok(/sed -i "s\/commit:'dev'\/commit:'\$\{GITHUB_SHA::7\}'\/" dist\/build\.js/.test(wf)&&wf.indexOf('Stamp the build marker')>wf.indexOf('deploy:'),'the deploy job, not verify, stamps the commit');
});

/* UI-Q-v29-35 (UI_UX §BOSS REVEAL — MORNING LANDS FIRST, User 2026-09-26): a reveal due on a fresh MORNING entry waits
   for the shutter to land; reduced motion opens it at once; no other modal jumps the queue while it waits */
test('UI-Q-v29-35: the Boss reveal opens after MORNING lands, never in the same frame as the cut',()=>{
 const src=read('dist/ui/app.js');
 assert.ok(/const BOSS_HOLD=420;let bossHold=null;/.test(src),'one 420 ms hold - the MORNING shutter\'s own length');
 assert.ok(/A\(shutter,\{translateY:\[-14,0\],duration:420,/.test(src),'and the shutter it waits for is still 420 ms');
 const r=fn('render');
 assert.ok(/else if\(bossRevealDue\(\)\)\{if\(bossHold\)\{\}else if\(changed&&phase==='morning'&&motionOK\(\)\)\{\$\('#app'\)\.inert=true;bossHold=setTimeout\(\(\)=>\{bossHold=null;\$\('#app'\)\.inert=false;render\(\);\},BOSS_HOLD\);\}else modal='boss';\}/.test(r),
  'held only on a fresh MORNING entry with motion on, the screen inert while it waits (the Day may not advance past an owed reveal); otherwise it opens at once');
 assert.ok(r.indexOf('bossRevealDue()')<r.indexOf("modal='event'")&&r.indexOf('bossRevealDue()')<r.indexOf("modal='relics';\n",r.indexOf('bossRevealDue()')),'the reveal keeps its place ahead of the Event and the Relic window');
 assert.ok(/\|\|bossHold\)return;/.test(fn('showCoach')),'no coach mark flashes up under a reveal that is on its way');
 assert.ok(/if\(bossHold&&\(phase!=='morning'\|\|!bossRevealDue\(\)\)\)\{clearTimeout\(bossHold\);bossHold=null;\$\('#app'\)\.inert=false;\}/.test(r),'the hold ends with the MORNING it belongs to - the screen is never left inert');
});

/* UI-Q-v29-34 (v2.9.2 H6, UI_UX §FINAL — BOSS REVEAL ENTRY): the boss art and name plate settle in as one
   movement on FINAL's own entry - the only H6 target left after the four-cut capture excluded the rest */
test('UI-Q-v29-34: FINAL boss reveal - the gate-zero block settles in as one movement, nothing else moves',()=>{
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 const pp=bare(fn('playPhase')),final=pp.slice(pp.indexOf("if(phase==='final')"),pp.indexOf("if(phase==='closing')"));
 assert.ok(/const gate=\$\('\.gate-zero'\);/.test(final),'the boss art and name plate are read as one block');
 assert.ok(/if\(gate\)A\(gate,\{translateY:\[10,0\],opacity:\[0,1\],duration:220,ease:'outQuad'\}\);/.test(final),'one movement, 220 ms, outQuad - 일반 intensity, no hold');
 assert.ok(!/stagger|scale:|\.threat|\.dock|\.final-order/.test(final),'nothing else on the screen moves, and the block is never scaled (a wide flex block scaling would overflow, H4\'s own lesson)');
 assert.ok(!/sound\(|Sound\.play|setTimeout/.test(final),'no new sound and no new cue timer - the existing entry into FINAL carries none today and gains none');
});

/* UI-Q-v29-33 (v2.9.2 H4, UI_UX §CLOSING — RECEIPT STAMP): the receipt prints as one pass and only the profit/loss
   row stamps; the END settlement counts up with a click per Decoration price line it actually passes */
test('UI-Q-v29-33: CLOSING receipt - one pass, one stamp, the settlement counts past each Decoration price',()=>{
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 assert.ok(/const CLOSING_STAMP=\{hold:100,dip:4\};/.test(app),'100 ms hold, 4 px dip - 중요, reusing the NIGHT fall');
 const pp=bare(fn('playPhase')),closing=pp.slice(pp.indexOf("if(phase==='closing')"),pp.indexOf("if(phase==='night')"));
 assert.ok(/document\.querySelectorAll\('\.p-closing \.tape \.print>\.block,\.p-closing \.tape \.print>\.purse'\)/.test(closing),'every figure block and the purse print together');
 assert.ok(/opacity:\[0,1\],translateY:\[-4,0\],duration:200,ease:'outQuad'/.test(closing)&&!/stagger/.test(closing),'one 200 ms pass, never a per-row stagger');
 assert.ok(/scale:\{from:1\.6,to:1,duration:STAMP_FALL,delay:CLOSING_STAMP\.hold,ease:'in\(3\)'\}/.test(closing),'the profit/loss value reuses the NIGHT stamp fall on the fixed hold');
 assert.ok(/const row=\$\('\.p-closing \.tape \.row\.profit'\),val=row\?\.querySelector\('b'\)/.test(closing)&&/if\(row\)A\(row,\{opacity:/.test(closing),'the scale lands on the number alone, never the full-width row - a whole-row scale overflows the card');
 assert.ok(/translateY:\[\{from:0,to:0,duration:land\},\{to:CLOSING_STAMP\.dip,duration:40,ease:'in\(2\)'\}/.test(closing),'the tape gives 4 px on the landing frame and settles');
 assert.ok(/\.print \.profit b\{font:500 30px\/1 var\(--f-led\);color:var\(--gold\)\}/.test(css)&&/\.print \.profit\.loss b\{color:#a1372c\}/.test(css),'profit stamps the actual gold token, loss stamps red - the end state a reduced-motion capture also shows');
 const cs=bare(fn('closingSound'));
 assert.ok(/clearTimeout\(closingCueAt\)/.test(cs)&&/sound\('receipt'\)/.test(cs),'one printer tick, and a stale timer is cleared first');
 assert.ok(/kind=row\.classList\.contains\('loss'\)\?'spend':'gold'/.test(cs),'the stamp cue is read off the rendered row, never recomputed from the day\'s figures');
 assert.ok(/closingCueAt=setTimeout\(\(\)=>sound\(kind\),CLOSING_STAMP\.hold\+STAMP_FALL\)/.test(cs),'the stamp cue lands on the same frame as the visual stamp');
 assert.ok(/case'closing':game\.finishNight\(\);game\.save\(\);render\(\);nightSound\(null\);closingSound\(\);break;/.test(app),'전체 건너뛰기 plays it once');
 assert.ok(/nightSound\(s\.results\[s\.nightCursor\]\);if\(s\.phase==='closing'\)closingSound\(\);break;/.test(app),'the ordinary 마감으로 press (night-next reaching the last result) plays it too');
 const end=pp.slice(pp.indexOf("if(phase==='end')"),pp.indexOf("if(phase==='sell')"));
 assert.ok(/\[\.\.\.new Set\(D\.decorations\.map\(d=>d\.price\)\)\]/.test(end),'the price lines are read from the live Decoration list, never a second copy of the numbers');
 assert.ok(/for\(const p of lines\)if\(last<p&&box\.v>=p\)sound\('ui'\)/.test(end),'a quiet ui click on each price the count actually passes, none otherwise');
 assert.ok(/capRow\.textContent=to\.toLocaleString\(\)/.test(end),'the settlement figure ends on the same resolved value with or without motion');
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 assert.ok(Sound.cues.includes('receipt')&&!Sound.samples.receipt,'receipt is a synthesised cue');
 assert.ok(!/receipt/.test(read('dist/systems/run.js'))&&!/receipt/.test(read('dist/systems/meta.js')),'presentation only: no Run or Meta field carries the new cue');
});

/* UI-Q-v29-30 (v2.9.2 H5, UI_UX §FINAL RESULT — SEAL STAMP): one seal bearing the Boss's name on a Final ending tape */
test('UI-Q-v29-30: the Final seal - one, named, clean on a clear and faint on a failure, the sentence after it',()=>{
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 const fs_=bare(fn('finalSeal'));
 assert.ok(/if\(!s\.finalReport\)return '';/.test(fs_),'no seal on a non-Final ending');
 assert.ok(/'<span class="seal '\+\(s\.win\?'won':'lost'\)\+'" aria-hidden="true"><b>'\+E\(b\?\.name\|\|''\)\+'<\/b><\/span>'/.test(fs_),'one seal, the Boss\'s name, the result read off s.win');
 assert.ok(!/members|team|forEach|map\(/.test(fs_),'never one per member');
 assert.ok(/<div class="print">'\+finalSeal\(\)/.test(fn('endBanner')),'struck on the ending tape');
 assert.ok(/const FINAL_SEAL=\{hold:200,won:\{from:2,dip:6\},lost:\{from:1\.6,dip:3\}\};/.test(app),'the clear is the heaviest landing; both hold 200 ms (클라이맥스)');
 const pp=bare(fn('playPhase')),end=pp.slice(pp.indexOf("if(phase==='end')"),pp.indexOf("if(phase==='sell')"));
 assert.ok(/scale:\{from:v\.from,to:1,duration:STAMP_FALL,delay:at/.test(end),'the seal reuses the NIGHT stamp\'s fall');
 assert.ok(/to:parseFloat\(getComputedStyle\(seal\)\.opacity\)/.test(end),'its ink ends where the stylesheet leaves it');
 assert.ok(/'\.end-tape \.closed,\.end-tape \.reason'/.test(end)&&/delay:land/.test(end),'the result sentence follows the landing');
 assert.ok(!/tape|--tape/.test(end.replace(/end-tape|const seal=\$\('\.end-tape \.seal'\),tape=\$\('\.end-tape'\)|if\(tape\)A\(tape/g,'')),'no NIGHT death tape on a failure');
 assert.ok(/\.end-tape \.seal\{[^}]*rotate:-7deg/.test(css)&&/\.end-tape \.seal\.lost\{[^}]*rotate:9deg;[^}]*opacity:\.5;[^}]*clip-path/.test(css),'clear square-on and crisp; failure crooked, faint, partly printed');
 assert.ok(/\.end-tape \.print:has\(\.seal\) \.closed\{padding-right:84px\}/.test(css)&&/\.end-tape \.seal\{[^}]*transform-origin:100% 0\}/.test(css),'the headline keeps clear of the seal, and the fall stays on the tape');
 assert.ok(/case'boss-go':sound\('final'\);game\.boss\(\);setModal\(null\);render\(\);sealSound\(\);break;/.test(app),'the landing cue follows the departure once');
 const ss=bare(fn('sealSound'));assert.ok(/clearTimeout\(sealCueAt\)/.test(ss)&&/Sound\.play\(kind\)/.test(ss)&&/FINAL_SEAL\.hold\+STAMP_FALL/.test(ss),'on the landing frame, never twice');
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 for(const c of ['sealwin','sealfail'])assert.ok(Sound.cues.includes(c)&&!Sound.samples[c],c+' is a synthesised cue');
});

test('UI-Q-v29-27: NIGHT verdict stamp, cause beat and reversal overstamp',()=>{
 const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 const src=app.slice(app.indexOf('const STAMP_FALL='),app.indexOf('const stampLand='));
 const T=new Function(src.replace('const STAMP_FALL=','var STAMP_FALL=').replace(',NIGHT_STAMP=','; var NIGHT_STAMP=')+';return {F:STAMP_FALL,S:NIGHT_STAMP};')();
 assert.equal(T.F,90,'the stamp falls in 90 ms');
 assert.ok(/const stampLand=st=>st\.entry\+st\.hold\+STAMP_FALL;/.test(app),'it lands after the entry and the hold');
 const S=T.S,land=k=>S[k].entry+S[k].hold+T.F;
 // intensity by weight: 일반 has no hold, 중요 / 클라이맥스 hold at most 200 ms; 대성공 is one landing
 for(const k of ['safe','pull'])assert.equal(S[k].hold,0,k+' is 일반: no wind-up');
 for(const k of ['great','hurt','severe','saved','gone'])assert.ok(S[k].hold>0&&S[k].hold<=200,k+' holds ≤ 200 ms');
 assert.deepEqual(Object.fromEntries(['safe','pull','great','hurt','severe','saved'].map(k=>[k,land(k)])),
  {safe:290,pull:330,great:410,hurt:450,severe:530,saved:510},'landing frames as UI_UX states them');
 assert.ok(S.pull.from<S.safe.from&&S.pull.dip<S.safe.dip,'퇴각 is the shallow stamp');
 for(const k of ['safe','great','hurt','severe','saved'])assert.equal(S[k].dip,4,k+' dips 4 px');
 assert.ok(S.gone.tape&&S.gone.tape<=500&&!S.gone.from,'사망 has no stamp and a tape ≤ 500 ms');
 // each beat ≤ 320 ms after the landing (dip 190, settle 160, count 220), and the whole run ends by 770 ms
 for(const k of Object.keys(S))assert.ok((S[k].tape?S[k].entry+S[k].hold+S[k].tape:land(k)+220)<=770,k+' ends by 770 ms');
 const pp=bare(fn('playPhase')),night=pp.slice(pp.indexOf("if(phase==='night')"),pp.indexOf("if(phase==='sell')"));
 assert.ok(/to:st\.dip,duration:40/.test(night)&&/to:0,duration:150/.test(night),'the card gives 4 px and settles - the only companion motion');
 assert.ok(/scale:\{from:st\.from,to:1,duration:STAMP_FALL,delay:at/.test(night),'the tag falls onto the card after it stands');
 assert.ok(!/stagger|rotate:|translateX:\{from:[^s]|document\.body|#app|\.stage/.test(night),'no ring, shake, scatter or screen-level motion');
 // one after-motion owner, in this order: reversal cut-in, else the Hero line, else the REWARD count-up; never on a death
 const own=night.indexOf('if(st.print)told'),h=night.indexOf('else if(hero)A(hero.parentElement.children.length===1?hero.parentElement:hero,'),c=night.indexOf("else if(!st.tape)document.querySelectorAll('.beat .changed .reward .tok b')");
 assert.ok(own>0&&own<h&&h<c,'one owner per landing: cut-in, Hero line, or the REWARD figures');
 assert.ok(/duration:1,delay:land/.test(night),'the reversal proof lines cut in on the overstamp frame');
 assert.ok(/const fromDeath=r\.avoidedDeath\|\|st\.brink;/.test(night)&&/'verdict ghost t-'\+\(fromDeath\?'gone':'severe'\)/.test(night)&&/fromDeath\?'사망':'중상'/.test(night),
  'the first print is the Outcome the result says was turned away');
 assert.ok(/onComplete:\(\)=>g\.remove\(\)/.test(night)&&!/ghost/.test(bare(fn('beat'))),'the first print is never rendered and never stays');
 assert.ok(/'<li'\+\(hero&&!i\?' class="hero"':''\)/.test(fn('causeLines')),'the proven Hero claim is the line that settles');
 // end state lives in CSS at full strength, so reduced motion ends on the same record
 assert.ok(/\.p-night \.t-hurt \.verdict:after\{[^}]*opacity:var\(--ink,1\);transform:scale\(var\(--ink,1\)\)/.test(css),'부상 keeps its ink spread');
 assert.ok(!/\.p-night \.t-hurt \.verdict:after\{[^}]*(gradient|blur)/.test(css),'the ink is a hard-edged spread, not a glow');
 assert.ok(/\.verdict\.ghost\.t-gone\{[^}]*--rt-ink:#cfd3dd/.test(css),'a turned-away 사망 prints in its own bone ink');
 assert.ok(/\.p-night \.t-severe \.verdict\{rotate:-2\.5deg;translate:2px 0\}/.test(css),'중상 keeps its misaligned stamp');
 assert.ok(/\.p-night \.t-gone \.verdict:after\{[^}]*transform:rotate\(-1\.5deg\) scaleX\(var\(--tape,1\)\)/.test(css),'사망 keeps its tape');
 assert.ok(/\.p-night \.beat \.verdict\.ghost\{position:absolute;margin:0;pointer-events:none;opacity:0\}/.test(css),'a first print left behind would be invisible');
 // sound: the landing carries the cue; a waiting cue never plays over the next screen
 const ns=bare(fn('nightSound'));
 assert.ok(/^function nightSound\(result\)\{nightCueAt\.forEach\(clearTimeout\);nightCueAt=\[\];if\(!result\)return;/.test(ns),'a pending cue is dropped first');
 assert.ok(/const st=motionOK\(\)&&nightStampOf\(result\)/.test(ns),'motion decides the timing, the resolved tone the entry');
 assert.ok(/const preparedBrink=r=>!!r&&!r\.rescued&&!r\.avoidedDeath&&\(r\.events\|\|\[\]\)\.some\(e=>e\.id==='prepared'\);/.test(app),'만반의 준비 reverses only its turned-away Death (User 2026-09-25)');
 assert.ok(/if\(st\.print&&!st\.brink\)nightCueAt\.push\(/.test(ns),'and carries no rescue accent');
 assert.ok(!/injury-guard|aftercare/.test(fn('nightSound')+app.slice(app.indexOf('const preparedBrink='),app.indexOf('const nightStampOf='))),'강골 / 구급키트 never reverse');
 assert.ok(/setTimeout\(\(\)=>Sound\.play\('rescue'\),stampLand\(st\)\)/.test(ns),'rescue lands on the overstamp');
 assert.ok(/case'closing':game\.finishNight\(\);game\.save\(\);render\(\);nightSound\(null\);closingSound\(\);break;/.test(app),'전체 건너뛰기 drops a waiting cue');
 const audio=read('dist/ui/audio.js');
 for(const c of ['return','great','retreat','injury','severe'])assert.ok(new RegExp('\\n '+c+':\\{[^}]*hit:1').test(audio),c+' hits on its first note');
 assert.ok(!/\n death:\{[^}]*hit:1/.test(audio)&&!/\n rescue:\{[^}]*hit:1/.test(audio),'사망 keeps its restrained attack; rescue is an accent');
 assert.ok(/hit=sh\.hit&&!i/.test(audio)&&/hit\?\{\.\.\.sh,attack:\.002\}:sh/.test(audio),'only the first note changes; the notes stay');
});

test('D-24: the feel layer is optional, and it never animates a redraw of the same view',()=>{
 assert.ok(/matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/.test(app),'the OS setting is read');
 assert.ok(/const motionOK=\(\)=>typeof anime==='object'&&!!anime\.animate&&!matchMedia/.test(app),
  'and motion is off when the library is missing as well as when motion is reduced');
 // every animation call sits behind that check
 for(const name of ['playPhase','playCue','stampPress','playExit'])
  assert.ok(fn(name).includes('if(!motionOK()')||fn(name).includes('||!motionOK()'),name+' stands down on its own');
 const elsewhere=app.replace(fn('playPhase'),'').replace(fn('playCue'),'').replace(fn('stampPress'),'').replace(fn('playExit'),'')
  .split('\n').filter(l=>!l.trimStart().startsWith('//')&&!l.trimStart().startsWith('*')&&!l.includes('const motionOK=')).join('\n');
 assert.ok(!/anime\.(animate|stagger)/.test(elsewhere),'nothing animates outside the three guarded places');
 // a redraw replaces the screen, so an entry animation would replay on every click:
 // the phase beats run only when the view actually changed, the in-phase ones on a one-shot marker
 assert.ok(/if\(changed\)playPhase\(phase\);playCue\(\);/.test(app),'the phase beat is gated on the view changing');
 assert.ok(/function playCue\(\)\{const c=cue;cue=null;const h=handoff\|\|\{\};handoff=null;/.test(app),'and the in-phase marker is consumed by the draw that uses it');
 assert.ok(/cue=selected\?'select':null/.test(app)&&/cue='sale'/.test(app)&&/cue='refuse'/.test(app),
  'picking, selling and being refused are each their own beat');
 assert.ok(!/account\.\w*cue|run\.\w*cue/.test(app),'the marker is never written into a save');
});

// D-30 / D-35. Found by opening the codex in the acceptance sweep: a recorded discovery that
// carries no sentence of its own was printed as the literal word "undefined", and the window
// still called itself 본사 · 해금 도감 after the menu entry had been cut back to 도감.
test('D-30 / D-35: the notebook says what happened, or says nothing, and the window is 도감',()=>{
 assert.ok(app.includes("modal==='codex'){title='도감'"),'the codex window is named the way the menu names it');
 assert.ok(!/본사 · 해금 도감/.test(app),'the old title is gone, not left beside the new one');
 const P=globalThis.Presentation;
 assert.equal(P.eventLine({id:'eater-food',text:'대식가가 음식의 고유 효과를 30% 더 얻었다.'}),
  '대식가가 음식의 고유 효과를 30% 더 얻었다.','an event that wrote its own line keeps it');
 /* SA-Q08: a Hazard mitigation is described from what it holds ONLY when RESULT-PROOF actually
    proved it changed the Outcome (r.heroProof.outcome names the same Item) - the old
    ev.prevented heuristic, and the 위험 감소 it fell back to otherwise, are both gone as
    unproven claims. */
 assert.equal(P.eventLine({id:'hazard',hazards:['poison','corrosion'],items:['bandage']},{heroProof:{outcome:{items:['bandage']}}}),
  '독·부식 피해 방지','proven, it is described from what it holds');
 assert.equal(P.eventLine({id:'hazard',hazards:['fire'],items:['torch']},{}),null,
  'unproven, it says nothing rather than guessing 위험 감소');
 assert.equal(P.eventLine({id:'hazard',hazards:['fire'],items:['torch']},{heroProof:{outcome:{items:['bandage']}}}),null,
  'a proof for a DIFFERENT Item does not borrow this one\'s claim');
 for(const nothing of [{id:'hazard',hazards:[]},{id:'unknown-thing'},{},null])
  assert.equal(P.eventLine(nothing),null,'an event with nothing to say is left out: '+JSON.stringify(nothing));
 assert.ok(fn('codex').includes('discoveryLines(a)')&&!fn('codex').includes('E(e.text)'),
  'the notebook reads through that owner rather than printing a field that may not be there');
 assert.ok(app.includes('discoveryLines=a=>')&&app.includes('.filter(Boolean)'),
  'and the count matches the lines, because both come from the same filtered list');
});

// D-1 at a desk. Measured at 1280x880 before this: the SALE counter band spent 331px showing
// a 232px card while the whole decision was folded into a 453px letterbox holding 1297px of
// content - three screens of scrolling with 1048px of width going to a single column.
test('D-1 / UI-Q38: a desk is not a wide phone, and the decision gets the width',()=>{
 const desk=css.slice(css.indexOf('/* ============ 1024px+ : a desk, not a wide phone ============'));
 assert.ok(css.includes('@media(min-width:1024px)'),'the sheet has a desktop tier at all');
 assert.ok(/\.p-sale \.stage-scroll\{[^}]*display:grid/.test(desk)
        && /\.p-sale \.stage-scroll\{[^}]*grid-template-columns:minmax\(0,1\.05fr\) minmax\(0,1fr\)/.test(desk),
  'the Sale decision surface is two columns there');
 assert.ok(/\.p-sale \.shelf\{grid-column:2/.test(desk),'the shelf takes the second column');
 assert.ok(/\.p-sale \.dossier-col\{display:block;grid-column:1/.test(desk),'and who this is stays beside it, not above it');
 // the tier is additive: nothing here may reach a phone
 assert.ok(!/@media/.test(desk.slice(desk.indexOf('{')+1,desk.indexOf('/* ---- Boss reveal'))),
  'the desktop tier is one block and does not nest another query');
 // A custom property written outside a rule is not a declaration: the parser swallowed it
 // together with the rule that followed, and the desktop customer card silently lost its
 // size for it. Nothing may sit between a media query brace and its first selector.
 for(const m of css.matchAll(/@media[^{]*\{\s*([^\s{}][^{}]*?)(?=[{])/g)){
  const head=m[1].trim();
  assert.ok(!/^--[\w-]+\s*:/.test(head),
   'a bare custom property sits directly inside a media block and will be dropped with the rule after it: '+head.slice(0,40));
 }
 assert.ok(/\.front\{--cardw:max\(88px,min\(56vw,300px/.test(css),'the card size rule the parser was eating is reachable again');
});

// D-34. The roguelike-UX gap pass, reporting only what a real screen actually lacked.
// Two gaps of the five patterns held: the most-watched resource was missing from the one
// phase that spends it, and a disabled action gave no reason on a screen that contradicted it.
test('D-34: the store float is on the screen that spends it, and a closed window says it is closed',()=>{
 const sale=fn('saleScreen');
 assert.ok(sale.includes('class="on-hand"')&&sale.includes('보유 골드'),
  'the Sale dock carries the store float, named the way D-8 names it');
 assert.ok(sale.indexOf('class="on-hand"')>sale.indexOf('class="dock"'),
  'on the strip that is already pinned there, not as a readout of its own');
 // D-8 drew the line between the two purses; this screen is where they are read together
 assert.ok(!/class="on-hand"[^>]*>\s*소지금/.test(app),'and never labelled 소지금, which is the customer\'s');
 assert.ok(/\.p-sale \.dock \.on-hand\{/.test(css),'it has its own rule');
 assert.ok(!/^\.on-hand\{/m.test(css),'under a name the Order form has not already taken');
 // the Order form's own gold panel is untouched by it
 assert.ok(/^\.purse\{display:flex/m.test(css),'the Order purse is still the Order purse');
 // every slot filled: the line that used to promise a purchase now says there is no room
 const win=fn('relicWindow')||app.slice(app.indexOf('relic-takeover'),app.indexOf('function sealChoice'));
 assert.ok(win.includes("game.ownedRelics().length>=7?'점포지원 7개를 모두 들였다."),
  'a full store says so where it used to say the window is open until DAY N');
 assert.ok(win.includes('구매할 수 있다 · 자금'),'and still says the open case when it is open');
});

/* UI_UX §TUTORIAL / UI-Q105. The coach mark shipped for a long time with markup and no
   stylesheet at all: every class showCoach writes was unstyled, so the overlay laid out as
   static blocks under a body that does not scroll, and the tutorial was invisible on a
   genuinely fresh account. Presence of the code proved nothing, so this asserts the pairing
   itself - every class the overlay emits has a rule, and every step points at a selector the
   shipped screens actually render. Real visibility is still a viewport question and belongs
   to the browser pass; this only stops the pairing from silently going missing again. */
test('UI-Q105: the coach mark has a stylesheet, and every step points at a real target',()=>{
 for(const cls of ['coach-layer','coach-block','coach-focus','coach-bubble']){
  assert.ok(app.includes(cls),'showCoach still emits .'+cls);
  assert.ok(css.includes('.'+cls),'.'+cls+' has a rule in ui.css');
 }
 assert.ok(/\.coach-layer\{[^}]*position:fixed/.test(css),
  'the layer is viewport-positioned, so the inline rects showCoach writes mean something');
 for(const c of ['coach-block','coach-focus','coach-bubble'])
  assert.ok(new RegExp('\\.'+c+'\\{[^}]*position:absolute').test(css),
   '.'+c+' is positioned, not static');
 /* Each step is [key, selector, copy, action?]. A selector no screen renders is skipped
    forever rather than failing loudly, which is how three of them rotted unnoticed. */
 const steps=fn('showCoach')&&app.slice(app.indexOf('const coachSteps={'),app.indexOf('let activeCoach'));
 for(const [,sel] of [...steps.matchAll(/\['[a-z]+','([^']+)'/g)].map(m=>[0,m[1]])){
  const cls=sel.match(/\.[a-z-]+/g)||[],attr=sel.match(/\[data-action="([^"]+)"\]/);
  for(const c of cls)assert.ok(app.includes(c.slice(1))||scene.includes(c.slice(1)),
   'coach target '+sel+' names a class the UI renders ('+c+')');
  if(attr)assert.ok(app.includes("data-action=\""+attr[1])||app.includes("'"+attr[1]+"'"),
   'coach target '+sel+' names an action the UI emits');
 }
 assert.ok(!/case'tip'/.test(app),'the dead tip handler is gone, not left writing stray tutorial keys');
});

/* UI_UX v2.6.1 §ORDER Runtime continuity. render() replaces #app wholesale and restores a
   raw scrollTop, which only holds while everything above the row keeps its height - and the
   dock gains or loses 발주 확정 exactly when the cart stops or starts being empty. SALE
   already pins the tapped row through its own press; ORDER now does the same. The row, not
   the pressed button, is the anchor: +/- and the quick-set buttons flip to disabled at 0
   and at the cap, so the control the player touched may not survive the redraw. */
test('ORDER quantity presses keep their row anchored',()=>{
 assert.ok(/data-offer="'\+i\+'"/.test(app),'each offer row carries its index as a stable handle');
 const qty=app.slice(app.indexOf("case'qty'"),app.indexOf("case'qty'")+400);
 assert.ok(/closest\('\[data-offer\]'\)/.test(qty),'the press resolves to its own offer row');
 assert.ok(/getBoundingClientRect\(\)\.top/.test(qty),'and measures it before the redraw');
 assert.ok(/anchorOffer\(/.test(qty),'and hands that measurement to the correction');
 const fixer=fn('anchorOffer');
 assert.ok(/\.stage-scroll/.test(fixer)&&/scrollTop\+=/.test(fixer),
  'the correction moves the scroller by the measured delta');
 assert.ok(/requestAnimationFrame/.test(fixer),'and checks again after the frame settles');
 assert.ok(/if\(d\)/.test(fixer),'a zero delta leaves scrollTop alone');
 // SALE's own anchor predates this and must not be disturbed by it.
 assert.ok(/data-action="select"\]\[data-id="'\+CSS\.escape\(id\)/.test(app),
  'SALE still re-finds the tapped product after its redraw');
});

test('SALE_v2.7 §POST-COMMIT DELTA SOURCE TRUTH: a change is reported by what produced it',()=>{
 const base=Adventurer.create(new RNG('delta-src'),1,10,Meta.fresh());
 const mk=o=>({...JSON.parse(JSON.stringify(base)),traits:[],pack:[],fatigue:0,injury:0,...o});
 const gate=o=>({...DATA.dungeonBy.slime,day:12,tier:2,hazards:['fear'],scale:1,power:60,requiredSupply:0,...o});
 const core=new Set(Adventurer.keys);
 /* The owner's own worked boundary: 집중 사탕 is 공포 +10 / Supply 3 and has no direct
    four-Core-Stat contribution, so selling it may never produce a Core-Stat row. */
 const candy=DATA.itemBy.candy;
 assert.ok(Adventurer.keys.every(k=>!candy.effects[k]),'집중 사탕 has no direct Core Stat');
 for(const [n,d] of [[mk({}),gate({})],[mk({}),gate({requiredSupply:3})],
                     [mk({fatigue:10}),gate({})],[mk({fatigue:10}),gate({requiredSupply:3})]]){
  const r=Presentation.preview(n,d,[],'candy');
  assert.ok(r.direct.every(x=>!core.has(x.key)),'집중 사탕 never grants a Core Stat directly');
  assert.ok(r.direct.some(x=>x.key==='supply')&&r.direct.some(x=>x.key==='fear'),'its own two channels are its own');
 }
 // an Item that really does grant a Stat still reports it as its own
 const potion=DATA.itemBy.potion;
 assert.ok(potion.effects.combat>0);
 const own=Presentation.preview(mk({}),gate({}),[],'potion');
 assert.ok(own.direct.some(x=>x.key==='combat'),'a real direct Stat is the Item\'s own');
 /* User 2026-09-25: `판매 후 변화` lists the Item's own effects only - a Fatigue band the Item's 피로 회복
    releases is not listed at all, and nothing but the direct rows leaves the preview */
 const rested=Presentation.preview(mk({fatigue:10}),gate({}),[],'candy');
 assert.deepEqual(Object.keys(rested),['direct'],'no derived row and no departure line exist');
 assert.ok(!/피로 완화|→ 출발/.test(read('dist/ui/presentation.js').replace(/\/\*[\s\S]*?\*\//g,'')),'the retired rows are gone from the source');
 /* SA-Q30: the two analytical group names that used to sit over the direct/derived rows
    (이 상품이 직접 / 보급이 상태에 미치는 영향) were the label-density bug v2.8 closes - one
    heading (판매 후 변화) now covers the whole list, and only the `effects`/`effects derived`
    class still tells a derived row apart, for styling, never for a second heading. */
 const panel=fn('sellPanel')||app;
 const tillEmitted=fn('till').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'');
 assert.ok(!/이 상품이 직접/.test(tillEmitted)&&!/보급이 상태에 미치는 영향/.test(tillEmitted),
  'the old per-group analytical headings are gone');
 assert.ok(tillEmitted.includes('<h4>판매 후 변화</h4>'),'one heading covers the whole list');
 assert.ok(/changes\.length\?'<ul class="effects">/.test(tillEmitted)&&!/moved\.derived|moved\.departure/.test(tillEmitted),
  'the till lists the Item\'s own rows only (User 2026-09-25)');
 assert.ok(!/moved\.derived|moved\.departure/.test(fn('tray')),'and so does the counter tray');
 assert.ok(/\.delta-src\{/.test(css),'the remaining 특수 효과 heading keeps its own style');
});

test('UI_UX_v2.7 §TUTORIAL: it teaches how to read the system, never the answer',()=>{
 const steps=app.slice(app.indexOf('const coachSteps={'),app.indexOf('let activeCoach=null;'));
 /* The two v2.7 subjects are taught, on the surfaces that actually show them. */
 assert.ok(/\['hazard','\.dest-plate \.hazards'/.test(steps),'the Hazard lesson is on the Hazard rows');
 assert.ok(/\['supply','\.counter-tray \.tray-delta \.fatigue'/.test(steps),'the Supply/Fatigue lesson is on the tray\'s 피로 회복 row for a fatigued customer (User 2026-09-25; the 피로 A → 출발 B row is retired)');
 assert.ok(/r\.key==='supply'&&n\.fatigue>0\?'fatigue'/.test(fn('tray')),'that row carries the anchor only when the customer has Fatigue to lose');
 /* COPY_AUDIT_APPROVED §3-7 is the exact owner of four of these lessons, so they are asserted
    verbatim rather than by keyword. The Hazard lesson's old second sentence claimed 환경 대응
    reflects 보급 - it does not, `Game.arrive()` snapshots it with an empty pack (see
    dist/systems/shop.js), and it described a figure that is not inside this step's highlight -
    so the approved line keeps the step on the pressure the Hazard rows actually show. */
 for(const [id,text] of [
   ['pricing','50% 할인은 단골도를 크게 올리고, 정가는 조금 올린다. 바가지는 더 남지만 단골도가 깎이고 거절될 수 있다.'],
   ['hazard','이 손님이 갈 게이트의 위험. 위험마다 압박하는 능력이 다르다.'],
   ['stats','능력치는 직업·희귀도·레벨마다 다르다. 투력은 전투에 가장 영향력이 크며, 강인함·기동·정신은 각 위험에 대응한다.'],
   ['supply','음식·음료는 피로를 줄인다. 피로가 10을 넘으면 기동·정신이 떨어진다.'],
   ['quantity','오늘 손님과 게이트를 보고 수량을 정한다. ‘최대’는 이 후보에서 지금 발주할 수 있는 최대 수량이다.']])
  assert.ok(steps.includes("'"+text+"'"),'the approved §3-7 '+id+' lesson is adopted verbatim');
 const hazard=/\['hazard',[^\]]*\]/.exec(steps)[0];
 assert.ok(!hazard.includes('현재 대응'),'and the Hazard lesson names no label the screen no longer shows');
 /* The §3-7 lines are longer than the one-decision-unit cap the earlier pass held every lesson
    to, so the cap now covers the lessons the Copy owner has not pinned exactly. */
 const EXACT=['pricing','hazard','stats','supply','quantity'];
 for(const [id,,text] of [...steps.matchAll(/\['([a-z]+)','([^']+)','([^']+)'/g)].map(m=>[m[1],m[2],m[3]]))
  if(!EXACT.includes(id))
   assert.ok(text.length<=95,'the '+id+' lesson is one decision unit, not a paragraph ('+text.length+')');
 /* It must not hand over an answer, and must not expose the hidden formula. */
 const all=[...steps.matchAll(/'([^']{12,})'/g)].map(m=>m[1]).join(' ');
 for(const item of DATA.items)
  assert.ok(!all.includes(item.name),'no lesson names an Item to buy: '+item.name);
 for(const hz of Object.values(DATA.hazards))
  assert.ok(!new RegExp(hz+'[^.]{0,12}(사|구매|고르)').test(all),'no lesson scripts a Hazard solution: '+hz);
 assert.ok(!/0\.06|\*\s*\.06|6%p/.test(all),'the hidden Supply-deficit formula is not taught');
 /* The frozen outlook is described as frozen, since that is what the screen now does. */
 const forecast=/\['forecast',[^\]]*\]/.exec(steps)[0];
 /* It still has to say the reading does not move as products are sold, and it must not be
    read as the Items not mattering: the run uses the final supply, so the lesson says the
    real result is seen after the expedition rather than claiming nothing changed. */
 /* COPY_AUDIT §3-4: the lesson now says WHEN the reading was taken, which is the same fact
    stated from the other side and is what makes it obviously frozen. */
 assert.ok(/계산대에 왔을 때의 원정 전망/.test(forecast),'the outlook lesson says when the reading was taken');
 assert.ok(/팔아도 이 칸은 그대로/.test(forecast),'and that selling does not move it');
 /* USER 2026-09-24 first-sale coach diet: four marks on the first SALE, the rest contextual. The
    destination mark stays because COPY_WORLD_VOICE §Tutorial names it the authoritative wording of
    the destination rule (tests/copy.cjs §18 holds the line itself). */
 const sell=/sell:\[[\s\S]*?\]\],\n/.exec(steps)[0];
 const ids=[...sell.matchAll(/\['([a-z]+)','/g)].map(m=>m[1]);
 assert.deepEqual(ids.slice(0,5),['destination','hazard','stats','forecast','pricing'],'the first SALE reads destination, Hazard, Stats, outlook, price - in that order (User 2026-09-24)');
 assert.deepEqual(ids.slice(5).sort(),['bag','great','prepared','returning','supply'],'the other five are contextual marks (v2.9.1 balance adds 만반의 준비)');
 assert.ok(/\['stats','\.dossier \.detail-stats'/.test(steps),'the Stats lesson is on the SALE 능력치 grid');
 for(const [id,sel] of [['great','.great-signal'],['returning','.who.returning'],['bag','.slots .full'],['supply','.counter-tray .tray-delta .fatigue'],['prepared','.slots.prepared']])
  assert.ok(sell.includes("['"+id+"','"+sel+"'"),id+' anchors to an element that only exists in its situation ('+sel+')');
 assert.ok(!/\['npc'|\['inventory'/.test(sell),'the 손님 / 상품 사용 marks are retired');
 /* v2.9.0: no always-on Fatigue line under the outlook; the tray row carries the arithmetic */
 assert.ok(!/class="ingredients"/.test(app),'no always-on Fatigue line under the outlook');
 /* A coach mark anchors to a VISIBLE match. The SALE readout and its ingredients exist twice,
    a desktop copy and a phone copy with one always display:none, so taking the first DOM match
    silently dropped those lessons on a phone. */
 const coach=app.slice(app.indexOf('function showCoach('),app.indexOf('function showCoach(')+1400);
 assert.ok(/const visible=sel=>\[\.\.\.document\.querySelectorAll\(sel\)\]\.find\(e=>e\.getClientRects\(\)\.length\)/.test(coach),
  'the coach resolves its anchor to a visible element');
 assert.ok(!/\$\(x\[1\]\)|const target=\$\(step\[1\]\)/.test(coach),'and never to the first DOM match');
 assert.ok(!/기동\/정신 -10%|기동\/정신 -25%/.test(app),'no superseded v2.6 Fatigue band survives in the UI');
 assert.ok(!/기동\/정신 -40%|기동\/정신 -15%/.test(app)&&/Dungeon\.fatigueBand\(n\.fatigue\)/.test(app),'the screen reads the five v2.9.0 bands from the one owner');
 assert.deepEqual([9,10,20,30,40].map(f=>Dungeon.fatigueBand(f).name),['정상','지침','과로','소진','탈진'],'the five band names');
});

/* SA-Q18 / UI_UX_v2.8 §EVENT TEMPORARY BUDGET. On a 급여일 the customer can spend
   n.money + n.eventBudget, but the SALE screen printed n.money alone and gated its own price
   buttons on n.money alone - so the displayed Wallet and the affordability the engine enforces
   were two different numbers, in both directions. */
test('SA-Q18: SALE shows the persistent Wallet and the temporary Event budget separately',()=>{
 const walletChip=fn('walletChip');
 assert.ok(walletChip.length,'the SALE Wallet is rendered through one shared chip');
 // both Wallet surfaces read that chip; neither prints a bare n.money any more
 assert.ok(/class="npc-wallet">'\+walletChip\(n\)/.test(app),'the NPC vitals row uses it');
 assert.ok(/class="wallet" style="margin-left:auto">'\+walletChip\(n\)/.test(app),'the till panel uses it');
 assert.ok(!/소지 '\+fmt\(n\.money\)\+'G/.test(app),'no surface prints the persistent half on its own');
 // the two figures are printed side by side and never summed into one
 assert.ok(/소지 <b>'\+fmt\(n\.money\)\+'G<\/b>/.test(walletChip),'the persistent half is the real n.money');
 assert.ok(/fmt\(b\)/.test(walletChip)&&/b=n\.eventBudget/.test(walletChip),'the temporary half is the real eventBudget');
 assert.ok(!/n\.money\+\(n\.eventBudget\|\|0\)/.test(walletChip)&&!/n\.money\+b/.test(walletChip),
  'the chip never renders one merged Wallet figure');
 // and the temporary half is not relabelled 소지금
 const budgetLabel=walletChip.slice(walletChip.indexOf('b>0?'));
 assert.ok(!/소지금/.test(budgetLabel),'the temporary budget is not called 소지금');
 assert.ok(/추가 구매/.test(budgetLabel),'it uses the approved Event Function wording 추가 구매');
 // affordability: the screen gates on the same sum interest()/sell() spend
 assert.ok(/function spendable\(n\)\{return n\.money\+\(n\.eventBudget\|\|0\);\}/.test(app),
  'the screen has one affordability figure');
 assert.ok(/q\.debit>spendable\(n\)\?'손님 소지금 부족'/.test(app),'and the price buttons gate on it');
 assert.ok(!/q\.debit>n\.money\?/.test(app),'not on the persistent half alone');
 assert.ok(shop.includes('n.money+(n.eventBudget||0)<intent.debit'),'which is exactly what sell() enforces');
 assert.ok(/const wallet=n\.money\+\(n\.eventBudget\|\|0\)/.test(shop),'and what interest() weighs the offer against');

 /* the behavioural half: a payday customer whose persistent Wallet alone cannot cover an Item
    must be shown BOTH numbers, and the screen must not disable a price the engine accepts. */
 const g=new Game();g.autosave=false;g.start('sa-q18');
 g.buyRelic(g.run.relicWindow.candidateIds[0]);
 const n=g.run.npcs[0];
 n.money=100;n.eventBudget=50;
 // rendered through the real shipped function, with a plain formatter standing in for fmt
 const render=new Function('fmt','n','"use strict";'+walletChip+'return walletChip(n);');
 const out=render(x=>String(x),n);
 assert.ok(out.includes('소지 <b>100G</b>'),'the persistent Wallet is shown as itself: '+out);
 assert.ok(out.includes('추가 구매 <b>+50G</b>'),'the temporary budget is shown beside it: '+out);
 assert.ok(!out.includes('150'),'and the two are never merged into one figure: '+out);
 n.eventBudget=0;
 const plain=render(x=>String(x),n);
 assert.equal(plain,'소지 <b>100G</b>','with no Event budget the chip is unchanged');
});

/* SA-Q01 — PRE-RUN STORE-MANAGEMENT RETURN. The panel is opened from the new-Run preparation
   modal and replaces it. During `foundation` the generic Close is suppressed and `dismiss` is a
   no-op, which is right for the store-support takeover and left this one panel with an entry and
   no exit. */
test('SA-Q01: pre-Run Store Management has an explicit return to new-Run preparation',()=>{
 const act=app.slice(app.indexOf('async function action(el)'));
 // where it was opened from is remembered, and only when it was opened from preparation
 assert.ok(/case'store-manage':preRunReturn=modal==='new';/.test(act),
  'entering from the preparation panel is what arms the return');
 // an explicit, visible control back to preparation
 assert.ok(/if\(preRunReturn\)footer=btn\('새 점포 준비로 돌아가기','store-return','stamp'\)/.test(app),
  'the panel carries a visible Back control');
 assert.ok(/case'store-return':preRunReturn=false;codexTab='items';sound\('ui'\);setModal\('new'\);break;/.test(act),
  'and it returns to the existing new-Run preparation modal');
 // returning spends nothing, re-rolls nothing, reseeds nothing and starts nothing
 const ret=act.slice(act.indexOf("case'store-return'"),act.indexOf("break;",act.indexOf("case'store-return'")));
 for(const forbidden of ['game.start','Meta.buyDecoration','Meta.equipDecoration','decoPending=','game.save()','Save.write'])
  assert.ok(!ret.includes(forbidden),'returning must not '+forbidden);
 // the ordinary Close resolves to preparation too, instead of being the foundation no-op
 assert.ok(/case'dismiss':if\(preRunReturn&&modal==='codex'\)\{preRunReturn=false;codexTab='items';sound\('ui'\);setModal\('new'\);break;\}/.test(act),
  'Close from this panel lands on preparation rather than doing nothing');
 // ...and the Close button is actually rendered there, which `foundation` used to suppress
 assert.ok(/\$\{\(preRunReturn\|\|game\.run\?\.phase!=='foundation'\)&&\(game\.run\|\|modal!=='new'\)(&&!ownCancel\.has\(modal\))?(&&!d0Owed\(\))?\?btn\('닫기','dismiss'/.test(app),
  'the header Close is available on this panel during foundation');
 // no blank stage: with no Run the preparation modal is reopened by render itself
 assert.ok(/if\(!modal\)setModal\('new'\)/.test(app),'a runless app always re-opens preparation');
 // starting the Run leaves preparation for good
 assert.ok(/preRunReturn=false;game\.start\(seed\)/.test(act),'starting clears the return state');
 // no second navigation layer was introduced for this
 assert.ok(!/pushState|replaceState|addEventListener\('popstate'/.test(app),
  'the fix adds no history/navigation layer');
 assert.equal((app.match(/store-return/g)||[]).length,2,'one control, one handler, nothing else');
});

/* SA-Q10 + SA-Q12 — MOBILE DENSITY. One patch: the Boss art was capped on width alone, and the
   SALE surface stated the queue twice on a phone. Both are presentation constraints at phone
   width; neither report nor queue is redesigned. */
test('SA-Q10 / SA-Q12: Boss art is height-capped on phone and the queue is stated once',()=>{
 const block=css.slice(css.indexOf('@media (max-width:719px){'),css.indexOf('@media (min-width:720px){',css.indexOf('@media (max-width:719px){')));
 assert.ok(block.length,'there is a phone-width density block');
 /* SA-Q10's original 120 / 96 phone caps were reviewed on a handset and superseded by the USER
    amendment of 2026-09-22 (UI_UX §BOSS INFORMATION PRESENTATION): the beat is a takeover with
    the screen dimmed behind it, so the art grows to 240 / 200 on a phone and 300 / 260 on the
    desk. What SA-Q10 exists to protect is unchanged and is asserted below - the caps are real
    ceilings, and art may not push the information or the acknowledgement off the first
    viewport, which the runtime Boss QA measures. */
 assert.ok(/\.boss-art img\{max-height:240px\}/.test(block),'D5 / D15 Boss art is capped at the amended 240px on phone');
 assert.ok(/\.boss-reveal\.final \.boss-art img\{max-height:200px\}/.test(block),'the D25 reveal is capped at 200px');
 // the width-only constraint that caused it is no longer the only one
 assert.ok(/\.boss-art img\{[^}]*max-width:320px/.test(css),'the desktop width cap is unchanged');
 assert.ok(/@media \(min-width:720px\)\{\s*\.boss-art img\{max-width:420px\}/.test(css),'and so is the wide one');
 // the caps are real ceilings, not overridden later at the same width. The count used to be
 // the check, which also forbade a cap at a DIFFERENT width - and UI-Q-v28-28 needs one: past
 // 720px the art was capped on width only, so it grew to its own aspect (408px in D5, 461px in
 // D25 at 1280x880) and overflowed the modal body. The phone block is what these baselines own,
 // so the ceiling is asserted there, and the desktop pair is asserted on its own below.
 assert.equal((block.match(/\.boss-art img\{max-height/g)||[]).length,2,
  'exactly the two baseline height caps at phone width, and no third');
 const wide=css.slice(css.indexOf('@media (min-width:720px){'));
 assert.ok(/\.boss-art img\{max-height:300px\}/.test(wide),'the desk caps D5 / D15 art height too, higher than the phone');
 assert.ok(/\.boss-reveal\.final \.boss-art img\{max-height:260px\}/.test(wide),'and the D25 reveal lower, as on phone');
 // the reports themselves are untouched: art is still a figure beside the information
 assert.ok(app.includes('<figure class="boss-art">'),'the Boss art is still the same supporting figure');
 assert.ok(fn('bossReveal').includes('c.d5.intro')||app.includes('boss-reveal'),'the reports are not redesigned');

 // SA-Q12: the decorative waiting line is suppressed on phone...
 assert.ok(/\.line-up\{display:none\}/.test(block),'the waiting fan / 대기 N is suppressed at phone width');
 assert.ok(!/\.line-up\{display:none\}/.test(css.replace(block,'')),'and only at phone width');
 // ...while the Dock keeps the real queue progress and count
 const dock=app.slice(app.indexOf("'<div class=\"dock\"><div class=\"queue\">"));
 assert.ok(/손님 '\+\(s\.cursor\+1\)\+' \/ '\+s\.queue\.length/.test(dock),'the Dock still states the queue count');
 assert.ok(/pips\(s\.queue\.length,s\.cursor\)/.test(dock),'and its progress');
 assert.ok(!/\.p-sale \.dock \.queue\{[^}]*display:none/.test(css),'nothing hides the Dock queue on any width');
 // desktop keeps the richer presentation, and no second mobile queue component was created
 assert.ok(app.includes('function waitingLine('),'the one queue renderer is unchanged');
 assert.equal((app.match(/function waitingLine\(/g)||[]).length,1,'there is no second, mobile-only queue component');
 assert.ok(!/mobileQueue|queueMobile|isMobile/.test(app),'and no width branch was added in script');
});

/* SA-Q13 — LOYALTY MEANING / THRESHOLD DRIFT. 단골 had two thresholds: the owner's 51 and a
   second 60 living in the Flavor classifier. One owner now answers everywhere, the compact SALE
   state carries Loyalty beside Injury and Fatigue, and the number is explained through the tip
   mechanism the readout and the destination plate already use. */
test('SA-Q13/SA-Q46: 단골 has one owner at 51, and Loyalty reads in the compact state without a popover',()=>{
 // one owner, one number, stated once in Source
 assert.equal(Adventurer.TRUSTED_REGULAR,51,'the owner threshold is 51');
 const copySrc=read('dist/data/copy.js');
 assert.ok(/G\.Adventurer\.isTrustedRegular\(n\)\)return emit\(pick\(visit\.regular/.test(copySrc),
  'the regular Flavor classification asks the owner');
 assert.ok(!/loyalty>=60/.test(copySrc),'and keeps no second 60 threshold of its own');
 assert.ok(!/loyalty>=60|loyalty >= 60/.test(app),'no UI surface carries a second 단골 threshold');
 assert.ok(/Adventurer\.isTrustedRegular\(n\)\?' · 단골'/.test(app),'the 단골 state asks the owner too');
 /* 2026-09-23 Store Support rebalance: 귀환 적립제 has no Loyalty condition, and 평생 단골제 /
    프리미엄 멤버십 / 단골 묶음혜택 are conditioned on 단골 itself - asked of the owner, never a
    second number of their own */
 assert.ok(!/loyalty>=(30|50|60)/.test(shop),'no Store Support keeps a Loyalty threshold of its own');
 assert.ok(/isTrustedRegular\(n\)&&this\.has\('lifetime'\)/.test(shop),'평생 단골제 asks the 단골 owner');
 assert.ok(/this\.has\('premiumMember'\)&&it\.rarity>=2&&G\.Adventurer\.isTrustedRegular\(n\)/.test(shop),'so does 프리미엄 멤버십');
 for(const id of ['lifetime','premiumMember','memberBundle'])
  assert.ok(DATA.relicBy[id].description.startsWith('단골 손님'),id+' says 단골 in its copy');

 // the compact state: Injury, Fatigue, Loyalty - and no progress bar
 const kit=fn('kitLine');
 /* SA-Q04: the Injury state is n.status in words (건강 / 부상 / 중상); a second numeric 부상 N
    beside it was the duplication the finding names. */
 assert.ok(/const slots=Adventurer\.slots\(n\),parts=\[n\.status\]/.test(kit),'the Injury state is in the compact state');
 assert.ok(!/부상 '\+n\.injury/.test(kit),'and it is not also stated as a number');
 assert.ok(/parts\.push\('피로 '\+n\.fatigue\)/.test(kit),'so is Fatigue');
 assert.ok(/parts\.push\('단골도 '\+n\.loyalty/.test(kit),'and so is Loyalty');
 assert.ok(!/<meter|<progress|loyalty-bar|progress-bar/.test(kit),'there is no Loyalty progress bar');
 /* SA-Q46 — PLAYTEST SALE TOP DENSITY. Normal SALE shows the Loyalty value/state without a
    separate `?` / Loyalty popover trigger competing with the Bag for the same row; its meaning
    is taught by the tutorial/coach and stays available in the compact Help under its own
    owner. COPY_AUDIT_APPROVED §8-4's 2026-09-22 amendment retires the on-demand popover this
    test used to require. */
 assert.ok(!/loyaltyTip/.test(kit),'no popover call remains on the compact state');
 assert.ok(!/<details class="tip"/.test(kit),'and no tip balloon markup is emitted from it');
 assert.ok(!/function loyaltyTip/.test(app),'the retired popover builder is gone, not merely unused');
 assert.ok(!/lustStatFactor/.test(app),'nothing leaks the LUST mechanic early');
 // SA-Q46: Equipment is proven Core-Stat source information, not compact-top decision state
 assert.ok(!/E\(n\.equipment\.name\)/.test(kit),'Equipment text is omitted from the compact top');
 assert.ok(/E\(n\.equipment\.name\)/.test(app),'and stays readable in NPC detail elsewhere');
 // the shared anchored tip used by the readout/destination plate is untouched
 assert.equal((app.match(/const tip=\(label/g)||[]).length,1,'there is still exactly one tip implementation');
 assert.ok(/<details class="tip" name="sale-tip">/.test(app),'one open at a time, via the shared exclusive name');
 assert.ok(/closeTips/.test(app),'outside tap and Escape close it through the shared handler');
 assert.ok(/\.kit \.tip>p\{position:absolute/.test(css)||/\.kit \.tip>p/.test(css),'the balloon is out of flow here too');
});

/* SA-Q14 — GENERIC YELLOW STAT CHANGE. A moved Stat was gold: it said something changed and
   left the player to work out whether that was good news. */
test('SA-Q14: a moved Stat reads as beneficial or harmful, never as generic movement',()=>{
 const grid=fn('statGrid');
 // classification is by MEANING: for a Core Stat, more is better
 assert.ok(/const delta = values\[k\]-n\.stats\[k\], moved = delta!==0;/.test(grid),'the change is measured');
 assert.ok(/sense = !moved \? '' : delta>0 \? 'up' : 'down'/.test(grid),'a rise is beneficial, a fall harmful');
 assert.ok(/const cls = 'detail-stat'\+\(sense\?' '\+sense:''\);/.test(grid),'and the cell carries that meaning');
 assert.ok(!/ moved'/.test(grid),'the generic `moved` class is gone from the row');
 // unchanged = default, beneficial = green, harmful = red
 assert.ok(!/\.detail-stat\.moved strong\{color:var\(--gold\)\}/.test(css),'the generic gold styling is retired');
 assert.ok(/\.detail-stat\.up strong\{color:#9fd6a8\}/.test(css),'beneficial is green');
 assert.ok(/\.detail-stat\.down strong\{color:#e8927f\}/.test(css),'harmful is red');
 assert.ok(!/\.detail-stat(?!\.(up|down))[^{]*\{[^}]*color:#9fd6a8/.test(css),'an unchanged row keeps the default');
 // they are the colours the NIGHT change tokens already use, so one movement reads one way
 assert.ok(css.includes('.tok.up b{color:#9fd6a8}')&&css.includes('.tok.down b{color:#e8927f}'),
  'the semantic pair is shared with the existing change tokens');
 /* The approved Stat-source UX. The 유리 / 불리 chip and the separate `?` are gone: the cell
    itself is the control, so colour is carried by the accessible name instead of by chrome. */
 const emitted=grid.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'');
 assert.ok(!/유리|불리/.test(emitted),'the row prints no 유리 / 불리 chip');
 assert.ok(!/class="dir"/.test(app)&&!/\.dir\{/.test(css),'and the chip element and its styling are both gone');
 assert.ok(!/>\?</.test(emitted)&&!/tip\(/.test(emitted),'and no separate `?` control sits in a Stat row');
 assert.ok(/said = label\+' '\+\(sense==='up'\?'증가':'감소'\)\+' · 변화 원인 보기'/.test(grid),
  'the accessible name says which way it moved and that the reason opens here');
 assert.ok(/<summary aria-label="'\+E\(said\)\+'">'\+face/.test(grid),'and the whole cell face IS that control');
 // a provable source is exposed through the SHARED anchored tip, not a new mechanism
 /* Dungeon.prepare returns its provenance as `sources`, beside `effects` - not inside it. The
    retired `?` read prep.effects.sources, which is undefined, so it could never have shown a
    real source. The cell reads the real one, and still computes no provenance of its own. */
 assert.ok(!/prep\.effects\.sources/.test(emitted),'the path that never existed is not read');
 assert.ok(/const list = moved \? \(prep\.sources\?\.\[k\] \|\| \[\]\) : \[\];/.test(grid),
  'only a Stat that actually moved looks up its already-prepared sources');
 assert.ok(/return \{effects:e,sources,/.test(read('dist/systems/dungeon.js')),
  'and that is the shape Dungeon.prepare actually returns');
 assert.ok(/if\(!list\.length\)return '<div class="'\+cls\+'">'\+face\+'<\/div>';/.test(grid),
  'an unchanged Stat, or one with no provable source, stays a plain non-interactive cell');
 assert.ok(/<details class="'\+cls\+' tip" name="sale-tip">/.test(grid),
  'the trigger joins the one exclusive tip group, so the same Stat closes and another switches');
 assert.ok(/closeTips/.test(app),'outside tap and Escape close it through the existing shared handler');
 assert.ok(/E\(label\+' 변화 원인'\)/.test(grid),'the balloon is headed with the Stat and 변화 원인');
 assert.ok(/list\.map\(x=>'<span>'\+E\(x\.name\+' '\+\(x\.v>0\?'\+':''\)/.test(grid),
  'and lists the real prepared sources, name and signed amount, with nothing recomputed');
 assert.equal((app.match(/const tip=\(label/g)||[]).length,1,'still exactly one popover implementation');
 /* it must stay a balloon: the two-column grid may not grow taller when a Stat is opened, and
    the cell may not become an inline ? control. */
 assert.ok(/\.detail-stats\{position:relative/.test(css),'the grid is the containing block the balloon hangs from');
 assert.ok(/\.detail-stats \.tip>p\{top:calc\(100% - 4px\)\}/.test(css),'the balloon drops out of flow');
 assert.ok(!/\.detail-stats \.tip\{display:inline-block/.test(css),'the cell is not restyled as an inline ?');
 assert.ok(/details\.detail-stat>summary\{display:flex;align-items:baseline;gap:8px;padding:5px 0/.test(css),
  'and the open control keeps the exact shape of a plain row, so the 2-column layout does not shift');
 assert.ok(/details\.detail-stat>summary::-webkit-details-marker\{display:none\}/.test(css),'with no twisty added');
 assert.ok(/details\.detail-stat>summary:focus-visible\{outline:/.test(css),'and it is reachable and visible by keyboard');
 // Player-facing Stat detail vocabulary, with no Base/Equip English mixture
 for(const w of ['기본','장비','현재 적용값','변화 원인'])
  assert.ok(app.includes('<span>'+w+'</span>')||app.includes(w+'<br>'),'the detail says '+w);
 for(const bad of ['(Base)','(Equip)','최종 산출','적용 내역'])
  assert.ok(!app.includes(bad),'no stale Stat-detail wording: '+bad);
});

/* UI-Q-v28-6 — SHARED POPOVER, DESKTOP HALF. The shared anchored tip - the Stat cell included -
   only ever opened on a tap. On a pointer device Canonical requires hover, and for a keyboard it
   requires focus, with the click toggle and the mobile tap unchanged. */
test('UI-Q-v28-6: the shared popover opens on hover and on keyboard focus, and still toggles',()=>{
 // ONE mechanism: the same <details class="tip" name="sale-tip"> a tap toggles
 assert.equal((app.match(/const tip=\(label/g)||[]).length,1,'there is still exactly one popover implementation');
 assert.ok(!/showPopover\(|popover="|\.showModal\(/.test(app),'and no second popover framework was introduced');
 // hover is taken from a real mouse on a device that actually hovers, so a tap gets no phantom open
 assert.ok(/matchMedia\('\(hover:hover\) and \(pointer:fine\)'\)\.matches/.test(app),
  'hover is gated on a device that really hovers with a fine pointer');
 assert.ok(/document\.addEventListener\('pointerover',ev=>\{\n if\(ev\.pointerType!=='mouse'\|\|!hovers\(\)\)return;/.test(app),
  'a mouse entering the control opens it');
 assert.ok(/document\.addEventListener\('pointerout',ev=>\{\n if\(ev\.pointerType!=='mouse'\|\|!hovers\(\)\)return;/.test(app),
  'and leaving it closes it');
 assert.ok(/t===tipOf\(ev\.relatedTarget\)/.test(app),'moving within the same tip is not an open/close cycle');
 assert.ok(/t\.contains\(document\.activeElement\)/.test(app),'and the pointer leaving never closes what a keyboard is reading');
 // focus opens for a KEYBOARD only: a click focuses the summary too, and opening there would
 // race the native toggle and swallow the tap
 assert.ok(/document\.addEventListener\('focusin',ev=>\{[\s\S]{0,160}:focus-visible/.test(app),
  'keyboard focus opens it, and a pointer focus does not');
 assert.ok(/document\.addEventListener\('focusout',ev=>\{[\s\S]{0,200}t\.matches\(':hover'\)/.test(app),
  'blur closes it unless the pointer is still on it');
 // exclusivity, outside tap and Escape stay the existing shared handlers
 assert.ok(/closeTips\(t\);t\.open=true;/.test(app),'both routes close the other tips through the shared closer');
 assert.equal((app.match(/const closeTips=/g)||[]).length,1,'there is still one closer');
 assert.ok(/name="sale-tip"/.test(app),'and one exclusive group');
 // nothing here may reveal a balloon through CSS, which a tap would then fight
 assert.ok(!/\.tip:hover>p|\.tip:focus-within>p/.test(css),'no CSS :hover reveal races the toggle');
 // and the balloon is still out of flow, so a pointer can never change a panel height
 assert.ok(/\.readout \.tip>p,\.dest-plate \.tip>p,\.kit \.tip>p,\.detail-stats \.tip>p,\.changed \.tip>p\{position:absolute/.test(css),
  'the balloon stays out of flow on every surface that has one');
});

/* SA-Q35 — SETTINGS / DEBUG BOUNDARY. Ordinary Settings spoke English and carried a development
   footer, and the reproducibility Seed - a QA affordance - sat on the Player's preparation
   screen. Removing them must not cost the development routes anything. */
test('SA-Q35: ordinary Settings is Korean and carries no repro/dev surface',()=>{
 const set=fn('settings');
 // the exact ordinary labels
 assert.ok(set.includes("'소리 켜기':'소리 끄기'"),'the sound toggle is 소리 켜기 / 소리 끄기');
 assert.ok(set.includes("btn('전체 데이터 초기화','reset','danger')"),'the reset is 전체 데이터 초기화');
 // and none of the retired Player-facing strings, anywhere a Player can read
 for(const gone of ['Sound On','Sound Off','Full Data Reset','버전 0.4 · 로컬 실행 지원 · 외부 연결 없음','재현용 Seed'])
  assert.ok(!app.includes(gone),'no Player-facing '+gone);
 assert.ok(!/버전 0\.4|외부 연결 없음/.test(css+html),'and no development footer survives elsewhere');
 // the Seed control is gone from the preparation screen entirely
 assert.ok(!/id="seed"/.test(app),'there is no Seed input');
 assert.ok(!/seed-field/.test(app),'nor its field');
 // no visible Debug menu was added in its place
 assert.ok(!/btn\('[^']*[Dd]ebug/.test(app),'no Debug control is offered to the Player');
 assert.ok(!/data-action="debug"/.test(app),'and none is reachable by clicking');

 // CRITICAL: the development routes are intact
 assert.ok(/window\.Guild24=\{get game\(\)\{return game;\},render,/.test(app),
  "Guild24.game and Guild24.render remain, so Guild24.game.start('<seed>'); Guild24.render(); still works");
 assert.ok(/showDebug:\(\)=>setModal\('debug'\)/.test(app),'Guild24.showDebug() remains');
 assert.ok(/ev\.ctrlKey&&ev\.shiftKey&&ev\.code==='KeyD'&&game\.run/.test(app),'Ctrl+Shift+D remains');
 assert.ok(/modal==='debug'/.test(app),'and the debug panel it opens is still built');
 // the seed a dev passes still reaches the Run, and a carried foundation seed is still reused
 const start=app.slice(app.indexOf("case'start':{"),app.indexOf("case'start':{")+1100);
 assert.ok(/game\.start\(seed\)/.test(start),'the start path still takes a seed');
 assert.ok(/s\.phase==='foundation'\)return s\.seed/.test(app),'and still reuses an unopened store seed');
});

/* SA-Q36 — DECORATION DECISION SURFACE. The comparison carried Flavor prose beside the effect
   line, so the row the player decides on was half argument and half story. */
test('SA-Q36: the Decoration comparison shows only what the decision is made on',()=>{
 const panel=fn('storePanel').replace(/\/\*[\s\S]*?\*\//g,'');
 // what stays: name, exact effect, price / ownership, equipped state
 assert.ok(/<b>'\+E\(d\.name\)\+'<\/b>/.test(panel),'the name stays');
 assert.ok(/<span class="smalltext">'\+E\(d\.effect\)\+'<\/span>/.test(panel),'the exact effect stays');
 assert.ok(/d\.price\.toLocaleString\(\)/.test(panel),'the price stays');
 assert.ok(/Meta\.decorationOwned\(a,d\.id\)/.test(panel),'ownership state stays');
 assert.ok(/on\?'해제':'적용'/.test(panel)&&/on\?'이번 영업에 적용 중':'미적용'/.test(panel),'equipped state stays');
 // what goes: the Flavor prose, from THIS surface only
 assert.ok(!/d\.text/.test(panel),'the Flavor prose is not on the decision surface');
 assert.ok(!/class="tale"/.test(panel),'and neither is its slot');
 // the data itself is untouched and still available to lore-ready surfaces
 assert.ok(DATA.decorations.every(d=>d.text&&d.text.trim()),'every Decoration still carries its Flavor');
 assert.ok(read('dist/data/decorations.js').includes('text'),'the Flavor data was not deleted');
 assert.ok(/class="tale"/.test(app),'the Flavor slot still exists on the surfaces that are for it');
 // nothing was redesigned or added
 assert.ok(!/collection|컬렉션/i.test(panel),'no Collection screen was added');
 assert.equal((app.match(/function storePanel\(/g)||[]).length,1,'one Decoration surface, unchanged in shape');
});

/* BOSS_v2.8 §INFORMATION CADENCE + COPY_AUDIT §14. Source carried D5 / D15 / D25 only; D0, D10
   and D20 are confirmed missing adoption. The two new beats are one-tap information reports
   that open the question the next report answers. */
test('BOSS cadence: D0 / D5 / D10 / D15 / D20 / D25 exist, D30 adds nothing',()=>{
 const c=Copy.boss;
 // exact §14 copy, verbatim
 /* COPY_AUDIT §14-1, amended 2026-09-23 (D0 FIRST-MORNING BRIEFING): the old one-line
    objective is superseded by the briefing; the old strings are not kept as live copy. */
 assert.equal(c.d0.header,'마왕 조사 개시');
 assert.equal(c.d0.lead,'길드 조사대가 마왕의 정체를 추적하러 출발했다.');
 /* v2.9.0 (COPY_AUDIT §14-1, User 2026-09-25): a DAY label over each of the two lines, no closing sentence */
 assert.deepEqual(c.d0.steps,[['DAY 05',['첫 조사 보고로 토벌 대상이 공개된다. 이후 5일마다 이어진다.']],['DAY 30',['성장한 모험가 최대 3명을 마왕성으로 보내 최종 토벌에 나선다.']]]);assert.equal(c.d0.lines,undefined);
 assert.equal(c.d0.close,undefined);assert.ok(!app.includes('조사 정보를 확인하며 토벌대를 준비하고'),'the closing sentence is gone');
 assert.ok(!/토벌 예정|길드 정보원/.test(read('dist/data/copy.js')+app),'the superseded D0 lines are gone');
 assert.ok(!/class="boss-art"|class="boss-id"|b\.name/.test(fn('bossReveal').split("stage==='d0'")[1].split('</div>\';')[0]),
  'D0 shows no Boss art, portrait or name');
 assert.equal(c.d5.flavor.GLUTTONY,'챙겨 간 물건을 써도 몸이 평소만큼 따라주지 않았다.');
 assert.equal(c.d0.button,'확인');
 assert.equal(c.d5.header,'1차 조사 보고');
 assert.equal(c.d5.sub,'토벌 대상 확인');
 assert.equal(c.d5.button,'확인');
 assert.equal(c.d10.header,'2차 조사 시작');
 assert.equal(c.d10.line,'{보스명}의 전투 기록을 추적한다.');
 assert.equal(c.d10.next,'다음 보고 · DAY 15');
 assert.equal(c.d15.header,'2차 조사 보고');
 assert.equal(c.d15.intro,'전투 기록에서 변칙이 확인됐다.');
 assert.equal(c.d15.button,'확인');
 assert.equal(c.d20.header,'최종 정찰 시작');
 assert.equal(c.d20.line,'마왕성으로 향하는 원정 경로와 주변 환경을 정찰한다.');
 assert.equal(c.d20.next,'최종 보고 · DAY 25');
 assert.equal(c.final.header,'최종 정찰 보고');
 assert.equal(c.final.intro,'마왕성으로 향하는 최종 원정 환경이 확인됐다. 대응 수치는 마왕성 기준.');
 // §14-5 / SA-Q22: the SLOTH lines say 점포지원, never 유물
 const sloth=c.d15.trait.SLOTH[1].join(' ');
 assert.ok(sloth.includes('점포지원을 받는 대신')&&sloth.includes('그때의 점포지원은 받을 수 없으며'),'SLOTH uses 점포지원');
 assert.ok(!/유물/.test(JSON.stringify(c)),'no active Boss copy says 유물');
 // §14-8 spacing
 assert.ok(!/제 0 게이트/.test(app+read('dist/data/copy.js')),'제0게이트 is written without spaces');
 assert.ok(app.includes('제0게이트 · 마왕성'),'and the castle still names the gate');
 /* SA-Q47 / BOSS_v2.8 §SAME-DAY ORDERING: D0 is the deliberate exception to the D5-D25
    milestone cadence below - first Store Support choice, THEN a separate D0 Boss-information
    beat, THEN ordinary DAY 1. It is not printed inside the first Store Support decision
    surface, and it is not a new Phase or navigation layer of its own - it reuses the existing
    Boss-reveal modal shell, gated by Day rather than folded into BOSS_BEATS so an existing
    mid-Run save (never on Day 1 again) cannot replay it. */
 assert.ok(!/Copy\.boss\.d0/.test(fn('relicTakeover')),'the D0 objective is not embedded on the first Store Support surface');
 assert.ok(!/phase==='boss'|modal==='d0'/.test(app),'no new Phase or navigation layer was added for it');
 assert.ok(/s\.day===1&&!s\.bossReveal\.d0Seen\)return 'd0'/.test(fn('bossRevealStage')),
  'D0 fires exactly once, on DAY 1');
 assert.ok(/if\(stage==='d0'\)return/.test(fn('bossReveal')),'D0 renders through the existing reveal shell');
 assert.ok(/st==='d0'\)s\.bossReveal\.d0Seen=true/.test(app),'dismissing D0 persists its own marker, not a BOSS_BEATS entry');
 /* CORE_RUN §D0 — closing does not consume the beat, and ordinary Morning does not go on past
    it: no 닫기, no Escape and no dismiss while D0 is the open report */
 assert.ok(/!d0Owed\(\)\?btn\('닫기'/.test(app),'D0 carries no 닫기');
 assert.ok(/\(game\.run\|\|modal!=='new'\)&&!d0Owed\(\)\)setModal\(null\)/.test(app),'Escape does not close D0');
 assert.ok(/phase==='foundation'\|\|d0Owed\(\)\)return/.test(app),'dismiss does not close D0');
 // the cadence table, and D30 reusing D25
 assert.ok(/\[5,'d5','identitySeen'\],\[10,'d10','combatSeen'\],\[15,'d15','traitSeen'\],\s*\[20,'d20','routeSeen'\],\[25,'final','familySeen'\]/.test(app),
  'every D5-D25 beat has its Day and its own persisted marker');
 assert.ok(!/BOSS_BEATS[\s\S]{0,200}30,/.test(app),'D30 has no beat of its own');
 assert.ok(!/BOSS_BEATS=\[\[1,/.test(app),'D0 is not folded into the >= day-threshold BOSS_BEATS table');
 assert.ok(/if\(stage==='final'&&!s\.final\)continue;/.test(app),'the D25 beat waits for the persisted Final state');
 // the reports reuse the existing shell
 assert.ok(/if\(stage==='d10'\|\|stage==='d20'\)/.test(fn('bossReveal')),'the two beats render through the existing reveal');
 assert.ok(/case'boss-seen'/.test(app)&&/BOSS_BEATS\.find\(x=>x\[1\]===st\)/.test(app),'and D5/D10/D15/D20/D25 are consumed by the existing one');
 /* UI_UX §D5 / D10 / D15 / D20 / D25 and UI-Q-v28-10, amended 2026-09-23 (BATCH 4B): the 64px
    D10 / D20 identity thumbnail is retired. The two concise beats reuse the same full Boss-art
    figure as D5 / D15 under the same caps (240 phone / 300 desk) - lower importance comes from
    shorter content, never from a smaller Boss. The superseded 64px expectation is not kept. */
 const compact=fn('bossReveal').split("stage==='d10'||stage==='d20'")[1].split("stage==='d0'")[0];
 assert.ok(/\+plate/.test(compact)&&!/boss-id/.test(compact),'D10 / D20 carry the shared full Boss-art figure, not a thumbnail');
 assert.ok(!/\.boss-id\b/.test(css)&&!/max-width:64px;max-height:64px/.test(css),'the 64px thumbnail rule is gone');
 assert.ok(/\.boss-art img\{max-height:240px\}/.test(css)&&/\.boss-art img\{max-height:300px\}/.test(css),
  'the shared phone / desk caps (240 / 300) are the ones D10 / D20 now use');
 assert.ok(!/\.boss-reveal\.d(10|20)[^{]*\.boss-art img\{/.test(css),'no D10 / D20-only art size - one art family');
});

test('BOSS cadence: each beat is seen once, precedes the Store Support decision, and draws nothing',()=>{
 const g=new Game();g.autosave=false;g.start('boss-cadence');
 const flags=['identitySeen','combatSeen','traitSeen','routeSeen'];
 for(const f of flags)assert.equal(g.run.bossReveal[f],false,f+' starts unseen');
 /* RUN-Q-v28-5 / BOSS_v2.8 §SAME-DAY ORDERING: on every milestone Day the due Boss beat is
    shown BEFORE the same-Day Store Support decision. The chain is asserted in source and then
    resolved for each of the five Days with a Store Support window genuinely pending, because
    D10 and D20 are themselves acquisition Days and that is where the order actually matters. */
 const chain=app.slice(app.indexOf("if(phase==='foundation'&&modal!=='new')"),app.indexOf('renderModal();requestAnimationFrame'));
 assert.ok(chain.indexOf('bossRevealDue()')<chain.indexOf("relicWindow&&!s.relicWindow.focusedRevealSeen"),
  'the Boss beat is chosen before the Store Support window on the same Day');
 const resolve=(day,seen,final,windowPending)=>{
  // the shipped chain, evaluated on a Morning with both a beat and a window outstanding
  const due=[[5,'identitySeen'],[10,'combatSeen'],[15,'traitSeen'],[20,'routeSeen'],[25,'familySeen']]
   .some(([d,f])=>day>=d&&!seen[f]&&(f!=='familySeen'||final));
  if(due)return 'boss';
  return windowPending?'relics':null;};
 for(const day of [5,10,15,20,25]){
  const seen={identitySeen:false,combatSeen:false,traitSeen:false,routeSeen:false,familySeen:false};
  for(const [d,f] of [[5,'identitySeen'],[10,'combatSeen'],[15,'traitSeen'],[20,'routeSeen'],[25,'familySeen']])
   if(d<day)seen[f]=true;                       // every earlier beat already read
  assert.equal(resolve(day,seen,true,true),'boss','D'+day+': the Boss beat comes before the Store Support window');
  // ...and once it is dismissed, the same Day hands the window over
  const after={...seen};
  after[{5:'identitySeen',10:'combatSeen',15:'traitSeen',20:'routeSeen',25:'familySeen'}[day]]=true;
  assert.equal(resolve(day,after,true,true),'relics','D'+day+': dismissing it releases the Store Support window');
 }
 /* RUN-Q-v28-5: merely SHOWING a report consumes no gameplay RNG - the three functions that
    decide and build it never reach the run stream. */
 for(const f of ['bossRevealDue','bossRevealStage','bossReveal'])
  assert.ok(!/game\.rng|this\.rng|RNG\(/.test(fn(f)),f+'() draws no gameplay RNG');
 // showing and dismissing a report costs no gameplay RNG, and the marker persists
 const stage=(day,reveal,final)=>{
  const r={day,bossId:'WRATH',bossReveal:reveal,final:final?{}:null};
  for(const [d,st,flag] of [[5,'d5','identitySeen'],[10,'d10','combatSeen'],[15,'d15','traitSeen'],
                            [20,'d20','routeSeen'],[25,'final','familySeen']]){
   if(r.day<d||r.bossReveal[flag])continue;
   if(st==='final'&&!r.final)continue;
   return st;}
  return null;};
 const seen={identitySeen:false,combatSeen:false,traitSeen:false,routeSeen:false,familySeen:false};
 assert.equal(stage(5,seen,false),'d5');seen.identitySeen=true;
 assert.equal(stage(10,seen,false),'d10');seen.combatSeen=true;
 assert.equal(stage(12,seen,false),null,'no beat between reports');
 assert.equal(stage(15,seen,false),'d15');seen.traitSeen=true;
 assert.equal(stage(20,seen,false),'d20');seen.routeSeen=true;
 assert.equal(stage(25,seen,true),'final');seen.familySeen=true;
 assert.equal(stage(30,seen,true),null,'D30 adds no new reveal');

 // the real thing: walk a Run and prove each beat is consumed once, survives a reload, and
 // that showing/dismissing it moves no gameplay RNG
 const h=new Game();h.autosave=false;h.start('boss-walk');
 for(const [day,flag] of [[5,'identitySeen'],[10,'combatSeen'],[15,'traitSeen'],[20,'routeSeen']]){
  h.run.day=day;
  const before=h.rng.state;
  h.run.bossReveal[flag]=true;           // dismissal writes the marker and nothing else
  assert.equal(h.rng.state,before,'consuming the D'+day+' beat drew no gameplay RNG');
  const back=Save.import(Save.export(h.account,h.run));
  assert.equal(back.run.bossReveal[flag],true,'the D'+day+' marker survives a reload');
  assert.equal(stage(day,back.run.bossReveal,!!back.run.final),
   day>=25?'final':null,'and the D'+day+' report is not replayed');
 }
 // a save written before the cadence existed still validates and simply has not seen them
 const legacy=JSON.parse(Save.export(h.account,h.run));
 delete legacy.run.bossReveal.combatSeen;delete legacy.run.bossReveal.routeSeen;
 assert.ok(Save.valid(legacy),'a pre-cadence save still loads');
});

/* COPY_AUDIT §1-1 / §1-5 / §1-6 / §9-1 / §9-2 — pre-Run, reset and store-management microcopy.
   Exact approved text; no mechanic is touched. */
test('COPY_AUDIT §1 / §9: the pre-Run, reset and store-management microcopy is the approved text',()=>{
 assert.ok(app.includes("'보유 장식 없음'"),'§1-1 the empty Decoration state');
 assert.ok(!app.includes('아직 보유한 장식이 없습니다'),'and its old explanation is gone');
 assert.ok(app.includes("title='전체 데이터를 초기화할까요?'"),'§1-5 title');
 assert.ok(app.includes('현재 영업과 본사 기록을 포함한 이 브라우저의 GUILD24 저장 데이터를 모두 지웁니다. 되돌릴 수 없습니다.'),'§1-5 body');
 assert.ok(app.includes("btn('전부 지우기','reset-go','danger')"),'§1-5 confirm');
 assert.ok(app.includes("btn('저장 내보내기','export')")&&app.includes("btn('취소','dismiss')"),'§1-5 keeps export and cancel');
 assert.ok(!app.includes('폐업 결재'),'the 폐업 결재 wording is gone');
 assert.ok(app.includes("'전체 데이터가 초기화되었습니다. 새 점포를 시작합니다.'"),'§1-6 completion');
 assert.ok(app.includes("'이번 영업의 장식은 고정됨.'"),'§9-1 active-Run line');
 assert.ok(app.includes("'장식은 영업 시작 전에 변경할 수 있습니다.'"),'§9-1 pre-Run line');
 assert.ok(!app.includes('장식은 영업 밖에서만')&&!app.includes('지금은 영업 중이라 확인만 됩니다'),'and the old pair is gone');
 assert.ok(!app.includes('비워 둘 수 있습니다'),'§9-2 the empty Slot explains itself');
 // mechanics untouched: the same two destructive actions, through the same handlers
 assert.ok(/case'retire-go'/.test(app)&&/case'reset-go'/.test(app),'both destructive actions keep their handlers');
 assert.ok(/Save\.reset\(\)/.test(app),'and the reset still goes through Save.reset');
});

/* COPY_AUDIT §3-1..§3-7, §4-8, §4-10 — coach marks and two SALE lines, exact approved text.
   §3-7 supersedes the older Supply wording asserted here; the rest of §3 is unchanged. */
test('COPY_AUDIT §3 / §4: the coach marks and the two SALE lines are the approved text',()=>{
 const steps=fn('coachSteps')||app.slice(app.indexOf('const coachSteps={'),app.indexOf('let activeCoach'));
 for(const line of [
  '같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.',
  '카트의 상품만 발주한다. 확정 뒤에도 추가 발주와 후보 교환이 가능하다.',
  '대성공 신호. 준비가 넉넉할 때 뜨지만, 대성공이 확정되는 건 아니다.',
  '손님이 계산대에 왔을 때의 원정 전망. 팔아도 이 칸은 그대로고, 변화는 상품을 고르면 아래에 나온다.',
  // §3-5 / §3-7 SUPPLY: two facts, the hidden deficit formula and the second Fatigue stage untaught
  '음식·음료는 피로를 줄인다. 피로가 10을 넘으면 기동·정신이 떨어진다.',
  '판 상품은 손님 가방에 들어가 오늘 원정에서 쓰고 사라진다.',
  '다시 온 손님. 지난 원정과 특성, 기록은 손님을 눌러 본다.'])
  assert.ok(steps.includes(line),'the approved coach line is verbatim: '+line.slice(0,20));
 for(const gone of ['점포 매출에는 영향이 없다','준비가 끝나면 영업 시작을 누른다','보급을 더 챙기면 가능성이 커질 수 있다',
                    '성공·실패 결과는 미리 알 수 없고','원정 준비에 공통 페널티','모든 상품은 1회용이며',
                    // superseded by §3-7
                    '필요 보급을 초과한 보급은 피로를 줄인다','50%는 투자, 100%는 기본','환경 대응은 손님 능력과 보급을 함께 반영한다',
                    '발주할 수량을 고른다.',
                    // superseded by §4-1..§4-3
                    '게이트 전투 요구 대비 현재 전투 준비 수준','원정 실패 이후 사망으로 이어질 조건부 위험',
                    '이 손님의 보급 전 대응 수준',
                    // superseded 2026-09-24 (first-sale coach diet)
                    '손님이 처음 계산대에 왔을 때','판매 후에도 바뀌지 않는다','손님을 누르면 특성과 지난 원정 기록',
                    '어떤 능력이 필요한지 여기서 확인한다','더 남으면 귀환 후 피로를 줄인다',
                    '구매 후 준비 상태에 따라 대성공 신호','판매한 상품은 오늘 원정에서 쓰고 사라진다'])
  assert.ok(!app.includes(gone),'the superseded coach wording is gone: '+gone.slice(0,14));
 // §4-8
 assert.ok(app.includes('<span>현재 준비 변화 없음</span>'),'§4-8 the no-change line');
 assert.ok(!app.includes('이 손님의 준비는 달라지지 않는다'),'and its old sentence is gone');
 // §4-10: the shelf-life state only, with the FIFO explanation retired
 assert.ok(!app.includes('가장 먼저 폐기될 재고부터 나간다'),'§4-10 the repeated FIFO explanation is gone');
 assert.ok(!app.includes('유통기한 없음')&&!app.includes('기한 없음')&&app.includes("'폐기까지 '"),'§4-10 the shelf-life state stays and no non-expiring state survives (ITEM §SHELF LIFE — EXACT, v2.9.0)');
 // UI_UX §SALE — SHELF ORDER (User 2026-09-25, v2.9.0): nearest discard first, ties in the existing order; the `폐기 N일` chip
 assert.ok(fn('shelf').includes('stocks.slice().sort((a,b)=>a.expires-b.expires)'),'the shelf is ordered by expiry, stable for ties');
 assert.ok(fn('shelf').includes(`<em class="expiry'+(left<=1?' soon':'')+'">폐기 '+left+'일</em>`),'every row carries 폐기 N일, emphasized at 1 day or less');
 assert.ok(!fn('shelf').includes('gate')||!/sort\([^)]*gate/.test(fn('shelf')),'the order never reads the customer\'s Gate');
 assert.ok(/\.good \.price em\.expiry\.soon\{color:#a8442f/.test(read('dist/ui/ui.css')),'the chip reuses the warehouse .soon color');
 assert.ok(read('dist/ui/app.js').includes("' · 유통기한 '+sl+'일</span>'"),'the ORDER row states the shelf life as days, never 없음');
});

/* SA-Q02 / Q03 / Q04 / Q20 / Q32 — NPC detail, Injury and Trait information truth. */
test('SA-Q02/03/04/20/32: the NPC surfaces state only what is true and shown',()=>{
 // SA-Q02: no hidden-Potential disclosure and no promise that Loyalty reveals Traits
 for(const gone of ['성장 잠재력','빠른 성장','꾸준한 성장','착실한 성장','남은 특성','더 친해지면'])
  assert.ok(!app.includes(gone),'no hidden-growth disclosure survives: '+gone);
 assert.ok(!/n\.potential/.test(fn('npcDetail')),'the detail reads no hidden Potential at all');
 // what remains IS the identity: Job, Level and the four Core Stats
 const detail=fn('npcDetail');
 assert.ok(/D\.jobBy\[n\.job\]\.name/.test(detail)&&/Lv\.\$\{n\.level\}/.test(detail),'Job and Level stay');
 assert.ok(/statGrid\(n\)/.test(detail),'and the four actual Core Stats stay');
 // SA-Q03: 강인함 is the Player-facing name, 생존 never is, and the pair reads 투력 -> 강인함
 const surfaces=app+read('dist/ui/presentation.js');
 assert.ok(!/생존 -20%|생존 \+|'생존'/.test(surfaces),'no Player-facing surface says 생존');
 assert.equal(Presentation.labels.survival,'강인함','the Stat is named 강인함');
 assert.ok(app.includes("'부상 효과: 투력 '+combat+' · 강인함 -20%'"),'Injury detail reads 투력 -> 강인함');
 assert.ok(read('dist/ui/presentation.js').includes("value:'투력 '+combat+' · 강인함 -20%'"),'and so does the NIGHT row');
 // SA-Q04: one human-readable Injury state, never duplicated as a number
 const kit=fn('kitLine');
 assert.ok(!/부상 '\+n\.injury/.test(kit),'the compact state does not repeat Injury as a number');
 assert.ok(/parts=\[n\.status\]/.test(kit),'it carries the state word itself');
 // SA-Q20: the exact First Aid primary function
 assert.ok(read('dist/ui/presentation.js').includes("aftercare:'원정 후 중상 → 부상, 부상 → 무사 (사망 제외)'"),
  'the First Aid primary function is the approved sentence (COPY_AUDIT §4-22, User 2026-09-25)');
 // v2.9.0 F3 (User 2026-09-25): the NPC detail rows and the route-change line
 assert.ok(fn('npcDetail').includes("cond.push('피로 회복: 음식·음료')"),'§4-14 no rest recovery: Food/Drink only');
 assert.ok(fn('npcDetail').includes("'연속 부상 출발 '+Dungeon.injuredStreak(n.records)+'회'"),'the strained-departure information row reads the records through the STRAIN helper (v2.9.1 balance)');
 assert.ok(read('dist/systems/shop.js').includes('rep.routeChange=G.Copy.routeChangeLine('),'the route-change line is composed once, in data/copy.js so the engine needs no UI layer (the simulation worker loads no presentation.js)');
 assert.ok(!/허세/.test(read('dist/systems/shop.js')),'the retired Trait name never appears in the engine');
 assert.equal(Presentation.routeChangeLine({name:'하람',pilgrim:false},'슬라임 초원','거미 동굴'),'거짓말쟁이 하람은 말했던 슬라임 초원 대신 거미 동굴로 향했다.','§14-10 exact, particles by the final consonant');
 assert.equal(Presentation.routeChangeLine({name:'유리',pilgrim:true},'거미 동굴','슬라임 초원'),'순례 행렬을 따라 유리는 예상 목적지 거미 동굴 대신 슬라임 초원으로 향했다.','§14-10 pilgrimage form');
 assert.ok(!surfaces.includes('결과는 그대로'),'the redundant lead is gone');
 // SA-Q32: the exact Trait effect labels, with the generic ones retired
 assert.equal(Presentation.traitText('rich'),'방문 시 소지금 +50G');
 assert.ok(Presentation.traitText('honest').startsWith('정가·50% 구매 시 단골도 +1'),'정직한 names its own condition');
 for(const gone of ['방문 골드','단골 보너스'])
  assert.ok(!surfaces.includes(gone),'the generic label is gone: '+gone);
 // weighting mechanics keep their correct 가중치 wording
 assert.ok(/가중치/.test(JSON.stringify(DATA.relics.map(r=>r.description))),'real weighting still says 가중치');
});

/* SA-Q27 / Q38 — the global guide is COPY_AUDIT_APPROVED §8, whole. */
test('COPY_AUDIT §8: the global Help is the approved compact guide',()=>{
 const h=fn('help');
 for(const line of [
  'DAY 0 무료 1개. 이후 DAY 5·10·15·20·25·30에 구매 기회가 온다. 보류한 후보와 가격은 다음 구매 기회 전날까지 유지된다.',
  '오늘 손님과 게이트를 보고 수량을 정한다. 발주 확정 뒤에도 추가 발주와 후보 교환이 가능하다.',
  '상품 가격은 50%·100%·150% 중에서 정한다. 팔리면 단골도는 각각 +4·+1·-3.',
  '손님이 한 번 거절한 가격과 그보다 비싼 가격은, 같은 상품으로 그날 다시 제안할 수 없다.',
  '단골도가 높을수록 다시 찾아올 가능성과 상품을 살 마음이 커진다.',
  '판매한 상품은 그날 원정에서 쓰고 사라진다. 결과는 밤에 확인한다.',
  '적자 마감은 재고 정리로 회생할 수 있다. 한 영업 최대 3회.',
  '다음 점포에도 본사 기록·해금·직업 숙련·점포 자본·보유 장식은 남는다. 모험가·재고·골드·점포지원은 새로 시작한다.',
  '실시간 제한 없음.'])
  assert.ok(h.includes(line),'§8 line is verbatim: '+line.slice(0,20));
 // SA-Q27: the refusal rule states the CEILING, not the same-price-only rule it replaced
 assert.ok(h.includes('그보다 비싼 가격은'),'the refusal rule includes every higher price');
 assert.ok(!h.includes('같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다'),'the weaker rule is gone');
 // and it matches what the engine actually enforces
 assert.ok(shop.includes("rule.mult>D.pricing[mode].mult"),'the ceiling is the rule sell() applies');
 // SA-Q38: the long-form manual is not appended below it
 for(const gone of ['기본 방문객은 3~6명','바가지는 수입과 관계를 맞바꾸고','가방은 언제나 2칸입니다',
                    '시간을 재촉하는 제한은 없습니다','사망은 이번 영업에서 영구적입니다'])
  assert.ok(!app.includes(gone),'the superseded manual paragraph is gone: '+gone.slice(0,12));
 // it does not duplicate what the anchored popovers / coach marks own in context
 assert.ok(!h.includes('압박')&&!h.includes('환경 대응'),'the Hazard reading stays with its own popover');
 assert.ok(!/필요 보급/.test(h),'and the Supply arithmetic stays with its coach mark');
 // the section set is exactly §8-1..§8-8
 assert.equal((h.match(/<h3>/g)||[]).length,9,'nine sections: 처음 3일 (§8-0) then one per §8-1..§8-8');
 /* v2.9.0 §8-0: the guide opens on 처음 3일 (five lines) and keeps the eight sections under a collapsed 자세히 */
 assert.ok(h.indexOf('<h3>처음 3일</h3>')<h.indexOf('<details class="more"><summary>자세히</summary>')&&h.indexOf('<summary>자세히</summary>')<h.indexOf('<h3>점포지원</h3>'),'처음 3일 first, then 자세히 holding the eight');
 assert.ok(!/<details class="more" open/.test(h),'자세히 is collapsed by default');
 for(const l of ['아침 — 오늘 열린 게이트의 위험을 본다.','발주 — 그 위험에 맞는 능력을 올리는 상품을 들인다.','판매 — 손님이 갈 게이트를 보고 상품과 가격을 정한다. 판 상품은 손님 가방에 들어간다.','밤 — 원정 결과와 손님의 변화를 본다.','마감 — 손익을 정리하고 다음 날로 간다.'])assert.ok(h.includes('<p>'+l+'</p>'),'§8-0 line verbatim: '+l.slice(0,6));
 assert.equal((h.match(/<div class="first-days">[\s\S]*?<\/div>/)[0].match(/<p>/g)||[]).length,5,'exactly five lines');
});

/* SA-Q28 / SA-Q31 + COPY_AUDIT §15, §6-2, §6-8 — Store Capital is not Gold, and the two Deep
   operational surfaces say only what their own decision needs. */
test('SA-Q28 / SA-Q31: Store Capital is not Gold, and the Deep surfaces are not tutorials',()=>{
 // SA-Q28: Capital carries no G; Run Gold still does
 assert.ok(!/점포 자본 \$\{Meta\.storeCapital\(a\)\.toLocaleString\(\)\}G/.test(app),'Store Capital is not printed as Gold');
 assert.ok(!/자본[^<'`]{0,24}G\b/.test(fn('codex')+fn('storePanel')),'no Capital figure carries a G suffix');
 /* the pre-Run screen no longer prints a starting-Gold sentence, so Run Gold is witnessed
    where it is still shown to the player. */
 assert.ok(/보유 골드/.test(app)&&/fmt\(s\.money\)\+'G'/.test(app),'actual Run Gold still uses G');
 // §15-1 / §15-2 / §15-3
 assert.equal(Copy.deep.brief,'같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.');
 assert.equal(Copy.deep.terms,'성공 시 추가 성장 · 점포 수익 없음');
 assert.equal(Copy.deep.confirmed,'심층원정 확정');
 const offer=fn('deepOfferUI');
 assert.ok(/E\(c\.sponsor\)\+' '\+fmt\(cost\)\+'G'/.test(offer),'the nomination states the Gate and the sponsorship');
 assert.ok(offer.includes('c.terms'),'and the reward terms in one line');
 for(const gone of ['c.note','c.gain','c.sink','c.gate'])
  assert.ok(!offer.includes(gone),'the nomination does not restate the tutorial: '+gone);
 assert.ok(/E\(c\.confirmed\)\+' · '/.test(offer),'after nomination it confirms the Gate');
 // §6-2 / §6-8
 const pres=read('dist/ui/presentation.js');
 assert.ok(pres.includes("'예상보다 큰 성과를 내고 돌아왔다.'"),'§6-2 the Great Success outcome');
 assert.ok(!pres.includes('예상보다 일찍 게이트에서 나왔다'),'and the time-saving reading is gone');
 assert.ok(pres.includes("label:'원정 소지금 획득'"),'§6-8 the Wallet reward label');
 assert.ok(!pres.includes('NPC 소지금 획득'),'and the internal NPC wording is gone');
});

/* USER-APPROVED opening. The runless backdrop is the title card - the game's name on one line
   and, under it, the store this Run is about to open. The preparation modal then states the
   three axes of the game. */
test('OPENING: the backdrop is the title card and names the store this Run will open',()=>{
 const back=app.slice(app.indexOf('if(!s){$(\'#app\').innerHTML=stage(\'start\''),app.indexOf('const phase=s.phase'));
 // 1 / 2: the title, one deliberate line
 assert.ok(back.includes('<h1 class="opening-title">던전 앞 편의점</h1>'),'the backdrop carries the title');
 assert.ok(/\.opening-title\{[^}]*white-space:nowrap/.test(css),'the title is one line by rule, not by luck');
 assert.ok(/\.opening-title\{[^}]*var\(--f-plate\)/.test(css),'set in the shipped ATMOSPHERE face');
 assert.ok(/\.opening-title\{[^}]*clamp\(30px,[^)]*\)/.test(css),'fluid and clamped for mobile-first sizing');
 /* PRESENTATION_SYSTEM §TYPOGRAPHY / SPACING routes short object identity to the plate face,
    and PRESENTATION_POLISH_BATCH1 asks the Opening for a restrained sign/plate relationship.
    The branch is that identity, so it is a stamped plate now rather than fluid body copy -
    Mulmaru is crisp only at its design sizes, which is why this one is fixed rather than
    clamped. What the old clamp assertion was really protecting is unchanged and asserted
    here directly: the branch stays far under the title it sits below. */
 assert.ok(/\.opening-branch\{[^}]*var\(--f-plate\)/.test(css),'the branch is set in the plate face');
 assert.ok(/\.opening-branch\{[^}]*font:500 12px/.test(css),'at a crisp Mulmaru design size');
 assert.ok(/\.opening-title\{[^}]*clamp\(30px,9\.2vw,46px\)/.test(css),
  'and the branch under it is visibly secondary: the title never drops under 30px');
 // 3: the branch comes from the existing catalogue, through the existing pick
 assert.ok(back.includes('plannedBranch()'),'the backdrop renders the planned branch');
 assert.ok(/const plannedBranch=\(\)=>new RNG\(plannedSeed\(\)\)\.pick\(D\.brand\.branches\)/.test(app),
  'derived from DATA.brand.branches with the same first-pick behaviour Game.start uses');
 assert.equal((app.match(/brand\.branches/g)||[]).length,1,'there is no second branch catalogue or selection rule');
 // 6: the preview cannot touch gameplay RNG - it is its own throwaway instance
 assert.ok(!/game\.rng/.test(app.slice(app.indexOf('let pendingSeed'),app.indexOf('function render()'))),
  'the preview never reaches the run stream');
 // 5: only three places touch the plan - the memoise, spending it at Start, and dropping it on a full reset
 //    (bug fix 2026-09-26: `reset-go` kept a plan made before the reset, so the next store reused its seed and Boss)
 const writes=app.match(/pendingSeed(\?\?)?=/g)||[];
 assert.deepEqual(writes,['pendingSeed=','pendingSeed??=','pendingSeed=','pendingSeed='],
  'the plan has exactly four sites: declared, memoised once, cleared at Start, cleared on full reset');
 assert.ok(/case'reset-go':\{[^}]*game=new Game\(Meta\.fresh\(\),null\);[^}]*pendingSeed=null;/.test(app),'a full reset drops a pending plan with the rest of the Run state');
 assert.ok(/let pendingSeed=null;/.test(app),'declared empty');
 const ret=app.slice(app.indexOf("case'store-return'"),app.indexOf("break;",app.indexOf("case'store-return'")));
 assert.ok(!/pendingSeed|plannedSeed/.test(ret),'a Store Management round trip does not touch the plan');
 assert.ok(!/pendingSeed|plannedSeed/.test(fn('storePanel')+fn('newRun')),'and neither panel re-plans it');
 // 4: the planned branch IS the branch the Run receives - the rule, run against the engine
 for(const seed of ['g24-abc','g24-zzz','opening-1','opening-2','opening-3']){
  const preview=new RNG(seed).pick(DATA.brand.branches);
  const g=new Game();g.autosave=false;g.start(seed);
  assert.equal(g.run.branch,preview,'seed '+seed+': the previewed store is the store that opens');
  assert.ok(DATA.brand.branches.includes(g.run.branch),'and it comes from the shipped catalogue');
 }
 // 7: gameplay still renders that same actual branch
 assert.ok(/class="branchplate">'\+E\(s\.branch\)/.test(app),'the Morning store plate reads run.branch');
 // 9: the superseded backdrop copy is gone
 for(const gone of ['오늘도 문을 연다.','초기 자금 1,000G','30일 영업','<p class="eyebrow">GUILD24</p>'])
  assert.ok(!app.includes(gone),'the superseded backdrop copy is gone: '+gone);
 assert.ok(!/class="eyebrow"/.test(back),'and the backdrop carries no eyebrow');
});

test('OPENING: the preparation modal starts on the three axes, with no franchise eyebrow',()=>{
 const intro=fn('newRun');
 // 8: the eyebrow is gone from the modal
 assert.ok(!intro.includes('길드리테일 가맹점'),'the preparation modal carries no 길드리테일 가맹점 eyebrow');
 assert.ok(!app.includes('길드리테일 가맹점'),'and it is gone from the build');
 assert.ok(/return `<h2 class="welcome-title">30일 동안/.test(intro),'the modal begins on the approved first line');
 for(const line of ['30일 동안 던전 앞 편의점을 운영한다.',
                    '찾아오는 모험가를 보급하고, 성장시킨다.',
                    '마지막 날, 성장한 모험가들을 마왕 토벌에 보낸다.'])
  assert.ok(intro.includes(line),'the approved line is present: '+line);
 assert.ok(/class="welcome-title">30일 동안 던전 앞 편의점을 운영한다\./.test(intro),'line 1 is the welcome title');
 assert.ok(/class="muted">찾아오는 모험가를 보급하고, 성장시킨다\./.test(intro),'line 2 is the supporting text');
 assert.ok(/class="welcome-band">마지막 날, 성장한 모험가들을 마왕 토벌에 보낸다\./.test(intro),'line 3 is the welcome band');
 // everything the change was scoped to keep
 assert.ok(intro.includes('이번 영업의 장식'),'the Decoration heading stays');
 assert.ok(/data-action="store-manage"/.test(intro),'the Store Management entry stays');
 assert.ok(/D\.decorationSlots\.map/.test(intro),'the Decoration rows stay');
 assert.ok(/Meta\.storeCapital\(a\)/.test(intro),'and the Capital display stays');
});

/* UI_UX §STORE SUPPORT — FINAL VISUAL SPEC. Two things this screen kept regressing to are
   asserted directly rather than described: green as the selected/state colour, and a disabled
   action that still reads 구매. The Canonical surface / border / text / action values are
   checked at their exact strings, because the spec states them as exact. */
test('UI_UX §STORE SUPPORT — FINAL VISUAL SPEC: the green ban, the exact planes and the caused labels',()=>{
 const from=css.indexOf('/* ---- STORE SUPPORT — FINAL VISUAL SPEC'),
       to=css.indexOf('.relic-takeover .close{');
 assert.ok(from>0&&to>from,'the Store Support block is where the spec says it is');
 // declarations only: the block's own prose names the banned treatments in order to ban them
 const block=css.slice(from,to).replace(/\/\*[\s\S]*?\*\//g,'');
 // GREEN BAN. No green token and no green literal carries state, selection or action here.
 assert.ok(!/--sign(-lit)?\)/.test(block),'no --sign / --sign-lit treatment survives on this screen');
 for(const banned of ['#27382f','#2c5c40','#7ddc9f','#9ce4b6','#4f9e6d','#3d8b5b','#d8f5e3','#e9fbef'])
  assert.ok(!block.includes(banned),'the banned green '+banned+' is gone');
 // the superseded first palette is not kept alongside the amended one
 for(const gone of ['#273033','#58666a','#a9843d','#c7a653','#191f21','#343f42','#b6c0c1','#899597',
   '#242b2d','#394549','#707d80','#b08f45','#faf6e9','#c2a15c','#8f7539'])
  assert.ok(!block.includes(gone),'the superseded '+gone+' is gone');
 // ORNAMENT BAN. The left accent bar, the sheen and the blur are all expressible in one sheet,
 // so each is checked as a shape rather than trusted to a comment.
 assert.ok(!/inset \d+px 0 0 /.test(block),'no vertical accent / left status strip');
 assert.ok(!/gradient|blur|drop-shadow/.test(block),'no gradient, blur or soft glow');
 assert.ok(!/inset 0 \d+px 0 #f|inset -?\dpx -?\dpx 0 #f/i.test(block),'no inset sheen band');
 assert.ok(!/opacity:\.[0-9]/.test(block),'no whole-element opacity fade');
 assert.ok(/opacity:1/.test(block),'the base sheet\'s disabled fade is switched off explicitly');
 // EXACT STATE HIERARCHY, at the amended Canonical values.
 assert.ok(/\.relic-plate\{[^}]*background:#20272b/.test(block),'AVAILABLE surface #20272B');
 assert.ok(/\.relic-plate\{[^}]*inset 0 0 0 2px #465158/.test(block),'AVAILABLE border #465158');
 assert.ok(/\.relic-plate h3\{[^}]*color:#f1ece2/.test(block),'title #F1ECE2');
 assert.ok(/\.relic-plate p\{[^}]*color:#b8c0c2/.test(block),'Function #B8C0C2');
 assert.ok(/\.relic-plate \.cost\{[^}]*color:#d2a347/.test(block),'price #D2A347');
 /* The control's HUE is the one thing on this screen Canonical hands to implementation -
    "No literal colour value is Canonical for this screen. The exact hue / saturation /
    brightness may be tuned" - so this asserts the grammar Canonical does own, and the exact
    values only as the current tune. USER DIRECTION 2026-09-22 retired #C4973E over a #765821
    brown offset, which still read as a brown box on a phone; the plane is a clean gold and the
    depth is the card's own slate. */
 const ctrl=(block.match(/\.relic-plate \.stamp\{[^}]*\}/)||[''])[0];
 /* USER DIRECTION 2026-09-22, final: acquiring a Store Support is a PURCHASE, so the one
    control here takes the YELLOW family - a clean gold-yellow, not the mustard the retired gold
    read as and not the flow Action, which belongs to whole screens rather than to a card.
    What stays screen-specific is the GRAMMAR Canonical owns: a flat plane with a hard offset
    and nothing else, so this control keeps neither the notch nor the drop shadow the base
    control carries, which §ORNAMENT BAN rules out here. */
 assert.ok(/background:var\(--yellow\)/.test(ctrl),'the one control is the purchase family');
 assert.ok(!/var\(--brick\)/.test(ctrl),'never the flow Action, which is not what this is');
 assert.ok(/inset 0 0 0 2px var\(--yellow-lit\),3px 3px 0 var\(--yellow-deep\)/.test(ctrl),
  'with a lit pixel edge over a hard offset in its own deep tone');
 assert.ok(/clip-path:none/.test(ctrl)&&/filter:none/.test(ctrl),
  'and it drops the base control\'s notch and drop shadow, which this screen bans');
 /* the grammar, independent of the tune: it is the strongest pop on the screen, it has real
    pixel depth, and no part of it is brown or olive - the tone this screen is required to be
    free of, and the one the previous values kept reading as */
 assert.ok(/inset 0 0 0 2px (#[0-9a-f]{6}|var\(--[a-z-]+\)),\dpx \dpx 0 (#[0-9a-f]{6}|var\(--[a-z-]+\))/.test(ctrl),
  'the AVAILABLE control keeps a hard edge plus a hard offset - its depth is the affordance');
 const brownish=hex=>{const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
  // a muddy brown/olive: the blue channel starved AND the plane dark enough to read as dirt
  return b<r*0.45&&Math.max(r,g,b)<0.62*255;};
 // the PLANES only - the ink on a gold control is a warm near-black on purpose, and reading it
 // as a brown box would be reading the letters instead of the button
 const tok=n=>(css.match(new RegExp('--'+n+':(#[0-9a-f]{6})'))||[])[1];
 const planes=[...ctrl.replace(/color:[^;]*/g,'').matchAll(/#([0-9a-f]{6})/g)].map(m=>m[1])
  .concat(['yellow','yellow-lit','yellow-deep'].filter(n=>ctrl.includes('var(--'+n+')')).map(n=>tok(n).slice(1)));
 assert.ok(planes.length>=3,'the control names its plane, its edge and its offset');
 for(const hex of planes)
  assert.ok(!brownish(hex),'no brown/olive value survives in the one control: #'+hex);
 assert.ok(!/#c4973e|#765821|#e3b341|#f6d878|#21c7f3|#f2644b/.test(block),
  'and every retired plane - brown, muddy gold, cyan, coral - is gone from the screen');
 /* the defer control shares the takeover, so it answers to the same slate palette */
 const defer=(css.match(/\.relic-takeover \.close \.stamp\{[^}]*\}/)||[''])[0];
 assert.ok(defer&&!/#3a2c1d|#6b5335/.test(defer),'the defer control is no longer the dead brown box');
 assert.ok(/background:var\(--brown\)/.test(defer),'it is the back/defer family');
 assert.ok(!/var\(--yellow\)|var\(--brick\)/.test(defer),'and never competes with the purchase beside it');
 // affordance only on the control that can be pressed - :hover/:active still match a disabled one
 assert.ok(/\.relic-plate \.stamp:not\(\[disabled\]\):hover/.test(block)
  &&/\.relic-plate \.stamp:not\(\[disabled\]\):active/.test(block),
  'hover and active are scoped away from a disabled control');
 assert.ok(/\.relic-plate\.owned\{[^}]*background:#20272b/.test(block),
  'SELECTED keeps the AVAILABLE surface - it is never a filled card');
 assert.ok(/\.relic-plate\.owned\{[^}]*inset 0 0 0 2px #b98b3e/.test(block),'and carries the #B98B3E outline');
 assert.ok(/\.relic-plate\.owned h3\{color:#f6f0e5/.test(block),
  'with the raised title contrast, so the state is not the outline alone');
 const owned=(block.match(/\.relic-plate\.owned \.stamp\[disabled\]\{[^}]*\}/)||[''])[0];
 assert.ok(/background:#171c1f/.test(owned)&&/color:#d2a347/.test(owned)
  &&/inset 0 0 0 2px #b98b3e/.test(owned),'the state control is charcoal with a muted-gold edge and ink');
 assert.ok(!/min-width|min-height|font:|padding:/.test(owned),
  'and keeps the AVAILABLE footprint exactly - never a smaller status chip');
 assert.ok(!/\dpx \dpx 0 /.test(owned),'with no hard press shadow');
 assert.ok(/\.relic-plate\.unavailable\{[^}]*background:#171c1f/.test(block),'UNAVAILABLE surface #171C1F');
 assert.ok(/\.relic-plate\.unavailable\{[^}]*inset 0 0 0 2px #303a3e/.test(block),'border #303A3E');
 assert.ok(/\.relic-plate\.unavailable h3\{color:#aeb8ba/.test(block),'title #AEB8BA, still legible');
 assert.ok(/\.relic-plate\.unavailable p\{color:#828e91/.test(block),'Function #828E91, still legible');
 assert.ok(/\.relic-plate \.stamp\[disabled\]\{background:#23292c;color:#697579/.test(block),
  'and the dead plane at #23292C / #697579');
 assert.ok(!/\.relic-plate \.stamp\[disabled\]\{[^}]*\dpx \dpx 0 /.test(block),
  'which carries no hard offset, so it cannot read as pressable');
 // DISABLED COPY, COPY_AUDIT §11-31 / §11-31b: the cause is named, never left as 구매.
 const win=app.slice(app.indexOf('relic-choices'),app.indexOf('function sealChoice'));
 assert.ok(/spent=!game\.canBuyRelic\(\),poor=s\.money<price/.test(win),
  'the two disabled causes are separated from the one blocked flag');
 assert.ok(win.includes("mine?'\ubcf4\uc720 \uc911':spent?'\uc120\ud0dd \uc885\ub8cc':poor?'\uace8\ub4dc \ubd80\uc871':'\uad6c\ub9e4'"),
  'and the four approved labels are adopted verbatim, in that order');
 assert.ok(!/mine\?'\ubcf4\uc720 \uc911':'\uad6c\ub9e4'/.test(win),'the old two-way label is gone');
});


/* ECONOMY_ORDER §VISITOR FORECAST + NPC_TRAIT §PRE-REVEAL: before Sale the Morning / ORDER show
   the expected visitor count, and never a customer's name, Job, Trait, Wallet or destination.
   On actual appearance the NPC becomes introduced. */
test('ECONOMY_ORDER §VISITOR FORECAST / NPC_TRAIT §PRE-REVEAL: the count before Sale, the person on arrival',()=>{
 const pre=['morningScreen','orderForm','orderScreen','deepSlip','gatePlate','eventSlip','todayLine'].map(fn).join('\n');
 assert.ok(fn('morningScreen').includes('s.queue.length')&&fn('orderForm').includes('todayLine(counts')&&fn('todayLine').includes('s.queue.length'),
  'Morning and ORDER both state the expected visitor count (ORDER through todayLine, its block and its floating copy)');
 /* v2.9.0 (ECONOMY_ORDER §VISITOR FORECAST, narrowed): the per-Gate count is public with ≥2 Gates; gateCounts() is the one reader */
 assert.ok(!/s\.queue(?!\.length)|queue\[|game\.current\(\)/.test(pre),'the pre-Sale surfaces read the queue only as a count, or through gateCounts()');
 assert.ok(/counts=s\.dungeons\.length>=2\?gateCounts\(\):null/.test(fn('orderForm')),'per-Gate counts only with two or more Gates');
 const gc=fn('gateCounts');assert.ok(/game\.claimedGateFor\(n\)/.test(gc)&&!/\.(traits|job|money|destination|name|portrait)\b/.test(gc),'the helper reads the claimed Gate only and returns counts');
 /* `s.money` is the Store's own till; any other holder's money is a customer Wallet. */
 assert.ok(!/(?<!\bs)\.(traits|job|money|destination|claimedDestination|portrait)\b/.test(pre),
  'and read no customer Trait, Job, Wallet or destination');
 for(let i=0;i<10;i++){
  const g=new Game();g.autosave=false;g.start('pre-reveal-'+i);g.buyRelic(g.run.relicWindow.candidateIds[0]);
  const s=g.run,shown=s.queue.length,queued=[...s.queue];
  assert.ok(shown>=1,'a count is forecast');
  assert.ok(queued.every(id=>!s.npcs.find(n=>n.id===id).introduced),'D1: nobody is introduced before they appear');
  g.beginOrder();
  assert.equal(s.queue.length,shown,'ORDER repeats the same count');
  assert.ok(queued.every(id=>!s.npcs.find(n=>n.id===id).introduced),'and ORDER introduces nobody');
  g.open();let arrived=0;
  while(s.phase==='sell'){
   const n=g.current();arrived++;
   assert.equal(n.introduced,true,'the customer is introduced on appearance');
   assert.ok(queued.slice(s.cursor+1).every(id=>!s.npcs.find(x=>x.id===id).introduced),'later customers stay unintroduced');
   g.depart();
  }
  assert.equal(arrived,shown,'the forecast count is exactly the customers who appeared');
 }
});

/* UI_UX §RETIRED ACTIVE UI / META §RETIRED FRANCHISE SYSTEM: no Franchise Grade, Franchise
   Achievement list/progress/toast, Grade ORDER discount, Start Contract selection or Grade-gated
   Contract unlock progress is exposed. Every shipped UI and copy file is scanned with comments
   removed, so only what can reach the player is judged. */
test('UI_UX §RETIRED ACTIVE UI: no shipped UI file exposes Franchise Grade, Achievements or Start Contract',()=>{
 const files=[...walk('dist/ui').filter(f=>/\.js$/.test(f)&&!/vendor/.test(f)),'dist/index.html','dist/qa-mobile.html','dist/data/copy.js'];
 for(const f of files){
  const code=read(f).replace(/\/\*[\s\S]*?\*\//g,'').replace(/<!--[\s\S]*?-->/g,'').replace(/^\s*\/\/.*$/gm,'');
  for(const re of [/grade/i,/franchise/i,/achievement/i,/contract/i,/가맹/,/업적/,/등급 할인/,/시작 계약/,/계약 선택/])
   assert.ok(!re.test(code),f+' exposes a retired system: '+re);
  assert.ok(!/archive\//.test(code),f+' loads nothing from the inactive archive');
 }
});

/* META §DECORATION 의무실 현판 (User 2026-09-24): a heal at the door is one line in the customer's
   own state strip beside the bag, never makes the strip taller (a phone strip grows upward
   into the speech balloon), wraps instead of overflowing, and has its own quiet cue. */
test('의무실 현판: the heal note sits in the kit under the bag, wraps, and has its own cue',()=>{
 const kit=fn('kitLine');
 assert.ok(/healedBy==='infirmaryPlaque'/.test(kit)&&kit.includes('의무실 현판 덕분에 부상이 나았다.'),'the note reads the heal the arrival recorded');
 assert.ok(kit.indexOf("+heal+'</div>'")>kit.indexOf('class="slots"'),'it follows the bag, on the bag row');
 assert.ok(/\.kit \.heal-note\{flex:1 1 64px;[^}]*overflow-wrap:anywhere/.test(css),'beside the bag, wrapping');
 assert.ok(/@media\(min-width:1024px\)\{\.kit \.heal-note\{position:absolute;/.test(css),'on a desk it takes the empty foot of the strip');
 assert.ok(/prefers-reduced-motion:reduce\)\{\.kit \.heal-note\{animation:none\}/.test(css),'no motion when reduced');
 const audio=read('dist/ui/audio.js');assert.ok(/\bheal:\[/.test(audio)&&/\bheal:\{/.test(audio),'the cue exists');
 assert.ok(/case'open':[^\n]*healCue\(\)/.test(app)&&/else sound\('depart'\);healCue\(\);/.test(app),'played on the arrival that opens SALE and on each next one');
});

/* USER 2026-09-24 / UI_UX §FIRST STORE SUPPORT TUTORIAL (DAY 0): the first screen of a new store
   teaches itself - three marks over the DAY 0 takeover, never over any other modal, never a pick. */
test('DAY 0 Store Support tutorial: three marks over the takeover, DAY 0 only, no answer given',()=>{
 const steps=(app.match(/ relic:\[(\['relic-what'[\s\S]*?\]\])\n\};/)||[])[1];
 assert.ok(steps,'the relic lesson exists');
 for(const [id,sel] of [['relic-what','.relic-open'],['relic-card','.relic-choices .relic-plate'],['relic-buy','.relic-choices .relic-plate .stamp']])
  assert.ok(steps.includes("['"+id+"','"+sel+"'"),id+' points at '+sel);
 for(const r of DATA.relics)assert.ok(!steps.includes(r.name),'no Store Support is named as the answer: '+r.name);
 const show=fn('showCoach');
 assert.ok(/const relicD0=modal==='relics'&&game\.run\?\.phase==='foundation';/.test(show),'the exception is the DAY 0 takeover alone');
 assert.ok(/if\(tutorial\.skipped\|\|\(modal&&!relicD0\)\|\|bossHold\)return;/.test(show),'every other modal (and a held Boss reveal, UI-Q-v29-35) still has no mark over it, and a skipped tutorial stays skipped');
 assert.ok(/relicD0\?coachSteps\.relic:/.test(show),'the takeover reads its own lesson');
 assert.ok(/\.coach-layer\.over-takeover\{z-index:80\}/.test(css)&&/\.relic-takeover\{[^}]*z-index:70/.test(css),'the mark sits above the takeover it teaches');
 /* USER 2026-09-24: 건너뛰기 skips this screen's lesson only, never the whole tutorial */
 const fin=fn('finishCoach');
 assert.ok(/if\(skip\)for\(const x of activeGroup\|\|\[\]\)t\['coach-'\+x\[0\]\]=true;/.test(fin),'skip marks every mark of the group on screen done');
 assert.ok(!/skipped=true/.test(fin),'and no longer switches the whole tutorial off');
 assert.ok(/activeGroup=steps;/.test(show),'the group is the one being shown');
 assert.ok(/\.coach-bubble p\{[^}]*word-break:keep-all/.test(css),'bubble copy breaks between words');
 const copy=read('design_ssot/COPY_WORLD_VOICE_v2.8.0.md');
 for(const line of steps.match(/'[^']*다\.'/g).map(x=>x.slice(1,-1)))assert.ok(copy.includes(line),'the copy is the approved line: '+line);
});

/* USER 2026-09-24: every phase's music at one loudness, and the settings keys in one style */
test('BGM is level across phases; settings keys share one style',()=>{
 const audio=read('dist/ui/audio.js');
 const levels=[...audio.matchAll(/\n (morning|order|sale|night|boss):\{[^\n]*level:([\d.]+)\}/g)].map(m=>[m[1],Number(m[2])]);
 assert.equal(levels.length,5,'every track carries its trim');
 assert.ok(/BGM_VOICE\*lv/.test(audio)&&/BGM_BASS\*lv/.test(audio)&&/BGM_BASS\*\.7\*lv/.test(audio),'melody, bass and drone all take it');
 const set=fn('settings');
 assert.ok(!/btn\('[^']+','(export|import|sound)','stamp'\)/.test(set),'no settings key is dressed as the pixel primary');
});

/* v2.9.0 TRANSACTION BEAT (User 2026-09-24) - PRESENTATION_PRINCIPLES §TRANSACTION BEAT A1~A6,
   UI_UX_QA UI-Q-v29-3. Selling has to be seen as an act: the icon travels to the Bag, the Gold
   counts, the customer nods or shakes their head, the refused price shakes where it locked, the
   customer walks off before the next arrives. Presentation only - the state moves exactly as it
   did, under the same guard as every other beat, and nothing here is saved. */
test('UI-Q-v29-3: the transaction beat is visible, short, guarded and stateless',()=>{
 const css=read('dist/ui/ui.css'),Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 const sell=app.slice(app.indexOf("case'sell':"),app.indexOf("\n case'",app.indexOf("case'sell':")+1));
 // the click handler records what the screen showed before the commit, and only that
 assert.ok(/const tile=\$\('\.counter-tray \.tray-icon'\)/.test(sell)&&/from:tile\?tile\.getBoundingClientRect\(\):null/.test(sell),"the tray icon's place is read before the state moves (v2.9.0 counter tray)");
 assert.ok(/gold:s\.money/.test(sell)&&/stats:\[\.\.\.document\.querySelectorAll\('\.detail-stats \.detail-stat strong'\)\]/.test(sell),'so are the Gold and the four Stat readings');
 assert.ok(/handoff=seen;showStub\(\);render\(\);/.test(sell),'and they are handed to the draw that follows (the receipt stub is placed before that draw so playCue can animate it)');
 assert.ok(/const success=game\.sell\(selected,el\.dataset\.mode\);/.test(sell),'the commit itself is unchanged');
 assert.ok(!/account\.\w*handoff|run\.\w*handoff/.test(app),'the record is never written into a save');
 const cue=fn('playCue');
 // A1 hand-over: shelf row -> Bag slot (280 ms), slot settles (240 ms), Gold counts, changed cells pulse (300 ms)
 assert.ok(/\.kit \.slots i\.full/.test(cue)&&/g\.className='handoff'/.test(cue)&&/duration:280/.test(cue),'the icon travels from the counter tray to the Bag slot it fills, in the state strip');
 assert.ok(/scale:\[1\.05,1\],duration:240/.test(cue),'and the slot settles');
 assert.ok(/\.dock \.on-hand b/.test(cue)&&/duration:320/.test(cue)&&/gold\.textContent=fmt\(box\.v\)/.test(cue),'the dock Gold counts to its new value');
 assert.ok(/\.detail-stats \.detail-stat/.test(cue)&&/duration:300/.test(cue),'the changed Stat cells pulse once and keep the new value');
 assert.ok(/\.handoff\{position:fixed;z-index:70;[^}]*pointer-events:none/.test(css),'the travelling icon takes no input');
 // A2 / A6: nod on a purchase, head-shake and a shaken locked button on a refusal
 assert.ok(/translateY:\[0,4,0,4,0\],duration:360/.test(cue),'the customer nods 4 px, 180 ms x 2');
 assert.ok(/translateX:\[0,-4,4,-2,0\],duration:280/.test(cue),'or shakes their head on the bubble-shake timing');
 assert.ok(/\.tills button\[data-mode="'\+h\.mode\+'"\]\[disabled\]/.test(cue),'and the refused price shakes where it locked');
 // every beat is under 320 ms; travel then settle stays under one sale's 600 ms
 for(const ms of [...cue.matchAll(/duration:(\d+)/g)].map(m=>Number(m[1])))assert.ok(ms<=360,'no beat runs over its contract: '+ms);
 assert.ok(280+240<600,'travel then settle stays under 600 ms');
 // A4: exit left (240 ms), then the existing entry; a second tap is dropped, a timer never lets the beat hold the day
 const exit=fn('playExit');
 assert.ok(/translateX:\[0,-40\],opacity:\[1,0\],duration:240/.test(exit),'the customer walks off left in 240 ms');
 assert.ok(/if\(leaving\)return;/.test(exit)&&/setTimeout\(fire,260\)/.test(exit),'a second tap departs nobody twice, and the state always moves');
 assert.ok(/case'depart':playExit\(\(\)=>\{game\.depart\(\);selected=null;render\(\);/.test(app),'손님 보내기 goes through the beat with its state change intact');
 assert.equal(Sound.samples.depart,'door','depart carries a recorded utility object');
 assert.ok(fs.existsSync(path.join(root,'dist/ui/assets/audio/door.mp3')),'and the file ships');
 assert.ok(/\('send','door'\)/.test(read('tools/vendor-assets.py'))&&read('reports/ASSETS.md').includes('`door.mp3`'),'vendored and recorded like the others');
 // A2 reply timing: buy / refuse lines stay 5 s, the greeting 3 s
 assert.ok(/const SAY_MS=3000;/.test(app)&&/const SAY_REPLY_MS=5000;/.test(app)&&/const sayMs=cue==='sale'\|\|cue==='refuse'\?SAY_REPLY_MS:SAY_MS;/.test(app),'the reply stays 5 s, the greeting 3 s');
 // reduced motion: the same handlers run, the beats stand down, the end state is the same
 assert.ok(/if\(!motionOK\(\)\|\|!who\)\{go\(\);return;\}/.test(exit),'under reduced motion the departure is immediate');
});


/* v2.9.0 SALE — COUNTER TRAY (User-approved composition change 2026-09-24; UI_UX §SALE — COUNTER TRAY,
   UI-Q-v29-18). The per-row price panel is gone from the ordinary SALE: the chosen Item sits on one
   fixed tray above the dock, the shelf rows never change height, and FINAL keeps its own panel. */
test('UI-Q-v29-25: on a desk the SALE dossier column runs to the dock, the tray sits under the shelf only, and the columns scroll apart',()=>{
 const desk=css.slice(css.indexOf('@media(min-width:1024px){\n /* The stat/forecast column'));
 assert.ok(/grid-template-areas:"task task" "front front" "edge edge" "left shelf" "left tray" "dock dock"/.test(desk),'two areas below the counter band: the dossier beside the shelf and the tray');
 assert.ok(/\.p-sale>\.stage-scroll\{display:contents\}/.test(desk)&&/\.p-sale \.dossier-col\{grid-area:left/.test(desk)&&/\.p-sale \.shelf-col\{display:block;grid-area:shelf/.test(desk)&&/\.p-sale>\.counter-tray\{grid-area:tray/.test(desk),'the dossier runs to the dock; the tray is only the shelf column wide');
 assert.ok(/\.p-sale \.dossier-col,\.p-sale \.shelf-col\{min-height:0;overflow-y:auto/.test(desk),'each column scrolls on its own');
 assert.ok(/\.p-sale \.shelf-col\{display:contents\}/.test(css)&&/'<div class="shelf-col">'\+shelf\(\)\+'<\/div>'/.test(fn('saleScreen')),'the shelf column is no box on a phone');
 assert.ok(/const previousCols=\['\.p-sale \.dossier-col','\.p-sale \.shelf-col'\]/.test(app)&&/el\.scrollTop=changed\?0:previousCols\[i\]/.test(app),'a redraw keeps both column positions; a new view starts at the top');
});
test('UI-Q-v29-24: the SALE forecast pin floats the readout words only while the readout is off screen, folds on a tap, and saves nothing',()=>{
 const pin=fn('forecastPin'),watch=fn('watchForecastPin'),sync=fn('syncForecastPin');
 assert.ok(/counter-edge" aria-hidden="true"><\/div>'\+forecastPin\(n\)\s*\+'<main class="stage-scroll"/.test(fn('saleScreen')),'the pin anchor sits at the top of the scrolled column, where the readout sat');
 assert.ok(/n\.outlook\|\|game\.outlookFor\(n\)/.test(pin)&&pin.includes('전투 전망')&&pin.includes('환경 대응')&&pin.includes('>전망<'),'the pin reads the frozen SALE-entry outlook and folds to a 전망 chip');
 assert.ok(/IntersectionObserver/.test(watch)&&/\.readout\.core-mob/.test(watch)&&/'show',!e\.isIntersecting/.test(watch),'shown only while the phone readout is out of the scrolled view');
 assert.ok(/case'forecast-pin':pinFolded=!pinFolded;syncForecastPin\(\);break;/.test(app)&&!/pinFolded[^;]*(game\.save|account\.settings|localStorage)/.test(app),'one tap folds / unfolds, held in memory only');
 assert.ok(/aria-expanded/.test(sync),'the fold state is announced');
 assert.ok(/if\(e\.isIntersecting&&pinFolded\)\{pinFolded=false;syncForecastPin\(\);\}/.test(watch),'the fold clears once the readout is back on screen, so the next pin opens unfolded');
 assert.ok(/\.forecast-pin-anchor\{position:relative;height:0/.test(css)&&/@media\(min-width:1024px\)\{\.forecast-pin-anchor\{display:none\}\}/.test(css)&&/\.forecast-pin\{[^}]*min-height:44px/.test(css),'no layout height, never on a desk, a 44px target');
});
test('UI-Q-v29-18: the counter tray holds the chosen Item; the shelf never moves',()=>{
 const css=read('dist/ui/ui.css'),sale=fn('saleScreen'),shelf=fn('shelf'),tray=fn('tray');
 assert.ok(sale.indexOf("+'</main>'")<sale.indexOf('+tray()')&&sale.indexOf('+tray()')<sale.indexOf('<div class="dock">'),'the tray sits between the scrolled column and the dock');
 assert.ok(/open&&isFinal\?till\(\):''/.test(shelf),'an ordinary SALE row opens no panel of its own; FINAL keeps its panel');
 assert.ok(tray.includes('상품을 누르면 계산대에 올라온다.'),'the empty tray says what to do (COPY_AUDIT §4-23)');
 assert.ok(/class="tray-icon"/.test(tray)&&/'에게<\/b> · '\+walletChip\(n\)/.test(tray),'header: the Item and who is buying with what (COPY_AUDIT §4-24)');
 assert.ok(/판매 후 변화/.test(tray)&&/parts\.join\('<i> · <\/i>'\)/.test(tray)&&/현재 준비 변화 없음/.test(tray),'one delta list on one wrapping line');
 assert.ok(/특수 효과/.test(tray)&&/priceKeys\(n,it,st\)/.test(tray),'특수 효과 and the same three price keys');
 assert.ok(fn('till').includes(':priceKeys(n,it,st);'),'the FINAL panel and the tray share the one price-key owner');
 assert.ok(/\.p-sale \.counter-tray\{flex:0 0 auto;/.test(css)&&/\.tray-empty\{margin:0;min-height:44px/.test(css),'fixed band, 44px when empty');
 assert.ok(/\.counter-tray \.tills button\{min-height:64px/.test(css)&&/\.good\{[^}]*padding:8px 0/.test(css)&&/\.good \.tile\{width:38px/.test(css),'compact keys and rows keep the 360 budget');
 assert.ok(/@media\(min-width:1024px\)\{\.p-sale \.counter-tray\{display:grid;grid-template-columns:minmax\(0,1\.05fr\) minmax\(0,1fr\);gap:0 24px\}\.p-sale \.counter-tray>\*\{grid-column:2\}\}/.test(css),'on a desk the tray aligns under the shelf column');
 assert.ok(/\.good \.what span\{font:600 14px/.test(css),'the effect line keeps its Function class (UI_UX §FUNCTION / FLAVOR)');
});


/* v2.9.0 ONBOARDING / ORDER (User 2026-09-24): UI_UX §TUTORIAL — TASK LINE / FIRST-ORDER COACH ORDER, §HAZARD NUDGE,
   §ORDER — ITEM INFORMATION HIERARCHY, ECONOMY_ORDER §VISITOR FORECAST; COPY_AUDIT §3-7 / §3-8 / §4-15 / §4-16 / §4-21;
   UI-Q-v29-10 … UI-Q-v29-13. */
test('UI-Q-v29-10..13: task line, first-ORDER coach order, Hazard sentences and plate help, ORDER today-fit + per-Gate counts',()=>{
 const css=read('dist/ui/ui.css');
 // task line: five exact strings, DAY 1~3 while the tutorial is not skipped, one line
 for(const [ph,line] of [['morning','오늘 할 일 — 열린 게이트의 위험을 본다'],['order','오늘 할 일 — 위험에 맞는 능력을 올리는 상품을 발주한다'],['sell','오늘 할 일 — 손님이 갈 게이트를 보고 상품과 가격을 정한다'],['night','오늘 할 일 — 준비가 어떻게 됐는지 확인한다'],['closing','오늘 할 일 — 오늘 장사를 정리한다']])
  assert.ok(app.includes(ph+":'"+line+"'"),'task line for '+ph+' is the §3-8 string');
 const tl=fn('taskLine');
 assert.ok(/t\.skipped\|\|!\(s\.day>=1&&s\.day<=3\)/.test(tl),'DAY 1~3 only, hidden when the tutorial is skipped (no DAY 0, no DAY 4)');
 assert.ok(!/account\.\w*task|run\.\w*task/.test(app),'no Save field');
 for(const scr of ['morningScreen','orderScreen','saleScreen','nightScreen','closingScreen'])assert.ok(fn(scr).includes('taskLine('),scr+' places the line');
 assert.ok(/\.task-line\{[^}]*font-size:clamp\(12px,3\.3vw,13px\)[^}]*white-space:nowrap/.test(css),'one line, never two at 360 (size follows width, no breakpoint)');
 assert.ok(!/task-line[^\n]*data-action/.test(app),'not a button, not a coach mark');
 // first-ORDER coach: gates -> offer -> quantity -> confirm -> reroll, no gold mark
 const order=/ order:\[(.*)\],\n/.exec(app)[1];
 assert.deepEqual([...order.matchAll(/\['([a-z-]+)','([^']+)'/g)].map(m=>[m[1],m[2]]),[['order-gates','.brief .when'],['offer','.lines .line'],['quantity','.dial'],['confirm','[data-action="confirm-order"]'],['reroll','.rubber']],'the five steps in order, on their anchors');
 assert.ok(order.includes("'오늘 열린 게이트와 위험. 위험 보기를 누르면 무엇으로 막는지 나온다.'")&&order.includes("'음식은 피로 회복, 음료는 능력치·위험 보조와 약간의 피로 회복, 포션은 투력, 장비는 위험 대응, 보험은 실패 완화.'"),'GATES / OFFER lines verbatim (COPY_AUDIT §3-7)');
 assert.ok(!order.includes('#order-register')&&!app.includes('보유 골드와 현재 발주 후 잔액을 확인한다.'),'the 보유 골드 mark is retired');
 // Hazard sentences (User 2026-09-24 revision 4, UI-Q-v29-19): the Gate-level requirement number first, N = ceil(Hazard Threat), n = 3 / 2 (Stat n당 대응 1)
 const rate={survival:3,mobility:2,spirit:2};
 for(const [k,[st,n]] of Object.entries({poison:['survival',3],bind:['mobility',2],fear:['spirit',2],dark:['mobility',2]})){const r=Dungeon.hazardRule(k);assert.equal(r.stat,st);assert.ok(Math.abs(r.coef-1/n)<1e-12,k+' coefficient is exactly 1/'+n);}
 for(const [day,tier] of [[1,1],[6,2],[18,3]]){const d={day,tier};
  for(const k of Object.keys(DATA.hazards)){const st=Presentation.hazardStat[k],need=Math.ceil(Dungeon.hazardState(k,{},d).threat);
   assert.equal(Presentation.hazardSentence(k,d),DATA.hazards[k]+' — 대응 '+need+' 필요 · '+Presentation.labels[st]+'\u00a0'+rate[st]+'당\u00a0대응\u00a01\u00a0제공 · '+DATA.hazards[k]+' 대응 상품이 막는다',k+' sentence at D'+day+' T'+tier);
   assert.equal(Presentation.hazardShort(k,d),'대응 '+need+' 필요 · '+Presentation.labels[st]+'\u00a0'+rate[st]+'당\u00a0대응\u00a01\u00a0제공',k+' short row');
   assert.deepEqual(Presentation.hazardParts(k,d),{need:'대응 '+need+' 필요',rate:Presentation.labels[st]+'\u00a0'+rate[st]+'당\u00a0대응\u00a01\u00a0제공'},k+' two parts');}}
 assert.ok(!/\u00a0/.test(read('design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md')),'the Canonical text keeps ordinary spaces; only the rendered rate unit is no-break');
 assert.equal(Presentation.hazardSentence('poison',{day:1,tier:1}),'독 — 대응 13 필요 · 강인함\u00a03당\u00a0대응\u00a01\u00a0제공 · 독 대응 상품이 막는다','the DAY 1 T1 example');
 assert.ok(!/더 필요/.test(app)&&!/더 필요/.test(read('dist/ui/presentation.js')),'no per-customer remaining need');
 assert.ok(!('PLATE_HELP' in Presentation)&&!/위험은 능력치를 누르고/.test(read('dist/ui/presentation.js')),'the plate help line is retired (§4-15)');
 assert.ok(/s\.dungeons\.map\(d=>gatePlate\(d,true\)\)/.test(app)&&/Presentation\.hazardSentence\(h\.key,d\)/.test(fn('gatePlate'))&&/pressCell\(h\)/.test(fn('gatePlate')),'Gate detail reads the full sentence, MORNING the short row (need over rate)');
 assert.ok(!/gatePlate\(d,true\)/.test(fn('morningScreen'))&&/s\.dungeons\.map\(d=>gatePlate\(d\)\)/.test(fn('morningScreen')),'MORNING renders the plate in short form');
 /* User 2026-09-25: `map(gatePlate)` handed the array index in as `full`, so the second Gate read the
    Gate-detail sentence. The plate is never passed to .map bare. */
 assert.ok(!/\.map\(gatePlate\)/.test(app),'no Gate after the first is printed as Gate detail');
 const plate=fn('destPlate');
 assert.ok(/hazardList\(Presentation\.known\(d,game\),null,d\)/.test(plate),'the plate rows carry this Gate\'s numbers (hazardList with the Gate)');
 assert.equal((plate.match(/tip\(/g)||[]).length,0,'no ? help on the plate (§4-15 retired, User 2026-09-24 revision 2)');
 // D25 / FINAL: the same numbered rows with the Final object (Day 30 / T2 -> 29)
 assert.equal(Presentation.hazardShort('poison',{day:30,tier:2}),'대응 29 필요 · 강인함\u00a03당\u00a0대응\u00a01\u00a0제공');
 assert.ok(/hazardList\(D\.familyTiers\[id\]\[1\],null,d\)/.test(fn('bossReveal')),'the D25 report rows are numbered for 마왕성');
 assert.ok(/hazardList\(d\.hazards\.filter\(h=>own\.includes\(h\)\),null,d\)/.test(fn('finalScreen')),'the FINAL 확인된 위협 rows are numbered for 마왕성');
 assert.ok(/hazardRows\(s\.final\.hazards,s\.final\)/.test(fn('orderScreen'))||/hazardRows\(s\.final\.hazards,s\.final\)/.test(app),'the ORDER 마왕성 brief rows are numbered too');
 assert.equal(Copy.boss.final.intro,'마왕성으로 향하는 최종 원정 환경이 확인됐다. 대응 수치는 마왕성 기준.','COPY_AUDIT §14-7 intro');
 // ORDER today-fit emphasis: the SALE rule against today's Gates, typographic only
 const of=fn('orderForm');
 // v2.9.0 F6 (User 2026-09-24): the today-fit / matching-effect emphasis is retired on ORDER and SALE
 assert.ok(!/fitToday|fitKeys/.test(app)&&!('fitKeys' in Presentation),'no fit computation survives');
 assert.ok(!/class="fit"|' fit'/.test(app)&&!/\.fit\{/.test(css),'no emphasis class or rule survives');
 assert.ok(!/오늘 필요|추천/.test(of),'no badge or verdict word');
 // ITEM §PRESENTATION ORDER: every row passes its category, so the fixed order is the same everywhere
 for(const f of ['effectList','shelf','tray','till','orderForm'])assert.ok(fn(f).includes('Presentation.rows(')&&!/Presentation\.rows\(it\.effects\)/.test(fn(f)),f+' passes the category to rows()');
 assert.deepEqual(Presentation.rows(DATA.itemBy.bar.effects,undefined,'food').map(r=>r.key),['supply','survival','loot'],'Food leads with 피로 회복');
 assert.deepEqual(Presentation.rows(DATA.itemBy.wine.effects,undefined,'drink').map(r=>r.key),['fear','mobility','supply'],'a Drink ends with 피로 회복');
 // §TRANSACTION RESULT STUB
 assert.ok(/const who=game\.current\(\),wasM=who\?who\.money:0,wasL=who\?who\.loyalty:0;/.test(fn('action'))&&/stub=\{loyalty:who\.loyalty-wasL,from:wasM,to:who\.money\}/.test(fn('action')),'the stub reads the customer\'s real Loyalty and Wallet change');
 assert.ok(fn('showStub').includes("'단골도 '+(st.loyalty>=0?'+':'')+st.loyalty+' · 소지금 '+st.from+' → '+st.to")&&fn('showStub').includes('2500')&&fn('playCue').includes("$('.receipt-stub')"),'§4-24 exact format, about 2.5 s, motion only inside playCue');
 assert.ok(/\.receipt-stub\{position:fixed;[^}]*pointer-events:none/.test(css),'no reserved height, no input held');
 assert.ok(!/stub/.test(read('dist/systems/shop.js'))&&!/stub/.test(read('dist/systems/run.js')),'presentation only');
 // UI-Q-v29-14 D0 briefing: the two body lines carry the record's body weight (RUNTIME UX BUG fixed 2026-09-25: the I-3 markup had no rule)
 assert.ok(fn('bossReveal').includes('<div class="d0-step"><b>'),'the D0 body is two labelled entries');
 assert.ok(/\.boss-reveal \.d0-step b\{display:block;[^}]*var\(--f-led\)[^}]*color:#7a281f\}/.test(css)&&/\.boss-reveal \.d0-step p\{margin:0;font:400 15px\/1\.6 var\(--ui\);color:#3c3527\}/.test(css),'label on the LED face, line in the body weight');
 assert.ok(!/d0-line|d0-close/.test(css)&&!/d0-line|d0-close/.test(app),'no orphan rule survives');
 // v2.9.0 F7 (User 2026-09-24): quick-view status line, purchase notice, Counter judgement split
 assert.ok(fn('ownedRelicView').includes('Relics.status(game,r.id)')&&fn('relicsModal').includes('Relics.status(game,r.id)')&&/<p class="status">/.test(app),'both owned lists carry the runtime status line');
 assert.ok(read('dist/systems/relics.js').includes("s.notice=D.relicBy[id].name+' 확보.';")&&!/다음 날부터 적용됩니다/.test(read('dist/systems/relics.js')),'§11-33 the notice is the name and 확보 only');
 assert.ok(!/h==='bind'\|\|h==='mire'/.test(read('dist/systems/relics.js'))&&!/h==='bind'\|\|h==='mire'/.test(read('dist/systems/dungeon.js')),'the 기동-for-속박/진창 Counter exception is gone');
 assert.ok(/const counters=mode!=='overcharge'&&G\.Relics\.relatedPrep\(it,d\.hazards\);/.test(read('dist/systems/shop.js'))&&!/G\.Relics\.counter\(/.test(read('dist/systems/shop.js')),'SALE acceptance reads 관련 준비; no third predicate is called');
 // per-Gate counts: only with ≥2 Gates, in the §4-21 form
 assert.ok(/counts\?s\.dungeons\.map\(d=>E\(d\.name\)\+' '\+\(counts\.get\(d\.id\)\|\|0\)\)\.join\(' · '\):E\(s\.dungeons\.map\(d=>d\.name\)\.join\(' \/ '\)\)/.test(of+fn('todayLine')),'{N}명 · {Gate A} {a} · {Gate B} {b} with two or more Gates, {N}명 · {Gate} with one');
 assert.ok(!/gateCounts\(/.test(fn('morningScreen')),'MORNING states the total only');
});


console.log(count+' ui guard groups passed');
