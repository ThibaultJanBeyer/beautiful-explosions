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

// src/helpers/dom-element.ts
var updateStyle = (el, style) => {
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const value = style[key];
      el.style[key] = value;
    }
  }
};
var createElement = ({
  tag = "",
  classList = "",
  value = "",
  appendElement,
  style
}) => {
  const el = document.createElement(tag);
  el.className = classList;
  el.innerHTML = value;
  if (style)
    updateStyle(el, style);
  if (appendElement != null)
    appendElement.append(el);
  return el;
};

// src/helpers/random.ts
var randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// src/BubbleExplosion.ts
var BubbleExplosion = ({
  element,
  eventListener = "click",
  content,
  particles,
  areaSize,
  isAppearing
}) => {
  const duration = 800;
  const elementLifeSpan = duration / 4;
  class BE extends HTMLElement {
    colors = ["#D81CB8", "#05A542", "#DE215F", "#1CD8CE", "#1B3F3D"];
    container;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      createElement({
        tag: "style",
        appendElement: this.shadowRoot,
        value: `
        .circle { border-radius: 50% }

        .bubble {
          position: absolute;
          border: 2px solid red;
          transform: scale(0, 0);
          z-index: 1;
        }

        ${content ? `
              .bubble { border: 0 }
              .bubble::before { content: ${content} }
            ` : ""}
      `
      });
      if (isAppearing)
        updateStyle(element, {
          transform: `${element.style.transform || ""} scale(1, 0)`,
          opacity: "0",
          transformOrigin: particles?.direction === "up" ? "bottom" : particles?.direction === "down" ? "top" : "middle",
          transition: `
          ${element.style.transition ? `${element.style.transition},` : ""}
          opacity ${elementLifeSpan}ms ease-in-out ${duration / 6}ms, 
          transform ${elementLifeSpan}ms ease-in-out ${duration / 6}ms,
          font-size ${elementLifeSpan}ms ease-in-out ${duration / 6}ms`
        });
      else
        updateStyle(element, {
          transition: `
          ${element.style.transition ? `${element.style.transition},` : ""}
          opacity ${elementLifeSpan}ms ease-in-out, 
          transform ${elementLifeSpan}ms ease-in-out,
          font-size ${elementLifeSpan}ms ease-in-out`,
          transformOrigin: particles?.direction === "up" ? "top" : particles?.direction === "down" ? "bottom" : "middle"
        });
      this.container = createElement({
        tag: "div",
        appendElement: this.shadowRoot
      });
      if (eventListener)
        element.addEventListener(eventListener, this.trigger);
    }
    randomTranslateInt = (xy, size, rect) => randomInt(
      size / 2,
      areaSize && areaSize[xy] || Math.max(rect.width, 50)
    );
    trigger = async () => {
      const rect = element.getBoundingClientRect();
      const amount = particles?.amount || 25;
      createElement({
        tag: "style",
        appendElement: this.shadowRoot,
        value: this.getBubbleCss(amount, rect)
      });
      if (isAppearing)
        updateStyle(element, {
          transform: element.style.transform.replace(
            "scale(1, 0)",
            "scale(1, 1)"
          ),
          opacity: "1"
        });
      else
        updateStyle(element, {
          transform: `${element.style.transform} scale(0, 0)`,
          pointerEvents: "none"
        });
      if (eventListener)
        element.removeEventListener(eventListener, this.trigger);
      await Promise.all(
        new Array(amount).fill(null).map(() => this.spawnBubble(rect))
      );
    };
    getBubbleCss = (amount, rect) => {
      const size = particles?.size || Math.max(Math.min(rect.height, rect.width), 25);
      let css = "";
      for (let index = 0; index < amount; index++) {
        const temp = randomInt(1, size);
        let tempR = randomInt(0, 360);
        let translateY = this.randomTranslateInt("y", size, rect);
        let translateX = this.randomTranslateInt("x", size, rect);
        let startTranslateY = 0;
        let startTranslateX = 0;
        if (particles?.direction === "up" || particles?.direction === "down") {
          tempR = 0;
          translateX -= this.randomTranslateInt("x", size, rect);
          startTranslateX = translateX;
          if (particles?.direction === "up")
            translateY *= -1;
        }
        css += `
          .bubble:nth-child(${index}) {
            width: ${temp}px;
            height: ${temp}px;
            font-size: ${temp}px;
            animation-duration: ${duration - randomInt(0, 750)}ms;
            animation-name: bMove--${index};
            animation-delay: 100ms;
          }

          @keyframes bMove--${index} {
            0% { transform: rotate(${tempR}deg) translate3d(${startTranslateX}px, ${startTranslateY}px, 0) scale(0, 0); opacity: 1; }
            50% { opacity: 0.7; }
            100% {
              transform:
                rotate(${tempR}deg)
                translate3d(
                  ${translateX}px,
                  ${translateY}px,
                  1px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `;
      }
      return css;
    };
    spawnBubble = (rect) => new Promise((resolve) => {
      const el = createElement({
        tag: "span",
        classList: "bubble",
        style: {
          top: rect.top + rect.height / 2 + "px",
          left: rect.left + rect.width / 2 + "px",
          borderColor: this.colors[randomInt(0, this.colors.length - 1)]
        }
      });
      if (randomInt(0, 1) === 0)
        el.classList.add("circle");
      this.container.appendChild(el);
      setTimeout(() => {
        this.container.removeChild(el);
        resolve("ok");
      }, duration);
    });
  }
  const componentName = `ba-bubble-explosion-${v4_default()}`;
  customElements.define(componentName, BE);
  const shadowElement = createElement({ tag: componentName });
  document.body.append(shadowElement);
  return {
    trigger: shadowElement.trigger
  };
};
export {
  BubbleExplosion
};
//# sourceMappingURL=index.js.map
