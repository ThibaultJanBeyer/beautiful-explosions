import { v4 as uuidv4 } from 'uuid'
import {
  updateStyle,
  createElement,
  preloadContent,
} from './helpers/dom-element'
import { randomInt } from './helpers/random'

export const BubbleExplosion = ({
  element,
  eventListener,
  content,
  particles,
  areaSize,
  isAppearing,
}: {
  element: HTMLElement
  eventListener?: string
  content?: CSSStyleDeclaration['content']
  particles: { size?: number; direction?: 'up' | 'down'; amount?: number }
  areaSize?: { x?: number; y?: number }
  isAppearing?: boolean
}): { trigger: () => void; destroy: () => void } => {
  const duration = 800
  const elementLifeSpan = duration / 4

  class BE extends HTMLElement {
    colors = ['#D81CB8', '#05A542', '#DE215F', '#1CD8CE', '#1B3F3D']

    isPreloading = false

    container: HTMLElement

    prevTransition: string

    prevTranform: string

    prevOpacity: string

    prevTransformOrigin: string

    prevPointerEvents: string

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })

      this.prevTransition = element.style.transition
      this.prevTranform = element.style.transform
      this.prevOpacity = element.style.opacity
      this.prevTransformOrigin = element.style.transformOrigin
      this.prevPointerEvents = element.style.pointerEvents

      createElement({
        tag: 'style',
        appendElement: this.shadowRoot,
        value: /*CSS*/ `
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
              .bubble { border: 0;  content: ${content} }
              .bubble::after { content: ${content} }
              .preload { content: ${content} }
            `
            : ''
        }
      `,
      })

      if (isAppearing)
        updateStyle(element, {
          transform: `${element.style.transform || ''} scale(1, 0)`,
          opacity: '0',
          transformOrigin:
            particles?.direction === 'up'
              ? 'bottom'
              : particles?.direction === 'down'
              ? 'top'
              : 'middle',
          transition: `
          ${this.prevTransition ? `${this.prevTransition},` : ''}
          opacity ${elementLifeSpan}ms ease-in-out ${duration / 6}ms, 
          transform ${elementLifeSpan}ms ease-in-out ${duration / 6}ms,
          font-size ${elementLifeSpan}ms ease-in-out ${duration / 6}ms`,
        })
      else
        updateStyle(element, {
          transition: `
          ${this.prevTransition ? `${this.prevTransition},` : ''}
          opacity ${elementLifeSpan}ms ease-in-out, 
          transform ${elementLifeSpan}ms ease-in-out,
          font-size ${elementLifeSpan}ms ease-in-out`,
          transformOrigin:
            particles?.direction === 'up'
              ? 'top'
              : particles?.direction === 'down'
              ? 'bottom'
              : 'middle',
        })

      this.container = createElement({
        tag: 'div',
        appendElement: this.shadowRoot,
      })

      if (eventListener) element.addEventListener(eventListener, this.trigger)
    }

    randomTranslateInt = (xy: 'x' | 'y', size: number, rect: DOMRect) =>
      randomInt(
        size / 2,
        (areaSize && areaSize[xy]) || Math.max(rect.width, 50)
      )

    trigger = async () =>
      new Promise((resolve) => {
        const call = async () => {
          const rect = element.getBoundingClientRect()
          const amount = particles?.amount || 25

          if (!this.shadowRoot) return

          await preloadContent(this.shadowRoot, content)

          createElement({
            tag: 'style',
            appendElement: this.shadowRoot,
            value: this.getBubbleCss(amount, rect),
          })

          if (isAppearing)
            updateStyle(element, {
              transform: element.style.transform.replace(
                'scale(1, 0)',
                'scale(1, 1)'
              ),
              opacity: '1',
            })
          else
            updateStyle(element, {
              transform: `${element.style.transform} scale(0, 0)`,
              pointerEvents: 'none',
            })

          if (eventListener)
            element.removeEventListener(eventListener, this.trigger)

          await Promise.all(
            new Array(amount).fill(null).map(() => this.spawnBubble(rect))
          )

          this.cleanUp()
          resolve('done')
        }
        // put on bottom call-stack
        setTimeout(call)
      })

    getBubbleCss = (amount: number, rect: DOMRect): string => {
      const size =
        particles?.size || Math.max(Math.min(rect.height, rect.width), 25)
      let css = ''
      for (let index = 0; index < amount; index++) {
        const temp = randomInt(1, size)
        let tempR = randomInt(0, 360)
        let translateY = this.randomTranslateInt('y', size, rect)
        let translateX = this.randomTranslateInt('x', size, rect)
        let startTranslateY = 0
        let startTranslateX = 0

        if (particles?.direction === 'up' || particles?.direction === 'down') {
          tempR = 0
          if (index < amount / 2) translateX *= -1 // spread evenly
          startTranslateX = translateX
          if (particles?.direction === 'up') {
            translateY = this.randomTranslateInt('y', 0, rect)
            translateY *= -1
          }
          if (particles?.direction === 'down') {
            translateY = this.randomTranslateInt('y', size * -1, rect)
          }
        }

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
        `
      }
      return css
    }

    spawnBubble = (rect: DOMRect) =>
      new Promise((resolve) => {
        const el = createElement({
          tag: 'span',
          classList: 'bubble',
          style: {
            top: rect.top + rect.height / 2 + 'px',
            left: rect.left + rect.width / 2 + 'px',
            borderColor: this.colors[randomInt(0, this.colors.length - 1)],
          },
        })
        if (randomInt(0, 1) === 0) el.classList.add('circle')
        this.container.appendChild(el)

        setTimeout(() => {
          this.container.removeChild(el)
          resolve('ok')
        }, duration)
      })

    cleanUp = () => {
      if (isAppearing)
        updateStyle(element, {
          transform: this.prevTranform,
          opacity: this.prevOpacity,
          transformOrigin: this.prevTransformOrigin,
          transition: this.prevTransition,
          pointerEvents: this.prevPointerEvents,
        })
    }
  }

  const componentName = `ba-bubble-explosion-${uuidv4()}`
  customElements.define(componentName, BE)
  const shadowElement = createElement({ tag: componentName }) as BE
  document.body.append(shadowElement)

  return {
    trigger: shadowElement.trigger,
    destroy: () => document.body.removeChild(shadowElement),
  }
}
