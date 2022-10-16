var u,w=new Uint8Array(16);function f(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(w)}var n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function x(t,e=0){return(n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]).toLowerCase()}var S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),h={randomUUID:S};function M(t,e,c){if(h.randomUUID&&!e&&!t)return h.randomUUID();t=t||{};let o=t.random||(t.rng||f)();if(o[6]=o[6]&15|64,o[8]=o[8]&63|128,e){c=c||0;for(let d=0;d<16;++d)e[c+d]=o[d];return e}return x(o)}var g=M;var $=({element:t,eventListener:e="click",content:c})=>{function o(m,a){return Math.floor(Math.random()*(a-m+1))+m}function d(m,a){for(let r in a)if(Object.prototype.hasOwnProperty.call(a,r)){let l=a[r];m.style[r]=l}}function p({tag:m="",classList:a="",value:r="",appendElement:l,style:s}){let i=document.createElement(m);return i.className=a,i.innerHTML=r,s&&d(i,s),l?.append(i),i}class E extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"});let a=`
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

        ${c?`
          .bubble {
            border: 0;
          }

          .bubble::before {
            content: '${c}';
          }
        `:""}
      `;for(let r=0;r<25;r++){let l=Math.min(t.offsetHeight,t.offsetWidth),s=1+o(0,l),i=o(0,360);a+=`
          .bubble:nth-child(${r}) {
            width: ${s}px;
            height: ${s}px;
            font-size: ${s}px;
            animation-duration: ${800-o(0,750)}ms;
            animation-name: bMove--${r};
            animation-delay: 100ms;
          }
          @keyframes bMove--${r} {
            0% { transform: rotate(${i}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${i}deg)
                translate(
                  ${o(0,Math.max(t.offsetWidth,50))}px,
                  ${o(0,Math.max(t.offsetWidth,50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}p({tag:"style",appendElement:this.shadowRoot,value:a}),this.container=p({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}trigger=async()=>{d(t,{transition:"opacity 200ms ease-in-out, transform 200ms ease-in-out, font-size 200ms ease-in-out",transform:`${t.style.transform||""} scale(0, 0)`,transformOrigin:"center",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(30).fill(!0).map(()=>this.createBubble(t)))};createBubble=a=>new Promise(r=>{let l=!1,s=a.getBoundingClientRect(),i=p({tag:"span",classList:"bubble",style:{top:s.top+s.height/2+"px",left:s.left+s.width/2+"px",borderColor:this.colors[o(0,this.colors.length-1)]}});o(0,1)===0&&i.classList.add("circle"),this.container.appendChild(i),i.addEventListener("animationend",v=>{l=!0,this.container.removeChild(i),r(v)}),setTimeout(()=>{l||(this.container.removeChild(i),r("ok"))},1e3)})}let y=`ba-bubble-explosion-${g()}`;customElements.define(y,E);let b=p({tag:y});return document.body.append(b),{trigger:b.trigger}};export{$ as BubbleExplosion};
//# sourceMappingURL=index.js.map
