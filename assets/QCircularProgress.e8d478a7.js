import{l as C,J as Se,Y as U,n as oe,U as P,w as S,o as Ce,y as H,j as L,V as N,A as B,a6 as Y,e as Te,a7 as ke,v as x,a8 as $e,c as m,a2 as He,D as Ee,Z as Pe,E as qe}from"./index.8ff8d99e.js";import{j as F,i as Me,u as We,b as Le,c as Oe,d as ze,f as Ae,e as De}from"./format.211a1e6b.js";import{a as Ne}from"./vm.b24ba751.js";import{c as ie,b as Be,h as Fe}from"./render.64f49b6a.js";import{u as _e,a as je}from"./use-size.2fe01a32.js";const Qe={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Ie({showing:e,avoidEmit:n,configureAnchorEl:i}){const{props:t,proxy:o,emit:u}=L(),l=C(null);let r=null;function c(a){return l.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const s={};i===void 0&&(Object.assign(s,{hide(a){o.hide(a)},toggle(a){o.toggle(a),a.qAnchorHandled=!0},toggleKey(a){Se(a,13)===!0&&s.toggle(a)},contextClick(a){o.hide(a),U(a),oe(()=>{o.show(a),a.qAnchorHandled=!0})},prevent:U,mobileTouch(a){if(s.mobileCleanup(a),c(a)!==!0)return;o.hide(a),l.value.classList.add("non-selectable");const v=a.target;P(s,"anchor",[[v,"touchmove","mobileCleanup","passive"],[v,"touchend","mobileCleanup","passive"],[v,"touchcancel","mobileCleanup","passive"],[l.value,"contextmenu","prevent","notPassive"]]),r=setTimeout(()=>{r=null,o.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){l.value.classList.remove("non-selectable"),r!==null&&(clearTimeout(r),r=null),e.value===!0&&a!==void 0&&F()}}),i=function(a=t.contextMenu){if(t.noParentEvent===!0||l.value===null)return;let v;a===!0?o.$q.platform.is.mobile===!0?v=[[l.value,"touchstart","mobileTouch","passive"]]:v=[[l.value,"mousedown","hide","passive"],[l.value,"contextmenu","contextClick","notPassive"]]:v=[[l.value,"click","toggle","passive"],[l.value,"keyup","toggleKey","passive"]],P(s,"anchor",v)});function d(){N(s,"anchor")}function g(a){for(l.value=a;l.value.classList.contains("q-anchor--skip");)l.value=l.value.parentNode;i()}function f(){if(t.target===!1||t.target===""||o.$el.parentNode===null)l.value=null;else if(t.target===!0)g(o.$el.parentNode);else{let a=t.target;if(typeof t.target=="string")try{a=document.querySelector(t.target)}catch{a=void 0}a!=null?(l.value=a.$el||a,i()):(l.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return S(()=>t.contextMenu,a=>{l.value!==null&&(d(),i(a))}),S(()=>t.target,()=>{l.value!==null&&d(),f()}),S(()=>t.noParentEvent,a=>{l.value!==null&&(a===!0?d():i())}),Ce(()=>{f(),n!==!0&&t.modelValue===!0&&l.value===null&&u("update:modelValue",!1)}),H(()=>{r!==null&&clearTimeout(r),d()}),{anchorEl:l,canShow:c,anchorEvents:s}}function Ve(e,n){const i=C(null);let t;function o(r,c){const s=`${c!==void 0?"add":"remove"}EventListener`,d=c!==void 0?c:t;r!==window&&r[s]("scroll",d,B.passive),window[s]("scroll",d,B.passive),t=c}function u(){i.value!==null&&(o(i.value),i.value=null)}const l=S(()=>e.noParentEvent,()=>{i.value!==null&&(u(),n())});return H(l),{localScrollTarget:i,unconfigureScrollTarget:u,changeScrollEvent:o}}let E=[],q=[];function ae(e){q=q.filter(n=>n!==e)}function Re(e){ae(e),q.push(e)}function X(e){ae(e),q.length===0&&E.length!==0&&(E[E.length-1](),E=[])}let Ge=1,Ke=document.body;function Ue(e,n){const i=document.createElement("div");if(i.id=n!==void 0?`q-portal--${n}--${Ge++}`:e,Y.globalNodes!==void 0){const t=Y.globalNodes.class;t!==void 0&&(i.className=t)}return Ke.appendChild(i),i}function Ye(e){e.remove()}const $=[];function Xe(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Je(e,n,i,t){const o=C(!1),u=C(!1);let l=null;const r={},c=t==="dialog"&&Xe(e);function s(g){if(g===!0){X(r),u.value=!0;return}u.value=!1,o.value===!1&&(c===!1&&l===null&&(l=Ue(!1,t)),o.value=!0,$.push(e.proxy),Re(r))}function d(g){if(u.value=!1,g!==!0)return;X(r),o.value=!1;const f=$.indexOf(e.proxy);f!==-1&&$.splice(f,1),l!==null&&(Ye(l),l=null)}return Te(()=>{d(!0)}),e.proxy.__qPortal=!0,ke(e.proxy,"contentEl",()=>n.value),{showPortal:s,hidePortal:d,portalIsActive:o,portalIsAccessible:u,renderPortal:()=>c===!0?i():o.value===!0?[x($e,{to:l},i())]:void 0}}const Ze={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function et(e,n=()=>{},i=()=>{}){return{transitionProps:m(()=>{const t=`q-transition--${e.transitionShow||n()}`,o=`q-transition--${e.transitionHide||i()}`;return{appear:!0,enterFromClass:`${t}-enter-from`,enterActiveClass:`${t}-enter-active`,enterToClass:`${t}-enter-to`,leaveFromClass:`${o}-leave-from`,leaveActiveClass:`${o}-leave-active`,leaveToClass:`${o}-leave-to`}}),transitionStyle:m(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}function tt(){let e;const n=L();function i(){e=void 0}return He(i),H(i),{removeTick:i,registerTick(t){e=t,oe(()=>{e===t&&(Ne(n)===!1&&e(),e=void 0)})}}}const{notPassiveCapture:M}=B,p=[];function W(e){const n=e.target;if(n===void 0||n.nodeType===8||n.classList.contains("no-pointer-events")===!0)return;let i=$.length-1;for(;i>=0;){const t=$[i].$;if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;i--}for(let t=p.length-1;t>=0;t--){const o=p[t];if((o.anchorEl.value===null||o.anchorEl.value.contains(n)===!1)&&(n===document.body||o.innerRef.value!==null&&o.innerRef.value.contains(n)===!1))e.qClickOutside=!0,o.onClickOutside(e);else return}}function nt(e){p.push(e),p.length===1&&(document.addEventListener("mousedown",W,M),document.addEventListener("touchstart",W,M))}function J(e){const n=p.findIndex(i=>i===e);n>-1&&(p.splice(n,1),p.length===0&&(document.removeEventListener("mousedown",W,M),document.removeEventListener("touchstart",W,M)))}let Z,ee;function te(e){const n=e.split(" ");return n.length!==2?!1:["top","center","bottom"].includes(n[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(n[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function lt(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const _={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{_[`${e}#ltr`]=e,_[`${e}#rtl`]=e});function ne(e,n){const i=e.split(" ");return{vertical:i[0],horizontal:_[`${i[1]}#${n===!0?"rtl":"ltr"}`]}}function ot(e,n){let{top:i,left:t,right:o,bottom:u,width:l,height:r}=e.getBoundingClientRect();return n!==void 0&&(i-=n[1],t-=n[0],u+=n[1],o+=n[0],l+=n[0],r+=n[1]),{top:i,bottom:u,height:r,left:t,right:o,width:l,middle:t+(o-t)/2,center:i+(u-i)/2}}function it(e,n,i){let{top:t,left:o}=e.getBoundingClientRect();return t+=n.top,o+=n.left,i!==void 0&&(t+=i[1],o+=i[0]),{top:t,bottom:t+1,height:1,left:o,right:o+1,width:1,middle:o,center:t}}function at(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function le(e,n,i){return{top:e[i.anchorOrigin.vertical]-n[i.selfOrigin.vertical],left:e[i.anchorOrigin.horizontal]-n[i.selfOrigin.horizontal]}}function rt(e){if(Ee.is.ios===!0&&window.visualViewport!==void 0){const r=document.body.style,{offsetLeft:c,offsetTop:s}=window.visualViewport;c!==Z&&(r.setProperty("--q-pe-left",c+"px"),Z=c),s!==ee&&(r.setProperty("--q-pe-top",s+"px"),ee=s)}const{scrollLeft:n,scrollTop:i}=e.el,t=e.absoluteOffset===void 0?ot(e.anchorEl,e.cover===!0?[0,0]:e.offset):it(e.anchorEl,e.absoluteOffset,e.offset);let o={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(o.minWidth=t.width+"px",e.cover===!0&&(o.minHeight=t.height+"px")),Object.assign(e.el.style,o);const u=at(e.el);let l=le(t,u,e);if(e.absoluteOffset===void 0||e.offset===void 0)D(l,t,u,e.anchorOrigin,e.selfOrigin);else{const{top:r,left:c}=l;D(l,t,u,e.anchorOrigin,e.selfOrigin);let s=!1;if(l.top!==r){s=!0;const d=2*e.offset[1];t.center=t.top-=d,t.bottom-=d+2}if(l.left!==c){s=!0;const d=2*e.offset[0];t.middle=t.left-=d,t.right-=d+2}s===!0&&(l=le(t,u,e),D(l,t,u,e.anchorOrigin,e.selfOrigin))}o={top:l.top+"px",left:l.left+"px"},l.maxHeight!==void 0&&(o.maxHeight=l.maxHeight+"px",t.height>l.maxHeight&&(o.minHeight=o.maxHeight)),l.maxWidth!==void 0&&(o.maxWidth=l.maxWidth+"px",t.width>l.maxWidth&&(o.minWidth=o.maxWidth)),Object.assign(e.el.style,o),e.el.scrollTop!==i&&(e.el.scrollTop=i),e.el.scrollLeft!==n&&(e.el.scrollLeft=n)}function D(e,n,i,t,o){const u=i.bottom,l=i.right,r=Me(),c=window.innerHeight-r,s=document.body.clientWidth;if(e.top<0||e.top+u>c)if(o.vertical==="center")e.top=n[t.vertical]>c/2?Math.max(0,c-u):0,e.maxHeight=Math.min(u,c);else if(n[t.vertical]>c/2){const d=Math.min(c,t.vertical==="center"?n.center:t.vertical===o.vertical?n.bottom:n.top);e.maxHeight=Math.min(u,d),e.top=Math.max(0,d-u)}else e.top=Math.max(0,t.vertical==="center"?n.center:t.vertical===o.vertical?n.top:n.bottom),e.maxHeight=Math.min(u,c-e.top);if(e.left<0||e.left+l>s)if(e.maxWidth=Math.min(l,s),o.horizontal==="middle")e.left=n[t.horizontal]>s/2?Math.max(0,s-l):0;else if(n[t.horizontal]>s/2){const d=Math.min(s,t.horizontal==="middle"?n.middle:t.horizontal===o.horizontal?n.right:n.left);e.maxWidth=Math.min(l,d),e.left=Math.max(0,d-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?n.middle:t.horizontal===o.horizontal?n.left:n.right),e.maxWidth=Math.min(l,s-e.left)}var mt=ie({name:"QTooltip",inheritAttrs:!1,props:{...Qe,...We,...Ze,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:te},self:{type:String,default:"top middle",validator:te},offset:{type:Array,default:()=>[14,14],validator:lt},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...Le],setup(e,{slots:n,emit:i,attrs:t}){let o,u;const l=L(),{proxy:{$q:r}}=l,c=C(null),s=C(!1),d=m(()=>ne(e.anchor,r.lang.rtl)),g=m(()=>ne(e.self,r.lang.rtl)),f=m(()=>e.persistent!==!0),{registerTick:a,removeTick:v}=tt(),{registerTimeout:w}=Oe(),{transitionProps:O,transitionStyle:ue}=et(e),{localScrollTarget:Q,changeScrollEvent:ce,unconfigureScrollTarget:de}=Ve(e,G),{anchorEl:y,canShow:fe,anchorEvents:T}=Ie({showing:s,configureAnchorEl:be}),{show:he,hide:z}=ze({showing:s,canShow:fe,handleShow:me,handleHide:ge,hideOnRouteChange:f,processOnMount:!0});Object.assign(T,{delayShow:ye,delayHide:xe});const{showPortal:I,hidePortal:V,renderPortal:ve}=Je(l,c,we,"tooltip");if(r.platform.is.mobile===!0){const h={anchorEl:y,innerRef:c,onClickOutside(b){return z(b),b.target.classList.contains("q-dialog__backdrop")&&qe(b),!0}},A=m(()=>e.modelValue===null&&e.persistent!==!0&&s.value===!0);S(A,b=>{(b===!0?nt:J)(h)}),H(()=>{J(h)})}function me(h){I(),a(()=>{u=new MutationObserver(()=>k()),u.observe(c.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),k(),G()}),o===void 0&&(o=S(()=>r.screen.width+"|"+r.screen.height+"|"+e.self+"|"+e.anchor+"|"+r.lang.rtl,k)),w(()=>{I(!0),i("show",h)},e.transitionDuration)}function ge(h){v(),V(),R(),w(()=>{V(!0),i("hide",h)},e.transitionDuration)}function R(){u!==void 0&&(u.disconnect(),u=void 0),o!==void 0&&(o(),o=void 0),de(),N(T,"tooltipTemp")}function k(){const h=c.value;y.value===null||!h||rt({el:h,offset:e.offset,anchorEl:y.value,anchorOrigin:d.value,selfOrigin:g.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function ye(h){if(r.platform.is.mobile===!0){F(),document.body.classList.add("non-selectable");const A=y.value,b=["touchmove","touchcancel","touchend","click"].map(K=>[A,K,"delayHide","passiveCapture"]);P(T,"tooltipTemp",b)}w(()=>{he(h)},e.delay)}function xe(h){r.platform.is.mobile===!0&&(N(T,"tooltipTemp"),F(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),w(()=>{z(h)},e.hideDelay)}function be(){if(e.noParentEvent===!0||y.value===null)return;const h=r.platform.is.mobile===!0?[[y.value,"touchstart","delayShow","passive"]]:[[y.value,"mouseenter","delayShow","passive"],[y.value,"mouseleave","delayHide","passive"]];P(T,"anchor",h)}function G(){if(y.value!==null||e.scrollTarget!==void 0){Q.value=Ae(y.value,e.scrollTarget);const h=e.noParentEvent===!0?k:z;ce(Q.value,h)}}function pe(){return s.value===!0?x("div",{...t,ref:c,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",t.class],style:[t.style,ue.value],role:"tooltip"},Be(n.default)):null}function we(){return x(Pe,O.value,pe)}return H(R),Object.assign(l.proxy,{updatePosition:k}),ve}});const st={..._e,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:e=>e>=0&&e<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},j=50,re=2*j,se=re*Math.PI,ut=Math.round(se*1e3)/1e3;var gt=ie({name:"QCircularProgress",props:{...st,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(e,{slots:n}){const{proxy:{$q:i}}=L(),t=je(e),o=m(()=>{const f=(i.lang.rtl===!0?-1:1)*e.angle;return{transform:e.reverse!==(i.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-f}deg)`:`rotate3d(0, 0, 1, ${f-90}deg)`}}),u=m(()=>e.instantFeedback!==!0&&e.indeterminate!==!0?{transition:`stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease`}:""),l=m(()=>re/(1-e.thickness/2)),r=m(()=>`${l.value/2} ${l.value/2} ${l.value} ${l.value}`),c=m(()=>De(e.value,e.min,e.max)),s=m(()=>se*(1-(c.value-e.min)/(e.max-e.min))),d=m(()=>e.thickness/2*l.value);function g({thickness:f,offset:a,color:v,cls:w,rounded:O}){return x("circle",{class:"q-circular-progress__"+w+(v!==void 0?` text-${v}`:""),style:u.value,fill:"transparent",stroke:"currentColor","stroke-width":f,"stroke-dasharray":ut,"stroke-dashoffset":a,"stroke-linecap":O,cx:l.value,cy:l.value,r:j})}return()=>{const f=[];e.centerColor!==void 0&&e.centerColor!=="transparent"&&f.push(x("circle",{class:`q-circular-progress__center text-${e.centerColor}`,fill:"currentColor",r:j-d.value/2,cx:l.value,cy:l.value})),e.trackColor!==void 0&&e.trackColor!=="transparent"&&f.push(g({cls:"track",thickness:d.value,offset:0,color:e.trackColor})),f.push(g({cls:"circle",thickness:d.value,offset:s.value,color:e.color,rounded:e.rounded===!0?"round":void 0}));const a=[x("svg",{class:"q-circular-progress__svg",style:o.value,viewBox:r.value,"aria-hidden":"true"},f)];return e.showValue===!0&&a.push(x("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:e.fontSize}},n.default!==void 0?n.default():[x("div",c.value)])),x("div",{class:`q-circular-progress q-circular-progress--${e.indeterminate===!0?"in":""}determinate`,style:t.value,role:"progressbar","aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.indeterminate===!0?void 0:c.value},Fe(n.internal,a))}}});export{mt as Q,gt as a,st as u};