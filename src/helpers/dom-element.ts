export const updateStyle = (
  el: HTMLElement,
  style: Partial<ElementCSSInlineStyle['style']>
): void => {
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const value = style[key]
      el.style[key] = value as string
    }
  }
}

export const createElement = ({
  tag = '',
  classList = '',
  value = '',
  appendElement,
  style,
  extraArrtibutes,
}: {
  tag?: string
  classList?: string
  value?: string
  appendElement?: HTMLElement | ShadowRoot | null
  style?: Partial<ElementCSSInlineStyle['style']>
  extraArrtibutes?: { [s: string]: string }
}): HTMLElement => {
  const el = document.createElement(tag)
  el.className = classList
  el.innerHTML = value
  if (style) updateStyle(el, style)
  if (appendElement != null) appendElement.append(el)
  if (extraArrtibutes)
    Object.entries(extraArrtibutes).forEach(([key, val]) =>
      el.setAttribute(key, val)
    )
  return el
}

export const preloadContent = (root: ShadowRoot, content?: string) =>
  new Promise((resolve, reject) => {
    // pre-load content
    if (!content || !content.includes('url')) return resolve('ok')

    const url = content
      .replaceAll('url(', '')
      .replaceAll(')', '')
      .replaceAll("'", '')
      .replaceAll('"', '')

    const preload = createElement({
      tag: 'img',
      appendElement: root,
      classList: 'preload',
      style: {
        position: 'fixed',
        top: '-10000px',
        width: '1px',
        height: '1px',
        pointerEvents: 'none',
      },
      extraArrtibutes: {
        src: url || '',
      },
    }) as HTMLImageElement

    if (preload.complete) return resolve('ok')

    preload.addEventListener('load', () => {
      root.removeChild(preload)
      resolve('ok')
    })
    preload.addEventListener('error', () => {
      root.removeChild(preload)
      reject('notOk')
    })
  })
