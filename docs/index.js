var c,S=new Uint8Array(16);function f(){if(!c&&(c=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!c))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return c(S)}var o=[];for(let t=0;t<256;++t)o.push((t+256).toString(16).slice(1));function x(t,e=0){return(o[t[e+0]]+o[t[e+1]]+o[t[e+2]]+o[t[e+3]]+"-"+o[t[e+4]]+o[t[e+5]]+"-"+o[t[e+6]]+o[t[e+7]]+"-"+o[t[e+8]]+o[t[e+9]]+"-"+o[t[e+10]]+o[t[e+11]]+o[t[e+12]]+o[t[e+13]]+o[t[e+14]]+o[t[e+15]]).toLowerCase()}var w=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),h={randomUUID:w};function L(t,e,p){if(h.randomUUID&&!e&&!t)return h.randomUUID();t=t||{};let i=t.random||(t.rng||f)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,e){p=p||0;for(let d=0;d<16;++d)e[p+d]=i[d];return e}return x(i)}var y=L;var M=({element:t,eventListener:e="click",content:p})=>{function i(m,n){return Math.floor(Math.random()*(n-m+1))+m}function d(m,n){for(let r in n)if(Object.prototype.hasOwnProperty.call(n,r)){let s=n[r];m.style[r]=s}}function u({tag:m="",classList:n="",value:r="",appendElement:s,style:a}){let l=document.createElement(m);return l.className=n,l.innerHTML=r,a&&d(l,a),s?.append(l),l}class v extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"});let n=`
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
      `;for(let r=0;r<25;r++){let s=Math.min(t.offsetHeight,t.offsetWidth),a=1+i(0,s),l=i(0,360);n+=`
          .bubble:nth-child(${r}) {
            width: ${a}px;
            height: ${a}px;
            font-size: ${a}px;
            animation-duration: ${800-i(0,750)}ms;
            animation-name: bMove--${r};
            animation-delay: 100ms;
          }
          @keyframes bMove--${r} {
            0% { transform: rotate(${l}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${l}deg)
                translate(
                  ${i(0,Math.max(t.offsetWidth,50))}px,
                  ${i(0,Math.max(t.offsetWidth,50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}u({tag:"style",appendElement:this.shadowRoot,value:n}),this.container=u({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}trigger=async()=>{d(t,{transition:"opacity 200ms ease-in-out, transform 200ms ease-in-out, font-size 200ms ease-in-out",transform:"scale(0, 0) translate(50%, 50%)",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(30).fill(!0).map(()=>this.createBubble(t)))};createBubble=n=>new Promise(r=>{let s=!1,a=u({tag:"span",classList:"bubble",style:{top:n.offsetTop+n.offsetHeight/2+"px",left:n.offsetLeft+n.offsetWidth/2+"px",borderColor:this.colors[i(0,this.colors.length-1)]}});i(0,1)===0&&a.classList.add("circle"),this.container.appendChild(a),a.addEventListener("animationend",E=>{s=!0,this.container.removeChild(a),r(E)}),setTimeout(()=>{s||(this.container.removeChild(a),r("ok"))},1e3)})}let b=`ba-bubble-explosion-${y()}`;customElements.define(b,v);let g=u({tag:b});return document.body.append(g),{trigger:g.trigger}};export{M as BubbleExplosion};
//# sourceMappingURL=index.js.map
