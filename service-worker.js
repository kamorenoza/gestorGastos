if(!self.define){let s,e={};const r=(r,o)=>(r=new URL(r+".js",o).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(o,p)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let l={};const i=s=>r(s,n),t={module:{uri:n},exports:l,require:i};e[n]=Promise.all(o.map((s=>t[s]||i(s)))).then((s=>(p(...s),l)))}}define(["./workbox-2d118ab0"],(function(s){"use strict";s.setCacheNameDetails({prefix:"gestor-gastos"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/prestamosApp/css/app.0dad0412.css",revision:null},{url:"/prestamosApp/css/chunk-vendors.d1955fd9.css",revision:null},{url:"/prestamosApp/favicon16.png",revision:"28a5e4249d604b70308bd57f024fb927"},{url:"/prestamosApp/favicon32.png",revision:"17960496b4499a95cee630cb30188fe0"},{url:"/prestamosApp/fonts/MavenProBold.c412702c.ttf",revision:null},{url:"/prestamosApp/fonts/MavenProMedium.3a7e02c1.ttf",revision:null},{url:"/prestamosApp/fonts/MavenProRegular.f5d986a9.ttf",revision:null},{url:"/prestamosApp/img/loading.4688e609.gif",revision:null},{url:"/prestamosApp/index.html",revision:"f7148718ec1aef8e79efe3a505b5f7a9"},{url:"/prestamosApp/js/681.f038ab0f.js",revision:null},{url:"/prestamosApp/js/734.b0a3bb4d.js",revision:null},{url:"/prestamosApp/js/accounts.2f6d07fd.js",revision:null},{url:"/prestamosApp/js/add-expense.2cde29f0.js",revision:null},{url:"/prestamosApp/js/app.4271aa80.js",revision:null},{url:"/prestamosApp/js/categories.f5060f82.js",revision:null},{url:"/prestamosApp/js/chunk-vendors.f8bd2ffa.js",revision:null},{url:"/prestamosApp/js/details-accoun.f4d738d5.js",revision:null},{url:"/prestamosApp/js/details-product.1357ac1d.js",revision:null},{url:"/prestamosApp/js/login.70fc9e85.js",revision:null},{url:"/prestamosApp/js/products.8a1b4553.js",revision:null},{url:"/prestamosApp/js/save-account.4bbf33fe.js",revision:null},{url:"/prestamosApp/js/save-category.cdd08858.js",revision:null},{url:"/prestamosApp/js/save-product.1e82a949.js",revision:null},{url:"/prestamosApp/js/statistics.3dc5d074.js",revision:null},{url:"/prestamosApp/manifest.json",revision:"12aa8e933dfc24a7bb08c1237ded04b1"},{url:"/prestamosApp/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map