import fs from 'node:fs';
import postcss from 'postcss';
import {build} from 'vite';
const root=postcss.parse(fs.readFileSync('public/pay101-menu.css','utf8')+'\n'+fs.readFileSync('src/style.css','utf8'));
root.walkRules(rule=>{
 if(rule.parent.type==='atrule' && /keyframes/.test(rule.parent.name))return;
 rule.selectors=rule.selectors.map(selector=>{
  if(selector===':root')return '.pay101SharedHeader';
  if(/\.p101Header(?![\w-])/.test(selector))return selector.replace(/\.p101Header(?![\w-])/g,'.pay101SharedHeader');
  return '.pay101SharedHeader '+selector;
 });
});
fs.writeFileSync('src/header-scoped.css',root.toString()+'\n.pay101SharedHeader{font-family:Manrope,sans-serif;line-height:normal;color:#10202b;letter-spacing:normal;width:100%;}');
await build({configFile:false,define:{"process.env.NODE_ENV":JSON.stringify("production")},build:{copyPublicDir:false,outDir:'dist/shared-header',emptyOutDir:true,lib:{entry:'src/header-entry.jsx',formats:['es'],fileName:()=> 'header.js',cssFileName:'header'},rollupOptions:{output:{assetFileNames:asset=>asset.name?.endsWith('.css')?'header.css':'[name][extname]'}}}});
