export declare const requestPaintFinishCallback: () => Promise<unknown>;
export declare const updateStyle: (el: HTMLElement, style: Partial<ElementCSSInlineStyle['style']>) => void;
export declare const createElement: ({ tag, classList, value, appendElement, style, extraArrtibutes, }: {
    tag?: string | undefined;
    classList?: string | undefined;
    value?: string | undefined;
    appendElement?: HTMLElement | ShadowRoot | null | undefined;
    style?: Partial<CSSStyleDeclaration> | undefined;
    extraArrtibutes?: {
        [s: string]: string;
    } | undefined;
}) => HTMLElement;
export declare const preloadContent: (root: ShadowRoot, content?: string) => Promise<unknown>;
