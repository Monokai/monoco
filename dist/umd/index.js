!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).monoco={})}(this,(function(e){"use strict";var t=function(){return t=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},t.apply(this,arguments)};function r(e,t,r){if(r||2===arguments.length)for(var n,i=0,a=t.length;i<a;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return e.concat(n||Array.prototype.slice.call(t))}function n(e,t,n,i,a,o){return e?r(r([r(["c"],t,!0)],[n?r(["a",e,e,0,0,1],i.map((function(e){return e*n})),!0):[]],!1),[r(["c"],a,!0)],!1):[r(["l"],o,!0)]}"function"==typeof SuppressedError&&SuppressedError;var i,a=new(function(){function e(){this.elements=new Map,this.elements=new Map}return e.prototype.addElement=function(e,t,r){this.untrack(e);var n,i=t.track,a=void 0===i||i,o=t.observe,c=void 0===o||o,d=t.draw,u=void 0===d||d,h=t.onResize;if(c){var s=null,l=null;(n=new ResizeObserver((function(e){for(var t=0,n=e;t<n.length;t++){var i=n[t],a=i.target.getBoundingClientRect();s===a.width&&l===a.height||(u&&r({width:a.width,height:a.height}),null==h||h(a,i.target),s=a.width,l=a.height)}}))).observe(e)}return a&&this.elements.set(e,{draw:r,element:e,observer:n}),r},e.prototype.draw=function(e){var t,r;e?null===(r=null===(t=this.elements.get(e))||void 0===t?void 0:t.draw)||void 0===r||r.call(t):this.elements.forEach((function(e){var t;return null===(t=e.draw)||void 0===t?void 0:t.call(e)}))},e.prototype.untrack=function(e){var t=this,r=function(r){var n=t.elements.get(r);if(n){var i=n.observer;null==i||i.disconnect(),t.elements.delete(e)}};e?r(e):this.elements.forEach((function(e){var t=e[1];return r(t)}))},e}());function o(t){var i=t.width,a=void 0===i?0:i,o=t.height,c=void 0===o?0:o,d=t.smoothing,u=void 0===d?1:d,h=t.radius,s=void 0===h?0:h,l=t.offset,f=void 0===l?0:l,p=t.type,v=void 0===p?e.CornerType.Squircle:p,g=t.precision,m=void 0===g?4:g,y=t.isArray,b=void 0!==y&&y;if(!a||!c)return b?[]:"";var w,M=v===e.CornerType.Squircle,L=Array.isArray(f)?f:[f,f,f,f],A=L[0],C=L[1],T=L[2],k=a-L[3]-C,S=c-A-T,j=.5*Math.min(k,S),P=(Array.isArray(s)?s:[s,s,s,s]).map((function(e,t){return Math.max(0,Math.min(e-L[t],j))}));switch(v){case e.CornerType.Round:w=w=function(e){var t=e.width,r=e.height,n=e.radii,i=e.offsets,a=i[0],o=i[3],c=n[0],d=n[1],u=n[2],h=n[3];return[["M",o+h,a],["L",t-d+o,a],["A",d,d,0,0,1,t+o,a+d],["L",t+o,r-u+a],["A",u,u,0,0,1,t-u+o,r+a],["L",o+h,r+a],["A",h,h,0,0,1,o,r-h+a],["L",o,a+c],["A",c,c,0,0,1,o+c,a],["Z"]]}({width:k,height:S,radii:P,offsets:L});break;case e.CornerType.Flat:w=w=function(e){var t=e.width,r=e.height,n=e.radii,i=e.offsets,a=i[0],o=i[3],c=n[0],d=n[1],u=n[2],h=n[3];return[["M",o+c,a],["L",t-d+o,a],["L",t+o,a+d],["L",t+o,r-u+a],["L",t-u+o,r+a],["L",o+h,r+a],["L",o,r-h+a],["L",o,a+c],["Z"]]}({width:k,height:S,radii:P,offsets:L});break;case e.CornerType.Squircle:case e.CornerType.FigmaSquircle:default:w=function(e){var t=e.width,i=e.height,a=e.smoothing,o=e.radii,c=e.offsets,d=e.preserveSmoothing,u=c[0],h=c[3],s=o.map((function(e){return function(e,t,r,n){var i=(1+t)*e;r||(t=Math.min(t,n/e-1),i=Math.min(i,n));var a=.5*Math.PI*(1-t),o=Math.sin(a/2)*e*Math.pow(2,.5),c=.25*Math.PI*t,d=e*Math.tan(.25*(.5*Math.PI-a))*Math.cos(c),u=d*Math.tan(c),h=(i-o-d-u)/3,s=2*h;if(r&&i>n){var l=n-u-o-d,f=l-l/6;s=l-(h=Math.min(h,f)),i=Math.min(i,n)}return{a:s,b:h,c:d,d:u,p:i,arcLength:o,radius:e,ab:s+h,bc:h+d,abc:s+h+d}}(e,a,d,.5*Math.min(t,i))})),l=s[0],f=s[1],p=s[2],v=s[3];return r(r(r(r(r(r(r(r([["M",t-f.p+h,u]],n(f.radius,[f.a,0,f.ab,0,f.abc,f.d],f.arcLength,[1,1],[f.d,f.c,f.d,f.bc,f.d,f.abc],[f.p,0]),!0),[["L",t+h,i-p.p+u]],!1),n(p.radius,[0,p.a,0,p.ab,-p.d,p.abc],p.arcLength,[-1,1],[-p.c,p.d,-p.bc,p.d,-p.abc,p.d],[0,p.p]),!0),[["L",v.p+h,i+u]],!1),n(v.radius,[-v.a,0,-v.ab,0,-v.abc,-v.d],v.arcLength,[-1,-1],[-v.d,-v.c,-v.d,-v.bc,-v.d,-v.abc],[-v.p,0]),!0),[["L",h,l.p+u]],!1),n(l.radius,[0,-l.a,0,-l.ab,l.d,-l.abc],l.arcLength,[1,-1],[l.c,-l.d,l.bc,-l.d,l.abc,-l.d],[0,-l.p]),!0),[["Z"]],!1)}({width:k,height:S,smoothing:u,radii:P,offsets:L,preserveSmoothing:M})}return w=w.filter((function(e){return e[0]})).map((function(e){var t=e[0],r=e.slice(1).map((function(e){return Number.isFinite(e)?Number(e.toFixed(m)):e})),n=[t,b?r:r.join(" ")];return b?n:n.join("")})),b?w:w.join("")}e.CornerType=void 0,(i=e.CornerType||(e.CornerType={})).Squircle="squircle",i.FigmaSquircle="figma-squircle",i.Round="round",i.Flat="flat",e.addCorners=function(e,r){var n=function(n){if(!r.width||!r.height){var i=e.getBoundingClientRect();r.width=i.width,r.height=i.height}var a=t(t({},r),n);a.isRounded&&(a.width=Math.round(a.width),a.height=Math.round(a.height)),r.clip?e.style.clipPath="path('".concat(o(a),"')"):(r.color||r.border)&&(e.style.backgroundImage=function(e){var r=e.border,n=void 0===r?[]:r,i=e.offset,a=void 0===i?0:i,c=e.strokeDrawType,d=void 0===c?0:c,u=e.color,h=e.clipID,s=[],l=Array.isArray(null==n?void 0:n[0])?n:[n],f=Array.isArray(a)?a:[a,a,a,a],p=o(e);if(null==l?void 0:l.length){for(var v=0,g=[],m=function(r){var n=l[r],i=n[0],c=n[1],u=0===d?2*(v+i):i;g.push('<path d="'.concat(o(t(t({},e),{offset:0===d?a:f.map((function(e){return e+v+.5*i}))})),'" fill="none" stroke="').concat(c,'" stroke-width="').concat(u,'" />')),v+=i},y=0;y<l.length;y++)m(y);u&&s.push('<path d="'.concat(p,'" fill="').concat(u,'" />')),s.push.apply(s,g.reverse())}return s.length?function(e,t,r){return void 0===r&&(r="c"),"url('data:image/svg+xml,".concat(function(e){return encodeURIComponent(e).replace(/%20/g," ").replace(/%3D/g,"=").replace(/%3A/g,":").replace(/%2F/g,"/").replace(/%2C/g,",").replace(/%3B/g,";")}((n=['<defs><clipPath id="'.concat(r,'"><path d="').concat(t,'" /></clipPath></defs>'),'<g clip-path="url(#'.concat(r,')">').concat(e.join(""),"</g>")].join(""),'<svg xmlns="http://www.w3.org/2000/svg">'.concat(n,"</svg>"))),"')");var n}(s,p,h):"none"}(a))};return n(),a.addElement(e,r,n)},e.createPath=o,e.draw=function(e){a.draw(e)},e.untrack=function(e){a.untrack(e)},Object.defineProperty(e,"__esModule",{value:!0})}));
