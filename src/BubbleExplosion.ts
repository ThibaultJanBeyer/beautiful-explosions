import { v4 as uuidv4 } from 'uuid'
import { updateStyle, createElement } from './helpers/dom-element'
import { randomInt } from './helpers/random'

export const BubbleExplosion = ({
  element,
  eventListener = 'click',
  content,
}: {
  element: HTMLElement
  eventListener?: string
  content?: CSSStyleDeclaration['content']
}): { trigger: () => void } => {
  const duration = 800
  const elementLifeSpan = duration / 4
  class BE extends HTMLElement {
    colors = ['#D81CB8', '#05A542', '#DE215F', '#1CD8CE', '#1B3F3D']

    container: HTMLElement

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })

      let css = /*CSS*/ `
        .circle { border-radius: 50% }

        .bubble {
          position: absolute;
          border: 2px solid red;
          transform: scale(0, 0);
          z-index: 1;
        }

        ${
          content
            ? /*CSS*/ `
              .bubble { border: 0 }
              .bubble::before { content: '${content}' }
            `
            : ''
        }
      `

      for (let index = 0; index < 25; index++) {
        const size = Math.min(element.offsetHeight, element.offsetWidth)
        const temp = 1 + randomInt(0, size)
        const tempR = randomInt(0, 360)
        css += /*CSS*/ `
          .bubble:nth-child(${index}) {
            width: ${temp}px;
            height: ${temp}px;
            font-size: ${temp}px;
            animation-duration: ${duration - randomInt(0, 750)}ms;
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
                  ${randomInt(0, Math.max(element.offsetWidth, 50))}px,
                  ${randomInt(0, Math.max(element.offsetWidth, 50))}px
                )
                scale(1, 1);
              opacity: 0;
            }
          }
        `
      }

      createElement({
        tag: 'style',
        appendElement: this.shadowRoot,
        value: css,
      })

      this.container = createElement({
        tag: 'div',
        appendElement: this.shadowRoot,
      })

      if (eventListener) element.addEventListener(eventListener, this.trigger)
    }

    trigger = async () => {
      updateStyle(element, {
        transition: `
          opacity ${elementLifeSpan}ms ease-in-out, 
          transform ${elementLifeSpan}ms ease-in-out,
          font-size ${elementLifeSpan}ms ease-in-out`,
        transform: `${element.style.transform || ''} scale(0, 0)`,
        transformOrigin: 'center',
        pointerEvents: 'none',
      })
      setTimeout(() => (element.style.display = 'none'), elementLifeSpan)
      if (eventListener)
        element.removeEventListener(eventListener, this.trigger)

      await Promise.all(
        new Array(25).fill(true).map(() => this.createBubble(element))
      )
    }

    createBubble = (targetEl: HTMLElement) =>
      new Promise((resolve) => {
        let resolved = false
        const rect = targetEl.getBoundingClientRect()
        const el = createElement({
          tag: 'span',
          classList: 'bubble',
          style: {
            top: rect.top + rect.height / 2 + 'px',
            left: rect.left + rect.width / 2 + 'px',
            borderColor: this.colors[randomInt(0, this.colors.length - 1)],
          },
        })
        const typeId = randomInt(0, 1)
        if (typeId === 0) el.classList.add('circle')
        this.container.appendChild(el)

        setTimeout(() => {
          if (resolved) return
          this.container.removeChild(el)
          resolve('ok')
        }, duration)
      })
  }

  const componentName = `ba-bubble-explosion-${uuidv4()}`
  customElements.define(componentName, BE)
  const shadowElement = createElement({ tag: componentName }) as BE
  document.body.append(shadowElement)

  return {
    trigger: shadowElement.trigger,
  }
}
