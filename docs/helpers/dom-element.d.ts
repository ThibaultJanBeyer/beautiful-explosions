export declare const updateStyle: (el: HTMLElement, style: Partial<ElementCSSInlineStyle['style']>) => void;
export declare const createElement: ({ tag, classList, value, appendElement, style, }: {
    tag?: string | undefined;
    classList?: string | undefined;
    value?: string | undefined;
    appendElement?: HTMLElement | ShadowRoot | null | undefined;
    style?: Partial<CSSStyleDeclaration> | undefined;
}) => HTMLElement;
