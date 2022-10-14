// src/BubbleExplosion.ts
var BubbleExplosion = ({
  element,
  eventListener = "click",
  content
}) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function updateStyle(el, style) {
    for (const key in style) {
      if (Object.prototype.hasOwnProperty.call(style, key)) {
        const value = style[key];
        el.style[key] = value;
      }
    }
  }
  function createElement({
    tag = "",
    classList = "",
    value = "",
    appendElement,
    style
  }) {
    const el = document.createElement(tag);
    el.className = classList;
    el.innerHTML = value;
    if (style)
      updateStyle(el, style);
    if (appendElement != null)
      appendElement.append(el);
    return el;
  }
  class BE extends HTMLElement {
    colors = ["#D81CB8", "#05A542", "#DE215F", "#1CD8CE", "#1B3F3D"];
    container;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      let css = `
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

        ${content ? `
          .bubble {
            border: 0;
          }

          .bubble::before {
            content: '${content}';
          }
        ` : ""}
      `;
      for (let index = 0; index < 25; index++) {
        const size = Math.min(element.offsetHeight, element.offsetWidth);
        const temp = 1 + random(0, size);
        const tempR = random(0, 360);
        css += `
          .bubble:nth-child(${index}) {
            width: ${temp}px;
            height: ${temp}px;
            font-size: ${temp}px;
            animation-duration: ${800 - random(0, 750)}ms;
            animation-name: bMove--${index};
            animation-delay: 100ms;
          }
          @keyframes bMove--${index} {
            0% { transform: rotate(${tempR}deg) translate(0, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${tempR}deg)
                translate(
                  ${random(0, Math.max(element.offsetWidth, 50))}px,
                  ${random(0, Math.max(element.offsetWidth, 50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `;
      }
      createElement({
        tag: "style",
        appendElement: this.shadowRoot,
        value: css
      });
      this.container = createElement({
        tag: "div",
        appendElement: this.shadowRoot
      });
      element.addEventListener(eventListener, () => {
        for (let j = 0; j < 30; j++)
          this.createBubble(element);
        updateStyle(element, {
          transition: "opacity 200ms ease-in-out, transform 200ms ease-in-out, font-size 200ms ease-in-out",
          transform: "scale(0, 0) translate(50%, 50%)",
          pointerEvents: "none"
        });
        setTimeout(() => element.style.display = "none", 200);
      });
    }
    createBubble(targetEl) {
      const el = createElement({
        tag: "span",
        classList: "bubble",
        style: {
          top: targetEl.offsetTop + targetEl.offsetHeight / 2 + "px",
          left: targetEl.offsetLeft + targetEl.offsetWidth / 2 + "px",
          borderColor: this.colors[random(0, this.colors.length - 1)]
        }
      });
      const typeId = random(0, 1);
      if (typeId === 0)
        el.classList.add("circle");
      this.container.appendChild(el);
      setTimeout(() => this.container.removeChild(el), 800);
    }
  }
  customElements.define("ba-bubble-explosion", BE);
  document.body.append(createElement({ tag: "ba-bubble-explosion" }));
};
export {
  BubbleExplosion
};
//# sourceMappingURL=index.js.map
