type RedrawOptions = {
    width?: number;
    height?: number;
};
type ElementOptions = {
    observe?: boolean;
    draw?: boolean;
    onResize?: (rect: DOMRect, element: HTMLElement) => void;
};

declare enum CornerType {
    Squircle = "squircle",
    FigmaSquircle = "figma-squircle",
    Flat = "flat",
    Round = "round"
}
type DrawOptions = {
    width?: number;
    height?: number;
    smoothing?: number;
    radius?: number | number[];
    offset?: number | number[];
    type?: CornerType;
    precision?: number;
    isRounded?: boolean;
};
type PathOptions = DrawOptions & {
    isArray?: boolean;
};
type BackgroundOptions = PathOptions & {
    color?: string;
    border?: [number, string] | [number, string][];
    strokeDrawType?: number;
    clipID?: string;
    clip?: boolean;
};
declare function createPath({ width: w, height: h, smoothing, radius: radiusOrArray, offset: offsetOrArray, type, precision, isArray }: PathOptions): string | (string | (string | number | (string | number)[])[])[];
declare function addCorners(element: HTMLElement, options: BackgroundOptions & ElementOptions): (drawOptions: RedrawOptions) => void;
declare function draw(element?: HTMLElement): void;
declare function unobserve(element: HTMLElement): void;

export { type BackgroundOptions, CornerType, type DrawOptions, type PathOptions, addCorners, createPath, draw, unobserve };
