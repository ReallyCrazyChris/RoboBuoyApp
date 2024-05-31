import{B as G,v as be,ao as _e,ap as Ee,a5 as Se,G as J}from"./proj.6634b38d.js";import{bX as Pe,c6 as Ce,ap as r,b4 as Ge,bw as a,bz as o,ao as K,bx as c,by as N,b7 as y,bA as u,br as i,aQ as oe,be as Ae,an as Le,bR as Me,b9 as se,bO as Te,c5 as Be}from"./Circle.679b5c7b.js";import{T as f}from"./Translate.0255a094.js";import{l as Fe,o as De,e as Re,f as He,g as je}from"./index.8ff8d99e.js";const Ye={__name:"TransformLayer",setup(Ve){const Z=Fe();var le=new Pe({source:new Ce}),ce=[[10.932036344861501,49.124145352082735],[10.932036344861501,49.122665487481385],[10.933389630255192,49.122665487481385],[10.933389630255192,49.124145352082735],[10.932036344861501,49.124145352082735]],B=new r({geometry:new Ge([ce])});B.setStyle(new a({stroke:new o({color:"grey",width:.5,lineDash:[5,5]})}));const b=B.getGeometry().getExtent(),ie=G(b),de=be(b),A=_e(b),ge=Ee(b),d=Se(b);var _=new r({geometry:new K(de,1e-4),props:{handle:"scalehandle"}});_.setStyle(new a({fill:new c({color:"lightgrey"}),stroke:new o({color:"red",width:2,lineCap:"round"}),image:new N({color:"#BADA55",src:"icons/arrow_insert_fill1_48px.svg",scale:.45,rotateWithView:!0})}));var E=new r({geometry:new K(A,1e-4),props:{handle:"rotatehandle"}});E.setStyle(new a({fill:new c({color:"lightgrey"}),stroke:new o({color:"lightgreen",width:2,lineCap:"round"}),image:new N({color:"#BADA55",src:"icons/cycle_fill1_48px.svg",scale:.45,rotateWithView:!0})}));var L=new r({geometry:new y(d,1e-4),props:{handle:"centerofrotation"}});L.setStyle(new a({fill:new c({color:"lightgrey"}),stroke:new o({color:"rgb(223,255,1)",width:2,lineCap:"round"})}));var F=new r({geometry:new K(ie,1e-4),props:{handle:"draghandle"}});F.setStyle(new a({fill:new c({color:"lightgrey"}),stroke:new o({color:"white",width:2,lineCap:"round"}),image:new N({color:"#BADA55",src:"icons/drag_pan_fill1_48px.svg",scale:.45,rotateWithView:!0})}));function p(e=0,n=0){const t=(A[1]-d[1])/100,m=(ge[0]-d[0])/100,g=d[0]+m*e,w=d[1]+t*n;return[g,w]}var D=new r({geometry:new y(p(20,100),1e-4),props:{number:1,type:"mark",color:"green",name:"einstein"}});D.setStyle(new a({fill:new c({color:"rgb(223,255,1)"}),stroke:new o({color:"rgb(223,255,1)",width:2,lineCap:"round"}),text:new u({text:"1",font:"16px sans-serif",textAlign:"center",justify:"center"})}));var we=new i([D]);const R=new f({layers:[s],features:we});R.on("translatestart",e=>{}),R.on("translateend",e=>{console.log("mark1 moved")});var H=new r({geometry:new y(p(50,90),1e-4),props:{number:2,type:"mark",color:"green",name:"tesla"}});H.setStyle(new a({fill:new c({color:"rgb(223,255,1)"}),stroke:new o({color:"rgb(223,255,1)",width:2,lineCap:"round"}),text:new u({text:"2",font:"16px sans-serif",textAlign:"center",justify:"center"})}));var ue=new i([H]);const j=new f({layers:[s],features:ue});j.on("translatestart",e=>{}),j.on("translateend",e=>{console.log("mark2 moved")});var V=new r({geometry:new y(p(50,0),1e-4),props:{number:3,type:"mark",color:"green",name:"euler"}});V.setStyle(new a({fill:new c({color:"rgb(223,255,1)"}),stroke:new o({color:"rgb(223,255,1)",width:2,lineCap:"round"}),text:new u({text:"3",font:"16px sans-serif",textAlign:"center",justify:"center"})}));var me=new i([V]);const X=new f({layers:[s],features:me});X.on("translatestart",e=>{}),X.on("translateend",e=>{console.log("mark1 moved")});var U=new r({geometry:new y(p(40,5),1e-4),props:{number:4,type:"mark",name:"sinclair"}});U.setStyle(new a({fill:new c({color:"rgb(223,255,1)"}),stroke:new o({color:"rgb(223,255,1)",width:2,lineCap:"round"}),text:new u({text:"4",font:"16px sans-serif",textAlign:"center",justify:"center"})}));var ye=new i([U]);const I=new f({layers:[s],features:ye});I.on("translatestart",e=>{}),I.on("translateend",e=>{console.log("mark4 moved")});var S=new r({geometry:new y(p(20,30),1e-4),props:{number:5,type:"startpin",color:"green",name:"coco"}});S.setStyle(new a({fill:new c({color:"blue"}),stroke:new o({color:"blue",width:2,lineCap:"round"}),text:new u({text:"C",font:"16px sans-serif",textAlign:"center",justify:"center"})}));var fe=new i([S]);const O=new f({layers:[s],features:fe});O.on("translatestart",e=>{}),O.on("translateend",e=>{console.log("markStart moved")});var P=new r({geometry:new y(p(50,30),1e-4),props:{number:6,type:"startend",color:"green",name:"sisi"}});P.setStyle(new a({fill:new c({color:"orange"}),stroke:new o({color:"orange",width:2,lineCap:"round"}),text:new u({text:"P",font:"16px sans-serif",textAlign:"center",justify:"center"})}));var pe=new i([P]);const Y=new f({layers:[s],features:pe});Y.on("translatestart",e=>{}),Y.on("translateend",e=>{console.log("markPin moved")});function W(e){return e*Math.PI/180}function ee(e,n){var t=0;e=J(e,"EPSG:3857","EPSG:4326"),n=J(n,"EPSG:3857","EPSG:4326");const m=63710088e-1,g=W(e[1]),w=W(n[1]),x=(w-g)/2,k=W(n[0]-e[0])/2,ae=Math.sin(x)*Math.sin(x)+Math.sin(k)*Math.sin(k)*Math.cos(g)*Math.cos(w);return t=2*m*Math.atan2(Math.sqrt(ae),Math.sqrt(1-ae)),t}var te=new r({geometry:new oe([S.getGeometry().getCenter(),P.getGeometry().getCenter()],"XY"),props:{number:5,type:"startpin",color:"green",name:"coco"}});te.setStyle(new a({stroke:new o({color:"green",width:2,lineDash:[1,1]}),text:new u({text:""+Math.round(ee(S.getGeometry().getCenter(),P.getGeometry().getCenter())*1e5)+"m",font:"10px sans-serif",textAlign:"center",justify:"center"})}));var ne=new r({geometry:new oe([A,d],"XY")});ne.setStyle(new a({stroke:new o({color:"green",width:2,lineDash:[1,10]}),text:new u({text:" "+Math.round(ee(A,d)*1e5)+"m",font:"10px sans-serif",textAlign:"left",justify:"right"})}));var s=new Ae({name:"courseBoundaryLayer",source:new Le({wrapX:!1})});const q=[B,F,_,E,L,D,H,V,U,S,P,te,ne];q.forEach(e=>{e.getGeometry().transform("EPSG:4326","EPSG:3857")}),s.getSource().addFeatures(q);var he=J(d,"EPSG:4326","EPSG:3857"),ve=new Me({projection:"EPSG:3857",center:he,zoom:17}),z=new i(q),re=new i([F]);const C=new f({hitTolerance:5,layers:[s],features:re});C.on("translatestart",e=>{C.features_=z}),C.on("translateend",e=>{C.features_=re});let h,M,$=!1;const xe=new se({layers:[s],features:new i([E]),handleDownEvent:e=>{if(e.map.getFeaturesAtPixel(e.pixel,{hitTolerance:10,layerFilter:t=>!!(t.getProperties()&&t.getProperties().name&&t.getProperties().name=="courseBoundaryLayer")}).indexOf(E)>-1)return h=G(L.getGeometry().getExtent()),M=G(E.getGeometry().getExtent()),$=!0,!0},stopDown:()=>$,handleDragEvent:e=>{const n=M[0]-h[0],t=M[1]-h[1],m=Math.atan2(t,n),g=e.coordinate[0]-h[0],w=e.coordinate[1]-h[1],x=Math.atan2(w,g);z.forEach(k=>{k.getGeometry().rotate(x-m,h)}),M=e.coordinate},handleUpEvent:()=>{console.log("rotation complete"),$=!1}});let v,T,Q=!1;const ke=new se({layers:[s],features:new i([_]),handleDownEvent:e=>{if(e.map.getFeaturesAtPixel(e.pixel,{hitTolerance:10,layerFilter:t=>!!(t.getProperties()&&t.getProperties().name&&t.getProperties().name=="courseBoundaryLayer")}).indexOf(_)>-1)return v=G(L.getGeometry().getExtent()),T=G(_.getGeometry().getExtent()),Q=!0,!0},stopDown:()=>Q,handleDragEvent:e=>{const n=T[0]-v[0],t=T[1]-v[1],m=e.coordinate[0]-v[0],g=e.coordinate[1]-v[1];var w=m/n,x=g/t;z.forEach(k=>{k.getGeometry().scale(w,x,v)}),T=e.coordinate},handleUpEvent:()=>{console.log("scale compete"),Q=!1}});var l=new Te({interactions:Be().extend([C,xe,ke,R,j,X,I,O,Y])});return l.addLayer(le),l.addLayer(s),l.setView(ve),De(()=>{l==null||l.setTarget(Z.value)}),Re(()=>{l==null||l.setTarget(void 0),l=void 0}),(e,n)=>(He(),je("div",{id:"map",ref_key:"mapRef",ref:Z,style:{height:"800px",width:"800px"}},null,512))}};export{Ye as default};
