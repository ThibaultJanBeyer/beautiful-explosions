export declare const BubbleExplosion: ({ element, eventListener, content, particles, areaSize, shouldAppear, }: {
    element: HTMLElement;
    eventListener?: string | undefined;
    content?: string | undefined;
    particles: {
        size?: number;
        direction?: 'up' | 'down';
        amount?: number;
    };
    areaSize?: {
        x?: number | undefined;
        y?: number | undefined;
    } | undefined;
    shouldAppear?: boolean | undefined;
}) => {
    trigger: () => void;
};
