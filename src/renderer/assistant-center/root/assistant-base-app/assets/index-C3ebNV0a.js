import{c as N,y as d,a as f,q as C,r as u,u as $,j as n}from"./index-DFSA4dSC.js";const I=N((t,i)=>({installedPackages:[],shopPackages:[],setInstalledPackages:s=>t({installedPackages:s}),setShopPackages:s=>t({shopPackages:s}),getInstalledPackages:async()=>{const s=await f.post({path:"shop",key:"list-installed"});return s.code===200&&t({installedPackages:s.data}),s.data},getShopPackages:async()=>{const s=await C.post({path:"app",key:"public-list"},{url:"https://kevisual.silkyai.cn/api/router"});return s.code===200&&t({shopPackages:s.data}),s.data},uninstallPackage:async s=>{const o=await f.post({path:"shop",key:"uninstall",data:{pkg:s}});o.code===200?(i().getInstalledPackages(),d.success("Package uninstalled successfully")):d.error(o.message||"Failed to uninstall package"),console.log("uninstallPackage",o)},installPackage:async s=>{const o=d.loading("Installing package..."),c=await f.post({path:"shop",key:"install",data:{pkg:s}});d.dismiss(o),c.code===200?(i().getInstalledPackages(),d.success("Package installed successfully")):d.error(c.message||"Failed to install package"),console.log("installPackage",c)}}));/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=(...t)=>t.filter((i,s,o)=>!!i&&i.trim()!==""&&o.indexOf(i)===s).join(" ").trim();/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var U={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=u.forwardRef(({color:t="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:c="",children:r,iconNode:h,...p},k)=>u.createElement("svg",{ref:k,...U,width:i,height:i,stroke:t,strokeWidth:o?Number(s)*24/Number(i):s,className:x("lucide",c),...p},[...h.map(([g,m])=>u.createElement(g,m)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(t,i)=>{const s=u.forwardRef(({className:o,...c},r)=>u.createElement(S,{ref:r,iconNode:i,className:x(`lucide-${A(t)}`,o),...c}));return s.displayName=`${t}`,s};/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]],q=y("Link2",R);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6",key:"y09zxi"}],["path",{d:"m21 3-9 9",key:"mpx6sq"}],["path",{d:"M15 3h6v6",key:"1q9fwt"}]],E=y("SquareArrowOutUpRight",L),_=()=>{const{shopPackages:t,installedPackages:i,getInstalledPackages:s,getShopPackages:o,uninstallPackage:c,installPackage:r}=I(),{pageApi:h,pageStoreApi:p}=$();u.useEffect(()=>{s(),o()},[]);const k=e=>{const a=i.find(l=>l.user===e.user&&l.key===e.key);return a?a.version!==e.version?"update-available":"installed":"not-installed"},g=e=>{const a=t.find(l=>l.id===e);a&&r(a)},m=e=>{const a=t.find(l=>l.id===e);a&&r(a)},b=e=>{const a=t.find(l=>l.id===e);a&&r(a)},w=e=>{const a=t.find(l=>l.id===e);a&&c(a)},P=(e,a)=>{switch(e){case"not-installed":return n.jsx("button",{className:"button button-install",onClick:()=>g(a.id),children:"Install"});case"update-available":return n.jsx("button",{className:"button button-update",onClick:()=>m(a.id),children:"Update"});case"installed":return n.jsx("button",{className:"button button-reinstall",onClick:()=>b(a.id),children:"Reinstall"})}},j=e=>{const a=p||"https://kevisual.silkyai.cn",l=`/${e.user}/${e.key}`;window.open(`${a}${l}`,"_blank")},v=e=>{const a=new URL(window.location.href).origin,l=`/${e.user}/${e.key}`;window.open(`${a}${l}`,"_blank")};return n.jsxs("div",{id:"app",children:[n.jsx("h1",{children:"Package Manager"}),n.jsx("div",{className:"package-list",children:t.map(e=>{const a=k(e),l=a!=="not-installed";return n.jsxs("div",{className:"package-card",children:[n.jsx("h2",{children:e.title}),n.jsx("p",{className:"description",children:e.description}),n.jsxs("div",{className:"package-info",children:[n.jsxs("span",{children:["Version: ",e.version]}),n.jsxs("span",{children:["User: ",e.user]})]}),n.jsxs("div",{className:"actions",children:[P(a,e),a!=="not-installed"&&n.jsx("button",{className:"button button-uninstall",onClick:()=>w(e.id),children:"Uninstall"}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("div",{className:"cursor-pointer p-2 rounded-md bg-amber-500 text-white",children:n.jsx(E,{onClick:()=>j(e)})}),h&&l&&n.jsx("div",{className:"cursor-pointer p-2 rounded-md bg-amber-500 text-white",children:n.jsx(q,{onClick:()=>v(e)})})]})]})]},e.id)})})]})};export{_ as PackageManager,_ as default};
