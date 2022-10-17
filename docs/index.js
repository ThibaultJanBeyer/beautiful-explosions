var f,D=new Uint8Array(16);function h(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(D)}var o=[];for(let t=0;t<256;++t)o.push((t+256).toString(16).slice(1));function M(t,e=0){return(o[t[e+0]]+o[t[e+1]]+o[t[e+2]]+o[t[e+3]]+"-"+o[t[e+4]]+o[t[e+5]]+"-"+o[t[e+6]]+o[t[e+7]]+"-"+o[t[e+8]]+o[t[e+9]]+"-"+o[t[e+10]]+o[t[e+11]]+o[t[e+12]]+o[t[e+13]]+o[t[e+14]]+o[t[e+15]]).toLowerCase()}var C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),x={randomUUID:C};function R(t,e,r){if(x.randomUUID&&!e&&!t)return x.randomUUID();t=t||{};let n=t.random||(t.rng||h)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,e){r=r||0;for(let l=0;l<16;++l)e[r+l]=n[l];return e}return M(n)}var $=R;var u=(t,e)=>{for(let r in e)if(Object.prototype.hasOwnProperty.call(e,r)){let n=e[r];t.style[r]=n}},p=({tag:t="",classList:e="",value:r="",appendElement:n,style:l})=>{let d=document.createElement(t);return d.className=e,d.innerHTML=r,l&&u(d,l),n?.append(d),d};var m=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;var U=({element:t,eventListener:e="click",content:r,particles:n,areaSize:l,isAppearing:d})=>{class T extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"}),p({tag:"style",appendElement:this.shadowRoot,value:`
        .circle { border-radius: 50% }

        .bubble {
          position: absolute;
          border: 2px solid red;
          transform: scale(0, 0);
          z-index: 1;
        }

        ${r?`
              .bubble { border: 0 }
              .bubble::before { content: ${r} }
            `:""}
      `}),d?u(t,{transform:`${t.style.transform||""} scale(1, 0)`,opacity:"0",transformOrigin:n?.direction==="up"?"bottom":n?.direction==="down"?"top":"middle",transition:`
          ${t.style.transition?`${t.style.transition},`:""}
          opacity ${200}ms ease-in-out ${800/6}ms, 
          transform ${200}ms ease-in-out ${800/6}ms,
          font-size ${200}ms ease-in-out ${800/6}ms`}):u(t,{transition:`
          ${t.style.transition?`${t.style.transition},`:""}
          opacity ${200}ms ease-in-out, 
          transform ${200}ms ease-in-out,
          font-size ${200}ms ease-in-out`,transformOrigin:n?.direction==="up"?"top":n?.direction==="down"?"bottom":"middle"}),this.container=p({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}randomTranslateInt=(i,a,s)=>m(a/2,l&&l[i]||Math.max(s.width,50));trigger=async()=>{let i=t.getBoundingClientRect(),a=n?.amount||25;p({tag:"style",appendElement:this.shadowRoot,value:this.getBubbleCss(a,i)}),d?u(t,{transform:t.style.transform.replace("scale(1, 0)","scale(1, 1)"),opacity:"1"}):u(t,{transform:`${t.style.transform} scale(0, 0)`,pointerEvents:"none"}),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(a).fill(null).map(()=>this.spawnBubble(i)))};getBubbleCss=(i,a)=>{let s=n?.size||Math.max(Math.min(a.height,a.width),25);console.log(s);let w="";for(let c=0;c<i;c++){let b=m(1,s),g=m(0,360),S=this.randomTranslateInt("y",s,a),y=this.randomTranslateInt("x",s,a),I=0,L=0;(n?.direction==="up"||n?.direction==="down")&&(g=0,y-=this.randomTranslateInt("x",s,a),L=y,n?.direction==="up"&&(S*=-1)),w+=`
          .bubble:nth-child(${c}) {
            width: ${b}px;
            height: ${b}px;
            font-size: ${b}px;
            animation-duration: ${800-m(0,750)}ms;
            animation-name: bMove--${c};
            animation-delay: 100ms;
          }

          @keyframes bMove--${c} {
            0% { transform: rotate(${g}deg) translate3d(${L}px, ${I}px, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${g}deg)
                translate3d(
                  ${y}px,
                  ${S}px,
                  1px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}return w};spawnBubble=i=>new Promise(a=>{let s=p({tag:"span",classList:"bubble",style:{top:i.top+i.height/2+"px",left:i.left+i.width/2+"px",borderColor:this.colors[m(0,this.colors.length-1)]}});m(0,1)===0&&s.classList.add("circle"),this.container.appendChild(s),setTimeout(()=>{this.container.removeChild(s),a("ok")},800)})}let E=`ba-bubble-explosion-${$()}`;customElements.define(E,T);let v=p({tag:E});return document.body.append(v),{trigger:v.trigger}};export{U as BubbleExplosion};
//# sourceMappingURL=index.js.map
