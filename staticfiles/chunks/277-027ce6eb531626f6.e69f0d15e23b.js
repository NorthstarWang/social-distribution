"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{2168:function(e,t,n){n.d(t,{OT:function(){return eL},eh:function(){return ex},s_:function(){return E}});var r,l=n(2265);let{createElement:i,createContext:o,createRef:a,forwardRef:u,useCallback:d,useContext:s,useEffect:c,useImperativeHandle:f,useLayoutEffect:p,useMemo:h,useRef:m,useState:v}=r||(r=n.t(l,2)),g=(r||(r=n.t(l,2)))["useId".toString()],y=o(null);y.displayName="PanelGroupContext";let w="function"==typeof g?g:()=>null,b=0;function z(e=null){let t=w(),n=m(e||t||null);return null===n.current&&(n.current=""+b++),null!=e?e:n.current}function x({children:e,className:t="",collapsedSize:n,collapsible:r,defaultSize:l,forwardedRef:o,id:a,maxSize:u,minSize:d,onCollapse:c,onExpand:h,onResize:v,order:g,style:w,tagName:b="div",...x}){let E=s(y);if(null===E)throw Error("Panel components must be rendered within a PanelGroup container");let{collapsePanel:S,expandPanel:L,getPanelSize:I,getPanelStyle:$,groupId:k,isPanelCollapsed:C,reevaluatePanelConstraints:N,registerPanel:P,resizePanel:A,unregisterPanel:M}=E,D=z(a),R=m({callbacks:{onCollapse:c,onExpand:h,onResize:v},constraints:{collapsedSize:n,collapsible:r,defaultSize:l,maxSize:u,minSize:d},id:D,idIsFromProps:void 0!==a,order:g});m({didLogMissingDefaultSizeWarning:!1}),p(()=>{let{callbacks:e,constraints:t}=R.current,i={...t};R.current.id=D,R.current.idIsFromProps=void 0!==a,R.current.order=g,e.onCollapse=c,e.onExpand=h,e.onResize=v,t.collapsedSize=n,t.collapsible=r,t.defaultSize=l,t.maxSize=u,t.minSize=d,(i.collapsedSize!==t.collapsedSize||i.collapsible!==t.collapsible||i.maxSize!==t.maxSize||i.minSize!==t.minSize)&&N(R.current,i)}),p(()=>{let e=R.current;return P(e),()=>{M(e)}},[g,D,P,M]),f(o,()=>({collapse:()=>{S(R.current)},expand:()=>{L(R.current)},getId:()=>D,getSize:()=>I(R.current),isCollapsed:()=>C(R.current),isExpanded:()=>!C(R.current),resize:e=>{A(R.current,e)}}),[S,L,I,C,D,A]);let F=$(R.current,l);return i(b,{...x,children:e,className:t,id:a,style:{...F,...w},"data-panel":"","data-panel-collapsible":r||void 0,"data-panel-group-id":k,"data-panel-id":D,"data-panel-size":parseFloat(""+F.flexGrow).toFixed(1)})}let E=u((e,t)=>i(x,{...e,forwardedRef:t}));x.displayName="Panel",E.displayName="forwardRef(Panel)";let S=null,L=null;function I(e,t){let n=function(e,t){if(t){let e=(t&F)!=0,n=(t&T)!=0,r=(t&G)!=0,l=(t&H)!=0;if(e)return r?"se-resize":l?"ne-resize":"e-resize";if(n)return r?"sw-resize":l?"nw-resize":"w-resize";if(r)return"s-resize";if(l)return"n-resize"}switch(e){case"horizontal":return"ew-resize";case"intersection":return"move";case"vertical":return"ns-resize"}}(e,t);S!==n&&(S=n,null===L&&(L=document.createElement("style"),document.head.appendChild(L)),L.innerHTML=`*{cursor: ${n}!important;}`)}function $(e){return"keydown"===e.type}function k(e){return e.type.startsWith("mouse")}function C(e){return e.type.startsWith("touch")}function N(e){if(k(e))return{x:e.clientX,y:e.clientY};if(C(e)){let t=e.touches[0];if(t&&t.clientX&&t.clientY)return{x:t.clientX,y:t.clientY}}return{x:1/0,y:1/0}}let P=/\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;function A(e){let t=e.length;for(;t--;){let n=e[t];if(Q(n,"Missing node"),function(e){let t=getComputedStyle(e);return!!("fixed"===t.position||"auto"!==t.zIndex&&("static"!==t.position||function(e){var t;let n=getComputedStyle(null!==(t=R(e))&&void 0!==t?t:e).display;return"flex"===n||"inline-flex"===n}(e))||1>+t.opacity||"transform"in t&&"none"!==t.transform||"webkitTransform"in t&&"none"!==t.webkitTransform||"mixBlendMode"in t&&"normal"!==t.mixBlendMode||"filter"in t&&"none"!==t.filter||"webkitFilter"in t&&"none"!==t.webkitFilter||"isolation"in t&&"isolate"===t.isolation||P.test(t.willChange))||"touch"===t.webkitOverflowScrolling}(n))return n}return null}function M(e){return e&&Number(getComputedStyle(e).zIndex)||0}function D(e){let t=[];for(;e;)t.push(e),e=R(e);return t}function R(e){let{parentNode:t}=e;return t&&t instanceof ShadowRoot?t.host:t}let F=1,T=2,G=4,H=8,O="coarse"===function(){if("function"==typeof matchMedia)return matchMedia("(pointer:coarse)").matches?"coarse":"fine"}(),B=[],W=!1,j=new Map,_=new Map,J=new Set;function q(e){let{target:t}=e,{x:n,y:r}=N(e);W=!0,K({target:t,x:n,y:r}),V(),B.length>0&&(Z("down",e),e.preventDefault())}function X(e){let{x:t,y:n}=N(e);if(!W){let{target:r}=e;K({target:r,x:t,y:n})}Z("move",e),U(),B.length>0&&e.preventDefault()}function Y(e){let{target:t}=e,{x:n,y:r}=N(e);_.clear(),W=!1,B.length>0&&e.preventDefault(),Z("up",e),K({target:t,x:n,y:r}),U(),V()}function K({target:e,x:t,y:n}){B.splice(0);let r=null;e instanceof HTMLElement&&(r=e),J.forEach(e=>{let{element:l,hitAreaMargins:i}=e,o=l.getBoundingClientRect(),{bottom:a,left:u,right:d,top:s}=o,c=O?i.coarse:i.fine;if(t>=u-c&&t<=d+c&&n>=s-c&&n<=a+c){if(null!==r&&l!==r&&!l.contains(r)&&!r.contains(l)&&function(e,t){let n;if(e===t)throw Error("Cannot compare node with itself");let r={a:D(e),b:D(t)};for(;r.a.at(-1)===r.b.at(-1);)e=r.a.pop(),t=r.b.pop(),n=e;Q(n,"Stacking order can only be calculated for elements with a common ancestor");let l={a:M(A(r.a)),b:M(A(r.b))};if(l.a===l.b){let e=n.childNodes,t={a:r.a.at(-1),b:r.b.at(-1)},l=e.length;for(;l--;){let n=e[l];if(n===t.a)return 1;if(n===t.b)return -1}}return Math.sign(l.a-l.b)}(r,l)>0){let e=r,t=!1;for(;e;){var f;if(e.contains(l))break;if((f=e.getBoundingClientRect()).x<o.x+o.width&&f.x+f.width>o.x&&f.y<o.y+o.height&&f.y+f.height>o.y){t=!0;break}e=e.parentElement}if(t)return}B.push(e)}})}function U(){let e=!1,t=!1;B.forEach(n=>{let{direction:r}=n;"horizontal"===r?e=!0:t=!0});let n=0;_.forEach(e=>{n|=e}),e&&t?I("intersection",n):e?I("horizontal",n):t?I("vertical",n):null!==L&&(document.head.removeChild(L),S=null,L=null)}function V(){j.forEach((e,t)=>{let{body:n}=t;n.removeEventListener("contextmenu",Y),n.removeEventListener("mousedown",q),n.removeEventListener("mouseleave",X),n.removeEventListener("mousemove",X),n.removeEventListener("touchmove",X),n.removeEventListener("touchstart",q)}),window.removeEventListener("mouseup",Y),window.removeEventListener("touchcancel",Y),window.removeEventListener("touchend",Y),J.size>0&&(W?(B.length>0&&j.forEach((e,t)=>{let{body:n}=t;e>0&&(n.addEventListener("contextmenu",Y),n.addEventListener("mouseleave",X),n.addEventListener("mousemove",X),n.addEventListener("touchmove",X,{passive:!1}))}),window.addEventListener("mouseup",Y),window.addEventListener("touchcancel",Y),window.addEventListener("touchend",Y)):j.forEach((e,t)=>{let{body:n}=t;e>0&&(n.addEventListener("mousedown",q),n.addEventListener("mousemove",X),n.addEventListener("touchmove",X,{passive:!1}),n.addEventListener("touchstart",q))}))}function Z(e,t){J.forEach(n=>{let{setResizeHandlerState:r}=n;r(e,B.includes(n),t)})}function Q(e,t){if(!e)throw console.error(t),Error(t)}function ee(e,t,n=10){let r=(e=parseFloat(e.toFixed(n)))-(t=parseFloat(t.toFixed(n)));return 0===r?0:r>0?1:-1}function et(e,t,n){return 0===ee(e,t,n)}function en({panelConstraints:e,panelIndex:t,size:n}){let r=e[t];Q(null!=r,`Panel constraints not found for index ${t}`);let{collapsedSize:l=0,collapsible:i,maxSize:o=100,minSize:a=0}=r;return 0>ee(n,a)&&(n=i&&0>ee(n,(l+a)/2)?l:a),n=parseFloat((n=Math.min(o,n)).toFixed(10))}function er({delta:e,initialLayout:t,panelConstraints:n,pivotIndices:r,prevLayout:l,trigger:i}){if(et(e,0))return t;let o=[...t],[a,u]=r;Q(null!=a,"Invalid first pivot index"),Q(null!=u,"Invalid second pivot index");let d=0;if("keyboard"===i){{let r=e<0?u:a,l=n[r];Q(l,`Panel constraints not found for index ${r}`);let{collapsedSize:i=0,collapsible:o,minSize:d=0}=l;if(o){let n=t[r];if(Q(null!=n,`Previous layout not found for panel index ${r}`),et(n,i)){let t=d-n;ee(t,Math.abs(e))>0&&(e=e<0?0-t:t)}}}{let r=e<0?a:u,l=n[r];Q(l,`No panel constraints found for index ${r}`);let{collapsedSize:i=0,collapsible:o,minSize:d=0}=l;if(o){let n=t[r];if(Q(null!=n,`Previous layout not found for panel index ${r}`),et(n,d)){let t=n-i;ee(t,Math.abs(e))>0&&(e=e<0?0-t:t)}}}}{let r=e<0?1:-1,l=e<0?u:a,i=0;for(;;){let e=t[l];if(Q(null!=e,`Previous layout not found for panel index ${l}`),i+=en({panelConstraints:n,panelIndex:l,size:100})-e,(l+=r)<0||l>=n.length)break}let o=Math.min(Math.abs(e),Math.abs(i));e=e<0?0-o:o}{let r=e<0?a:u;for(;r>=0&&r<n.length;){let l=Math.abs(e)-Math.abs(d),i=t[r];Q(null!=i,`Previous layout not found for panel index ${r}`);let a=en({panelConstraints:n,panelIndex:r,size:i-l});if(!et(i,a)&&(d+=i-a,o[r]=a,d.toPrecision(3).localeCompare(Math.abs(e).toPrecision(3),void 0,{numeric:!0})>=0))break;e<0?r--:r++}}if(function(e,t,n){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!et(e[n],t[n],void 0))return!1;return!0}(l,o))return l;{let r=e<0?u:a,l=t[r];Q(null!=l,`Previous layout not found for panel index ${r}`);let i=l+d,s=en({panelConstraints:n,panelIndex:r,size:i});if(o[r]=s,!et(s,i)){let t=i-s,r=e<0?u:a;for(;r>=0&&r<n.length;){let l=o[r];Q(null!=l,`Previous layout not found for panel index ${r}`);let i=en({panelConstraints:n,panelIndex:r,size:l+t});if(et(l,i)||(t-=i-l,o[r]=i),et(t,0))break;e>0?r--:r++}}}return et(o.reduce((e,t)=>t+e,0),100)?o:l}function el(e,t=document){return Array.from(t.querySelectorAll(`[data-panel-resize-handle-id][data-panel-group-id="${e}"]`))}function ei(e,t,n=document){let r=el(e,n).findIndex(e=>e.getAttribute("data-panel-resize-handle-id")===t);return null!=r?r:null}function eo(e,t,n){let r=ei(e,t,n);return null!=r?[r,r+1]:[-1,-1]}function ea(e,t=document){var n;return t instanceof HTMLElement&&(null==t?void 0:null===(n=t.dataset)||void 0===n?void 0:n.panelGroupId)==e?t:t.querySelector(`[data-panel-group][data-panel-group-id="${e}"]`)||null}function eu(e,t=document){return t.querySelector(`[data-panel-resize-handle-id="${e}"]`)||null}function ed(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function es(e,t){let{x:n,y:r}=N(t);return"horizontal"===e?n:r}function ec(e,t,n){t.forEach((t,r)=>{let l=e[r];Q(l,`Panel data not found for index ${r}`);let{callbacks:i,constraints:o,id:a}=l,{collapsedSize:u=0,collapsible:d}=o,s=n[a];if(null==s||t!==s){n[a]=t;let{onCollapse:e,onExpand:r,onResize:l}=i;l&&l(t,s),d&&(e||r)&&(r&&(null==s||s===u)&&t!==u&&r(),e&&(null==s||s!==u)&&t===u&&e())}})}function ef(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!=t[n])return!1;return!0}function ep(e){try{if("undefined"!=typeof localStorage)e.getItem=e=>localStorage.getItem(e),e.setItem=(e,t)=>{localStorage.setItem(e,t)};else throw Error("localStorage not supported in this environment")}catch(t){console.error(t),e.getItem=()=>null,e.setItem=()=>{}}}function eh(e){return`react-resizable-panels:${e}`}function em(e){return e.map(e=>{let{constraints:t,id:n,idIsFromProps:r,order:l}=e;return r?n:l?`${l}:${JSON.stringify(t)}`:JSON.stringify(t)}).sort((e,t)=>e.localeCompare(t)).join(",")}function ev(e,t){try{let n=eh(e),r=t.getItem(n);if(r){let e=JSON.parse(r);if("object"==typeof e&&null!=e)return e}}catch(e){}return null}function eg(e,t,n,r,l){var i;let o=eh(e),a=em(t),u=null!==(i=ev(e,l))&&void 0!==i?i:{};u[a]={expandToSizes:Object.fromEntries(n.entries()),layout:r};try{l.setItem(o,JSON.stringify(u))}catch(e){console.error(e)}}function ey({layout:e,panelConstraints:t}){let n=[...e],r=n.reduce((e,t)=>e+t,0);if(n.length!==t.length)throw Error(`Invalid ${t.length} panel layout: ${n.map(e=>`${e}%`).join(", ")}`);if(!et(r,100))for(let e=0;e<t.length;e++){let t=n[e];Q(null!=t,`No layout data found for index ${e}`);let l=100/r*t;n[e]=l}let l=0;for(let e=0;e<t.length;e++){let r=n[e];Q(null!=r,`No layout data found for index ${e}`);let i=en({panelConstraints:t,panelIndex:e,size:r});r!=i&&(l+=r-i,n[e]=i)}if(!et(l,0))for(let e=0;e<t.length;e++){let r=n[e];Q(null!=r,`No layout data found for index ${e}`);let i=en({panelConstraints:t,panelIndex:e,size:r+l});if(r!==i&&(l-=i-r,n[e]=i,et(l,0)))break}return n}let ew={getItem:e=>(ep(ew),ew.getItem(e)),setItem:(e,t)=>{ep(ew),ew.setItem(e,t)}},eb={};function ez({autoSaveId:e=null,children:t,className:n="",direction:r,forwardedRef:l,id:o=null,onLayout:a=null,keyboardResizeBy:u=null,storage:s=ew,style:g,tagName:w="div",...b}){let x=z(o),E=m(null),[S,L]=v(null),[I,N]=v([]),P=m({}),A=m(new Map),M=m(0),D=m({autoSaveId:e,direction:r,dragState:S,id:x,keyboardResizeBy:u,onLayout:a,storage:s}),R=m({layout:I,panelDataArray:[],panelDataArrayChanged:!1});m({didLogIdAndOrderWarning:!1,didLogPanelConstraintsWarning:!1,prevPanelIds:[]}),f(l,()=>({getId:()=>D.current.id,getLayout:()=>{let{layout:e}=R.current;return e},setLayout:e=>{let{onLayout:t}=D.current,{layout:n,panelDataArray:r}=R.current,l=ey({layout:e,panelConstraints:r.map(e=>e.constraints)});ed(n,l)||(N(l),R.current.layout=l,t&&t(l),ec(r,l,P.current))}}),[]),p(()=>{D.current.autoSaveId=e,D.current.direction=r,D.current.dragState=S,D.current.id=x,D.current.onLayout=a,D.current.storage=s}),function({committedValuesRef:e,eagerValuesRef:t,groupId:n,layout:r,panelDataArray:l,panelGroupElement:i,setLayout:o}){m({didWarnAboutMissingResizeHandle:!1}),p(()=>{if(!i)return;let e=el(n,i);for(let t=0;t<l.length-1;t++){let{valueMax:n,valueMin:i,valueNow:o}=function({layout:e,panelsArray:t,pivotIndices:n}){let r=0,l=100,i=0,o=0,a=n[0];return Q(null!=a,"No pivot index found"),t.forEach((e,t)=>{let{constraints:n}=e,{maxSize:u=100,minSize:d=0}=n;t===a?(r=d,l=u):(i+=d,o+=u)}),{valueMax:Math.min(l,100-i),valueMin:Math.max(r,100-o),valueNow:e[a]}}({layout:r,panelsArray:l,pivotIndices:[t,t+1]}),a=e[t];if(null==a);else{let e=l[t];Q(e,`No panel data found for index "${t}"`),a.setAttribute("aria-controls",e.id),a.setAttribute("aria-valuemax",""+Math.round(n)),a.setAttribute("aria-valuemin",""+Math.round(i)),a.setAttribute("aria-valuenow",null!=o?""+Math.round(o):"")}}return()=>{e.forEach((e,t)=>{e.removeAttribute("aria-controls"),e.removeAttribute("aria-valuemax"),e.removeAttribute("aria-valuemin"),e.removeAttribute("aria-valuenow")})}},[n,r,l,i]),c(()=>{if(!i)return;let e=t.current;Q(e,"Eager values not found");let{panelDataArray:l}=e;Q(null!=ea(n,i),`No group found for id "${n}"`);let a=el(n,i);Q(a,`No resize handles found for group id "${n}"`);let u=a.map(e=>{let t=e.getAttribute("data-panel-resize-handle-id");Q(t,"Resize handle element has no handle id attribute");let[a,u]=function(e,t,n,r=document){var l,i,o,a;let u=eu(t,r),d=el(e,r),s=u?d.indexOf(u):-1;return[null!==(l=null===(i=n[s])||void 0===i?void 0:i.id)&&void 0!==l?l:null,null!==(o=null===(a=n[s+1])||void 0===a?void 0:a.id)&&void 0!==o?o:null]}(n,t,l,i);if(null==a||null==u)return()=>{};let d=e=>{if(!e.defaultPrevented&&"Enter"===e.key){e.preventDefault();let u=l.findIndex(e=>e.id===a);if(u>=0){let e=l[u];Q(e,`No panel data found for index ${u}`);let a=r[u],{collapsedSize:d=0,collapsible:s,minSize:c=0}=e.constraints;if(null!=a&&s){let e=er({delta:et(a,d)?c-d:d-a,initialLayout:r,panelConstraints:l.map(e=>e.constraints),pivotIndices:eo(n,t,i),prevLayout:r,trigger:"keyboard"});r!==e&&o(e)}}}};return e.addEventListener("keydown",d),()=>{e.removeEventListener("keydown",d)}});return()=>{u.forEach(e=>e())}},[i,e,t,n,r,l,o])}({committedValuesRef:D,eagerValuesRef:R,groupId:x,layout:I,panelDataArray:R.current.panelDataArray,setLayout:N,panelGroupElement:E.current}),c(()=>{let{panelDataArray:t}=R.current;if(e){if(0===I.length||I.length!==t.length)return;let n=eb[e];null==n&&(n=function(e,t=10){let n=null;return(...r)=>{null!==n&&clearTimeout(n),n=setTimeout(()=>{e(...r)},t)}}(eg,100),eb[e]=n),n(e,[...t],new Map(A.current),I,s)}},[e,I,s]),c(()=>{});let O=d(e=>{let{onLayout:t}=D.current,{layout:n,panelDataArray:r}=R.current;if(e.constraints.collapsible){let l=r.map(e=>e.constraints),{collapsedSize:i=0,panelSize:o,pivotIndices:a}=eS(r,e,n);if(Q(null!=o,`Panel size not found for panel "${e.id}"`),o!==i){A.current.set(e.id,o);let u=er({delta:eE(r,e)===r.length-1?o-i:i-o,initialLayout:n,panelConstraints:l,pivotIndices:a,prevLayout:n,trigger:"imperative-api"});ef(n,u)||(N(u),R.current.layout=u,t&&t(u),ec(r,u,P.current))}}},[]),B=d(e=>{let{onLayout:t}=D.current,{layout:n,panelDataArray:r}=R.current;if(e.constraints.collapsible){let l=r.map(e=>e.constraints),{collapsedSize:i=0,panelSize:o,minSize:a=0,pivotIndices:u}=eS(r,e,n);if(o===i){let i=A.current.get(e.id),d=null!=i&&i>=a?i:a,s=er({delta:eE(r,e)===r.length-1?o-d:d-o,initialLayout:n,panelConstraints:l,pivotIndices:u,prevLayout:n,trigger:"imperative-api"});ef(n,s)||(N(s),R.current.layout=s,t&&t(s),ec(r,s,P.current))}}},[]),W=d(e=>{let{layout:t,panelDataArray:n}=R.current,{panelSize:r}=eS(n,e,t);return Q(null!=r,`Panel size not found for panel "${e.id}"`),r},[]),j=d((e,t)=>{let{panelDataArray:n}=R.current,r=eE(n,e);return function({defaultSize:e,dragState:t,layout:n,panelData:r,panelIndex:l,precision:i=3}){let o=n[l];return{flexBasis:0,flexGrow:null==o?void 0!=e?e.toPrecision(i):"1":1===r.length?"1":o.toPrecision(i),flexShrink:1,overflow:"hidden",pointerEvents:null!==t?"none":void 0}}({defaultSize:t,dragState:S,layout:I,panelData:n,panelIndex:r})},[S,I]),J=d(e=>{let{layout:t,panelDataArray:n}=R.current,{collapsedSize:r=0,collapsible:l,panelSize:i}=eS(n,e,t);return!0===l&&i===r},[]),q=d(e=>{let{layout:t,panelDataArray:n}=R.current,{collapsedSize:r=0,collapsible:l,panelSize:i}=eS(n,e,t);return Q(null!=i,`Panel size not found for panel "${e.id}"`),!l||i>r},[]),X=d(e=>{let{panelDataArray:t}=R.current;t.push(e),t.sort((e,t)=>{let n=e.order,r=t.order;return null==n&&null==r?0:null==n?-1:null==r?1:n-r}),R.current.panelDataArrayChanged=!0},[]);p(()=>{if(R.current.panelDataArrayChanged){R.current.panelDataArrayChanged=!1;let{autoSaveId:n,onLayout:r,storage:l}=D.current,{layout:i,panelDataArray:o}=R.current,a=null;if(n){var e,t;let r=null!==(t=(null!==(e=ev(n,l))&&void 0!==e?e:{})[em(o)])&&void 0!==t?t:null;r&&(A.current=new Map(Object.entries(r.expandToSizes)),a=r.layout)}null==a&&(a=function({panelDataArray:e}){let t=Array(e.length),n=e.map(e=>e.constraints),r=0,l=100;for(let i=0;i<e.length;i++){let e=n[i];Q(e,`Panel constraints not found for index ${i}`);let{defaultSize:o}=e;null!=o&&(r++,t[i]=o,l-=o)}for(let i=0;i<e.length;i++){let o=n[i];Q(o,`Panel constraints not found for index ${i}`);let{defaultSize:a}=o;if(null!=a)continue;let u=l/(e.length-r);r++,t[i]=u,l-=u}return t}({panelDataArray:o}));let u=ey({layout:a,panelConstraints:o.map(e=>e.constraints)});ed(i,u)||(N(u),R.current.layout=u,r&&r(u),ec(o,u,P.current))}}),p(()=>{let e=R.current;return()=>{e.layout=[]}},[]);let Y=d(e=>function(t){t.preventDefault();let n=E.current;if(!n)return()=>null;let{direction:r,dragState:l,id:i,keyboardResizeBy:o,onLayout:a}=D.current,{layout:u,panelDataArray:d}=R.current,{initialLayout:s}=null!=l?l:{},c=eo(i,e,n),f=function(e,t,n,r,l,i){if($(e)){let t="horizontal"===n,r=0;r=e.shiftKey?100:null!=l?l:10;let i=0;switch(e.key){case"ArrowDown":i=t?0:r;break;case"ArrowLeft":i=t?-r:0;break;case"ArrowRight":i=t?r:0;break;case"ArrowUp":i=t?0:-r;break;case"End":i=100;break;case"Home":i=-100}return i}return null==r?0:function(e,t,n,r,l){let i="horizontal"===n,o=eu(t,l);Q(o,`No resize handle element found for id "${t}"`);let a=o.getAttribute("data-panel-group-id");Q(a,"Resize handle element has no group id attribute");let{initialCursorPosition:u}=r,d=es(n,e),s=ea(a,l);Q(s,`No group element found for id "${a}"`);let c=s.getBoundingClientRect();return(d-u)/(i?c.width:c.height)*100}(e,t,n,r,i)}(t,e,r,l,o,n);if(0===f)return;let p="horizontal"===r;"rtl"===document.dir&&p&&(f=-f);let h=er({delta:f,initialLayout:null!=s?s:u,panelConstraints:d.map(e=>e.constraints),pivotIndices:c,prevLayout:u,trigger:$(t)?"keyboard":"mouse-or-touch"}),m=!ef(u,h);if((k(t)||C(t))&&M.current!=f){var v,g;(M.current=f,m)?_.set(e,0):p?(v=f<0?F:T,_.set(e,v)):(g=f<0?G:H,_.set(e,g))}m&&(N(h),R.current.layout=h,a&&a(h),ec(d,h,P.current))},[]),K=d((e,t)=>{let{onLayout:n}=D.current,{layout:r,panelDataArray:l}=R.current,i=l.map(e=>e.constraints),{panelSize:o,pivotIndices:a}=eS(l,e,r);Q(null!=o,`Panel size not found for panel "${e.id}"`);let u=er({delta:eE(l,e)===l.length-1?o-t:t-o,initialLayout:r,panelConstraints:i,pivotIndices:a,prevLayout:r,trigger:"imperative-api"});ef(r,u)||(N(u),R.current.layout=u,n&&n(u),ec(l,u,P.current))},[]),U=d((e,t)=>{let{layout:n,panelDataArray:r}=R.current,{collapsedSize:l=0,collapsible:i}=t,{collapsedSize:o=0,collapsible:a,maxSize:u=100,minSize:d=0}=e.constraints,{panelSize:s}=eS(r,e,n);null!=s&&(i&&a&&s===l?l!==o&&K(e,o):s<d?K(e,d):s>u&&K(e,u))},[K]),V=d((e,t)=>{let{direction:n}=D.current,{layout:r}=R.current;if(!E.current)return;let l=eu(e,E.current);Q(l,`Drag handle element not found for id "${e}"`);let i=es(n,t);L({dragHandleId:e,dragHandleRect:l.getBoundingClientRect(),initialCursorPosition:i,initialLayout:r})},[]),Z=d(()=>{L(null)},[]),ee=d(e=>{let{panelDataArray:t}=R.current,n=eE(t,e);n>=0&&(t.splice(n,1),delete P.current[e.id],R.current.panelDataArrayChanged=!0)},[]),en=h(()=>({collapsePanel:O,direction:r,dragState:S,expandPanel:B,getPanelSize:W,getPanelStyle:j,groupId:x,isPanelCollapsed:J,isPanelExpanded:q,reevaluatePanelConstraints:U,registerPanel:X,registerResizeHandle:Y,resizePanel:K,startDragging:V,stopDragging:Z,unregisterPanel:ee,panelGroupElement:E.current}),[O,S,r,B,W,j,x,J,q,U,X,Y,K,V,Z,ee]);return i(y.Provider,{value:en},i(w,{...b,children:t,className:n,id:o,ref:E,style:{display:"flex",flexDirection:"horizontal"===r?"row":"column",height:"100%",overflow:"hidden",width:"100%",...g},"data-panel-group":"","data-panel-group-direction":r,"data-panel-group-id":x}))}let ex=u((e,t)=>i(ez,{...e,forwardedRef:t}));function eE(e,t){return e.findIndex(e=>e===t||e.id===t.id)}function eS(e,t,n){let r=eE(e,t),l=r===e.length-1,i=n[r];return{...t.constraints,panelSize:i,pivotIndices:l?[r-1,r]:[r,r+1]}}function eL({children:e=null,className:t="",disabled:n=!1,hitAreaMargins:r,id:l,onDragging:o,style:a={},tabIndex:u=0,tagName:d="div",...f}){let h=m(null),g=m({onDragging:o});c(()=>{g.current.onDragging=o});let w=s(y);if(null===w)throw Error("PanelResizeHandle components must be rendered within a PanelGroup container");let{direction:b,groupId:x,registerResizeHandle:E,startDragging:S,stopDragging:L,panelGroupElement:I}=w,$=z(l),[k,C]=v("inactive"),[N,P]=v(!1),[A,M]=v(null),D=m({state:k});return p(()=>{D.current.state=k}),c(()=>{if(n)M(null);else{let e=E($);M(()=>e)}},[n,$,E]),c(()=>{var e,t;if(n||null==A)return;let l=h.current;return Q(l,"Element ref not attached"),function(e,t,n,r,l){var i;let{ownerDocument:o}=t,a={direction:n,element:t,hitAreaMargins:r,setResizeHandlerState:l},u=null!==(i=j.get(o))&&void 0!==i?i:0;return j.set(o,u+1),J.add(a),V(),function(){var t;_.delete(e),J.delete(a);let n=null!==(t=j.get(o))&&void 0!==t?t:1;j.set(o,n-1),V(),1===n&&j.delete(o)}}($,l,b,{coarse:null!==(e=null==r?void 0:r.coarse)&&void 0!==e?e:15,fine:null!==(t=null==r?void 0:r.fine)&&void 0!==t?t:5},(e,t,n)=>{if(t)switch(e){case"down":{C("drag"),S($,n);let{onDragging:e}=g.current;e&&e(!0);break}case"move":{let{state:e}=D.current;"drag"!==e&&C("hover"),A(n);break}case"up":{C("hover"),L();let{onDragging:e}=g.current;e&&e(!1)}}else C("inactive")})},[b,n,r,E,$,A,S,L]),!function({disabled:e,handleId:t,resizeHandler:n,panelGroupElement:r}){c(()=>{if(e||null==n||null==r)return;let l=eu(t,r);if(null==l)return;let i=e=>{if(!e.defaultPrevented)switch(e.key){case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"End":case"Home":e.preventDefault(),n(e);break;case"F6":{e.preventDefault();let n=l.getAttribute("data-panel-group-id");Q(n,`No group element found for id "${n}"`);let i=el(n,r),o=ei(n,t,r);Q(null!==o,`No resize element found for id "${t}"`);let a=e.shiftKey?o>0?o-1:i.length-1:o+1<i.length?o+1:0;i[a].focus()}}};return l.addEventListener("keydown",i),()=>{l.removeEventListener("keydown",i)}},[r,e,t,n])}({disabled:n,handleId:$,resizeHandler:A,panelGroupElement:I}),i(d,{...f,children:e,className:t,id:l,onBlur:()=>P(!1),onFocus:()=>P(!0),ref:h,role:"separator",style:{touchAction:"none",userSelect:"none",...a},tabIndex:u,"data-panel-group-direction":b,"data-panel-group-id":x,"data-resize-handle":"","data-resize-handle-active":"drag"===k?"pointer":N?"keyboard":void 0,"data-resize-handle-state":k,"data-panel-resize-handle-enabled":!n,"data-panel-resize-handle-id":$})}ez.displayName="PanelGroup",ex.displayName="forwardRef(PanelGroup)",eL.displayName="PanelResizeHandle"},1014:function(e,t,n){n.d(t,{f:function(){return s}});var r=n(2110),l=n(2265),i=n(9586);let o="horizontal",a=["horizontal","vertical"],u=(0,l.forwardRef)((e,t)=>{let{decorative:n,orientation:a=o,...u}=e,s=d(a)?a:o;return(0,l.createElement)(i.WV.div,(0,r.Z)({"data-orientation":s},n?{role:"none"}:{"aria-orientation":"vertical"===s?s:void 0,role:"separator"},u,{ref:t}))});function d(e){return a.includes(e)}u.propTypes={orientation(e,t,n){let r=e[t],l=String(r);return r&&!d(r)?Error(`Invalid prop \`orientation\` of value \`${l}\` supplied to \`${n}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${o}\`.`):null}};let s=u}}]);