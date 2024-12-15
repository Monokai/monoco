!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).monoco={})}(this,(function(e){"use strict";var t=new class{elements;observer;constructor(){this.elements=null,this.observer=null}onElementResize(e){for(const t of e){const e=t.target.getBoundingClientRect(),n=this.elements?.get(t.target);if(!n)continue;const{previousW:i,previousH:r,draw:s,onResize:o}=n;i===e.width&&r===e.height||(s?.({width:e.width,height:e.height}),o?.(e,t.target),n.previousW=e.width,n.previousH=e.height)}}getDrawOptions(e){return this.elements?.get(e)?.cornerOptions??null}setCornerOptions(e,t){const n=this.elements?.get(e);n&&(n.cornerOptions=t,this.elements?.set(e,n))}addElement(e,t,n){this.elements||(this.elements=new Map),this.observer||(this.observer=new ResizeObserver((e=>this.onElementResize(e)))),this.unobserve(e);const{observe:i=!0,onResize:r}=t;if(i){this.observer.observe(e);const i=null,s=null;this.elements.set(e,{draw:n,cornerOptions:t,onResize:r,previousW:i,previousH:s,element:e})}return n}draw(e,t){e?(t&&this.setCornerOptions(e,t),this.elements?.get(e)?.draw?.()):this.elements?.forEach((e=>e.draw?.()))}unobserve(e){const t=t=>{this.observer?.unobserve(e),this.elements?.delete(e)};e?t():this.elements?.keys().forEach((e=>t()))}};function n(e,t,n,i,r,s,o,a){return n?[e?["c",...i]:[],r?["a",n,n,0,0,t,...s.map((e=>e*r))]:[],e?["c",...o]:[]]:[["l",...a]]}function i({width:e,height:t,radii:i,offsets:r,smoothing:s=1,preserveSmoothing:o=!0,sweepFlag:a=1}){const[h,,,c]=r,[d,l,u,p]=i.map((n=>function(e,t,n,i){let r=(1+t)*e;n||(t=Math.min(t,i/e-1),r=Math.min(r,i));const s=.5*Math.PI*(1-t),o=Math.sin(s/2)*e*2**.5,a=.25*Math.PI*t,h=e*Math.tan(.25*(.5*Math.PI-s))*Math.cos(a),c=h*Math.tan(a);let d=(r-o-h-c)/3,l=2*d;if(n&&r>i){const e=i-c-o-h,t=e-e/6;d=Math.min(d,t),l=e-d,r=Math.min(r,i)}return{a:l,b:d,c:h,d:c,p:r,arcLength:o,radius:e,ab:l+d,bc:d+h,abc:l+d+h}}(n,s,o,.5*Math.min(e,t))));return[["M",e-l.p+c,h],...n(s,a,l.radius,[l.a,0,l.ab,0,l.abc,l.d],l.arcLength,[1,1],[l.d,l.c,l.d,l.bc,l.d,l.abc],[l.p,0]),["L",e+c,t-u.p+h],...n(s,a,u.radius,[0,u.a,0,u.ab,-u.d,u.abc],u.arcLength,[-1,1],[-u.c,u.d,-u.bc,u.d,-u.abc,u.d],[0,u.p]),["L",p.p+c,t+h],...n(s,a,p.radius,[-p.a,0,-p.ab,0,-p.abc,-p.d],p.arcLength,[-1,-1],[-p.d,-p.c,-p.d,-p.bc,-p.d,-p.abc],[-p.p,0]),["L",c,d.p+h],...n(s,a,d.radius,[0,-d.a,0,-d.ab,d.d,-d.abc],d.arcLength,[1,-1],[d.c,-d.d,d.bc,-d.d,d.abc,-d.d],[0,-d.p]),["Z"]]}function r({width:e=0,height:t=0,radius:n=0,offset:r=0,smoothing:s=1,type:o=i,precision:a=3,isArray:h=!1}){if(!e||!t)return h?[]:"";const c=Array.isArray(r)?r:[r,r,r,r],[d,l,u,p]=c,g=e-p-l,f=t-d-u,m=.5*Math.min(g,f),b=(Array.isArray(n)?n:[n,n,n,n]).map(((e,t)=>Math.max(0,Math.min(e-c[t],m))));let w;return w=o?o({width:g,height:f,radii:b,offsets:c,smoothing:s}):[[]],w=w.filter((e=>e[0])).map((([e,...t])=>{const n=t.map((e=>Number.isFinite(e)?Number(e.toFixed(a)):e)),i=[e,h?n:n.join(" ")];return h?i:i.join("")})),h?w:w.join("")}e.FigmaSquircle=function(e){return i({...e,preserveSmoothing:!1,sweepFlag:1})},e.Flat=function({width:e,height:t,radii:n,offsets:i}){const[r,,,s]=i,[o,a,h,c]=n;return[["M",s+o,r],["L",e-a+s,r],["L",e+s,r+a],["L",e+s,t-h+r],["L",e-h+s,t+r],["L",s+c,t+r],["L",s,t-c+r],["L",s,r+o],["Z"]]},e.Inset=function({width:e,height:t,radii:n,offsets:i}){const[r,,,s]=i,[o,a,h,c]=n;return[["M",s+c,r],["L",e-a+s,r],["L",e-a+s,r+a],["L",e+s,r+a],["L",e+s,t-h+r],["L",e-h+s,t-h+r],["L",e-h+s,t+r],["L",s+c,t+r],["L",s+c,t-c+r],["L",s,t-c+r],["L",s,r+o],["L",s+o,r+o],["L",s+o,r],["Z"]]},e.Round=function(e){return i({...e,smoothing:0,preserveSmoothing:!1,sweepFlag:1})},e.RoundInverse=function(e){return i({...e,smoothing:0,preserveSmoothing:!1,sweepFlag:0})},e.Squircle=i,e.addCorners=function(e,n){t.setCornerOptions(e,n);const i=n=>{const i=t.getDrawOptions(e)??{};if(!i.width||!i.height){const t=e.getBoundingClientRect();i.width=t.width,i.height=t.height}const s={...i,...n};s.isRounded&&(s.width=s.width?Math.round(s.width):void 0,s.height=s.height?Math.round(s.height):void 0),e.style.clipPath=i.clip?`path('${r(s)}')`:"",(i.background||i.border)&&(e.style.backgroundImage=function(e){const{border:t=[],offset:n=0,strokeDrawType:i=0,background:s,clip:o,clipID:a,width:h,height:c}=e,d=[],l=Array.isArray(t?.[0])?t:[t],u=Array.isArray(n)?n:[n,n,n,n],p=o?null:r(e);if(l?.length){let t=0;const a=[];for(let s=0;s<l.length;s++){const[o,h]=l[s],c=0===i?2*(t+o):o;o&&(a.push(`<path d="${r({...e,offset:0===i?n:u.map((e=>e+t+.5*o))})}" fill="none" stroke="${h}" stroke-width="${c}" />`),t+=o)}s&&(o?d.push(`<rect width="${h}" height="${c}" fill="${s}" />`):d.push(`<path d="${p}" fill="${s}" />`)),d.push(...a.reverse())}return d.length?((e,t,n="c")=>{return`url('data:image/svg+xml,${(e=>encodeURIComponent(e).replace(/%20/g," ").replace(/%3D/g,"=").replace(/%3A/g,":").replace(/%2F/g,"/").replace(/%2C/g,",").replace(/%3B/g,";"))((i=(t?[`<defs><clipPath id="${n}"><path d="${t}" /></clipPath></defs>`,`<g clip-path="url(#${n})">${e.join("")}</g>`]:e).join(""),`<svg xmlns="http://www.w3.org/2000/svg">${i}</svg>`))}')`;var i})(d,p,a):"none"}(s))};return i(),t.addElement(e,n,i)},e.createPath=r,e.draw=function(e,n){t.draw(e,n)},e.unobserve=function(e){t.unobserve(e)},Object.defineProperty(e,"__esModule",{value:!0})}));
