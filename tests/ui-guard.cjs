// Chunk F acceptance: the parts of the UI contract a Node process can prove.
// Covers UI-Q02/Q19/Q24/Q26/Q32/Q34/Q35/Q39, REL-Q39, DUN-Q21 and the
// V2_4_EXECUTION_PLAN §8.1 Playwright boundary contract.
// Everything that needs a real viewport lives in `npm run qa:visual` (UI-Q38), never here.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','ui/scene'])require('../dist/'+f+'.js');
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
 assert.ok(css.includes('.stamp{background:var(--sign)'),'green is reserved for the approval stamp');
});

test('UI-Q01: Morning and Order are different screens, not one template',()=>{
 const morning=fn('morningScreen'),order=fn('orderForm')+fn('orderScreen');
 for(const part of ['Scene.ceiling()','Scene.wall(','Scene.counter()'])
  assert.ok(morning.includes(part),'Morning is built from the store itself: '+part);
 assert.ok(morning.includes('class="daysign"')&&morning.includes('class="till"'),'the day and the float are objects in the room');
 assert.ok(morning.includes('class="board"')&&morning.includes('class="pinned"'),'Gates are notices pinned to the board');
 assert.ok(!/Scene\.(ceiling|wall|counter)|Art\.scene/.test(order),'ORDER carries no store scene');
 assert.ok(order.includes('class="form"')&&order.includes('발주서'),'Order is a paper order form');
 assert.ok(order.includes('Scene.priceTag(')&&order.includes('Scene.crate(')&&order.includes('Scene.seal('),
  'offers carry a real price tag, stock crate and corporate seal');
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
 assert.ok(order.includes('tierLine()'),'the next-day Tier forecast is present and secondary');
 assert.ok(order.includes('후보 전체 교환'),'the reroll names its full-offer scope');
 assert.ok(order.includes("fmt(price)+'G'"),'the current reroll cost is visible before use');
 assert.ok(order.includes('발주 교환권'),'the free first use is called out');
 assert.ok(/발주 '\+fmt\([^)]+\)\+'G · 확정/.test(app),'the docked stamp states the amount');
});

test('UI-Q35 / DUN-Q21: all 9 Hazards carry a canonical pressure line',()=>{
 const pressure={poison:'강인함',bind:'기동',corrosion:'강인함',mire:'기동',fire:'강인함',fear:'정신',dark:'정신',cold:'강인함',whiteout:'정신'};
 assert.deepEqual(Object.keys(Presentation.hazardPressure).sort(),Object.keys(DATA.hazards).sort(),'every canonical Hazard is explained');
 for(const [key,stat] of Object.entries(pressure)){
  assert.ok(Presentation.hazardPressure[key].includes(stat),key+' pressures '+stat);
  assert.ok(Presentation.hazardPressure[key].includes('압박'),key+' states the pressure');
 }
 for(const key of ['dark','whiteout'])
  assert.ok(Presentation.hazardPressure[key].includes('중심')&&Presentation.hazardPressure[key].includes('보조'),key+' names a primary and a secondary axis');
 assert.equal(Presentation.hazardRows(['cold']).at(0).name,'냉기');
});

test('UI-Q10..Q14 / UI-Q29 / UI-Q30: the Sale stack, the inline price flow and honest refusal',()=>{
 const sale=fn('saleScreen');
 /* The Director review moved the bag out of the dossier and up beside the adventurer, so the
    lower column no longer grows a row just to repeat slot information. It is read with the
    customer now rather than after their Traits; everything below it keeps its order. */
 const order=['Scene.shelfStrip()','standee(n)','kitLine(n)','waitingLine(','returningSummary(n)','statGrid(n)','traitRows(n)','shelf()'];
 let at=-1;for(const part of order){const i=sale.indexOf(part);assert.ok(i>at,'Sale stacks '+part+' in canonical mobile order');at=i;}
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
 assert.ok(app.includes("selected=selected===id?null:id"),'tapping a product toggles its panel in place');
 assert.ok(app.includes("Math.round(D.pricing[mode].mult*100)")&&app.includes("<em>'+pct+'%</em>"),'price modes read as 50/100/150%');
 for(const reason of ['소지금 부족','오늘 거절됨','가방 가득'])assert.ok(app.includes(reason),'a blocked price says why: '+reason);
 assert.ok(app.includes('Adventurer.slots(n)'),'remaining consumer slots are readable');
 for(const bad of ['성공 확률','사망 확률','안전 점수'])assert.ok(!app.includes(bad),'no exact probability or master safety score');
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
 assert.equal((css.match(/\.pfp\.returner[^{]*\{[^}]*width:/g)||[]).length,1,
  'no second rule resizes the NPC for any outcome');
 assert.ok(b.includes("heavy?'<blockquote>'"),'only a weighted beat spends a quote');
 assert.ok(!app.includes('다시는 가게 문을 열지 않는다'),'the permanence line is not duplicated under the death flavour');
 assert.ok(!css.includes('.gone-note'),'the removed death line leaves no dead rule behind');
 assert.ok(fn('beat').includes('weighty(r)')&&app.includes('Presentation.nightWeight(r)'),
  'presentation weight is decided in one place');
 for(const dead of ['function outcomeReason','function whyLine','function beatTone','function changeToken'])
  assert.ok(!app.includes(dead),'the duplicated screen-local copy helper is gone: '+dead);
});

test('CLOSING supply impact names the actual product and the actual adventurer',()=>{
 assert.ok(fn('closingScreen').includes('Presentation.supplyImpact(r)'),'Closing reads the attribution helper');
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
 assert.ok(!app.includes('관찰'),'Monster Knowledge progress is 보급 생환 N회');
 assert.ok(app.includes('보급 생환'),'the canonical progress wording is present');
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
 for(const flag of ['identitySeen','traitSeen','familySeen'])
  assert.ok(app.includes(flag),'the '+flag+' reveal is consumed exactly once');
 assert.ok(/case'boss-seen'/.test(app)&&/game\.save\(\)/.test(app),'consuming a reveal is written to the save');
});

test('COPY 18.5: the Boss reveal says what the spec says, and invents nothing',()=>{
 const c=Copy.boss;
 assert.equal(c.d5.header,'길드 토벌 공고');
 assert.equal(c.d15.intro,'길드 정보원이 추가 정보를 확보했다.');
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
  ['탐식의 권능',['아이템의 투력·강인함·기동·정신 증가량 50% 감소','환경 대응·보급·보험 효과는 유지']],
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
 assert.ok(helpText.includes('점포지원·장식·사건'),'the Help names those three sources');
 // and what the Help says survives a Run is what Meta actually keeps
 const fresh=Meta.fresh(),carried=['상품','직업','몬스터 지식','발견','직업 숙련','점포 자본','보유 장식'];
 for(const t of carried)assert.ok(helpText.includes(t),'the Help names the persistent '+t);
 assert.ok(Object.keys(Meta.opened(fresh)).join()==='items,jobs','unlocks are Items and Jobs');
 assert.equal(typeof Meta.storeCapital(fresh),'number','Store Capital is a persistent Account resource');
 assert.ok(Array.isArray(Meta.ownedDecorations(fresh)),'so is the owned Decoration collection');
 assert.equal(typeof Meta.totalJobMastery(fresh),'number','so is Job Mastery');
 // the things it says do NOT carry really do not
 assert.ok(helpText.includes('모험가·재고·돈·점포지원은 다음 영업에 이어지지 않습니다'),
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
 assert.ok(app.includes('이번 영업을 마감할까요?'),'the destructive action is named once, in the world voice');
 assert.ok(app.includes('이 지점의 자금과 모험가는 다음 점포로 이어지지 않습니다.'),
  'and the confirmation says what it costs');
 assert.ok(!/현재 런/.test(app),'no player-facing surface calls it a 런');
 assert.ok(!app.includes('현재 런 마감 · 새 점포 준비'),'the old "마감" wording is gone');
 // ...and it is told apart from the full wipe, which is the other destructive action
 assert.ok(fn('renderModal').includes('다음 점포로 이어지지 않습니다'),
  'abandoning a store is distinguished from erasing the account');

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
 assert.ok(/실패 시 사망 위험<b>'\+Math\.round\(o\.deathRisk\*100\)\+'%/.test(readout),'the one exact percentage is the conditional Death risk');
 const others=readoutCode.replace(/실패 시 사망 위험<b>'\+Math\.round\(o\.deathRisk\*100\)\+'%/,'');
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
 for(const part of ['c.note','c.cost','c.gain','c.sink','c.optional'])
  assert.ok(slip.includes(part),'before Order the player is told: '+part);

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
 assert.ok(app.includes("if(phase==='foundation'&&modal!=='new')modal='relics'"),
  'the pre-Run screen can be reopened during the foundation takeover');
 assert.ok(fn('relicTakeover').includes("'new'"),'and the way back is offered there');
 const back=app.slice(app.indexOf("case'new':"),app.indexOf("case'new':")+220);
 assert.ok(!/game\.end\(|runs\+\+/.test(back),'going back never spends the Run');
 // ...and it must not become a free re-roll either. The DAY 0 store support has already been
 // shown by then, so returning keeps this store's seed. Only an explicitly typed seed, or
 // abandoning a store that has opened, makes a new world.
 // (RUN-Q10/Q11/Q12 forbid the same thing for a reload.)
 const start=app.slice(app.indexOf("case'start':{"),app.indexOf("case'start':{")+700);
 assert.ok(start.includes("s?.phase==='foundation'?s.seed"),
  'returning from an unopened store reuses its seed instead of minting a new one');
 assert.ok(start.indexOf('typed||')<start.indexOf("'g24-'+Date.now()"),
  'a typed seed still wins, and a fresh seed is the last resort');
 assert.ok(fn('newRun').includes("game.run?.phase==='foundation'?E(game.run.seed)"),
  'the carried seed is shown rather than applied behind the player');
 // an unopened store is not something the player is abandoning, so it is not described as one
 for(const f of [fn('newRun'),fn('renderModal')])
  if(f.includes('현재 지점 포기')||f.includes('모두 포기하고'))
   assert.ok(f.includes("'foundation'"),'the abandon wording is withheld before the store opens');

 // D-30 / D-31~33: Full Reset moved to Settings.
 const menu=app.slice(app.indexOf("modal==='menu'"),app.indexOf("modal==='menu'")+900);
 assert.ok(menu.includes("btn('도감','codex')"),'the codex is just 도감');
 assert.ok(!menu.includes('본사 · 도감'),'the old label is gone');
 assert.ok(menu.includes("btn('현재 지점 포기','new','danger')"),'the store abandon is in the menu');
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
 for(const label of Object.values(DATA.roles))
  assert.ok(!app.includes("'"+label+"'")&&!app.includes('>'+label+'<'),
   'internal role taxonomy is not rendered: '+label);
 assert.ok(!/D\.categories\[|D\.roles\[/.test(app),'and no render path looks it up');

 /* D-10. The outlook is about the expedition as a whole, and carries exactly two things:
    the Combat Forecast and the conditional Death risk. The environment is not summarised a
    second time here - it lives once, beside the destination, where each Hazard states its own
    pressure and this NPC's readiness against it. */
 const readout=fn('readout');
 assert.ok(readout.includes('전투 전망'),'the fight forecast is named');
 assert.ok(!readout.includes('환경 전망'),'the outlook carries no second environment verdict');
 assert.ok(!/환경 압박/.test(app),'and no collapsed environment duplicate survives anywhere');
 assert.ok(!/env-press/.test(app)&&!/env-press/.test(css),'the phone-only duplicate is gone with it');
 assert.ok(!/hazardList\(/.test(readout),'the outlook renders no Hazard rows of its own');
 const plate=fn('destPlate');
 assert.ok(/hazardList\(Presentation\.known\(d,game\),n&&n\.outlook&&n\.outlook\.hazards\)/.test(plate),
  'the destination plate is the one place Hazards and readiness appear, off the frozen snapshot');
 assert.ok(!/display:none/.test((css.match(/\.p-sale \.front-side \.dest-plate[^\n]*hazards[^\n]*/g)||[]).join(' ')),
  'and it is never hidden, since nothing else shows the environment now');
 /* The fight verdict is still the engine's own canonical vocabulary; under SALE_v2.7 it is
    read off the frozen SALE-entry snapshot rather than recomputed as Items move, so the
    calculation moved into the systems layer with it. */
 assert.ok(!/Dungeon\.estimate\(/.test(app),'the screen does not recompute the fight verdict');
 assert.ok(shop.includes('combat:G.Dungeon.estimate('),'the fight keeps its own canonical verdict');
 assert.ok(/\['취약','불안','대응','충분'\]/.test(shop),'the readiness ladder belongs to the engine');
 assert.ok(!/\['취약','불안','대응','충분'\]/.test(app),'and the screen does not keep a second copy of that ladder');
 /* The Hazard's pressure and the NPC's readiness are two facts, never one sentence. */
 const list=app.slice(app.indexOf('const hazardList='),app.indexOf('const hazardList=')+700);
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
 const envTip=fn('destPlate');
 assert.ok(envTip.includes("'압박: 위험이 요구하는 능력치 · 현재 대응: 이 손님의 보급 전 대응 수준'"),
  'the destination ? carries only the approved line');
 for(const banned of ['취약·불안·대응·충분','네 단계','누가 서 있든','팔아도 바뀌지 않는다','확정된'])
  assert.ok(!envTip.includes(banned),'the destination ? does not explain the system: '+banned);
 /* Each ? names its own reading and stops. Anything longer than one line is the store guide's
    job, so the sweep holds every counter tooltip to a single short line. */
 const lines=[...app.matchAll(/tip\('[^']+',((?:'[^']*',?)+)\)/g)].map(m=>m[1].split("','").length);
 assert.ok(lines.length===3,'there are exactly three counter tooltips');
 assert.ok(lines.every(n=>n===1),'and each one is a single line');
 for(const [label,text] of [['전투 전망','게이트 전투 요구 대비 현재 전투 준비 수준'],
                            ['실패 시 사망 위험','원정 실패 이후 사망으로 이어질 조건부 위험']])
  assert.ok(app.includes("tip('"+label+"','"+text+"')"),label+' carries the approved line');
 assert.ok(/\.tip>p>span[^\n]*display:block/.test(css),'a multi-line tooltip would still break its facts apart');
 /* Opening a ? may never make its panel taller - the explanation is a balloon over the block,
    not an accordion inside it - and the group is exclusive so two never stack on one anchor. */
 assert.ok(/\.readout \.tip>p,\.dest-plate \.tip>p\{position:absolute/.test(css),'the balloon is out of flow');
 assert.ok(/\.readout \.tip>p\{top:calc\(100% - 4px\)\}/.test(css),'the outlook balloon drops');
 assert.ok(/\.dest-plate \.tip>p\{bottom:calc\(100% - 4px\)\}/.test(css),'and the plate balloon rises, clear of the counter edge');
 assert.ok(!/\.tip\[open\][^\n]*width:100%/.test(css),'nothing makes the open state a full-width block again');
 assert.equal((readout.match(/\+tip\(/g)||[]).length,2,'the outlook explains the fight forecast and the Death risk');
 assert.ok(/tip\('환경 대응'/.test(fn('destPlate')),'and the environment keeps its own help, where the environment now lives');
 /* The "not a result" caution is on the block itself, under the forecasts, rather than spent
    inside a tooltip that has one line to name what it is showing. */
 assert.ok(/게이트 안에서 어떻게 될지까지는 아무도 모른다/.test(readout),
  'the outlook still says a forecast is not a result, on the block rather than in a tooltip');
 assert.ok(css.includes('.readout .tip>summary:focus-visible'),'and it shows where the keyboard is');
 assert.ok(/\.dest-plate \.tip>summary:focus-visible/.test(css),'on the plate too');
 // the help is its own row under the rows it explains, so nothing that hides the caps label
 // on a phone can take it with them
 /* a <details> cannot be a child of <p> - the parser would split them apart - so the row
    that holds it is a <div> */
 assert.ok(/<div class="env-help">/.test(fn('destPlate')),'the environment help is its own row');
 assert.ok(!/<p class="env-help"/.test(app),'in an element that may actually contain a <details>');
 assert.ok(!/\.env-help[^\n]*display:\s*none/.test(css),'and no breakpoint hides it');

 /* SALE_v2.7 §SALE DECISION-ONLY DETAIL: no disclosure control on the decision surface that
    opens flavour prose. The real effects it used to hide are still shown - plainly, not folded
    away - and the flavour lives in the Codex, which is where a non-decision context belongs. */
 const till=fn('till');
 assert.ok(till.includes('shown.has(r.key)')||till.includes('!shown.has'),
  'what the change list already showed is not repeated');
 assert.ok(!/<details>/.test(till),'SALE opens no disclosure control of its own');
 assert.ok(!/<summary>이 손님에게 안 걸리는 효과/.test(app),'the retired control is gone');
 assert.ok(!/it\.description/.test(till),'and flavour prose has left the decision surface');
 assert.ok(/이 손님에게는 지금 걸리지 않는 효과/.test(till),'the effects it held are stated plainly instead');
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
 assert.ok(fin.includes('제 0 게이트 · 마왕성'),'the castle stays as the place, under the name');
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
 assert.ok(cx.includes("['store','점포 관리']")&&cx.includes('storePanel()'),
  '점포 관리 is a tab on the existing codex, not a new screen');
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
 assert.ok(/opened\.length&&opened!==wasOpen\)sound\('rare'\)/.test(app),
  'and the unlock cue sounds only on the click that opened something');
 assert.ok(!/game\.boss\(\);setModal\(null\);render\(\);sound\('rare'\)/.test(app),
  'the Final no longer sounds it unconditionally, unlock or not');
 assert.ok(!/account\.progress|a\.progressCache|persist/.test(panel),'nothing about it is stored');

 /* A store closes for a reason, and the headline is the reason. One win/fail pair cannot say
    it - a DAY 9 bankruptcy read 마왕을 토벌하지 못했다 for a store that never met the Boss. */
 const head=fn('endHeadline');
 assert.ok(head.includes("s.finalReport")&&head.includes('마왕이 쓰러졌다.')&&head.includes('마왕을 토벌하지 못했다.'),
  'the Final headline is gated on the Final having actually resolved');
 assert.ok(/s\.stats\.deaths>=D\.balance\.deathLimit\)return '너무 많은 모험가가 돌아오지 못했다\.'/.test(head),
  'the death ending names the deaths');
 assert.ok(/s\.money<0\)return '운영비를 마련하지 못해 점포 문을 닫았다\.'/.test(head),'the bankruptcy names the money');
 assert.ok(head.includes("return '이번 점포의 영업이 끝났다.'"),'and anything else keeps the plain close');
 assert.ok(!/s\.win\?'우리가 키운 애들이/.test(app),'the old win/fail pair is gone');
 assert.ok(!/서른 날/.test(app)&&!/서른 날/.test(read('dist/systems/run.js')),
  'and so is the 서른 날 phrasing');

 /* The failure line is not a hidden threshold: it is stated before it matters and the count
    is visible while it climbs, in the book that already lists the dead. */
 assert.ok(fn('help').includes('D.balance.deathLimit')&&fn('help').includes('점포가 문을 닫을 때'),
  'the guide names every way a store ends, from the constant rather than a written-out number');
 for(const rule of ['운영비를 감당하지 못하면','재고를 정리해','마왕을 토벌하지 못해도'])
  assert.ok(fn('help').includes(rule),'the guide covers: '+rule);
 const roster=fn('rosterList');
 assert.ok(roster.includes('돌아오지 못한 사람')&&roster.includes('D.balance.deathLimit'),
  'the roster shows the count against the line');
 assert.ok(roster.includes('s.stats.deaths'),'read from the Run own count, not a second tally');

 /* D-6 / ECONOMY_ORDER §ORDER. Half of what to order is decided by what is on the shelf, and
    the form showed only a per-SKU 재고 N. The warehouse is on it now, from the same grouping
    the shelf and the stock modal read. Director review: it opens for a player who has never
    folded it, and once folded it stays folded on later Days and across a reload until they
    open it again - a presentation preference on the account, not run state. */
 assert.ok(fn('orderForm').includes('stockBrief()'),'the order form shows the warehouse');
 const brief=fn('stockBrief');
 assert.ok(brief.includes('groupStock()'),'reusing the existing grouping, not a second one');
 assert.ok(brief.includes('game.capacity()')&&brief.includes('s.inventory.length'),'used against total slots');
 assert.ok(brief.includes("settings.stockBriefOpen!==false")&&brief.includes("(opened?'open':'')"),
  'open by default, and foldable');
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
 assert.ok(/estimate">[^<]*게이트 안에서 어떻게 될지까지는 아무도 모른다/.test(app),
  'the forecast still says it is a forecast, in the shop own voice');
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
 assert.ok(fn('kitLine').includes("가방 '+n.pack.length+' / '+slots"),'the bag states used / total');
 assert.ok(/\.kit \.slots i\{[^}]*width:34px/.test(css),'and the slots are big enough to read at a glance');
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
 assert.ok(/\.beat\.major \.verdict\{font-size:44px/.test(css)&&/\.beat\.routine \.verdict\{font-size:30px/.test(css),
  'the raised beats are raised, and the routine ones keep a real voice');
 assert.ok(!/\.beat\.routine[^{]*\{[^}]*font-size:1[0-3]px/.test(css),'no routine beat is shrunk into small print');
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

// UI_UX_v2.8 §LIVE STORE. The four Decorations shipped as a text plate carrying their name,
// which said which one was equipped without ever drawing it. This is the same contract D-27
// holds the shelf to: each Decoration is a picture, its own picture, at its own place.
test('UI_UX_v2.8 §LIVE STORE: every Decoration is drawn, each as itself, at its own Slot',()=>{
 const Scene=globalThis.Scene,D=globalThis.DATA;
 const body=svg=>svg.replace(/^[\s\S]*?crispEdges"[^>]*>/,'').replace(/<\/svg>$/,'');
 const drawn=new Map();
 for(const d of D.decorations){
  const art=Scene.decoration(d.id);
  assert.ok(art&&art.includes('<svg'),d.name+' resolves to a drawing');
  const shapes=body(art);
  assert.ok(shapes.length>0,d.name+' is drawn, not an empty frame');
  // the store scene is pixel art on its own grid; a drawing that scaled smoothly would not be
  assert.ok(art.includes('shape-rendering="crispEdges"'),d.name+' is drawn on the pixel grid');
  // a <text> glyph here would bind the store scene to the font subset
  assert.ok(!/<text/.test(art),d.name+' is a drawing, not a caption');
  (drawn.get(shapes)||drawn.set(shapes,[]).get(shapes)).push(d);
 }
 const shared=[...drawn.values()].filter(g=>g.length>1);
 assert.deepEqual(shared,[],'no two Decorations are drawn identically: '+shared.map(g=>g.map(x=>x.name).join('/')).join(', '));
 assert.equal(Scene.decoration('nosuch'),'','an id with no drawing resolves to nothing, never a broken frame');
 // the name may still be read by a screen reader, but it is no longer the picture
 const plate=fn('decoPlate');
 assert.ok(plate.includes('Scene.decoration('),'the store scene renders the drawing');
 assert.ok(plate.includes('game.run?.loadout'),'and renders only what this Run equipped, from the Run');
 assert.ok(!/>'\+E\(d\.name\)\+'</.test(plate),'the name is not the visual any more');
 // each Slot has a place of its own on the band it belongs to, sized against that band
 for(const slot of D.decorationSlots){
  const rule=(css.match(new RegExp('\\.decoplate\\.'+slot+'\\{([^}]*)\\}'))||[])[1];
  assert.ok(rule,slot+' has a placement rule');
  assert.ok(/width:\d+%/.test(rule),slot+' is sized against its band, not in fixed pixels');
 }
 assert.ok(/\.decoplate .deco-art\{[^}]*image-rendering:pixelated/.test(css),'the drawing is not smoothed');
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

// D-22 / D-23. There are no audio files here: every sound is synthesised, so a volume control
// is a gain node. The contract is that the player owns two of them, that a level survives a
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
 assert.ok(fn('settings').includes('Sound On')&&fn('settings').includes('mixer()'),'the master mute stays, with the two levels under it');
 assert.ok(/\.mix-row input\[type=range\]\{[^}]*height:24px/.test(css),'the slider is thumb-sized');
 assert.ok(/\.mix-row\{[^}]*min-height:44px/.test(css),'and its row keeps the touch target');
});

test('D-23: every cue the UI asks for exists, and every step of an ordinary day has one',()=>{
 const Sound=require('../dist/ui/audio.js')&&globalThis.Sound;
 const asked=[...app.matchAll(/sound\('([a-z]+)'\)/g)].map(m=>m[1]);
 assert.ok(asked.length>0,'the UI does ask for sound');
 for(const kind of asked)
  assert.ok(kind==='rare'||Sound.cues.includes(kind),kind+' is a real cue, not a typo that falls back to a click');
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
 assert.ok(cueFor('select'),'picking a product off the shelf answers');
 assert.ok(cueFor('buy-relic'),'taking a store support answers');
 assert.ok(cueFor('sell')&&cueFor('sell').includes('overcharge'),'a sale is priced in the cue it makes');
 assert.ok(/sound\('refusal'\)/.test(app),'and a refusal sounds different from a sale');
 assert.ok(/result\.outcome==='사망'\?'death'/.test(app),'the night result is heard by what it was');
 // gold in and gold out are mirror cues, so one is never mistaken for the other
 const gold=[659,784];assert.ok(Sound.cues.includes('gold')&&Sound.cues.includes('spend'),'both directions exist');
 assert.ok(/spend:\[784,659\]/.test(read('dist/ui/audio.js')),'spend falls where gold rises: '+gold.join());
});

test('D-24: the feel layer is optional, and it never animates a redraw of the same view',()=>{
 assert.ok(/matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/.test(app),'the OS setting is read');
 assert.ok(/const motionOK=\(\)=>typeof anime==='object'&&!!anime\.animate&&!matchMedia/.test(app),
  'and motion is off when the library is missing as well as when motion is reduced');
 // every animation call sits behind that check
 for(const name of ['playPhase','playCue','stampPress'])
  assert.ok(fn(name).includes('if(!motionOK()')||fn(name).includes('||!motionOK()'),name+' stands down on its own');
 const elsewhere=app.replace(fn('playPhase'),'').replace(fn('playCue'),'').replace(fn('stampPress'),'')
  .split('\n').filter(l=>!l.trimStart().startsWith('//')&&!l.trimStart().startsWith('*')&&!l.includes('const motionOK=')).join('\n');
 assert.ok(!/anime\.(animate|stagger)/.test(elsewhere),'nothing animates outside the three guarded places');
 // a redraw replaces the screen, so an entry animation would replay on every click:
 // the phase beats run only when the view actually changed, the in-phase ones on a one-shot marker
 assert.ok(/if\(changed\)playPhase\(phase\);playCue\(\);/.test(app),'the phase beat is gated on the view changing');
 assert.ok(/function playCue\(\)\{const c=cue;cue=null;/.test(app),'and the in-phase marker is consumed by the draw that uses it');
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
 // the one that printed undefined: a Hazard mitigation carries the Hazards, not a sentence
 assert.equal(P.eventLine({id:'hazard',hazards:['poison','corrosion'],prevented:true}),'독·부식 피해 방지',
  'and one that did not is described from what it holds');
 assert.equal(P.eventLine({id:'hazard',hazards:['fire']}),'화염 위험 감소','down to whether the damage landed');
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
 assert.ok(/\.p-sale \.dossier\{grid-column:1/.test(desk),'and who this is stays beside it, not above it');
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
 // with neither system moving, there is nothing derived to report
 assert.deepEqual(Presentation.preview(mk({}),gate({}),[],'candy').derived,[],'no system moved, no system row');
 // relieving a Supply Deficit is reported as the Supply Deficit, not as the Item
 const relief=Presentation.preview(mk({}),gate({requiredSupply:3}),[],'candy');
 assert.deepEqual(relief.derived.map(x=>x.label),['보급 부족 완화'],'Supply Deficit relief names itself');
 // crossing a Fatigue band is reported as Fatigue
 const rested=Presentation.preview(mk({fatigue:10}),gate({}),[],'candy');
 assert.deepEqual(rested.derived.map(x=>x.label),['피로 완화'],'a crossed Fatigue band names itself');
 // an Item that really does grant a Stat still reports it as its own
 const potion=DATA.itemBy.potion;
 assert.ok(potion.effects.combat>0);
 const own=Presentation.preview(mk({}),gate({}),[],'potion');
 assert.ok(own.direct.some(x=>x.key==='combat'),'a real direct Stat is the Item\'s own');
 assert.deepEqual(own.derived,[],'and brings no system row with it');
 // the hidden Supply-deficit formula is never exposed by the attribution
 for(const r of relief.derived)assert.ok(!/[0-9]+%|penalty|deficit/i.test(r.text),'the row names the channel, not the formula: '+r.text);
 // the screen groups them, so a derived change cannot read as the Item's own contribution
 const panel=fn('sellPanel')||app;
 assert.ok(/이 상품이 직접/.test(app)&&/보급이 상태에 미치는 영향/.test(app),'each group is headed by its source');
 assert.ok(/moved\.derived\.length\?'<p class="delta-src">/.test(app),'and a group with nothing in it is absent');
 assert.ok(/\.delta-src\{/.test(css),'the heading has a style of its own');
});

test('UI_UX_v2.7 §TUTORIAL: it teaches how to read the system, never the answer',()=>{
 const steps=app.slice(app.indexOf('const coachSteps={'),app.indexOf('let activeCoach=null;'));
 /* The two v2.7 subjects are taught, on the surfaces that actually show them. */
 assert.ok(/\['hazard','\.dest-plate \.hazards'/.test(steps),'the Hazard lesson is on the Hazard rows');
 assert.ok(/\['supply','\.ingredients'/.test(steps),'the Supply/Fatigue lesson is on the arithmetic it explains');
 const hazard=/\['hazard',[^\]]*\]/.exec(steps)[0];
 for(const point of ['압박','현재 대응','취약·불안·대응·충분'])
  assert.ok(hazard.includes(point),'the Hazard lesson covers '+point);
 const supply=/\['supply',[^\]]*\]/.exec(steps)[0];
 for(const point of ['요구량부터','페널티','피로'])
  assert.ok(supply.includes(point),'the Supply lesson covers '+point);
 assert.ok(/계산만 해 둔 숫자/.test(supply),'and says the conditional numbers are arithmetic, not a prediction');
 /* It must not hand over an answer, and must not expose the hidden formula. */
 const all=[...steps.matchAll(/'([^']{12,})'/g)].map(m=>m[1]).join(' ');
 for(const item of DATA.items)
  assert.ok(!all.includes(item.name),'no lesson names an Item to buy: '+item.name);
 for(const hz of Object.values(DATA.hazards))
  assert.ok(!new RegExp(hz+'[^.]{0,12}(사|구매|고르)').test(all),'no lesson scripts a Hazard solution: '+hz);
 assert.ok(!/0\.06|\*\s*\.06|6%p/.test(all),'the hidden Supply-deficit formula is not taught');
 /* The frozen outlook is described as frozen, since that is what the screen now does. */
 const forecast=/\['forecast',[^\]]*\]/.exec(steps)[0];
 assert.ok(/카운터에 섰을 때/.test(forecast)&&/바뀌지 않는다/.test(forecast),
  'the outlook lesson says the reading is fixed at SALE entry');
 /* The decision ingredients themselves, and no superseded Fatigue band anywhere on screen. */
 assert.ok(/class="ingredients"/.test(app),'the exact Supply/Fatigue arithmetic is on the decision surface');
 /* A coach mark anchors to a VISIBLE match. The SALE readout and its ingredients exist twice,
    a desktop copy and a phone copy with one always display:none, so taking the first DOM match
    silently dropped those lessons on a phone. */
 const coach=app.slice(app.indexOf('function showCoach('),app.indexOf('function showCoach(')+1400);
 assert.ok(/const visible=sel=>\[\.\.\.document\.querySelectorAll\(sel\)\]\.find\(e=>e\.getClientRects\(\)\.length\)/.test(coach),
  'the coach resolves its anchor to a visible element');
 assert.ok(!/\$\(x\[1\]\)|const target=\$\(step\[1\]\)/.test(coach),'and never to the first DOM match');
 assert.ok(!/기동\/정신 -10%|기동\/정신 -25%/.test(app),'no superseded v2.6 Fatigue band survives in the UI');
 assert.ok(/기동\/정신 -40%/.test(app)&&/기동\/정신 -15%/.test(app),'the v2.7 bands are what the screen states');
});

console.log(count+' ui guard groups passed');
