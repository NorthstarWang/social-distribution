(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3371:function(e,t,n){Promise.resolve().then(n.t.bind(n,5250,23)),Promise.resolve().then(n.bind(n,1354)),Promise.resolve().then(n.bind(n,2302)),Promise.resolve().then(n.bind(n,5453)),Promise.resolve().then(n.bind(n,9497))},9497:function(e,t,n){"use strict";n.r(t),n.d(t,{Tabs:function(){return s},TabsContent:function(){return c},TabsList:function(){return l},TabsTrigger:function(){return u}});var a=n(7437),r=n(2265),i=n(4694),o=n(2169);let s=i.fC,l=r.forwardRef((e,t)=>{let{className:n,...r}=e;return(0,a.jsx)(i.aV,{ref:t,className:(0,o.cn)("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",n),...r})});l.displayName=i.aV.displayName;let u=r.forwardRef((e,t)=>{let{className:n,...r}=e;return(0,a.jsx)(i.xz,{ref:t,className:(0,o.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",n),...r})});u.displayName=i.xz.displayName;let c=r.forwardRef((e,t)=>{let{className:n,...r}=e;return(0,a.jsx)(i.VY,{ref:t,className:(0,o.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",n),...r})});c.displayName=i.VY.displayName},4694:function(e,t,n){"use strict";n.d(t,{VY:function(){return M},aV:function(){return E},fC:function(){return x},xz:function(){return N}});var a=n(2110),r=n(2265),i=n(4991),o=n(4104),s=n(3715),l=n(2642),u=n(9586),c=n(3876),d=n(9310),f=n(8687);let b="Tabs",[m,v]=(0,o.b)(b,[s.Pc]),g=(0,s.Pc)(),[p,h]=m(b),y=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,value:i,onValueChange:o,defaultValue:s,orientation:l="horizontal",dir:b,activationMode:m="automatic",...v}=e,g=(0,c.gm)(b),[h,y]=(0,d.T)({prop:i,onChange:o,defaultProp:s});return(0,r.createElement)(p,{scope:n,baseId:(0,f.M)(),value:h,onValueChange:y,orientation:l,dir:g,activationMode:m},(0,r.createElement)(u.WV.div,(0,a.Z)({dir:g,"data-orientation":l},v,{ref:t})))}),w=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,loop:i=!0,...o}=e,l=h("TabsList",n),c=g(n);return(0,r.createElement)(s.fC,(0,a.Z)({asChild:!0},c,{orientation:l.orientation,dir:l.dir,loop:i}),(0,r.createElement)(u.WV.div,(0,a.Z)({role:"tablist","aria-orientation":l.orientation},o,{ref:t})))}),V=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,value:o,disabled:l=!1,...c}=e,d=h("TabsTrigger",n),f=g(n),b=T(d.baseId,o),m=_(d.baseId,o),v=o===d.value;return(0,r.createElement)(s.ck,(0,a.Z)({asChild:!0},f,{focusable:!l,active:v}),(0,r.createElement)(u.WV.button,(0,a.Z)({type:"button",role:"tab","aria-selected":v,"aria-controls":m,"data-state":v?"active":"inactive","data-disabled":l?"":void 0,disabled:l,id:b},c,{ref:t,onMouseDown:(0,i.M)(e.onMouseDown,e=>{l||0!==e.button||!1!==e.ctrlKey?e.preventDefault():d.onValueChange(o)}),onKeyDown:(0,i.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&d.onValueChange(o)}),onFocus:(0,i.M)(e.onFocus,()=>{let e="manual"!==d.activationMode;v||l||!e||d.onValueChange(o)})})))}),C=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,value:i,forceMount:o,children:s,...c}=e,d=h("TabsContent",n),f=T(d.baseId,i),b=_(d.baseId,i),m=i===d.value,v=(0,r.useRef)(m);return(0,r.useEffect)(()=>{let e=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,r.createElement)(l.z,{present:o||m},({present:n})=>(0,r.createElement)(u.WV.div,(0,a.Z)({"data-state":m?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":f,hidden:!n,id:b,tabIndex:0},c,{ref:t,style:{...e.style,animationDuration:v.current?"0s":void 0}}),n&&s))});function T(e,t){return`${e}-trigger-${t}`}function _(e,t){return`${e}-content-${t}`}let x=y,E=w,N=V,M=C}},function(e){e.O(0,[310,239,460,277,354,971,69,744],function(){return e(e.s=3371)}),_N_E=e.O()}]);