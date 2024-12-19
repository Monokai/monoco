var e=new class{elements;observer;constructor(){this.elements=null,this.observer=null}onElementResize(e){for(const t of e){const e=t.target.getBoundingClientRect(),n=this.elements?.get(t.target);if(!n)continue;const{previousW:r,previousH:i,draw:s,onResize:o}=n;r===e.width&&i===e.height||(s?.({width:e.width,height:e.height}),o?.(e,t.target),n.previousW=e.width,n.previousH=e.height)}}getDrawOptions(e){return this.elements?.get(e)?.cornerOptions??null}setCornerOptions(e,t){const n=this.elements?.get(e);n&&(n.cornerOptions=t,this.elements?.set(e,n))}addElement(e,t,n){this.elements||(this.elements=new Map),this.observer||(this.observer=new ResizeObserver((e=>this.onElementResize(e)))),this.unobserve(e);const{observe:r=!0,onResize:i}=t;if(r){this.observer.observe(e);const r=null,s=null;this.elements.set(e,{draw:n,cornerOptions:t,onResize:i,previousW:r,previousH:s,element:e})}return n}draw(e,t){e?(t&&this.setCornerOptions(e,t),this.elements?.get(e)?.draw?.()):this.elements?.forEach((e=>e.draw?.()))}unobserve(e){const t=t=>{this.observer?.unobserve(e),this.elements?.delete(e)};e?t():this.elements?.keys().forEach((e=>t()))}};function t(e,t,n,r,i,s,o,a){return n?[e?["c",...r]:[],i?["a",n,n,0,0,t,...s.map((e=>e*i))]:[],e?["c",...o]:[]]:[["l",...a]]}function n({width:e,height:n,radii:r,offsets:i,smoothing:s=1,preserveSmoothing:o=!0,sweepFlag:a=1}){const[h,,,c]=i,[d,l,u,g]=r.map((t=>function(e,t,n,r){let i=(1+t)*e;n||(t=Math.min(t,r/e-1),i=Math.min(i,r));const s=.5*Math.PI*(1-t),o=Math.sin(s/2)*e*2**.5,a=.25*Math.PI*t,h=e*Math.tan(.25*(.5*Math.PI-s))*Math.cos(a),c=h*Math.tan(a);let d=(i-o-h-c)/3,l=2*d;if(n&&i>r){const e=r-c-o-h,t=e-e/6;d=Math.min(d,t),l=e-d,i=Math.min(i,r)}return{a:l,b:d,c:h,d:c,p:i,arcLength:o,radius:e,ab:l+d,bc:d+h,abc:l+d+h}}(t,s,o,.5*Math.min(e,n))));return[["M",e-l.p+c,h],...t(s,a,l.radius,[l.a,0,l.ab,0,l.abc,l.d],l.arcLength,[1,1],[l.d,l.c,l.d,l.bc,l.d,l.abc],[l.p,0]),["L",e+c,n-u.p+h],...t(s,a,u.radius,[0,u.a,0,u.ab,-u.d,u.abc],u.arcLength,[-1,1],[-u.c,u.d,-u.bc,u.d,-u.abc,u.d],[0,u.p]),["L",g.p+c,n+h],...t(s,a,g.radius,[-g.a,0,-g.ab,0,-g.abc,-g.d],g.arcLength,[-1,-1],[-g.d,-g.c,-g.d,-g.bc,-g.d,-g.abc],[-g.p,0]),["L",c,d.p+h],...t(s,a,d.radius,[0,-d.a,0,-d.ab,d.d,-d.abc],d.arcLength,[1,-1],[d.c,-d.d,d.bc,-d.d,d.abc,-d.d],[0,-d.p]),["Z"]]}function r(e){return n({...e,preserveSmoothing:!1,sweepFlag:1})}function i({width:e,height:t,radii:n,offsets:r}){const[i,,,s]=r,[o,a,h,c]=n;return[["M",s+o,i],["L",e-a+s,i],["L",e+s,i+a],["L",e+s,t-h+i],["L",e-h+s,t+i],["L",s+c,t+i],["L",s,t-c+i],["L",s,i+o],["Z"]]}function s({width:e,height:t,radii:n,offsets:r}){const[i,,,s]=r,[o,a,h,c]=n;return[["M",s+c,i],["L",e-a+s,i],["L",e-a+s,i+a],["L",e+s,i+a],["L",e+s,t-h+i],["L",e-h+s,t-h+i],["L",e-h+s,t+i],["L",s+c,t+i],["L",s+c,t-c+i],["L",s,t-c+i],["L",s,i+o],["L",s+o,i+o],["L",s+o,i],["Z"]]}function o(e){return n({...e,smoothing:0,preserveSmoothing:!1,sweepFlag:1})}function a(e){return n({...e,smoothing:0,preserveSmoothing:!1,sweepFlag:0})}function h({width:e=0,height:t=0,borderRadius:r=0,offset:i=0,smoothing:s=1,cornerType:o=n,precision:a=3,isArray:h=!1}){if(!e||!t)return h?[]:"";const c=Array.isArray(i)?i:[i,i,i,i],[d,l,u,g]=c,p=e-g-l,m=t-d-u,f=.5*Math.min(p,m),b=(Array.isArray(r)?r:[r,r,r,r]).map(((e,t)=>Math.max(0,Math.min(e-c[t],f))));let w;return w=o?o({width:p,height:m,radii:b,offsets:c,smoothing:s}):[[]],w=w.filter((e=>e[0])).map((([e,...t])=>{const n=t.map((e=>Number.isFinite(e)?Number(e.toFixed(a)):e)),r=[e,h?n:n.join(" ")];return h?r:r.join("")})),h?w:w.join("")}function c(t,n){e.setCornerOptions(t,n);const r=n=>{const r=e.getDrawOptions(t)??{};if(!r.width||!r.height){const e=t.getBoundingClientRect();r.width=e.width,r.height=e.height}const i={...r,...n};i.isRounded&&(i.width=i.width?Math.round(i.width):void 0,i.height=i.height?Math.round(i.height):void 0),t.style.clipPath=r.clip?`path('${h(i)}')`:"",(r.background||r.border)&&(t.style.backgroundImage=function(e){const{border:t=[],offset:n=0,strokeDrawType:r=0,background:i,clip:s,clipID:o,width:a,height:c}=e,d=[],l=Array.isArray(t?.[0])?t:[t],u=Array.isArray(n)?n:[n,n,n,n],g=s?null:h(e);if(l?.length){let t=0;const o=[];for(let i=0;i<l.length;i++){const[s,a]=l[i],c=0===r?2*(t+s):s;s&&(o.push(`<path d="${h({...e,offset:0===r?n:u.map((e=>e+t+.5*s))})}" fill="none" stroke="${a}" stroke-width="${c}" />`),t+=s)}i&&(s?d.push(`<rect width="${a}" height="${c}" fill="${i}" />`):d.push(`<path d="${g}" fill="${i}" />`)),d.push(...o.reverse())}return d.length?((e,t,n="c")=>{return`url('data:image/svg+xml,${(e=>encodeURIComponent(e).replace(/%20/g," ").replace(/%3D/g,"=").replace(/%3A/g,":").replace(/%2F/g,"/").replace(/%2C/g,",").replace(/%3B/g,";"))((r=(t?[`<defs><clipPath id="${n}"><path d="${t}" /></clipPath></defs>`,`<g clip-path="url(#${n})">${e.join("")}</g>`]:e).join(""),`<svg xmlns="http://www.w3.org/2000/svg">${r}</svg>`))}')`;var r})(d,g,o):"none"}(i))};return r(),e.addElement(t,n,r)}function d(t,n){e.draw(t,n)}function l(t){e.unobserve(t)}export{r as FigmaSquircle,i as Flat,s as Inset,o as Round,a as RoundInverse,n as Squircle,c as addCorners,h as createPath,d as draw,l as unobserve};
