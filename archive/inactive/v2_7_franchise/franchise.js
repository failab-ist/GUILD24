/* INACTIVE_ARCHIVE — RUNTIME_IMPORT = FORBIDDEN — DESIGN_AUTHORITY = HISTORICAL_ONLY

   Final v2.7 Franchise implementation, lifted verbatim from dist/systems/meta.js before the
   Decoration Package retired it. Preserved so the ten Achievements, their approved thresholds,
   the Grade ladder and the ORDER purchase-price discount can be read or revived later.

   The codex read progress through `franchiseState`, which carried `have` / `want` for the five
   cumulative Achievements and only a verdict for the five that are a Run result. First completion
   was announced once through the existing toast, with the Grade step read off the same event.
*/

/* META_v2.7 §FRANCHISE ACHIEVEMENTS — CURRENT APPROVED SET. The baselines are DIRECTOR
   DOCUMENT BASELINE values: QA may report a BALANCE FINDING against them but may not tune
   them here. `run` is judged only for the one-Run achievements, which need a Run to look at. */
const FRANCHISE=[
 {id:'sales',      name:'누적 판매 80회',             done:(a)=>(a.franchise?.sales||0)>=80,
  have:(a)=>a.franchise?.sales||0,                want:80},
 {id:'overcharge', name:'150% 판매 20회 성공',        done:(a)=>(a.franchise?.overcharged||0)>=20,
  have:(a)=>a.franchise?.overcharged||0,          want:20},
 {id:'returning',  name:'재방문 손님에게 20회 판매',   done:(a)=>(a.franchise?.returning||0)>=20,
  have:(a)=>a.franchise?.returning||0,            want:20},
 {id:'relics',     name:'점포지원 누적 15개 구매',     done:(a)=>(a.franchise?.relics||0)>=15,
  have:(a)=>a.franchise?.relics||0,               want:15},
 {id:'families',   name:'다섯 게이트 전부에서 보급 생환',done:(a)=>(a.franchise?.families||[]).length>=5,
  have:(a)=>(a.franchise?.families||[]).length,   want:5},
 {id:'nowaste',    name:'폐기 0개로 DAY 25 도달',      done:(a)=>(a.franchise?.done||[]).includes('nowaste')},
 {id:'nodeath',    name:'사망 0명으로 마왕성 도달',     done:(a)=>(a.franchise?.done||[]).includes('nodeath')},
 {id:'allsupplied',name:'출전 전원 보급 후 마왕 토벌',  done:(a)=>(a.franchise?.done||[]).includes('allsupplied')},
 {id:'grosssales', name:'매출 10,000G + 마왕 토벌',    done:(a)=>(a.franchise?.done||[]).includes('grosssales')},
 {id:'matrix',     name:'직업×마왕 42/42 토벌',       done:(a)=>totalJobMastery(a)>=42}];
/* The cumulative ones carry their own running count so a screen can say how far along the
   account is without re-deriving the threshold from the name. The one-Run ones have no
   running count to show - they are a result, not a tally - and report none. */
const franchiseState=a=>FRANCHISE.map(f=>({id:f.id,name:f.name,done:f.done(a),
 have:f.have?Math.min(f.have(a),f.want):null,want:f.want??null}));
const franchiseCount=a=>FRANCHISE.reduce((n,f)=>n+(f.done(a)?1:0),0);
/* META_v2.7 §FRANCHISE GRADE: the Grade is the completion count, not Total Job Mastery.
   0/10 base, then a step at 2, 4, 6 and 8, and the honour grade at 10/10. */
const GRADE_STEPS=[0,2,4,6,8,10];
/* How many completions a Grade costs, and the Grade a count buys - one ladder read from both
   ends, so a screen that shows the progress toward a Grade cannot disagree with the judgment
   that opens it. Grade 1 is the base and asks for nothing. */
const gradeRequirement=g=>GRADE_STEPS[Math.max(0,Math.min(GRADE_STEPS.length-1,g-1))];
const grade=a=>{const n=franchiseCount(a);
 let g=1;for(let i=1;i<GRADE_STEPS.length;i++)if(n>=GRADE_STEPS[i])g=i+1;return g;};
/* META_v2.7 §FRANCHISE GRADE — ORDER PURCHASE-PRICE PASSIVE. Always applied, ORDER only. */
const orderDiscount=a=>(grade(a)-1)*0.02;

