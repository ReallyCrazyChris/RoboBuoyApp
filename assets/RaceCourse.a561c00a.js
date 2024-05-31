import{Q as L}from"./QPage.d480d087.js";import{a as I,u as Q}from"./bluetooth.93429ee0.js";import{d as F,a as C,_ as T,P as s,f as m,K as g,L as p,M as i,S as z,O as A,N as G,g as k,R as $,Q as R,s as N,a5 as O}from"./index.8ff8d99e.js";import{t as D,f as B}from"./proj.6634b38d.js";import{Q as H,a as q}from"./QCircularProgress.e8d478a7.js";import"./render.64f49b6a.js";import"./index.21ef2ba8.js";import"./format.211a1e6b.js";import"./vm.b24ba751.js";import"./use-size.2fe01a32.js";const j=F("mapStore",{state:()=>({projection:"EPSG:3857",center:[0,0],rotation:0,zoom:1}),getters:{lonlat:o=>D(o.center)},actions:{zoomToCoordinate(o){this.center=B([10.832274248052466,49.70878107952494]),this.zoom=19}}});const K=C({name:"RoboPosition",props:["deviceid"],components:{},setup(o){const t=I(o.deviceid),e=j();return{roboStore:t,mapStore:e}},data(){return{indicatorthickness:10}},mounted(){},computed:{indicatortangle(){return this.roboStore.currentcourse-Math.round(this.indicatorthickness/2)}}}),J={class:"text-white prevent-select"};function U(o,t,e,a,r,c){const n=s("ol-overlay");return m(),g(n,{position:o.roboStore.coordinate,positioning:"center-center",stopEvent:!1,onClick:t[0]||(t[0]=d=>o.mapStore.zoomToCoordinate(o.roboStore.coordinate))},{default:p(()=>[i(q,{"show-value":"",class:"text-white generic-hover-transition",size:"6em",color:o.roboStore.color,"center-color":o.roboStore.color,"track-color":"transparent","font-size":"0.30em",thickness:.5,min:0,max:360,"model-value":10,value:o.indicatorthickness,angle:o.indicatortangle},{default:p(()=>[z("div",J,A(o.roboStore.number),1),i(H,{class:"bg-dark text-white"},{default:p(()=>[G(A(o.roboStore.name),1)]),_:1})]),_:1},8,["color","center-color","value","angle"])]),_:1},8,["position"])}var X=T(K,[["render",U]]);const Y=/^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;function P({r:o,g:t,b:e,a}){const r=a!==void 0;if(o=Math.round(o),t=Math.round(t),e=Math.round(e),o>255||t>255||e>255||r&&a>100)throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");return a=r?(Math.round(255*a/100)|1<<8).toString(16).slice(1):"","#"+(e|t<<8|o<<16|1<<24).toString(16).slice(1)+a}function V(o){if(typeof o!="string")throw new TypeError("Expected a string");o=o.replace(/^#/,""),o.length===3?o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]:o.length===4&&(o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]+o[3]+o[3]);const t=parseInt(o,16);return o.length>6?{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:Math.round((t&255)/2.55)}:{r:t>>16,g:t>>8&255,b:t&255}}function Z({h:o,s:t,v:e,a}){let r,c,n;t=t/100,e=e/100,o=o/360;const d=Math.floor(o*6),h=o*6-d,l=e*(1-t),f=e*(1-h*t),_=e*(1-(1-h)*t);switch(d%6){case 0:r=e,c=_,n=l;break;case 1:r=f,c=e,n=l;break;case 2:r=l,c=e,n=_;break;case 3:r=l,c=f,n=e;break;case 4:r=_,c=l,n=e;break;case 5:r=e,c=l,n=f;break}return{r:Math.round(r*255),g:Math.round(c*255),b:Math.round(n*255),a}}function x({r:o,g:t,b:e,a}){const r=Math.max(o,t,e),c=Math.min(o,t,e),n=r-c,d=r===0?0:n/r,h=r/255;let l;switch(r){case c:l=0;break;case o:l=t-e+n*(t<e?6:0),l/=6*n;break;case t:l=e-o+n*2,l/=6*n;break;case e:l=o-t+n*4,l/=6*n;break}return{h:Math.round(l*360),s:Math.round(d*100),v:Math.round(h*100),a}}function b(o){if(typeof o!="string")throw new TypeError("Expected a string");const t=o.replace(/ /g,""),e=Y.exec(t);if(e===null)return V(t);const a={r:Math.min(255,parseInt(e[2],10)),g:Math.min(255,parseInt(e[3],10)),b:Math.min(255,parseInt(e[4],10))};if(e[1]){const r=parseFloat(e[5]);a.a=Math.min(1,isNaN(r)===!0?1:r)*100}return a}function oo(o,t){if(typeof o!="string")throw new TypeError("Expected a string as color");if(typeof t!="number")throw new TypeError("Expected a numeric percent");const e=b(o),a=t<0?0:255,r=Math.abs(t)/100,c=e.r,n=e.g,d=e.b;return"#"+(16777216+(Math.round((a-c)*r)+c)*65536+(Math.round((a-n)*r)+n)*256+(Math.round((a-d)*r)+d)).toString(16).slice(1)}function to(o){if(typeof o!="string"&&(!o||o.r===void 0))throw new TypeError("Expected a string or a {r, g, b} object as color");const t=typeof o=="string"?b(o):o,e=t.r/255,a=t.g/255,r=t.b/255,c=e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4),n=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),d=r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4);return .2126*c+.7152*n+.0722*d}function eo(o){if(typeof o!="string"&&(!o||o.r===void 0))throw new TypeError("Expected a string or a {r, g, b} object as color");const t=typeof o=="string"?b(o):o;return(t.r*299+t.g*587+t.b*114)/1e3}function no(o,t){if(typeof o!="string"&&(!o||o.r===void 0))throw new TypeError("Expected a string or a {r, g, b[, a]} object as fgColor");if(typeof t!="string"&&(!t||t.r===void 0))throw new TypeError("Expected a string or a {r, g, b[, a]} object as bgColor");const e=typeof o=="string"?b(o):o,a=e.r/255,r=e.g/255,c=e.b/255,n=e.a!==void 0?e.a/100:1,d=typeof t=="string"?b(t):t,h=d.r/255,l=d.g/255,f=d.b/255,_=d.a!==void 0?d.a/100:1,y=n+_*(1-n),M=Math.round((a*n+h*_*(1-n))/y*255),w=Math.round((r*n+l*_*(1-n))/y*255),v=Math.round((c*n+f*_*(1-n))/y*255),S={r:M,g:w,b:v,a:Math.round(y*100)};return typeof o=="string"?P(S):S}function ro(o,t){if(typeof o!="string")throw new TypeError("Expected a string as color");if(t===void 0||t<-1||t>1)throw new TypeError("Expected offset to be between -1 and 1");const{r:e,g:a,b:r,a:c}=b(o),n=c!==void 0?c/100:0;return P({r:e,g:a,b:r,a:Math.round(Math.min(1,Math.max(0,n+t))*100)})}function ao(o){if(typeof o!="string")throw new TypeError("Expected a string as color");const t=document.createElement("div");t.className=`text-${o} invisible fixed no-pointer-events`,document.body.appendChild(t);const e=getComputedStyle(t).getPropertyValue("color");return t.remove(),P(b(e))}var io={rgbToHex:P,hexToRgb:V,hsvToRgb:Z,rgbToHsv:x,textToRgb:b,lighten:oo,luminosity:to,brightness:eo,blend:no,changeAlpha:ro,getPaletteColor:ao};const{getPaletteColor:so}=io,co=C({name:"RoboPath",props:["deviceid"],setup(o){const t=I(o.deviceid),e=j();return{roboStore:t,mapStore:e}},data(){return{radius:6,strokeWidth:4,fillColor:"white"}},computed:{strokeColor(){return so(this.roboStore.color)},nodeWaypoints(){return this.roboStore.waypoints.map(t=>B([Number(t[1]),Number(t[0])]))},pathWaypoints(){return[this.roboStore.coordinate].concat(this.nodeWaypoints)},dragMarkerPosition(){return this.pathWaypoints[this.pathWaypoints.length-1]}},methods:{featureSelected(o){const t=o.selected[0],e=t==null?void 0:t.getProperties();(e==null?void 0:e.type)=="waypoint"&&this.removewaypoint(e.index),(e==null?void 0:e.type)=="pathSegment"&&this.removepath(e.index),o.target.getFeatures().clear()},addwaypoint:async function(o){let t;o.features.forEach(async e=>{t=e.getGeometry().getCoordinates()}),this.roboStore.addwaypoint(t),await this.roboStore.setwaypoints()},removewaypoint:async function(o){this.roboStore.removewaypoint(o),await this.roboStore.setwaypoints()},removepath:async function(o){this.roboStore.removepath(o),await this.roboStore.setwaypoints()}}});function lo(o,t,e,a,r,c){const n=s("ol-geom-line-string"),d=s("ol-style-stroke"),h=s("ol-style"),l=s("ol-feature"),f=s("ol-geom-point"),_=s("ol-style-fill"),y=s("ol-style-circle"),M=s("ol-interaction-select"),w=s("ol-source-vector"),v=s("ol-vector-layer"),S=s("ol-style-icon"),W=s("ol-interaction-modify");return m(),k($,null,[i(v,{zIndex:10},{default:p(()=>[i(w,{projection:o.mapStore.projection},{default:p(()=>[(m(!0),k($,null,R(o.pathWaypoints,(E,u)=>(m(),g(l,{key:"point"+String(u),properties:{index:u,type:"pathSegment"}},{default:p(()=>[z("div",null,[o.pathWaypoints[u+1]?(m(),g(n,{key:0,coordinates:[o.pathWaypoints[u],o.pathWaypoints[u+1]]},null,8,["coordinates"])):N("",!0),i(h,null,{default:p(()=>[i(d,{color:o.strokeColor,width:o.strokeWidth},null,8,["color","width"])]),_:1})])]),_:2},1032,["properties"]))),128)),(m(!0),k($,null,R(o.nodeWaypoints,(E,u)=>(m(),g(l,{key:"point"+String(u),properties:{index:u,type:"waypoint"}},{default:p(()=>[i(f,{coordinates:E},null,8,["coordinates"]),i(h,null,{default:p(()=>[i(y,{radius:o.radius},{default:p(()=>[i(_,{color:o.fillColor},null,8,["color"]),i(d,{color:o.strokeColor,width:o.strokeWidth},null,8,["color","width"])]),_:1},8,["radius"])]),_:1})]),_:2},1032,["properties"]))),128)),i(M,{onSelect:o.featureSelected},null,8,["onSelect"])]),_:1},8,["projection"])]),_:1}),i(v,{zIndex:20},{default:p(()=>[i(w,null,{default:p(()=>[i(W,{hitDetection:!0,onModifyend:o.addwaypoint},{default:p(()=>[i(l,null,{default:p(()=>[i(f,{coordinates:o.dragMarkerPosition},null,8,["coordinates"]),i(h,null,{default:p(()=>[i(S,{src:"RoboMapPin.png",scale:.08,anchor:[.5,1],zIndex:50,color:o.strokeColor},null,8,["color"])]),_:1})]),_:1})]),_:1},8,["onModifyend"])]),_:1})]),_:1})],64)}var po=T(co,[["render",lo]]);const uo=C({name:"RoboMap",components:{RoboPosition:X,RoboPath:po},setup(){const o=Q(),t=j();return{devicesStore:o,mapStore:t}},data(){return{height:800,width:800,roboAppCoordinate:[]}},mounted(){this.height=this.$parent.$el.offsetHeight,this.width=this.$parent.$el.offsetWidth},methods:{zoomtoRoboAppCoordinate(o){this.roboAppCoordinate=o.target.getPosition(),this.mapStore.zoomToCoordinate(this.roboAppCoordinate)},updateRoboAppCoordinate(o){this.roboAppCoordinate=o.target.getPosition()}}});function mo(o,t,e,a,r,c){const n=s("ol-view"),d=s("ol-source-osm"),h=s("ol-tile-layer"),l=s("ol-geom-point"),f=s("ol-style-icon"),_=s("ol-style"),y=s("ol-feature"),M=s("ol-source-vector"),w=s("ol-vector-layer"),v=s("ol-geolocation"),S=s("RoboPosition"),W=s("RoboPath"),E=s("ol-map");return m(),g(E,{ref:"courseMap",loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,style:O({height:o.height+"px",width:o.width+"px"})},{default:p(()=>[i(n,{ref:"courseView",projection:o.mapStore.projection,center:o.mapStore.center,rotation:o.mapStore.rotation,zoom:o.mapStore.zoom,extent:o.mapStore.extentOfInterest,showFullExtent:!0},null,8,["projection","center","rotation","zoom","extent"]),i(h,null,{default:p(()=>[i(d)]),_:1}),o.$refs.courseView?(m(),g(v,{key:0,projection:o.mapStore.projection,tracking:!0,"onChange:position":o.updateRoboAppCoordinate,"onChange:positionOnce":o.zoomtoRoboAppCoordinate},{default:p(()=>[z("template",null,[i(w,{zIndex:50},{default:p(()=>[i(M,null,{default:p(()=>[i(y,{ref:"positionFeature",properties:{type:"committeeBoat"}},{default:p(()=>[i(l,{coordinates:o.roboAppCoordinate},null,8,["coordinates"]),i(_,null,{default:p(()=>[i(f,{src:"RoboRib.png",scale:.2})]),_:1})]),_:1},512)]),_:1})]),_:1})])]),_:1},8,["projection","onChange:position","onChange:positionOnce"])):N("",!0),(m(!0),k($,null,R(o.devicesStore.connecteddevices,u=>(m(),g(S,{key:u.id,deviceid:u.id},null,8,["deviceid"]))),128)),(m(!0),k($,null,R(o.devicesStore.connecteddevices,u=>(m(),g(W,{key:u.id,deviceid:u.id},null,8,["deviceid"]))),128))]),_:1},8,["style"])}var ho=T(uo,[["render",mo]]);const _o=C({name:"RaceCourse",components:{RoboMap:ho},setup(){}});function fo(o,t,e,a,r,c){const n=s("RoboMap");return m(),g(L,null,{default:p(()=>[i(n)]),_:1})}var Ro=T(_o,[["render",fo]]);export{Ro as default};