import{v as x,g as M,c as b,a as H}from"./vm.b24ba751.js";import{w as y,o as L,n as T,j as V,a2 as W,y as C,a3 as P}from"./index.8ff8d99e.js";const R={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},j=["beforeShow","show","beforeHide","hide"];function D({showing:e,canShow:o,hideOnRouteChange:l,handleShow:n,handleHide:i,processOnMount:S}){const f=V(),{props:s,emit:r,proxy:m}=f;let u;function E(t){e.value===!0?c(t):p(t)}function p(t){if(s.disable===!0||t!==void 0&&t.qAnchorHandled===!0||o!==void 0&&o(t)!==!0)return;const a=s["onUpdate:modelValue"]!==void 0;a===!0&&(r("update:modelValue",!0),u=t,T(()=>{u===t&&(u=void 0)})),(s.modelValue===null||a===!1)&&w(t)}function w(t){e.value!==!0&&(e.value=!0,r("beforeShow",t),n!==void 0?n(t):r("show",t))}function c(t){if(s.disable===!0)return;const a=s["onUpdate:modelValue"]!==void 0;a===!0&&(r("update:modelValue",!1),u=t,T(()=>{u===t&&(u=void 0)})),(s.modelValue===null||a===!1)&&v(t)}function v(t){e.value!==!1&&(e.value=!1,r("beforeHide",t),i!==void 0?i(t):r("hide",t))}function g(t){s.disable===!0&&t===!0?s["onUpdate:modelValue"]!==void 0&&r("update:modelValue",!1):t===!0!==e.value&&(t===!0?w:v)(u)}y(()=>s.modelValue,g),l!==void 0&&x(f)===!0&&y(()=>m.$route.fullPath,()=>{l.value===!0&&e.value===!0&&c()}),S===!0&&L(()=>{g(s.modelValue)});const h={show:p,hide:c,toggle:E};return Object.assign(m,h),h}const U=[null,document,document.body,document.scrollingElement,document.documentElement];function I(e,o){let l=M(o);if(l===void 0){if(e==null)return window;l=e.closest(".scroll,.scroll-y,.overflow-auto")}return U.includes(l)?window:l}function N(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function O(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let d;function B(){if(d!==void 0)return d;const e=document.createElement("p"),o=document.createElement("div");b(e,{width:"100%",height:"200px"}),b(o,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),o.appendChild(e),document.body.appendChild(o);const l=e.offsetWidth;o.style.overflow="scroll";let n=e.offsetWidth;return l===n&&(n=o.clientWidth),o.remove(),d=l-n,d}function X(e,o=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:o?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}function Y(){let e=null;const o=V();function l(){e!==null&&(clearTimeout(e),e=null)}return W(l),C(l),{removeTimeout:l,registerTimeout(n,i){l(),H(o)===!1&&(e=setTimeout(n,i))}}}function k(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),P.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function q(e,o,l){return l<=o?o:Math.min(l,Math.max(o,e))}function F(e,o,l){if(l<=o)return o;const n=l-o+1;let i=o+(e-o)%n;return i<o&&(i=n+i),i===0?0:i}export{N as a,j as b,Y as c,D as d,q as e,I as f,O as g,X as h,B as i,k as j,F as n,R as u};
