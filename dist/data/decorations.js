(function(G){
/* META_v2.8 §DECORATION COLLECTION / LOADOUT and §INITIAL FOUR DECORATIONS.
   A Decoration is Account-owned, belongs to exactly one Slot, and at most one owned Decoration
   per Slot is active for a Run. This is a list rather than four booleans on purpose: a Slot may
   hold several alternatives later, and nothing here assumes one entry per Slot forever.
   These are the only numeric truth for the four effects and their prices - no screen, harness or
   report may hold its own copy. */
const pct=x=>Math.round(x*100)+'%';
G.DATA.decorationSlots=['sign','wall','counter','display'];
/* META §Prices — EXACT: sign 1500 / wall 1000 / counter 750 / display 500 (cheapest 500, dearest 3x, total 3,750);
   both Decorations of a Slot share the price. */
G.DATA.decorations=[
 /* v2.9.7 (User 2026-09-26, META §INITIAL FOUR DECORATIONS): the sign economy Decoration is remade as 원정 지원금 간판; the wall
    and display economy Decorations swap Slots, names and art following the Slot. Ids are kept, so ownership carries over. */
 {id:'sponsorSign', kind:'economy', slot:'sign',    name:'원정 지원금 간판',  price:1500, effect:p=>'손님이 방문할 때마다 손님 소지금의 '+pct(p.sponsorSign.budgetShare)+'만큼 더 쓸 수 있다',
  text:'길드 원정 지원금이 되는 가게. 모험가들이 하나씩 더 집어 간다.'},
 {id:'honorFrame', kind:'economy',slot:'wall',name:'명예 모험가 액자',price:1000, effect:p=>'새로 오는 모험가가 평범보다 높은 등급일 확률 '+(100-p.honorFrame.weights[0])+'% (기존 40%)',
  text:'이름난 모험가의 초상. 저 벽에 걸리고 싶은 사람이 문을 연다.'},
 {id:'thriftSafe', kind:'economy', slot:'counter',name:'알뜰 금고',      price:750, effect:p=>'매일 먼저 온 손님 '+p.thriftSafe.customers+'명은 손님 소지금이 '+p.thriftSafe.firstWallet+'G씩 늘어난다',
  text:'카운터 아래 작은 금고. 먼저 온 손님들의 손님 소지금에 길드 적립금을 보태 준다.'},
 {id:'guildShelf', kind:'economy', slot:'display', name:'길드 추천 매대',   price:500, effect:()=>'매일 아침 '+pct(G.DATA.balance.wallVisitorChance)+' 확률로 그날 손님이 1명 더 온다',
  text:'길드 추천 딱지가 붙은 매대. 가끔 이걸 보고 한 명이 더 들른다.'},
 /* Survival / combat alternatives, one per Slot (User decision 2026-09-24). A Slot still wears
    ONE Decoration, so each Slot is a choice between running the store and keeping people alive.
    Same price as the economy Decoration of the same Slot, and the stronger effect sits in the
    dearer Slot. Ids are kept from the first placement; names and Slots follow the effect. */
 {id:'trainingSign', kind:'survival', slot:'sign',   name:'훈련소 제휴 간판', price:1500, effect:p=>'처음 찾아오는 모험가는 '+pct(p.trainingSign.chance)+' 확률로 레벨 +'+p.trainingSign.levelBonus+'로 온다',
  text:'길드 훈련소 문장을 건 간판. 조금 더 단련된 사람이 문을 연다.'},
 {id:'infirmaryPlaque', kind:'survival', slot:'wall', name:'의무실 현판',     price:1000, effect:p=>'부상당한 손님이 가게에 오면 '+pct(p.infirmaryPlaque.healChance)+' 확률로 부상이 낫는다 (중상은 제외)',
  text:'길드 의무관이 들르는 날이 적혀 있다. 운이 좋으면 가게에서 붕대를 푼다.'},
 {id:'memorialBook', kind:'survival', slot:'counter', name:'추모 방명록',   price:750, effect:p=>'폐점까지 버틸 수 있는 사망자 수(사망 한도)가 '+p.memorialBook.deathLimitBonus+'명 늘어난다',
  text:'계산대 옆 방명록과 초. 사람들은 이 점포가 잊지 않는다는 걸 안다.'},
 {id:'aidCabinet', kind:'survival', slot:'display',  name:'구급품 진열장',   price:500, effect:p=>'부상 없이, 피로 20 미만, 가방에 상품 2개 이상을 챙겨 떠난 손님은 투력 +'+pct(p.aidCabinet.powerMult-1)+'. 원정에 실패해도 죽을 확률이 '+pct(1-p.aidCabinet.preparedFactor)+' 줄어든다 (기존 20%)',
  text:'붉은 상자가 놓인 유리장. 챙길 걸 다 챙긴 손님일수록 무사히 돌아온다.'},
 /* META §OPERATION DECORATIONS (User 2026-10-04): 운영형 - something 본사 did for the store, one per Slot, the Slot's price */
 {id:'heroSign', kind:'operation', slot:'sign', name:'본사 특별 지원 간판', price:1500, effect:()=>'첫 점포지원을 영웅 등급 3장 중에서 고른다',
  text:'본사가 우수 점포로 골라 특별 지원을 보내 준 간판.'},
 {id:'cheerBanner', kind:'operation', slot:'wall', name:'단골 감사 현수막', price:1000, effect:p=>'손님의 투력이 단골도 10마다 '+pct(p.cheerBanner.perTen)+' 오른다',
  text:'본사가 보내 준 단골 감사 현수막. 단골일수록 어깨에 힘이 들어간다.'},
 {id:'voucher', kind:'operation', slot:'counter', name:'휴식 바우처 꽂이', price:750, effect:p=>'밤마다 살아 있는 모든 손님의 피로가 '+p.voucher.fatigue+' 줄어든다',
  text:'본사가 제휴 여관 휴식 바우처를 보내 왔다. 손님들이 한 장씩 집어 간다.'},
 {id:'rerollCoupon', kind:'operation', slot:'display', name:'지원 교환 쿠폰함', price:500, effect:()=>'점포지원 후보 교환이 창마다 처음 한 번 무료',
  text:'본사가 보내 준 지원 교환 쿠폰. 마음에 안 들면 한 번은 그냥 바꾼다.'}];
/* The numbers the four alternatives read; the effect copy above reads them. */
/* The numbers every Decoration reads (User 2026-09-24, effects re-tuned 2026-09-25 v2.9.1
   balance); the effect copy above reads them. The wall chance stays
   D.balance.wallVisitorChance, its original owner. */
G.DATA.decorationParams={cheerBanner:{perTen:.02},voucher:{fatigue:3},sponsorSign:{budgetShare:.50},thriftSafe:{firstWallet:200,customers:2},honorFrame:{weights:[40,32,18,8,2]},
 memorialBook:{deathLimitBonus:1},infirmaryPlaque:{healChance:.40},trainingSign:{levelBonus:1,chance:.55},aidCabinet:{preparedFactor:.60,powerMult:1.05}};
/* META §INITIAL FOUR DECORATIONS copy (User 2026-10-04): who gains first, no closing period (COPY_AUDIT §9-5); every
   number is read from decorationParams / D.balance when the card is drawn, so `effect` is a getter over the live tables. */
for(const d of G.DATA.decorations){const copy=d.effect;Object.defineProperty(d,'effect',{get:()=>copy(G.DATA.decorationParams),enumerable:true});}
G.DATA.decorationBy=Object.fromEntries(G.DATA.decorations.map(d=>[d.id,d]));
/* META §STORE CAPITAL · §Day-reach conversion rate — EXACT. The band is the Day the Run actually reached, and it
   multiplies Gross Sales, not an end-state net worth. A Decoration inside the first Run is not a goal; the longer Run
   still earns more through its Gross Sales. */
G.DATA.capitalRates=[{maxDay:9,rate:.01},{maxDay:19,rate:.02},{maxDay:24,rate:.03},{maxDay:29,rate:.03},{maxDay:30,rate:.03}];
})(globalThis);
