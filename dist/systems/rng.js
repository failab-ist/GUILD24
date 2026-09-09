(function(G){
class RNG{
 constructor(seed,state){this.seed=String(seed);let h=2166136261;for(const c of this.seed)h=Math.imul(h^c.charCodeAt(0),16777619);this.state=state===undefined?h>>>0:state>>>0;this.last=[];}
 next(){this.state=(this.state+0x6D2B79F5)>>>0;let t=this.state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);const r=((t^(t>>>14))>>>0)/4294967296;this.last.push(r);if(this.last.length>16)this.last.shift();return r;}
 int(a,b){return a+Math.floor(this.next()*(b-a+1));}pick(a){return a[this.int(0,a.length-1)];}
 weighted(a,w){const weights=a.map((v,i)=>typeof w==='function'?w(v,i):w[i]);let r=this.next()*weights.reduce((s,v)=>s+v,0);for(let i=0;i<a.length;i++){r-=weights[i];if(r<0)return a[i];}return a[a.length-1];}
 shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=this.int(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
}
G.RNG=RNG;
})(globalThis);
