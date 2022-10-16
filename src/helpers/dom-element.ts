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
}: {
  tag?: string
  classList?: string
  value?: string
  appendElement?: HTMLElement | ShadowRoot | null
  style?: Partial<ElementCSSInlineStyle['style']>
}): HTMLElement => {
  const el = document.createElement(tag)
  el.className = classList
  el.innerHTML = value
  if (style) updateStyle(el, style)
  if (appendElement != null) appendElement.append(el)
  return el
}
