#!/usr/bin/env node
// App build (PC only, never part of npm test): the game as the Android shell ships it.
//   node tools/app-build.cjs debug      -> android/app/build/outputs/apk/debug/app-debug.apk
//   node tools/app-build.cjs release    -> android/app/build/outputs/bundle/release/app-release.aab (signed when android/keystore.properties exists)
// Stamps the commit into dist/build.js for the build only (the Pages deploy does the same), then puts the file back.
const {execSync}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.join(__dirname,'..'),kind=process.argv[2];
if(!['debug','release'].includes(kind)){console.error('usage: node tools/app-build.cjs debug|release');process.exit(1);}
const env={...process.env};
if(!env.JAVA_HOME&&process.platform==='win32')env.JAVA_HOME='C:/Program Files/Eclipse Adoptium/jdk-21.0.12.101-hotspot'; // ponytail: this PC's JDK 21, set JAVA_HOME elsewhere
const sh=(cmd,cwd=ROOT)=>execSync(cmd,{cwd,stdio:'inherit',env});
const gradle=task=>execSync(path.join(ROOT,'android',process.platform==='win32'?'gradlew.bat':'gradlew')+' '+task,{cwd:path.join(ROOT,'android'),stdio:'inherit',env});
const marker=path.join(ROOT,'dist','build.js'),original=fs.readFileSync(marker,'utf8');
const commit=execSync('git rev-parse --short=7 HEAD',{cwd:ROOT}).toString().trim();
if(!original.includes("commit:'dev'")){console.error("dist/build.js is not the repository copy (commit:'dev')");process.exit(1);}
try{
 fs.writeFileSync(marker,original.replace("commit:'dev'",`commit:'${commit}'`));
 sh('npm ci --no-audit --no-fund');
 sh('npx cap sync android');
 sh('node tools/app-bgm.cjs');
 gradle(kind==='debug'?'assembleDebug':'bundleRelease');
}finally{fs.writeFileSync(marker,original);}
console.log(`built ${kind} from ${commit} (versionCode/versionName in android/version.properties)`);
