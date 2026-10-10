// Source에서 상품·점포지원·장식과 공통 수치를 읽는 자료집. 게임 진행/시뮬 없음.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,D=G.DATA;
const number=n=>String(Math.round(n*100)/100),signed=n=>(n>=0?'+':'')+number(n),pct=n=>number(n*100)+'%';
const cell=x=>String(x??'—').replace(/\r?\n/g,' ').replace(/\|/g,'\\|');
function render(){
 const files=['build.js','data/catalog.js','data/relics.js','data/decorations.js','systems/adventurer.js','systems/dungeon.js','systems/meta.js','systems/shop.js','systems/run.js'];
 const code=Object.fromEntries(files.map(f=>[f,fs.readFileSync(path.join(root,'dist',f),'utf8').replace(/\r\n/g,'\n')]));
 const version=code['build.js'].match(/version:'([^']+)'/)[1],signature=crypto.createHash('sha256').update(files.map(f=>code[f]).join('\n')).digest('hex').slice(0,12);
 const active=D.relics.filter(r=>!D.relicRetired.includes(r.id)),L=[];
 const line=s=>L.push(s),table=(columns,rows)=>{line('| '+columns.map(cell).join(' | ')+' |');line('| '+columns.map(()=>'---').join(' | ')+' |');for(const r of rows)line('| '+r.map(cell).join(' | ')+' |');line('');};
 line('# 상품 · 점포지원 · 장식 — 현재 소스 밸런스 자료집\n');
 line(`소스 버전 **v${version} (로컬 수정 포함)** · 데이터 서명 \`${signature}\` · 상품 **${D.items.length}종** · 활성 점포지원 **${active.length}종** · 장식 **${D.decorations.length}종**\n`);
 line('`npm run audit`가 현재 Source에서 자동 생성한다. 이 파일은 설계 원본이 아니며 직접 수정하지 않는다. 실험 후보·시뮬 결과는 포함하지 않는다. 기본 가격·고유 효과를 적었으며 사건·특성·점포지원·메타에 따른 추가 보정은 별도다.\n');
 line('설계 원본: [ITEM](../design_ssot/ITEM_v2.8.0.md) · [RELIC](../design_ssot/RELIC_v2.8.0.md) · [META](../design_ssot/META_v2.8.0.md) · [DUNGEON_HAZARD](../design_ssot/DUNGEON_HAZARD_v2.8.0.md) · [FINAL](../design_ssot/FINAL_EXPEDITION_v2.8.0.md)\n');
 line('## 1. 공통 밸런스 수치\n');
 const growth=G.Adventurer.growthCost.toString().match(/=>([\d.]+)\+level\*([\d.]+)/),penalty=D.balance.finalGapPenalty;
 if(!growth||!penalty)throw Error('성장/최종 전력 Source 형식 변경: 자료집 생성기를 확인하세요.');
 const powerKey=k=>G.Dungeon.preparedPower({combat:0,survival:0,mobility:0,spirit:0,[k]:1});
 table(['항목','현재 소스 값'],[
  ['기본 발주 후보',D.balance.orderOffers+'칸'],['상품 판매 가격',`할인 ${pct(D.pricing.half.mult)} / 정가 ${pct(D.pricing.full.mult)} / 바가지 ${pct(D.pricing.overcharge.mult)} · 정수 반올림`],
  ['모험가 가방',G.Adventurer.slots({})+'칸'],['레벨업 필요 경험치',`${growth[1]} + 현재 레벨 × ${growth[2]}`],
  ['원정 전력',`투력 × ${powerKey('combat')} + (강인함 + 기동 + 정신) × ${powerKey('survival')}`],
  ['위험 대응',Object.keys(D.hazards).map(h=>{const r=G.Dungeon.hazardRule(h);return D.hazards[h]+' = '+G.Presentation.labels[r.stat]+(Number.isInteger(1/r.coef)?' '+number(1/r.coef)+'당 대응 1':' × '+number(r.coef));}).join(' · ')],
  ['마왕성 위험 요구 대응',number(G.Dungeon.hazardState('cold',{survival:0},{day:30,tier:2,family:'final'}).threat)+' · DAY30 / T2'],
  ['마왕전 환경 전력 차감','개인별 평균 위험 부족분 × '+penalty],['마왕전 전력 흔들림',pct(D.balance.finalRoll.lo)+'~'+pct(D.balance.finalRoll.hi)],
  ['래스 유효 요구 전력',D.balance.bossPower*D.bossTuning.finalPowerFactor],['화염 계열 추가 요구 전력',D.bossTuning.firePairPower+' (마왕 계수 '+D.bossTuning.finalPowerFactor+' 적용 전)'],['마왕 공통 요구 전력 계수',D.bossTuning.finalPowerFactor],['처진 인원 경험치', '×'+G.Adventurer.CATCHUP_MULT+' · 퇴각·부상·중상 생환은 최저 레벨까지 모자란 경험치의 '+Math.round(G.Adventurer.CATCHUP_GAP_SHARE*100)+'%와 비교해 큰 쪽 · 당일 기본 신규 최저 레벨 미만 생환자, 추가분만 최저 레벨까지 제한'],
  ['일반 원정 전투 흔들림','±'+pct(D.balance.combatNoise)],['후반 원정 전투 일일 상승',G.Dungeon.GATE.late],
  ['점포지원 후보 등급',`일반 ${pct(D.relicRarityChance[0])} / 희귀 ${pct(D.relicRarityChance[2])} / 영웅 ${pct(D.relicRarityChance[3])}`],
  ['최대 피로',G.Dungeon.FATIGUE_MAX],['단골 기준','단골도 '+G.Adventurer.TRUSTED_REGULAR+' 이상']
 ]);
 line('위험 대응은 표시 반올림이며 정확한 비율은 각 스탯 3당 대응 1이다. 여러 위험에 각각 적용하고, 투력은 직접 위험 대응으로 환산하지 않는다.\n');
 table(['피로','상태','효과'],G.Dungeon.fatigueBands().map(b=>[b.min+'~'+b.max,b.name,b.text||'능력치 벌칙 없음']));
 line('### 직업 기본 스탯과 레벨 성장\n');
 line('스탯 순서는 투력 / 강인함 / 기동 / 정신. 실제 레벨 성장은 직업 성장치 × 해당 모험가의 잠재력이다.\n');
 table(['직업','Lv1 기본 스탯','레벨당 성장','해금'],D.jobs.map(j=>[j.name,j.stats.join(' / '),j.growth.join(' / '),j.metaUnlock?'마왕 '+j.metaUnlock+'종 격파':'기본']));
 line('## 2. 상품\n');
 line('매입·정가는 Gold(G), 기한은 기본 보관 일수다. 일반 판매의 할인가는 정가의 50%, 바가지는 150%이며 각각 반올림한다. 마왕성 보급가는 정가의 50%다. 아래 환산은 상품의 스탯 효과만이며 직접 대응 효과는 고유 효과 칸에 별도로 표시한다.\n');
 for(const [category,label] of Object.entries(D.categories)){
  const items=D.items.filter(i=>i.category===category);if(!items.length)continue;
  line('### '+label+'\n');
  table(['상품','등급','매입 G','정가 G','기한','고유 효과','스탯 → 위험 대응','등장 조건'],items.map(it=>{
   const conversion=['survival','mobility','spirit'].filter(k=>it.effects[k]).map(k=>{const hazards=Object.keys(D.hazards).filter(h=>G.Dungeon.hazardRule(h).stat===k);return hazards.map(h=>D.hazards[h]).join('·')+' 각 '+signed(it.effects[k]*G.Dungeon.hazardRule(hazards[0]).coef);}).join(' · ');
   return [it.name,D.rarities[it.rarity],it.buy,it.sell,it.days+'일',G.Presentation.rows(it.effects,undefined,it.category).map(r=>r.label+' '+r.text).join(' · '),conversion||'—',it.metaUnlock?'마왕 '+it.metaUnlock+'종 격파 후':G.Meta.ITEM_UNLOCK_DAY[it.id]?'DAY'+G.Meta.ITEM_UNLOCK_DAY[it.id]+'부터':'DAY1부터 후보'];
  }));
 }
 line('## 3. 점포지원\n');
 line('가격은 런 내 Gold(G)의 기본 구매 가격이다. 첫 선택·메타 할인 등은 별도이며, 소유 가능한 활성 목록만 표시한다. DAY0 등급 규칙과 장식의 첫 선택 변경은 각각 공통 수치/장식 효과를 따른다.\n');
 for(const rarity of [3,2,0]){line('### '+D.rarities[rarity]+'\n');table(['점포지원','기본 가격 G','현재 효과'],active.filter(r=>r.rarity===rarity).map(r=>[r.name,r.price,r.description]));}
 if(D.relicRetired.length)line('은퇴한 점포지원(새 후보 제외, 기존 저장 호환): '+D.relicRetired.map(id=>D.relicBy[id]?.name||id).join(' · ')+'.\n');
 line('## 4. 장식\n');
 line('가격은 Gold가 아닌 **점포 자본**이다. 계정에서 영구 보유하며 자리마다 한 개만 장착한다. 보유만으로 중첩되지 않고 해당 런에 장착한 장식이 적용된다.\n');
 const slots={sign:'간판',wall:'벽면',counter:'계산대',display:'진열대'},kinds={economy:'경제형',survival:'생존형',operation:'운영형'};
 for(const slot of D.decorationSlots){line('### '+slots[slot]+'\n');table(['장식','종류','점포 자본','현재 효과'],D.decorations.filter(d=>d.slot===slot).map(d=>[d.name,kinds[d.kind],d.price,d.effect]));}
 line('### 점포 자본 전환\n');
 table(['도달한 DAY 상한','총매출 전환율'],D.capitalRates.map(r=>[r.maxDay,pct(r.rate)]));
 line('전환 기준은 총매출이다. 본사 추가 지급·남은 현금 자체를 총매출로 더하지 않는다. 클리어·해금 등 추가 정산은 META 원본을 따른다.\n');
 return L.join('\n');
}
function write(){fs.mkdirSync(path.join(root,'reports'),{recursive:true});fs.writeFileSync(path.join(root,'reports/BALANCE-CATALOG.md'),render());}
if(require.main===module)write();module.exports={render,write};
