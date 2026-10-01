#!/usr/bin/env node
/* Print named top-level functions from a source file, comments stripped - a cheap way to read code.
   Usage: node tools/fn.cjs <file> <name...> [--keep-comments]
   The slice is the one tests/ui-guard.cjs fn() takes (`function name(` up to the next line-start `function `),
   and the strip is its bare(). Read only: nothing is written. */
const fs=require('node:fs'),path=require('node:path');
const args=process.argv.slice(2),keep=args.includes('--keep-comments'),[file,...names]=args.filter(a=>a!=='--keep-comments');
if(!file||!names.length){console.error('usage: node tools/fn.cjs <file> <name...> [--keep-comments]');process.exit(2);}
const src=fs.readFileSync(path.resolve(file),'utf8');
const fn=name=>{const a=src.indexOf('function '+name+'(');if(a<0)return null;const b=src.indexOf('\nfunction ',a+1);return src.slice(a,b<0?src.length:b);};
const bare=t=>t.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'').replace(/^\s*\n/gm,'');
let missing=0;
for(const name of names){const f=fn(name);
 if(f===null){console.error('not found: '+name);missing++;continue;}
 const line=src.slice(0,src.indexOf(f)).split('\n').length;
 console.log('// '+file+':'+line+'\n'+(keep?f:bare(f)).replace(/\s+$/,''));}
process.exit(missing?1:0);
