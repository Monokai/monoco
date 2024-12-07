type RedrawOptions = {
    width?: number;
    height?: number;
};
type ElementOptions = {
    observe?: boolean;
    onResize?: (rect: DOMRect, element: HTMLElement) => void;
};

declare enum CornerType {
    Squircle = "squircle",
    FigmaSquircle = "figma-squircle",
    Flat = "flat",
    Inset = "inset",
    Round = "round",
    RoundInverse = "round-inverse"
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
    background?: string;
    border?: [number, string] | [number, string][];
    strokeDrawType?: number;
    clipID?: string;
    clip?: boolean;
};
type CornerOptions = BackgroundOptions & ElementOptions;
declare function createPath({ width: w, height: h, smoothing, radius: radiusOrArray, offset: offsetOrArray, type, precision, isArray }: PathOptions): string | (string | (string | number | (string | number)[])[])[];
declare function addCorners(element: HTMLElement, cornerOptions: CornerOptions): (redrawOptions?: RedrawOptions) => void;
declare function draw(element?: HTMLElement, options?: CornerOptions): void;
declare function unobserve(element: HTMLElement): void;

export { type CornerOptions, CornerType, type PathOptions, addCorners, createPath, draw, unobserve };
