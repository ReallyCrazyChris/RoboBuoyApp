import{Q as x}from"./QPage.d480d087.js";import{Q as a,a as v}from"./QCard.4437fc36.js";import{u as g,a as S,b as $}from"./gpsStore.f4da2472.js";import{a as c,_ as i,f as d,g as k,M as e,L as s,S as o,O as n,P as C,K as b}from"./index.8ff8d99e.js";import"./render.64f49b6a.js";import"./use-dark.97c744f7.js";const r=g(),D=S(),l=$();l.watchPosition();const G=c({name:"VmcDashboard",components:{},setup(){return{vmcStore:D,markCollection:r,gpsStore:l}},computed:{markSelected:{get(){return r.nextmark.id},set(t){r.selectMark(t)}}}}),P={class:"row"},Q=o("div",{class:"text-h3 text-center text-positive"},"Position",-1),w={class:"text-h5 text-center text-positive"},B={class:"text-h5 text-center text-positive"},V=o("div",{class:"text-h3 text-center text-negative"},"Speed",-1),M={class:"text-h1 text-center"},N=o("div",{class:"text-h3 text-center text-info"},"Heading",-1),y={class:"text-h1 text-center"};function E(t,p,_,u,m,h){return d(),k("div",P,[e(v,{class:"full-width"},{default:s(()=>[e(a,null,{default:s(()=>[Q,o("div",w,n(t.gpsStore.lon),1),o("div",B,n(t.gpsStore.lat),1)]),_:1}),e(a,null,{default:s(()=>[V]),_:1}),e(a,null,{default:s(()=>[o("div",M,n(t.gpsStore.speed),1)]),_:1}),e(a,null,{default:s(()=>[N]),_:1}),e(a,null,{default:s(()=>[o("div",y,n(t.gpsStore.heading),1)]),_:1})]),_:1})])}var H=i(G,[["render",E]]);const K=c({name:"RaceCourse",components:{GpsDashboard:H},setup(){}});function L(t,p,_,u,m,h){const f=C("GpsDashboard");return d(),b(x,null,{default:s(()=>[e(f)]),_:1})}var F=i(K,[["render",L]]);export{F as default};