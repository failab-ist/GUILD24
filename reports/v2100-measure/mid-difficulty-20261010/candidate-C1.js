// C: potion combat -10%, hazard counters +1 (items and positive traits), final hazard 28->29
(function(G){const D=G.DATA,H=Object.keys(D.hazards);
 const P={lowpotion:9,midpotion:16,highpotion:23,toppotion:32};for(const [id,v] of Object.entries(P))D.itemBy[id].effects.combat=v;
 for(const it of D.items)for(const h of H)if((it.effects[h]||0)>0)it.effects[h]+=1;
 for(const t of D.traits)for(const h of H)if((t.effects?.[h]||0)>0)t.effects[h]+=1;
 D.balance.finalHazardThreat=29;})(globalThis.GUILD24||globalThis);
