(this.webpackJsonpykring=this.webpackJsonpykring||[]).push([[6],{295:function(e,t,n){"use strict";n.r(t);var c=n(22),r=n(0),i=n(23),s=n(24),l=n(68),o=n(1);t.default=function(){var e=Object(r.useState)(!0),t=Object(c.a)(e,2),n=t[0],a=t[1],u=Object(i.c)((function(e){return e.user})),d=u.age,x=u.gender,j=u.job,h=u.adj,f=u.location,p=u.articleImgSrc,m=u.displayName,g=u.introText,b=u.profileImgSrc,y=Object(i.b)(),O=Object(r.useCallback)((function(e){e.preventDefault();var t=new FileReader;t.onload=function(e){y(l.q(e.target.result))};var n=e.target.files[0];t.readAsDataURL(n)}),[]);return Object(o.jsx)("div",{className:"w-full",children:Object(o.jsxs)(s.a,{invitement:!0,footerNone:!0,children:[Object(o.jsxs)("section",{style:{height:"310px"},className:"px-3 py-3 mx-3",children:[Object(o.jsxs)("div",{className:"flex flex-row items-center justify-between",children:[Object(o.jsx)("img",{style:{width:80,height:80,marginRight:30,borderRadius:100,backgroundColor:"gray"},src:b}),Object(o.jsxs)("div",{className:"text-center mx-2",children:[Object(o.jsx)("h3",{style:{margin:5},children:"1"}),Object(o.jsx)("p",{className:"text-sm",children:"\uac8c\uc2dc\ubb3c\x1c"})]}),Object(o.jsxs)("div",{className:"text-center mx-2",children:[Object(o.jsx)("h3",{style:{margin:5},children:"0"}),Object(o.jsx)("p",{className:"text-sm",children:"\uce5c\uad6c"})]}),Object(o.jsxs)("div",{className:"text-center mx-2",children:[Object(o.jsx)("img",{style:{width:23,height:23,margin:5},src:"heart-red.png",alt:"heart"}),Object(o.jsx)("p",{className:"text-sm",children:"180"})]})]}),Object(o.jsxs)("div",{className:"mt-5 mb-2",children:[Object(o.jsxs)("h3",{className:"my-1 text-lg",children:[h," ",j,Object(o.jsx)("span",{className:"text-lg mx-1 font-light",children:m})]}),Object(o.jsxs)("div",{className:"flex flex-row",children:[Object(o.jsx)("div",{style:{height:25,backgroundColor:"#CCF6FF",margin:"0 5px 0 0"},children:Object(o.jsx)("p",{style:{fontSize:"8px",color:"#8D8D8D",padding:"7px"},children:x})}),Object(o.jsx)("div",{style:{height:25,backgroundColor:"#EEEEEE",margin:"0 5px"},children:Object(o.jsx)("p",{style:{fontSize:"8px",color:"#8D8D8D",padding:"7px"},children:f})}),Object(o.jsx)("div",{style:{height:25,backgroundColor:"#EEEEEE",margin:"0 5px"},children:Object(o.jsx)("p",{style:{fontSize:"8px",color:"#8D8D8D",padding:"7px"},children:d})})]})]}),Object(o.jsx)("p",{className:"text-sm",children:g}),Object(o.jsxs)("ul",{className:"mb-2",children:[Object(o.jsxs)("li",{className:"flex flex-row text-sm text-gray-500",children:[Object(o.jsx)("img",{style:{width:15,height:15},src:"/school.svg",alt:"univ"}),Object(o.jsx)("p",{className:" font-extrabold mx-2",children:"\uace0\ub824\ub300"}),Object(o.jsx)("span",{children:"\uc7ac\ud559\uc911"})]}),Object(o.jsxs)("li",{className:"flex flex-row text-sm text-gray-500",children:[Object(o.jsx)("img",{style:{width:15,height:15},src:"/bag-remove.svg",alt:"univ"}),Object(o.jsx)("p",{className:"font-extrabold mx-2",children:"\uc5f0\uace0\ub9c1"}),Object(o.jsx)("span",{children:"\uc7ac\uc9c1\uc911"})]}),Object(o.jsxs)("li",{className:"flex flex-row text-sm text-gray-500",children:[Object(o.jsx)("img",{style:{width:10,height:10,marginLeft:2,marginTop:3},src:"/ellipsis-horizontal-outline.svg",alt:"\ub354\ubcf4\uae30"}),Object(o.jsx)("p",{className:"font-extrabold mx-2"}),Object(o.jsx)("span",{children:"\ub354\ubcf4\uae30"})]}),Object(o.jsxs)("div",{className:"w-full text-right relative",children:[Object(o.jsx)("label",{htmlFor:"file",className:"inline-block",style:{position:"absolute",right:0,backgroundColor:"#FF6600",padding:"6px 25px",borderRadius:4,color:"white",cursor:"pointer"},children:"\ud504\ub85c\ud544 \ubcc0\uacbd"}),Object(o.jsx)("input",{onChange:function(e){return O(e)},type:"file",name:"file",id:"file",accept:"impage/*",style:{visibility:"hidden",width:0}})]})]})]}),Object(o.jsx)("section",{style:{height:"100%",borderBottom:"1px solid #ccc"},className:"pb-3",children:Object(o.jsxs)("ul",{className:"w-full flex flex-row justify-around",children:[Object(o.jsx)("li",{onClick:function(){return a(!0)},style:{fontWeight:n?"bold":null},className:"cursor-pointer",children:"\ub0b4 \ud65c\ub3d9"}),Object(o.jsx)("li",{onClick:function(){return a(!1)},style:{fontWeight:n?null:"bold"},className:"cursor-pointer",children:"INTEREST"}),Object(o.jsx)("li",{className:"font-bold px-5"})]})}),Object(o.jsx)("section",{style:{minHeight:"300px"},className:"flex flex-col justify-center items-center",children:p?Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{style:{minHeight:300},className:"grid grid-cols-3 grid-rows-3 w-full",children:n?Object(o.jsx)("div",{children:Object(o.jsx)("img",{className:"bg-black",src:p,alt:"article-image"})}):null})}):Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("img",{src:"/add-circle-outline.svg",alt:"add-circle",style:{width:150,height:150}}),Object(o.jsx)("p",{className:"px-5 ",children:"\uc815\uc2dd \uc11c\ube44\uc2a4\ub294 20\uc77c\ub0a0 \uc2dc\uc791\ud569\ub2c8\ub2e4. \uc77c\uae30\uc7a5\ucc98\ub7fc \uc0ac\uc6a9\ud574\ubcf4\uc138\uc694 :) "})]})})]})})}},68:function(e,t,n){"use strict";n.d(t,"l",(function(){return a})),n.d(t,"m",(function(){return x})),n.d(t,"e",(function(){return h})),n.d(t,"b",(function(){return j})),n.d(t,"i",(function(){return f})),n.d(t,"a",(function(){return p})),n.d(t,"j",(function(){return m})),n.d(t,"c",(function(){return g})),n.d(t,"d",(function(){return b})),n.d(t,"n",(function(){return N})),n.d(t,"o",(function(){return v})),n.d(t,"h",(function(){return w})),n.d(t,"g",(function(){return y})),n.d(t,"k",(function(){return k})),n.d(t,"f",(function(){return I})),n.d(t,"p",(function(){return C})),n.d(t,"q",(function(){return E}));var c=n(3),r=n(95),i=n.n(r),s=i.a.create({baseURL:"https://ykring.herokuapp.com",withCredentials:!1}),l=i.a.create({baseURL:"https://ykring.herokuapp.com",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json","Access-Control-Allow-Origin":"*"}}),o=function(){return{type:c.p}},a=function(e,t){return function(n){n({type:c.q});var r={email:e};s.post("/email",r).then((function(r){console.log(r);var i=r.data.success;n(i?function(e,t){return{type:c.r,email:e,univ:t}}(e,t):o())})).catch((function(e){console.log(e),alert("\ub124\ud2b8\uc6cc\ud06c \ud639\uc740 \uc11c\ubc84\uc5d0 \uc77c\uc2dc\uc801\uc778 \uc624\ub958\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),n(o())}))}},u=function(){return{type:c.l}},d=function(){return{type:c.m}},x=function(e){return function(t){t({type:c.n});var n={email:e};s.post("/check/email",n).then((function(e){console.log(e),e.data.success?(t({type:c.o}),t(d())):(t(u()),t(d()))})).catch((function(e){console.log(e),t(u()),t(d()),alert("\ub124\ud2b8\uc6cc\ud06c \ud639\uc740 \uc11c\ubc84\uc5d0 \uc77c\uc2dc\uc801\uc778 \uc624\ub958\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694")}))}},j=function(e){return{type:c.b,age:e}},h=function(e){return{type:c.e,gender:e}},f=function(e){return{type:c.i,job:e}},p=function(e){return{type:c.a,adj:e}},m=function(e){return{type:c.j,location:e}},g=function(e){return{type:c.c,articleImgSrc:e}},b=function(e){return{type:c.d,articleText:e}},y=function(e){return{type:c.g,interestArr:e}},O=function(){return{type:c.s}},v=function(){return{type:c.t}},N=function(e){return function(t){t({type:c.u});var n={displayName:e};s.post("/check/name",n).then((function(n){console.log(n);var r=n.data.success;t(r?function(e){return{type:c.v,displayName:e}}(e):O())})).catch((function(e){console.log(e),t(O()),alert("\ub124\ud2b8\uc6cc\ud06c \ud639\uc740 \uc11c\ubc84\uc5d0 \uc77c\uc2dc\uc801\uc778 \uc624\ub958\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694")}))}},w=function(e){return{type:c.h,introText:e}},k=function(e){return{type:c.k,ProfileImgSrc:e}},I=function(e){return{type:c.f,instagramId:e}},R=function(){return{type:c.x}},C=function(e,t,n,r,i,s,o,a,u,d,x,j){return function(h){h({type:c.y});var f={genderInRedux:e,ageInRedux:t,jobInRedux:n,adjInRedux:r,locationInRedux:i,articleImgSrcInRedux:s,articleTextInRedux:o,displayNameInRedux:a,interestArrInRedux:u,introTextInRedux:d,profileImgSrcInRedux:x,instagramIdInRedux:j};console.log(t),l.post("/pre/user",f).then((function(e){console.log(e);var t=e.data.success;h(t?{type:c.z}:R())})).catch((function(e){console.log(e),h(R())}))}},E=function(e){return function(t){t(function(e){return{type:c.A,updatedProfileImg:e}}(e))}}}}]);
//# sourceMappingURL=6.c0032e2e.chunk.js.map