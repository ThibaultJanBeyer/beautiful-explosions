var c,D=new Uint8Array(16);function h(){if(!c&&(c=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!c))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return c(D)}var o=[];for(let t=0;t<256;++t)o.push((t+256).toString(16).slice(1));function T(t,e=0){return(o[t[e+0]]+o[t[e+1]]+o[t[e+2]]+o[t[e+3]]+"-"+o[t[e+4]]+o[t[e+5]]+"-"+o[t[e+6]]+o[t[e+7]]+"-"+o[t[e+8]]+o[t[e+9]]+"-"+o[t[e+10]]+o[t[e+11]]+o[t[e+12]]+o[t[e+13]]+o[t[e+14]]+o[t[e+15]]).toLowerCase()}var C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),x={randomUUID:C};function R(t,e,r){if(x.randomUUID&&!e&&!t)return x.randomUUID();t=t||{};let n=t.random||(t.rng||h)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,e){r=r||0;for(let s=0;s<16;++s)e[r+s]=n[s];return e}return T(n)}var y=R;var E=(t,e)=>{for(let r in e)if(Object.prototype.hasOwnProperty.call(e,r)){let n=e[r];t.style[r]=n}},u=({tag:t="",classList:e="",value:r="",appendElement:n,style:s})=>{let m=document.createElement(t);return m.className=e,m.innerHTML=r,s&&E(m,s),n?.append(m),m};var d=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;var U=({element:t,eventListener:e="click",content:r,particles:n,areaSize:s})=>{class M extends HTMLElement{colors=["#D81CB8","#05A542","#DE215F","#1CD8CE","#1B3F3D"];container;constructor(){super(),this.attachShadow({mode:"open"}),u({tag:"style",appendElement:this.shadowRoot,value:`
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
      `}),this.container=u({tag:"div",appendElement:this.shadowRoot}),e&&t.addEventListener(e,this.trigger)}randomTranslateInt=(i,a,l)=>d(a/2,s&&s[i]||Math.max(l.width,50));trigger=async()=>{let i=t.getBoundingClientRect(),a=n?.amount||25;u({tag:"style",appendElement:this.shadowRoot,value:this.getBubbleCss(a,i)}),E(t,{transition:`
          opacity ${200}ms ease-in-out, 
          transform ${200}ms ease-in-out,
          font-size ${200}ms ease-in-out`,transform:`${t.style.transform||""} scale(0, 0)`,transformOrigin:"center",pointerEvents:"none"}),setTimeout(()=>t.style.display="none",200),e&&t.removeEventListener(e,this.trigger),await Promise.all(new Array(a).fill(null).map(()=>this.spawnBubble(i)))};getBubbleCss=(i,a)=>{let l=n?.size||Math.min(a.height,a.width),S="";for(let p=0;p<i;p++){let b=d(1,l),g=d(0,360),$=this.randomTranslateInt("y",l,a),f=this.randomTranslateInt("x",l,a),I=0,L=0;(n?.direction==="up"||n?.direction==="down")&&(g=0,f-=this.randomTranslateInt("x",l,a),L=f,n?.direction==="up"&&($*=-1)),S+=`
          .bubble:nth-child(${p}) {
            width: ${b}px;
            height: ${b}px;
            font-size: ${b}px;
            animation-duration: ${800-d(0,750)}ms;
            animation-name: bMove--${p};
            animation-delay: 100ms;
          }

          @keyframes bMove--${p} {
            0% { transform: rotate(${g}deg) translate3d(${L}px, ${I}px, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${g}deg)
                translate3d(
                  ${f}px,
                  ${$}px,
                  1px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `}return S};spawnBubble=i=>new Promise(a=>{let l=u({tag:"span",classList:"bubble",style:{top:i.top+i.height/2+"px",left:i.left+i.width/2+"px",borderColor:this.colors[d(0,this.colors.length-1)]}});d(0,1)===0&&l.classList.add("circle"),this.container.appendChild(l),setTimeout(()=>{this.container.removeChild(l),a("ok")},800)})}let v=`ba-bubble-explosion-${y()}`;customElements.define(v,M);let w=u({tag:v});return document.body.append(w),{trigger:w.trigger}};export{U as BubbleExplosion};
//# sourceMappingURL=index.js.map
