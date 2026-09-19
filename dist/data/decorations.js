(function(G){
/* META_v2.8 §DECORATION COLLECTION / LOADOUT and §INITIAL FOUR DECORATIONS.
   A Decoration is Account-owned, belongs to exactly one Slot, and at most one owned Decoration
   per Slot is active for a Run. This is a list rather than four booleans on purpose: a Slot may
   hold several alternatives later, and nothing here assumes one entry per Slot forever.
   These are the only numeric truth for the four effects and their prices - no screen, harness or
   report may hold its own copy. */
G.DATA.decorationSlots=['sign','wall','counter','display'];
G.DATA.decorations=[
 {id:'dawnSign', slot:'sign',    name:'새벽배송 안내판',  price:800, effect:'발주 후보 +1',
  text:'새벽마다 본사 물류가 한 줄 더 붙는다.'},
 {id:'guildPlaque', slot:'wall', name:'길드 제휴 현판',   price:700, effect:'매일 아침 10% 확률로 방문객 +1명',
  text:'길드 도장이 찍힌 현판. 가끔 이걸 보고 한 명이 더 들른다.'},
 {id:'thriftSafe', slot:'counter',name:'알뜰 금고',      price:650, effect:'영업 시작 자금 +300G',
  text:'카운터 아래 작은 금고. 개점 자금에 여유가 생긴다.'},
 {id:'premiumCase',slot:'display',name:'프리미엄 쇼케이스',price:550, effect:'희귀한 모험가가 더 자주 찾아온다',
  text:'유리 너머로 좋은 물건이 보이면, 좋은 손님이 온다.'}];
G.DATA.decorationBy=Object.fromEntries(G.DATA.decorations.map(d=>[d.id,d]));
/* META_v2.8 §STORE CAPITAL. The band is the Day the Run actually reached. */
/* META_v2.8 §Day-reach conversion rate — DIRECTOR DOCUMENT BASELINE. The band is the Day the
   Run actually reached, and it multiplies Gross Sales, not an end-state net worth - which is
   why these are a fraction of the rates the retired net-asset formula used. */
G.DATA.capitalRates=[{maxDay:9,rate:.01},{maxDay:19,rate:.02},{maxDay:24,rate:.03},{maxDay:29,rate:.04},{maxDay:30,rate:.05}];
})(globalThis);
