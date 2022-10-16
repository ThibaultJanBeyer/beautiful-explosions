var u,L=new Uint8Array(16);function g(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(L)}var n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function v(t,e=0){return(n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]).toLowerCase()}var $=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:$};function w(t,e,r){if(b.randomUUID&&!e&&!t)return b.randomUUID();t=t||{};let o=t.random||(t.rng||g)();if(o[6]=o[6]&15|64,o[8]=o[8]&63|128,e){r=r||0;for(let i=0;i<16;++i)e[r+i]=o[i];return e}return v(o)}var h=w;var y=(t,e)=>{for(let r in e)if(Object.prototype.hasOwnProperty.call(e,r)){let o=e[r];t.style[r]=o}},p=({tag:t="",classList:e="",value:r="",appendElement:o,style:i})=>{let d=document.createElement(t);return d.className=e,d.innerHTML=r,i&&y(d,i),o?.append(d),d};var s=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;var M=({element:t,eventListener:e="click",content:r,particlesSize:o,areaSize:i})=>{class S extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"});let c=`
        .circle { border-radius: 50% }

        .bubble {
          position: absolute;
          border: 2px solid red;
          transform: scale(0, 0);
          z-index: 1;
        }

        ${r?`
              .bubble { border: 0 }
              .bubble::before { content: '${r}' }
            `:""}
      `;for(let l=0;l<25;l++){let f=o||Math.min(t.offsetHeight,t.offsetWidth),a=1+s(0,f),m=s(0,360);c+=`
          .bubble:nth-child(${l}) {
            width: ${a}px;
            height: ${a}px;
            font-size: ${a}px;
            animation-duration: ${800-s(0,750)}ms;
            animation-name: bMove--${l};
            animation-delay: 100ms;
          }
          @keyframes bMove--${l} {
            0% { transform: rotate(${m}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${m}deg)
                translate(
                  ${s(0,i||Math.max(t.offsetWidth,50))}px,
                  ${s(0,i||Math.max(t.offsetWidth,50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}p({tag:"style",appendElement:this.shadowRoot,value:c}),this.container=p({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}trigger=async()=>{y(t,{transition:`
          opacity ${200}ms ease-in-out, 
          transform ${200}ms ease-in-out,
          font-size ${200}ms ease-in-out`,transform:`${t.style.transform||""} scale(0, 0)`,transformOrigin:"center",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(25).fill(!0).map(()=>this.createBubble(t)))};createBubble=c=>new Promise(l=>{let f=!1,a=c.getBoundingClientRect(),m=p({tag:"span",classList:"bubble",style:{top:a.top+a.height/2+"px",left:a.left+a.width/2+"px",borderColor:this.colors[s(0,this.colors.length-1)]}});s(0,1)===0&&m.classList.add("circle"),this.container.appendChild(m),setTimeout(()=>{f||(this.container.removeChild(m),l("ok"))},800)})}let x=`ba-bubble-explosion-${h()}`;customElements.define(x,S);let E=p({tag:x});return document.body.append(E),{trigger:E.trigger}};export{M as BubbleExplosion};
//# sourceMappingURL=index.js.map
