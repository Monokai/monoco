function e(e,t,i,r,n,s){return e?[["c",...t],i?["a",e,e,0,0,1,...r.map((e=>e*i))]:[],["c",...n]]:[["l",...s]]}var t,i=new class{elements;observer;constructor(){this.elements=null,this.observer=null}onElementResize(e){for(const t of e){const e=t.target.getBoundingClientRect(),i=this.elements?.get(t.target);if(!i)continue;const{previousW:r,previousH:n,draw:s,onResize:a}=i;r===e.width&&n===e.height||(s?.({width:e.width,height:e.height}),a?.(e,t.target),i.previousW=e.width,i.previousH=e.height)}}addElement(e,t,i){this.elements||(this.elements=new Map),this.observer||(this.observer=new ResizeObserver((e=>this.onElementResize(e)))),this.unobserve(e);const{observe:r=!0,onResize:n}=t;if(r){this.observer.observe(e);const t=null,r=null;this.elements.set(e,{draw:i,onResize:n,previousW:t,previousH:r,element:e})}return i}draw(e){e?this.elements?.get(e)?.draw?.():this.elements?.forEach((e=>e.draw?.()))}unobserve(e){const t=t=>{this.observer?.unobserve(e),this.elements?.delete(e)};e?t():this.elements?.keys().forEach((e=>t()))}};function r({width:i=0,height:r=0,smoothing:n=1,radius:s=0,offset:a=0,type:h=t.Squircle,precision:o=4,isArray:c=!1}){if(!i||!r)return c?[]:"";const d=h===t.Squircle,l=Array.isArray(a)?a:[a,a,a,a],[u,g,p,f]=l,m=i-f-g,b=r-u-p,w=.5*Math.min(m,b),v=(Array.isArray(s)?s:[s,s,s,s]).map(((e,t)=>Math.max(0,Math.min(e-l[t],w))));let M;switch(h){case t.Round:M=M=function({width:e,height:t,radii:i,offsets:r}){const[n,,,s]=r,[a,h,o,c]=i;return[["M",s+c,n],["L",e-h+s,n],["A",h,h,0,0,1,e+s,n+h],["L",e+s,t-o+n],["A",o,o,0,0,1,e-o+s,t+n],["L",s+c,t+n],["A",c,c,0,0,1,s,t-c+n],["L",s,n+a],["A",a,a,0,0,1,s+a,n],["Z"]]}({width:m,height:b,radii:v,offsets:l});break;case t.Flat:M=M=function({width:e,height:t,radii:i,offsets:r}){const[n,,,s]=r,[a,h,o,c]=i;return[["M",s+a,n],["L",e-h+s,n],["L",e+s,n+h],["L",e+s,t-o+n],["L",e-o+s,t+n],["L",s+c,t+n],["L",s,t-c+n],["L",s,n+a],["Z"]]}({width:m,height:b,radii:v,offsets:l});break;case t.Squircle:case t.FigmaSquircle:default:M=function({width:t,height:i,smoothing:r,radii:n,offsets:s,preserveSmoothing:a}){const[h,,,o]=s,[c,d,l,u]=n.map((e=>function(e,t,i,r){let n=(1+t)*e;i||(t=Math.min(t,r/e-1),n=Math.min(n,r));const s=.5*Math.PI*(1-t),a=Math.sin(s/2)*e*2**.5,h=.25*Math.PI*t,o=e*Math.tan(.25*(.5*Math.PI-s))*Math.cos(h),c=o*Math.tan(h);let d=(n-a-o-c)/3,l=2*d;if(i&&n>r){const e=r-c-a-o,t=e-e/6;d=Math.min(d,t),l=e-d,n=Math.min(n,r)}return{a:l,b:d,c:o,d:c,p:n,arcLength:a,radius:e,ab:l+d,bc:d+o,abc:l+d+o}}(e,r,a,.5*Math.min(t,i))));return[["M",t-d.p+o,h],...e(d.radius,[d.a,0,d.ab,0,d.abc,d.d],d.arcLength,[1,1],[d.d,d.c,d.d,d.bc,d.d,d.abc],[d.p,0]),["L",t+o,i-l.p+h],...e(l.radius,[0,l.a,0,l.ab,-l.d,l.abc],l.arcLength,[-1,1],[-l.c,l.d,-l.bc,l.d,-l.abc,l.d],[0,l.p]),["L",u.p+o,i+h],...e(u.radius,[-u.a,0,-u.ab,0,-u.abc,-u.d],u.arcLength,[-1,-1],[-u.d,-u.c,-u.d,-u.bc,-u.d,-u.abc],[-u.p,0]),["L",o,c.p+h],...e(c.radius,[0,-c.a,0,-c.ab,c.d,-c.abc],c.arcLength,[1,-1],[c.c,-c.d,c.bc,-c.d,c.abc,-c.d],[0,-c.p]),["Z"]]}({width:m,height:b,smoothing:n,radii:v,offsets:l,preserveSmoothing:d})}return M=M.filter((e=>e[0])).map((([e,...t])=>{const i=t.map((e=>Number.isFinite(e)?Number(e.toFixed(o)):e)),r=[e,c?i:i.join(" ")];return c?r:r.join("")})),c?M:M.join("")}function n(e,t){const n=i=>{if(!t.width||!t.height){const i=e.getBoundingClientRect();t.width=i.width,t.height=i.height}const n={...t,...i};n.isRounded&&(n.width=n.width?Math.round(n.width):void 0,n.height=n.height?Math.round(n.height):void 0),t.clip&&(e.style.clipPath=`path('${r(n)}')`),(t.color||t.border)&&(e.style.backgroundImage=function(e){const{border:t=[],offset:i=0,strokeDrawType:n=0,color:s,clip:a,clipID:h,width:o,height:c}=e,d=[],l=Array.isArray(t?.[0])?t:[t],u=Array.isArray(i)?i:[i,i,i,i],g=a?null:r(e);if(l?.length){let t=0;const h=[];for(let s=0;s<l.length;s++){const[a,o]=l[s],c=0===n?2*(t+a):a;h.push(`<path d="${r({...e,offset:0===n?i:u.map((e=>e+t+.5*a))})}" fill="none" stroke="${o}" stroke-width="${c}" />`),t+=a}s&&(a?d.push(`<rect width="${o}" height="${c}" fill="${s}" />`):d.push(`<path d="${g}" fill="${s}" />`)),d.push(...h.reverse())}return d.length?function(e,t,i="c"){return`url('data:image/svg+xml,${function(e){return encodeURIComponent(e).replace(/%20/g," ").replace(/%3D/g,"=").replace(/%3A/g,":").replace(/%2F/g,"/").replace(/%2C/g,",").replace(/%3B/g,";")}((r=(t?[`<defs><clipPath id="${i}"><path d="${t}" /></clipPath></defs>`,`<g clip-path="url(#${i})">${e.join("")}</g>`]:e).join(""),`<svg xmlns="http://www.w3.org/2000/svg">${r}</svg>`))}')`;var r}(d,g,h):"none"}(n))};return n(),i.addElement(e,t,n)}function s(e){i.draw(e)}function a(e){i.unobserve(e)}!function(e){e.Squircle="squircle",e.FigmaSquircle="figma-squircle",e.Flat="flat",e.Round="round"}(t||(t={}));export{t as CornerType,n as addCorners,r as createPath,s as draw,a as unobserve};
