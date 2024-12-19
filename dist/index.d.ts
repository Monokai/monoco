interface RedrawOptions {
    width?: number;
    height?: number;
}
interface ElementOptions {
    observe?: boolean;
    onResize?: (rect?: DOMRect, element?: HTMLElement) => void;
}

interface BackgroundOptions extends PathOptions {
    background?: string;
    border?: [number, string] | [number, string][];
    strokeDrawType?: number;
    clipID?: string;
    clip?: boolean;
}
interface DefaultCornerTypeOptions {
    width: number;
    height: number;
    radii: number[];
    offsets: number[];
}
declare function createPath$6({ width: w, height: h, borderRadius: radiusOrArray, offset: offsetOrArray, smoothing, cornerType, precision, isArray }: PathOptions): string | (string | (string | number | (string | number)[])[])[];
declare function addCorners(element: HTMLElement, cornerOptions: CornerOptions): (redrawOptions?: RedrawOptions) => void;

declare function createPath$5(options: DefaultCornerTypeOptions & {
    smoothing?: number;
}): (string | number)[][];

declare function createPath$4({ width, height, radii, offsets }: {
    width: number;
    height: number;
    radii: number[];
    offsets: number[];
}): (string | number)[][];

declare function createPath$3({ width, height, radii, offsets }: {
    width: number;
    height: number;
    radii: number[];
    offsets: number[];
}): (string | number)[][];

declare function createPath$2(options: DefaultCornerTypeOptions): (string | number)[][];

declare function createPath$1(options: DefaultCornerTypeOptions): (string | number)[][];

declare function createPath({ width, height, radii, offsets, smoothing, preserveSmoothing, sweepFlag }: {
    width: number;
    height: number;
    radii: number[];
    offsets: number[];
    smoothing?: number;
    preserveSmoothing?: boolean;
    sweepFlag?: number;
}): (string | number)[][];

interface CornerOptions extends BackgroundOptions, ElementOptions {
}
interface CornerTypeOptions extends DefaultCornerTypeOptions {
    [_: string | number | symbol]: unknown;
}
interface DrawOptions {
    width?: number;
    height?: number;
    smoothing?: number;
    borderRadius?: number | number[];
    offset?: number | number[];
    cornerType?(options: CornerTypeOptions): (string | number)[][];
    precision?: number;
    isRounded?: boolean;
}
interface PathOptions extends DrawOptions {
    isArray?: boolean;
}

declare function draw(element?: HTMLElement, options?: CornerOptions): void;
declare function unobserve(element: HTMLElement): void;

export { type CornerOptions, type CornerTypeOptions, createPath$5 as FigmaSquircle, createPath$4 as Flat, createPath$3 as Inset, type PathOptions, createPath$2 as Round, createPath$1 as RoundInverse, createPath as Squircle, addCorners, createPath$6 as createPath, draw, unobserve };
