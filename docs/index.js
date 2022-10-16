var u,S=new Uint8Array(16);function f(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(S)}var n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function x(t,e=0){return(n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]).toLowerCase()}var w=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),h={randomUUID:w};function L(t,e,p){if(h.randomUUID&&!e&&!t)return h.randomUUID();t=t||{};let r=t.random||(t.rng||f)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,e){p=p||0;for(let d=0;d<16;++d)e[p+d]=r[d];return e}return x(r)}var y=L;var M=({element:t,eventListener:e="click",content:p})=>{function r(m,o){return Math.floor(Math.random()*(o-m+1))+m}function d(m,o){for(let i in o)if(Object.prototype.hasOwnProperty.call(o,i)){let s=o[i];m.style[i]=s}}function c({tag:m="",classList:o="",value:i="",appendElement:s,style:a}){let l=document.createElement(m);return l.className=o,l.innerHTML=i,a&&d(l,a),s?.append(l),l}class v extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"});let o=`
        .element--explode {
          animation-duration: 200ms;
          animation-name: implode;
        }

        @keyframes implode {
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            width: 0;
            height: 0;
            font-size: 0;
            pointer-events: none;
          }
        }

        .circle {
          border-radius: 50%;
        }

        .bubble {
          position: absolute;
          border: 2px solid red;
          transform: scale(0, 0);
          z-index: 1;
        }

        ${p?`
          .bubble {
            border: 0;
          }

          .bubble::before {
            content: '${p}';
          }
        `:""}
      `;for(let i=0;i<25;i++){let s=Math.min(t.offsetHeight,t.offsetWidth),a=1+r(0,s),l=r(0,360);o+=`
          .bubble:nth-child(${i}) {
            width: ${a}px;
            height: ${a}px;
            font-size: ${a}px;
            animation-duration: ${800-r(0,750)}ms;
            animation-name: bMove--${i};
            animation-delay: 100ms;
          }
          @keyframes bMove--${i} {
            0% { transform: rotate(${l}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${l}deg)
                translate(
                  ${r(0,Math.max(t.offsetWidth,50))}px,
                  ${r(0,Math.max(t.offsetWidth,50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}c({tag:"style",appendElement:this.shadowRoot,value:o}),this.container=c({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}trigger=async()=>{d(t,{transition:"opacity 200ms ease-in-out, transform 200ms ease-in-out, font-size 200ms ease-in-out",transform:`${t.style.transform||""} scale(0, 0)`,transformOrigin:"center",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(30).fill(!0).map(()=>this.createBubble(t)))};createBubble=o=>new Promise(i=>{let s=!1,a=c({tag:"span",classList:"bubble",style:{top:o.offsetTop+o.offsetHeight/2+"px",left:o.offsetLeft+o.offsetWidth/2+"px",borderColor:this.colors[r(0,this.colors.length-1)]}});r(0,1)===0&&a.classList.add("circle"),this.container.appendChild(a),a.addEventListener("animationend",E=>{s=!0,this.container.removeChild(a),i(E)}),setTimeout(()=>{s||(this.container.removeChild(a),i("ok"))},1e3)})}let g=`ba-bubble-explosion-${y()}`;customElements.define(g,v);let b=c({tag:g});return(t.parentElement||document.body).append(b),{trigger:b.trigger}};export{M as BubbleExplosion};
//# sourceMappingURL=index.js.map
