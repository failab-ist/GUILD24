// Chunk F acceptance: the parts of the UI contract a Node process can prove.
// Covers UI-Q02/Q19/Q24/Q26/Q32/Q34/Q35/Q39, REL-Q39, DUN-Q21 and the
// V2_4_EXECUTION_PLAN §8.1 Playwright boundary contract.
// Everything that needs a real viewport lives in `npm run qa:visual` (UI-Q38), never here.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','ui/scene'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const app=read('dist/ui/app.js'),css=read('dist/ui/ui.css'),scene=read('dist/ui/scene.js'),html=read('dist/index.html'),pkg=JSON.parse(read('package.json'));
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
 assert.equal(sheets.length,1,'exactly one stylesheet is linked');
 assert.ok(sheets[0].includes('ui/ui.css'),'it is the consolidated sheet');
 assert.ok(!/https?:\/\//.test(html.replace(/<meta[^>]*>/g,'')),'no external origin is fetched');
 assert.equal((css.match(/^:root\{/gm)||[]).length,1,'the sheet defines exactly one :root token block');
 for(const dead of ['.stage-grid','.layout{','.store-panel','.sell-toolbar','.statsbar','.item-grid'])
  assert.ok(!css.includes(dead),'dead legacy selector '+dead+' is gone');
});

test('UI §RESPONSIVE RULE: the sheet is authored mobile-first',()=>{
 const min=(css.match(/@media\(min-width/g)||[]).length,max=(css.match(/@media\(max-width/g)||[]).length;
 assert.ok(min>=2,'tablet/desktop are added with min-width queries');
 assert.equal(max,0,'nothing is a desktop layout shrunk down with max-width');
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
 assert.ok(/@font-face\{font-family:'Galmuri'/.test(css),'the pixel family is the type system');
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
 for(const label of ['보유','선택','발주 후'])assert.ok(order.includes(label),'the register shows '+label);
 assert.ok(order.includes("data-action=\"gates\""),'today Gate/Hazard is reachable without leaving Order');
 assert.ok(order.includes('tierLine()'),'the next-day Tier forecast is present and secondary');
 assert.ok(order.includes('후보 전체 교환'),'the reroll names its full-offer scope');
 assert.ok(order.includes("fmt(price)+'G'"),'the current reroll cost is visible before use');
 assert.ok(order.includes('발주 교환권'),'the free first use is called out');
 assert.ok(/발주 '\+fmt\(game\.cartTotal\(\)\)\+'G · 확정/.test(app),'the docked stamp states the amount');
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
 const order=['Scene.shelfStrip()','standee(n)','waitingLine(','returningSummary(n)','destPlate(n)','statGrid(n)','traitRows(n)','kitLine(n)','readout(n)','shelf()'];
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
 assert.ok(fn('changedRows').includes('Presentation.nightChanges(r)'),'WHAT CHANGED comes from the same report');
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
 assert.ok(/\.say\{[^}]*grid-row:1/.test(css),'it takes the row above the customer, not an overlay');
 assert.ok(!/\.say\{[^}]*position:fixed/.test(css),'it is not a fixed screen notification');
 assert.ok(/\.say:after\{[^}]*border-top-color/.test(css),'it has a tail pointing down at the character');
 assert.ok(/\.say:after\{[^}]*var\(--cardw\)/.test(css),'the tail is aimed at the card, not at the room');
 // It must not eat the decision: no clipping, no ellipsis, no shrink-to-fit.
 assert.ok(!/\.say[^{]*\{[^}]*text-overflow/.test(css),'a sentence is never ellipsised');
 assert.ok(!/\.say[^{]*\{[^}]*white-space:nowrap/.test(css),'a long line is allowed to wrap');
 assert.ok(!/\.say>span\{[^}]*max-height/.test(css),'the text is not clamped to a height');
 // The menu pin owns the top-right corner; the balloon keeps clear of it.
 assert.ok(/\.say\{[^}]*max-width:min\(calc\(100% - 44px\)/.test(css),'the balloon stops short of the menu button');
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
 assert.equal(c.d30.header,'최종 정찰 보고');
 for(const b of DATA.bosses){
  assert.ok(c.d5.flavor[b.id],b.id+' has its D5 Flavor');
  assert.ok(c.d15.trait[b.id],b.id+' has its D15 Trait');
 }
 // D5 hints; it never states the Function. D15 states it.
 for(const [id,line] of Object.entries(c.d5.flavor))
  assert.ok(!/감소한다|증가한다|적용된다/.test(line),id+"'s D5 Flavor does not give the Function away");
 // the one value PASS3 still owns stays a slot, not prose
 assert.ok(c.d15.trait.GLUTTONY[1][0].includes('[등급]'),'the rarity boundary is a DATA slot until PASS3 approves it');
 const prose=JSON.stringify(c);
 for(const term of ['Run','Final Snapshot','Final Power','Factor','Modifier','sealBreakCount','effectiveBossPower'])
  assert.ok(!prose.includes(term),'no internal design term reaches the player: '+term);
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
 assert.ok(app.includes('현재 지점 포기'),'the destructive action is named once, in the world voice');
 assert.ok(app.includes('지금 진행 상황을 모두 포기하고 새로운 점포를 시작합니다. 보상은 없습니다.'),
  'and the confirmation says what it costs');
 assert.ok(!/현재 런/.test(app),'no player-facing surface calls it a 런');
 assert.ok(!app.includes('현재 런 마감 · 새 점포 준비'),'the old "마감" wording is gone');
 // ...and it is told apart from the full wipe, which is the other destructive action
 assert.ok(fn('newRun').includes('본사 기록은 그대로 남습니다'),
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
 assert.ok(app.includes('Dungeon.greatSuccessSignal('),'the signal is read from the engine, not recomputed in the UI');
 const readout=fn('readout'),readoutCode=readout.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/.*$/gm,'');
 assert.ok(readout.includes('greatSuccessSignal'),'it lives in the forecast, before departure');
 assert.ok(!/[0-9]+%/.test(readoutCode),'and never exposes a percentage');
 assert.ok(!/margin|readiness|chance/i.test(readoutCode),'nor a margin, a chance or a readiness score');

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
 // D-29. Committing the contract used to be irreversible: the foundation takeover owns the
 // screen, so the only way back to the contract screen was to spend the Run. Nothing has been
 // played at that point, so the contract screen may win over the takeover.
 assert.ok(app.includes("if(phase==='foundation'&&modal!=='new')modal='relics'"),
  'the contract screen can be reopened during the foundation takeover');
 assert.ok(fn('relicTakeover').includes("'recontract'"),'and the way back is offered there');
 assert.ok(app.includes("case'recontract'"),'the action exists');
 const recontract=app.slice(app.indexOf("case'recontract'"),app.indexOf("case'recontract'")+220);
 assert.ok(!/game\.end\(|runs\+\+/.test(recontract),'going back never spends the Run');
 // ...and it must not become a free re-roll either. The DAY 0 store support has already been
 // shown by then, so returning keeps this store's seed: changing the contract changes the
 // contract. Only an explicitly typed seed, or abandoning a store that has opened, makes a
 // new world. (RUN-Q10/Q11/Q12 forbid the same thing for a reload.)
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

 // D-30 / D-31~33: both destructive actions are named in the menu, not buried in 설정,
 // and they are named apart - one ends this Run, the other ends everything.
 const menu=app.slice(app.indexOf("modal==='menu'"),app.indexOf("modal==='menu'")+900);
 assert.ok(menu.includes("btn('도감','codex')"),'the codex is just 도감');
 assert.ok(!menu.includes('본사 · 도감'),'the old label is gone');
 assert.ok(menu.includes("btn('현재 지점 포기','new','danger')"),'the store abandon is in the menu');
 assert.ok(menu.includes("btn('모든 게임 데이터 초기화','reset','danger')"),'and the full reset');
 assert.ok(/foundation'\]\.includes\(game\.run\.phase\)\?btn\('현재 지점 포기'/.test(menu),
  'it is absent when there is no store to abandon, rather than present and inert');
});

test('UI-Q39 / UI-Q14 / ITEM-Q03: the decision material is said once, and the taxonomy is not said at all',()=>{
 // D-7. The role/category tables organise the catalogue; they are not what a player decides
 // with, and UI-Q39 says they never reach a render path. The DATA stays - ordering weights and
 // Relic conditions read `category`, and delta.cjs asserts both tables.
 assert.ok(DATA.categories&&DATA.roles,'the tables are still there for the systems that read them');
 for(const label of [...Object.values(DATA.roles),...Object.values(DATA.categories)])
  assert.ok(!app.includes("'"+label+"'")&&!app.includes('>'+label+'<'),
   'internal taxonomy is not rendered: '+label);
 assert.ok(!/D\.categories\[|D\.roles\[/.test(app),'and no render path looks it up');

 // D-10. Two ways to fail an expedition, said apart, in the vocabulary each already owns.
 const readout=fn('readout');
 assert.ok(readout.includes('전투 전망')&&readout.includes('환경 전망'),'both forecasts are named');
 assert.ok(readout.includes('Dungeon.estimate('),'the fight keeps its own canonical verdict');
 assert.ok(/\['취약','불안','대응','충분'\]/.test(readout),
  'the environment summary is the worst of the Hazard states already on screen');
 for(const invented of ['안전','위험함','보통','양호'])
  assert.ok(!readout.includes("'"+invented+"'"),'no new forecast label was invented: '+invented);

 // D-11. Always-available help, keyboard-reachable because it is a native <details>.
 assert.ok(readout.includes("<details class=\"tip\""),'the ? is a details, so it needs no script');
 assert.equal((readout.match(/\+help\(/g)||[]).length,2,'one helper, used by both forecasts');
 assert.ok(/확정된 결과가 아니다/.test(readout),'it says a forecast is not a result');
 assert.ok(css.includes('.readout .tip>summary:focus-visible'),'and it shows where the keyboard is');

 // D-14. Collapsed is the decision; expanded is only what collapsed could not say.
 const till=fn('till');
 assert.ok(till.includes('shown.has(r.key)')||till.includes('!shown.has'),
  'the expander filters out what the change list already showed');
 assert.ok(!/effectList\(it\)/.test(till),'the full effect list is not repeated under the preview');
 assert.ok(fn('codex').includes('effectList(it)'),'it still lives in the Codex, where it is the point');

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
 assert.ok(ceil<=640&&till<=640,'neither piece of furniture is free to grow with the window');
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
 assert.ok(/\.till b\{font:400 2[5-9]px/.test(css),'and the float is set at the size that surface now allows');
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
 assert.ok(/class="row"><span>가맹등급/.test(bannerFn)&&/class="row"><span>직업 숙련/.test(bannerFn),
  'the standing totals sit in the ledger rather than in a caption under a headline');
 assert.ok(!/번째 런/.test(app),'and the count is stores, not 런');

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
 assert.ok(/\.readout \.hazards li\{[^}]*padding:7px 8px/.test(css),'each Hazard is its own banded row');
 assert.ok(/\.readout \.hazards\{gap:0/.test(css),'the rows are separated by the band, not by a gap');

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

console.log(count+' ui guard groups passed');
