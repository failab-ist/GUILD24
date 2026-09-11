// Chunk F acceptance: the parts of the UI contract a Node process can prove.
// Covers UI-Q02/Q19/Q24/Q26/Q32/Q34/Q35/Q39, REL-Q39, DUN-Q21 and the
// V2_4_EXECUTION_PLAN §8.1 Playwright boundary contract.
// Everything that needs a real viewport lives in `npm run qa:visual` (UI-Q38), never here.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
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
 assert.ok(/\.figure\{[^}]*width:var\(--artw\);height:var\(--artw\)/.test(css),'the payload box is square, so no sticker is squashed to fit');
 // the face and the backs are one deck: same proportion, and the payload overhangs the face
 // one deck geometry: the card's height is content, and the backs are the same shape
 // scaled, so front and back agree at any width instead of only where they were drawn
 assert.ok(/--cardh:calc\([^;]*var\(--artw\)[^;]*var\(--over\)[^;]*var\(--plateh\)\)/.test(css),
  'the card height is derived from the payload and the plate, not a fixed ratio');
 assert.ok(/\.line-up \.wait\{[^}]*width:calc\(var\(--cardw\)\*var\(--deck\)\);height:calc\(var\(--cardh\)\*var\(--deck\)\)/.test(css),
  'the waiting backs are the card scaled, so front and back stay one deck');
 assert.ok(/\.who \.nameplate\{[^}]*min-height:var\(--plateh\)/.test(css)&&/\.portrait\{[^}]*height:calc\(var\(--artw\) - var\(--over\)\)/.test(css),
  'the plate sizes itself and the portrait box reserves exactly the payload height');
 assert.ok(/--artw:calc\(var\(--cardw\)\*1\.0[1-9]\)/.test(css),'the artwork is wider than the card face, never sealed inside it');
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
 const chain=app.slice(app.indexOf("if(phase==='foundation')modal='relics'"));
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

 assert.ok(app.includes('현재 런 포기 · 새 점포 준비'),'the destructive action is named as the spec names it');
 assert.ok(app.includes('현재 런을 보상 없이 포기하고 새 점포를 시작합니다.'),'and the confirmation says what it costs');
 assert.ok(!app.includes('현재 런 마감 · 새 점포 준비'),'the old "마감" wording is gone');

 // No surface may promise XP, settlement or compensation for it. 점주 XP does not exist at all
 // since the Meta replacement, so any remaining promise of one is a lie, not just off-tone.
 for(const banned of ['점주 XP','보상 받기','누적 '])
  assert.ok(!app.includes(banned),'no legacy reward promise survives: '+banned);
});

console.log(count+' ui guard groups passed');
