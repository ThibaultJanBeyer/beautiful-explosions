var u,S=new Uint8Array(16);function g(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(S)}var o=[];for(let t=0;t<256;++t)o.push((t+256).toString(16).slice(1));function v(t,e=0){return(o[t[e+0]]+o[t[e+1]]+o[t[e+2]]+o[t[e+3]]+"-"+o[t[e+4]]+o[t[e+5]]+"-"+o[t[e+6]]+o[t[e+7]]+"-"+o[t[e+8]]+o[t[e+9]]+"-"+o[t[e+10]]+o[t[e+11]]+o[t[e+12]]+o[t[e+13]]+o[t[e+14]]+o[t[e+15]]).toLowerCase()}var L=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),h={randomUUID:L};function $(t,e,n){if(h.randomUUID&&!e&&!t)return h.randomUUID();t=t||{};let r=t.random||(t.rng||g)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,e){n=n||0;for(let i=0;i<16;++i)e[n+i]=r[i];return e}return v(r)}var y=$;var b=(t,e)=>{for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)){let r=e[n];t.style[n]=r}},p=({tag:t="",classList:e="",value:n="",appendElement:r,style:i})=>{let l=document.createElement(t);return l.className=e,l.innerHTML=n,i&&b(l,i),r?.append(l),l};var s=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;var w=({element:t,eventListener:e="click",content:n})=>{class l extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"});let c=`
        .circle { border-radius: 50% }

        .bubble {
          position: absolute;
          border: 2px solid red;
          transform: scale(0, 0);
          z-index: 1;
        }

        ${n?`
              .bubble { border: 0 }
              .bubble::before { content: '${n}' }
            `:""}
      `;for(let d=0;d<25;d++){let f=Math.min(t.offsetHeight,t.offsetWidth),a=1+s(0,f),m=s(0,360);c+=`
          .bubble:nth-child(${d}) {
            width: ${a}px;
            height: ${a}px;
            font-size: ${a}px;
            animation-duration: ${800-s(0,750)}ms;
            animation-name: bMove--${d};
            animation-delay: 100ms;
          }
          @keyframes bMove--${d} {
            0% { transform: rotate(${m}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${m}deg)
                translate(
                  ${s(0,Math.max(t.offsetWidth,50))}px,
                  ${s(0,Math.max(t.offsetWidth,50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}p({tag:"style",appendElement:this.shadowRoot,value:c}),this.container=p({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}trigger=async()=>{b(t,{transition:`
          opacity ${200}ms ease-in-out, 
          transform ${200}ms ease-in-out,
          font-size ${200}ms ease-in-out`,transform:`${t.style.transform||""} scale(0, 0)`,transformOrigin:"center",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(25).fill(!0).map(()=>this.createBubble(t)))};createBubble=c=>new Promise(d=>{let f=!1,a=c.getBoundingClientRect(),m=p({tag:"span",classList:"bubble",style:{top:a.top+a.height/2+"px",left:a.left+a.width/2+"px",borderColor:this.colors[s(0,this.colors.length-1)]}});s(0,1)===0&&m.classList.add("circle"),this.container.appendChild(m),setTimeout(()=>{f||(this.container.removeChild(m),d("ok"))},800)})}let x=`ba-bubble-explosion-${y()}`;customElements.define(x,l);let E=p({tag:x});return document.body.append(E),{trigger:E.trigger}};export{w as BubbleExplosion};
//# sourceMappingURL=index.js.map
