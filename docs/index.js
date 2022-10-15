// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

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
      if (eventListener)
        element.addEventListener(eventListener, this.trigger);
    }
    trigger = () => {
      for (let j = 0; j < 30; j++)
        this.createBubble(element);
      updateStyle(element, {
        transition: "opacity 200ms ease-in-out, transform 200ms ease-in-out, font-size 200ms ease-in-out",
        transform: "scale(0, 0) translate(50%, 50%)",
        pointerEvents: "none"
      });
      setTimeout(() => element.style.display = "none", 200);
      if (eventListener)
        element.removeEventListener(eventListener, this.trigger);
    };
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
  const componentName = `ba-bubble-explosion-${v4_default()}`;
  customElements.define(componentName, BE);
  const shadowElement = createElement({ tag: componentName });
  document.body.append(shadowElement);
  return {
    trigger: () => shadowElement.trigger()
  };
};
export {
  BubbleExplosion
};
//# sourceMappingURL=index.js.map
