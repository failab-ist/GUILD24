// C: potion combat -15%, hazard counters +2 (items and positive traits), final hazard 28->30
(function(G){const D=G.DATA,H=Object.keys(D.hazards);
 const P={lowpotion:8,midpotion:15,highpotion:21,toppotion:30};for(const [id,v] of Object.entries(P))D.itemBy[id].effects.combat=v;
 for(const it of D.items)for(const h of H)if((it.effects[h]||0)>0)it.effects[h]+=2;
 for(const t of D.traits)for(const h of H)if((t.effects?.[h]||0)>0)t.effects[h]+=2;
 D.balance.finalHazardThreat=30;})(globalThis.GUILD24||globalThis);
