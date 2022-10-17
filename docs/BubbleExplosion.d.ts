export declare const BubbleExplosion: ({ element, eventListener, content, particles, areaSize, isAppearing, }: {
    element: HTMLElement;
    eventListener?: string | null | undefined;
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
    isAppearing?: boolean | undefined;
}) => {
    trigger: () => void;
};
