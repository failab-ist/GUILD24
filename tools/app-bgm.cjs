#!/usr/bin/env node
// App build only: put the original 192 kb/s BGM (assets-src/bgm) into the Capacitor copy of the web assets, under the
// names the game loads. Run after `npx cap sync android`; the web build (dist/) keeps its 128 kb/s copies.
//   node tools/app-bgm.cjs
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const SRC=path.join(ROOT,'assets-src','bgm');
const OUT=path.join(ROOT,'android','app','src','main','assets','public','ui','assets','bgm');
const MAP={TITLE_beneath_the_root:'title',MORNING_the_sunken_courtyard:'morning',ORDER_before_the_next_turn:'order',
 SALE_copper_key:'sale',NIGHT_valley_of_sunken_bells:'night',CLOSE_the_stone_path:'close',BOSS_beneath_the_stone_floor:'boss',
 SUCC_step_into_the_canopy:'succ',FAIL_late_shift_at_the_dungeon_gate:'fail'};
if(!fs.existsSync(OUT)){console.error('missing '+path.relative(ROOT,OUT)+' - run `npx cap sync android` first');process.exit(1);}
let total=0;
for(const [name,role] of Object.entries(MAP)){
  const src=path.join(SRC,name+'.mp3');
  if(!fs.existsSync(src)){console.error('assets-src/bgm is missing '+name+'.mp3');process.exit(1);}
  fs.copyFileSync(src,path.join(OUT,role+'.mp3'));total+=fs.statSync(src).size;
}
console.log('app bgm  '+Object.keys(MAP).length+' tracks  '+(total/1048576).toFixed(1)+' MB (192 kb/s originals)');
