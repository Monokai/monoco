import{__assign as r}from"../node_modules/tslib/tslib.es6.js";import{createPath as i}from"./corners/Squircle.js";import{createPath as t}from"./corners/Flat.js";import{createPath as e}from"./corners/Round.js";import{createSVGDatURI as o}from"./utils/Svg.js";import n from"./utils/ElementManager.js";var a;function s(r){var o=r.width,n=void 0===o?0:o,s=r.height,c=void 0===s?0:s,u=r.smoothing,h=void 0===u?1:u,d=r.radius,l=void 0===d?0:d,f=r.offset,m=void 0===f?0:f,p=r.type,v=void 0===p?a.Squircle:p,g=r.precision,y=void 0===g?4:g,w=r.isArray,b=void 0!==w&&w;if(!n||!c)return b?[]:"";var j,q=v===a.Squircle,A=Array.isArray(m)?m:[m,m,m,m],S=A[0],k=A[1],F=A[2],M=n-A[3]-k,R=c-S-F,P=.5*Math.min(M,R),x=(Array.isArray(l)?l:[l,l,l,l]).map((function(r,i){return Math.max(0,Math.min(r-A[i],P))}));switch(v){case a.Round:j=j=e({width:M,height:R,radii:x,offsets:A});break;case a.Flat:j=j=t({width:M,height:R,radii:x,offsets:A});break;case a.Squircle:case a.FigmaSquircle:default:j=i({width:M,height:R,smoothing:h,radii:x,offsets:A,preserveSmoothing:q})}return j=j.filter((function(r){return r[0]})).map((function(r){var i=r[0],t=r.slice(1).map((function(r){return Number.isFinite(r)?Number(r.toFixed(y)):r})),e=[i,b?t:t.join(" ")];return b?e:e.join("")})),b?j:j.join("")}function c(i,t){var e=function(e){if(!t.width||!t.height){var n=i.getBoundingClientRect();t.width=n.width,t.height=n.height}var a=r(r({},t),e);a.isRounded&&(a.width=Math.round(a.width),a.height=Math.round(a.height)),t.clip?i.style.clipPath="path('".concat(s(a),"')"):(t.color||t.border)&&(i.style.backgroundImage=function(i){var t=i.border,e=void 0===t?[]:t,n=i.offset,a=void 0===n?0:n,c=i.strokeDrawType,u=void 0===c?0:c,h=i.color,d=i.clipID,l=[],f=Array.isArray(null==e?void 0:e[0])?e:[e],m=Array.isArray(a)?a:[a,a,a,a],p=s(i);if(null==f?void 0:f.length){for(var v=0,g=[],y=function(t){var e=f[t],o=e[0],n=e[1],c=0===u?2*(v+o):o;g.push('<path d="'.concat(s(r(r({},i),{offset:0===u?a:m.map((function(r){return r+v+.5*o}))})),'" fill="none" stroke="').concat(n,'" stroke-width="').concat(c,'" />')),v+=o},w=0;w<f.length;w++)y(w);h&&l.push('<path d="'.concat(p,'" fill="').concat(h,'" />')),l.push.apply(l,g.reverse())}return l.length?o(l,p,d):"none"}(a))};return e(),n.addElement(i,t,e)}function u(r){n.draw(r)}function h(r){n.untrack(r)}!function(r){r.Squircle="squircle",r.FigmaSquircle="figma-squircle",r.Round="round",r.Flat="flat"}(a||(a={}));export{a as CornerType,c as addCorners,s as createPath,u as draw,h as untrack};
