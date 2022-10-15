var u,E=new Uint8Array(16);function f(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(E)}var n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function x(t,e=0){return(n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]).toLowerCase()}var S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),h={randomUUID:S};function M(t,e,p){if(h.randomUUID&&!e&&!t)return h.randomUUID();t=t||{};let i=t.random||(t.rng||f)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,e){p=p||0;for(let s=0;s<16;++s)e[p+s]=i[s];return e}return x(i)}var y=M;var L=({element:t,eventListener:e="click",content:p})=>{function i(l,o){return Math.floor(Math.random()*(o-l+1))+l}function s(l,o){for(let r in o)if(Object.prototype.hasOwnProperty.call(o,r)){let d=o[r];l.style[r]=d}}function c({tag:l="",classList:o="",value:r="",appendElement:d,style:m}){let a=document.createElement(l);return a.className=o,a.innerHTML=r,m&&s(a,m),d?.append(a),a}class v extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"});let o=`
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
      `;for(let r=0;r<25;r++){let d=Math.min(t.offsetHeight,t.offsetWidth),m=1+i(0,d),a=i(0,360);o+=`
          .bubble:nth-child(${r}) {
            width: ${m}px;
            height: ${m}px;
            font-size: ${m}px;
            animation-duration: ${800-i(0,750)}ms;
            animation-name: bMove--${r};
            animation-delay: 100ms;
          }
          @keyframes bMove--${r} {
            0% { transform: rotate(${a}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${a}deg)
                translate(
                  ${i(0,Math.max(t.offsetWidth,50))}px,
                  ${i(0,Math.max(t.offsetWidth,50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}c({tag:"style",appendElement:this.shadowRoot,value:o}),this.container=c({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}trigger=()=>{for(let o=0;o<30;o++)this.createBubble(t);s(t,{transition:"opacity 200ms ease-in-out, transform 200ms ease-in-out, font-size 200ms ease-in-out",transform:"scale(0, 0) translate(50%, 50%)",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger)};createBubble(o){let r=c({tag:"span",classList:"bubble",style:{top:o.offsetTop+o.offsetHeight/2+"px",left:o.offsetLeft+o.offsetWidth/2+"px",borderColor:this.colors[i(0,this.colors.length-1)]}});i(0,1)===0&&r.classList.add("circle"),this.container.appendChild(r),setTimeout(()=>this.container.removeChild(r),800)}}let b=`ba-bubble-explosion-${y()}`;customElements.define(b,v);let g=c({tag:b});return document.body.append(g),{trigger:()=>g.trigger()}};export{L as BubbleExplosion};
//# sourceMappingURL=index.js.map
