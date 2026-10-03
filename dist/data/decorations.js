(function(G){
/* META_v2.8 §DECORATION COLLECTION / LOADOUT and §INITIAL FOUR DECORATIONS.
   A Decoration is Account-owned, belongs to exactly one Slot, and at most one owned Decoration
   per Slot is active for a Run. This is a list rather than four booleans on purpose: a Slot may
   hold several alternatives later, and nothing here assumes one entry per Slot forever.
   These are the only numeric truth for the four effects and their prices - no screen, harness or
   report may hold its own copy. */
G.DATA.decorationSlots=['sign','wall','counter','display'];
/* META §Prices — EXACT: sign 1500 / wall 1000 / counter 750 / display 500 (cheapest 500, dearest 3x, total 3,750);
   both Decorations of a Slot share the price. */
G.DATA.decorations=[
 /* v2.9.7 (User 2026-09-26, META §INITIAL FOUR DECORATIONS): the sign economy Decoration is remade as 원정 지원금 간판; the wall
    and display economy Decorations swap Slots, names and art following the Slot. Ids are kept, so ownership carries over. */
 {id:'sponsorSign', kind:'economy', slot:'sign',    name:'원정 지원금 간판',  price:1500, effect:'방문 모험가마다 현재 소지금의 50%만큼 추가 구매 가능',
  text:'길드 원정 지원금이 되는 가게. 모험가들이 하나씩 더 집어 간다.'},
 {id:'honorFrame', kind:'economy',slot:'wall',name:'명예 모험가 액자',price:1000, effect:'평범보다 높은 등급의 모험가 등장 확률 60%로 증가 (기존 40%)',
  text:'이름난 모험가의 초상. 저 벽에 걸리고 싶은 사람이 문을 연다.'},
 {id:'thriftSafe', kind:'economy', slot:'counter',name:'알뜰 금고',      price:750, effect:'매일 첫 두 손님 소지금 +200G',
  text:'카운터 아래 작은 금고. 그날 첫 손님의 지갑에 길드 적립금을 보태 준다.'},
 {id:'guildShelf', kind:'economy', slot:'display', name:'길드 추천 매대',   price:500, effect:'매일 아침 35% 확률로 방문객 +1명',
  text:'길드 추천 딱지가 붙은 매대. 가끔 이걸 보고 한 명이 더 들른다.'},
 /* Survival / combat alternatives, one per Slot (User decision 2026-09-24). A Slot still wears
    ONE Decoration, so each Slot is a choice between running the store and keeping people alive.
    Same price as the economy Decoration of the same Slot, and the stronger effect sits in the
    dearer Slot. Ids are kept from the first placement; names and Slots follow the effect. */
 {id:'trainingSign', kind:'survival', slot:'sign',   name:'훈련소 제휴 간판', price:1500, effect:'처음 찾아오는 모험가 55% 확률로 레벨 +1',
  text:'길드 훈련소 문장을 건 간판. 조금 더 단련된 사람이 문을 연다.'},
 {id:'infirmaryPlaque', kind:'survival', slot:'wall', name:'의무실 현판',     price:1000, effect:'부상 모험가가 방문하면 40% 확률로 부상 회복',
  text:'길드 의무관이 들르는 날이 적혀 있다. 운이 좋으면 가게에서 붕대를 푼다.'},
 {id:'memorialBook', kind:'survival', slot:'counter', name:'추모 방명록',   price:750, effect:'사망 한도 +1명',
  text:'계산대 옆 방명록과 초. 사람들은 이 점포가 잊지 않는다는 걸 안다.'},
 {id:'aidCabinet', kind:'survival', slot:'display',  name:'구급품 진열장',   price:500, effect:'만반의 준비(건강 · 피로 20 미만 · 가방 2칸)로 떠나면 투력 +5%, 실패 시 사망 위험 -40% (기존 -20%)',
  text:'붉은 상자가 놓인 유리장. 챙길 걸 다 챙긴 손님일수록 무사히 돌아온다.'}];
/* The numbers the four alternatives read. Presentation copy above states the same values. */
/* The numbers every Decoration reads (User 2026-09-24, effects re-tuned 2026-09-25 v2.9.1
   balance). Presentation copy above states the same values. The wall chance stays
   D.balance.wallVisitorChance, its original owner. */
G.DATA.decorationParams={sponsorSign:{budgetShare:.50},thriftSafe:{firstWallet:200,customers:2},honorFrame:{weights:[40,32,18,8,2]},
 memorialBook:{deathLimitBonus:1},infirmaryPlaque:{healChance:.40},trainingSign:{levelBonus:1,chance:.55},aidCabinet:{preparedFactor:.60,powerMult:1.05}};
G.DATA.decorationBy=Object.fromEntries(G.DATA.decorations.map(d=>[d.id,d]));
/* META_v2.8 §STORE CAPITAL. The band is the Day the Run actually reached. */
/* META_v2.8 §Day-reach conversion rate — DIRECTOR DOCUMENT BASELINE. The band is the Day the
   Run actually reached, and it multiplies Gross Sales, not an end-state net worth - which is
   why these are a fraction of the rates the retired net-asset formula used. */
/* META §Day-reach conversion rate — EXACT (User 2026-09-25, v2.9.1 balance): back to the full
   1/2/3/4/5% now that the Decoration prices above are cheaper - the v2.9.0 half-rate table is
   retired. A Decoration inside the first Run is still not a goal.
   v2.9.13 (User 2026-09-30): D25-29 4% -> 3% and D30 5% -> 3% - a player who reaches D30 every Run filled all four Slots
   by about Run 5 (reports/balance-proposal-v2912.md §4). The longer Run still earns more through its Gross Sales. */
G.DATA.capitalRates=[{maxDay:9,rate:.01},{maxDay:19,rate:.02},{maxDay:24,rate:.03},{maxDay:29,rate:.03},{maxDay:30,rate:.03}];
})(globalThis);
