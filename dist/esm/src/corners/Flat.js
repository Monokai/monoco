function L(L){var t=L.width,i=L.height,r=L.radii,e=L.offsets,f=e[0],h=e[3],n=r[0],o=r[1],a=r[2],d=r[3];return[["M",h+n,f],["L",t-o+h,f],["L",t+h,f+o],["L",t+h,i-a+f],["L",t-a+h,i+f],["L",h+d,i+f],["L",h,i-d+f],["L",h,f+n],["Z"]]}export{L as createPath};
