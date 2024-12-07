"use strict";function e(e,t,r,s,n,i){return e?[["c",...t],r?["a",e,e,0,0,1,...s.map((e=>e*r))]:[],["c",...n]]:[["l",...i]]}Object.defineProperty(exports,"__esModule",{value:!0});var t,r=new class{elements;observer;constructor(){this.elements=null,this.observer=null}onElementResize(e){for(const t of e){const e=t.target.getBoundingClientRect(),r=this.elements?.get(t.target);if(!r)continue;const{previousW:s,previousH:n,draw:i,onResize:o}=r;s===e.width&&n===e.height||(i?.({width:e.width,height:e.height}),o?.(e,t.target),r.previousW=e.width,r.previousH=e.height)}}getDrawOptions(e){return this.elements?.get(e)?.cornerOptions??null}setCornerOptions(e,t){const r=this.elements?.get(e);r&&(r.cornerOptions=t,this.elements?.set(e,r))}addElement(e,t,r){this.elements||(this.elements=new Map),this.observer||(this.observer=new ResizeObserver((e=>this.onElementResize(e)))),this.unobserve(e);const{observe:s=!0,onResize:n}=t;if(s){this.observer.observe(e);const s=null,i=null;this.elements.set(e,{draw:r,cornerOptions:t,onResize:n,previousW:s,previousH:i,element:e})}return r}draw(e,t){e?(t&&this.setCornerOptions(e,t),this.elements?.get(e)?.draw?.()):this.elements?.forEach((e=>e.draw?.()))}unobserve(e){const t=t=>{this.observer?.unobserve(e),this.elements?.delete(e)};e?t():this.elements?.keys().forEach((e=>t()))}};function s({width:t=0,height:r=0,smoothing:s=1,radius:n=0,offset:i=0,type:o=exports.CornerType.Squircle,precision:a=3,isArray:h=!1}){if(!t||!r)return h?[]:"";const c=o===exports.CornerType.Squircle,d=o===exports.CornerType.RoundInverse?0:1,p=Array.isArray(i)?i:[i,i,i,i],[l,u,g,f]=p,m=t-f-u,b=r-l-g,w=.5*Math.min(m,b),v=(Array.isArray(n)?n:[n,n,n,n]).map(((e,t)=>Math.max(0,Math.min(e-p[t],w))));let L;switch(o){case exports.CornerType.Round:case exports.CornerType.RoundInverse:L=L=function({width:e,height:t,radii:r,offsets:s,sweepFlag:n}){const[i,,,o]=s,[a,h,c,d]=r;return[["M",o+d,i],["L",e-h+o,i],["A",h,h,0,0,n,e+o,i+h],["L",e+o,t-c+i],["A",c,c,0,0,n,e-c+o,t+i],["L",o+d,t+i],["A",d,d,0,0,n,o,t-d+i],["L",o,i+a],["A",a,a,0,0,n,o+a,i],["Z"]]}({width:m,height:b,radii:v,offsets:p,sweepFlag:d});break;case exports.CornerType.Flat:L=L=function({width:e,height:t,radii:r,offsets:s}){const[n,,,i]=s,[o,a,h,c]=r;return[["M",i+o,n],["L",e-a+i,n],["L",e+i,n+a],["L",e+i,t-h+n],["L",e-h+i,t+n],["L",i+c,t+n],["L",i,t-c+n],["L",i,n+o],["Z"]]}({width:m,height:b,radii:v,offsets:p});break;case exports.CornerType.Inset:L=L=function({width:e,height:t,radii:r,offsets:s}){const[n,,,i]=s,[o,a,h,c]=r;return[["M",i+c,n],["L",e-a+i,n],["L",e-a+i,n+a],["L",e+i,n+a],["L",e+i,t-h+n],["L",e-h+i,t-h+n],["L",e-h+i,t+n],["L",i+c,t+n],["L",i+c,t-c+n],["L",i,t-c+n],["L",i,n+o],["L",i+o,n+o],["L",i+o,n],["Z"]]}({width:m,height:b,radii:v,offsets:p});break;case exports.CornerType.Squircle:case exports.CornerType.FigmaSquircle:default:L=function({width:t,height:r,smoothing:s,radii:n,offsets:i,preserveSmoothing:o}){const[a,,,h]=i,[c,d,p,l]=n.map((e=>function(e,t,r,s){let n=(1+t)*e;r||(t=Math.min(t,s/e-1),n=Math.min(n,s));const i=.5*Math.PI*(1-t),o=Math.sin(i/2)*e*2**.5,a=.25*Math.PI*t,h=e*Math.tan(.25*(.5*Math.PI-i))*Math.cos(a),c=h*Math.tan(a);let d=(n-o-h-c)/3,p=2*d;if(r&&n>s){const e=s-c-o-h,t=e-e/6;d=Math.min(d,t),p=e-d,n=Math.min(n,s)}return{a:p,b:d,c:h,d:c,p:n,arcLength:o,radius:e,ab:p+d,bc:d+h,abc:p+d+h}}(e,s,o,.5*Math.min(t,r))));return[["M",t-d.p+h,a],...e(d.radius,[d.a,0,d.ab,0,d.abc,d.d],d.arcLength,[1,1],[d.d,d.c,d.d,d.bc,d.d,d.abc],[d.p,0]),["L",t+h,r-p.p+a],...e(p.radius,[0,p.a,0,p.ab,-p.d,p.abc],p.arcLength,[-1,1],[-p.c,p.d,-p.bc,p.d,-p.abc,p.d],[0,p.p]),["L",l.p+h,r+a],...e(l.radius,[-l.a,0,-l.ab,0,-l.abc,-l.d],l.arcLength,[-1,-1],[-l.d,-l.c,-l.d,-l.bc,-l.d,-l.abc],[-l.p,0]),["L",h,c.p+a],...e(c.radius,[0,-c.a,0,-c.ab,c.d,-c.abc],c.arcLength,[1,-1],[c.c,-c.d,c.bc,-c.d,c.abc,-c.d],[0,-c.p]),["Z"]]}({width:m,height:b,smoothing:s,radii:v,offsets:p,preserveSmoothing:c})}return L=L.filter((e=>e[0])).map((([e,...t])=>{const r=t.map((e=>Number.isFinite(e)?Number(e.toFixed(a)):e)),s=[e,h?r:r.join(" ")];return h?s:s.join("")})),h?L:L.join("")}exports.CornerType=void 0,(t=exports.CornerType||(exports.CornerType={})).Squircle="squircle",t.FigmaSquircle="figma-squircle",t.Flat="flat",t.Inset="inset",t.Round="round",t.RoundInverse="round-inverse",exports.addCorners=function(e,t){r.setCornerOptions(e,t);const n=t=>{const n=r.getDrawOptions(e)??{};if(!n.width||!n.height){const t=e.getBoundingClientRect();n.width=t.width,n.height=t.height}const i={...n,...t};i.isRounded&&(i.width=i.width?Math.round(i.width):void 0,i.height=i.height?Math.round(i.height):void 0),n.clip&&(e.style.clipPath=`path('${s(i)}')`),(n.background||n.border)&&(e.style.backgroundImage=function(e){const{border:t=[],offset:r=0,strokeDrawType:n=0,background:i,clip:o,clipID:a,width:h,height:c}=e,d=[],p=Array.isArray(t?.[0])?t:[t],l=Array.isArray(r)?r:[r,r,r,r],u=o?null:s(e);if(p?.length){let t=0;const a=[];for(let i=0;i<p.length;i++){const[o,h]=p[i],c=0===n?2*(t+o):o;a.push(`<path d="${s({...e,offset:0===n?r:l.map((e=>e+t+.5*o))})}" fill="none" stroke="${h}" stroke-width="${c}" />`),t+=o}i&&(o?d.push(`<rect width="${h}" height="${c}" fill="${i}" />`):d.push(`<path d="${u}" fill="${i}" />`)),d.push(...a.reverse())}return d.length?((e,t,r="c")=>{return`url('data:image/svg+xml,${(e=>encodeURIComponent(e).replace(/%20/g," ").replace(/%3D/g,"=").replace(/%3A/g,":").replace(/%2F/g,"/").replace(/%2C/g,",").replace(/%3B/g,";"))((s=(t?[`<defs><clipPath id="${r}"><path d="${t}" /></clipPath></defs>`,`<g clip-path="url(#${r})">${e.join("")}</g>`]:e).join(""),`<svg xmlns="http://www.w3.org/2000/svg">${s}</svg>`))}')`;var s})(d,u,a):"none"}(i))};return n(),r.addElement(e,t,n)},exports.createPath=s,exports.draw=function(e,t){r.draw(e,t)},exports.unobserve=function(e){r.unobserve(e)};
