import { createPath as createSquirclePath } from './corners/Squircle';
import { createPath as createFlatPath } from './corners/Flat';
import { createPath as createRoundPath } from './corners/Round';
import { createSVGDatURI } from './utils/Svg';
import ElementManager from './utils/ElementManager';
import type { ElementOptions, RedrawOptions } from './utils/ElementManager';

export enum CornerType {
	Squircle = 'squircle',
	FigmaSquircle = 'figma-squircle',
	Round = 'round',
	Flat = 'flat'
}

export type DrawOptions = {
	width:number,
	height:number,
	smoothing?:number,
	radius?:number | number[],
	offset?:number | number[],
	type?:CornerType,
	precision?:number,
	isRounded?:boolean
}

export type PathOptions = DrawOptions & {
	isArray?:boolean
}

export type BackgroundOptions = PathOptions & {
	color?:string,
	border?:[number, string] | [number, string][],
	strokeDrawType?:number
	clipID?:string,
	clip?:boolean
};

function createBackground(options:BackgroundOptions) {
	const {
		border:borderOrArray = [],
		offset:offsetOrArray = 0,
		strokeDrawType = 0,
		color,
		clipID,
	} = options

	const paths:string[] = [];
	const borderArray = Array.isArray(borderOrArray?.[0]) ? borderOrArray : [borderOrArray];
	const offsetArray = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray];
	const clipPath = createPath(options);

	if (borderArray?.length) {
		let borderRadius = 0;

		const borderPaths:string[] = [];

		for (let i = 0; i < borderArray.length; i++) {
			const [size, borderColor] = borderArray[i] as [number, string];

			const strokeWidth = strokeDrawType === 0 ? (borderRadius + size) * 2 : size;

			borderPaths.push(`<path d="${createPath({
				...options,
				offset: strokeDrawType === 0 ? offsetOrArray : offsetArray.map(o => o + borderRadius + size * 0.5),
			})}" fill="none" stroke="${borderColor}" stroke-width="${strokeWidth}" />`);

			borderRadius += size;
		}

		if (color) {
			paths.push(`<path d="${clipPath}" fill="${color}" />`);
		}

		paths.push(...borderPaths.reverse());
	}

	return paths.length ? createSVGDatURI(paths, clipPath as string, clipID) : 'none';
}

export function createPath({
	width:w = 0,
	height:h = 0,
	smoothing = 1,
	radius:radiusOrArray = 0,
	offset:offsetOrArray = 0,
	type = CornerType.Squircle,
	precision = 4,
	isArray = false
}:PathOptions) {
	if (!w || !h) {
		return isArray ? [] : '';
	};

	const preserveSmoothing = type === CornerType.Squircle;
	const offsets = Array.isArray(offsetOrArray) ? offsetOrArray : [offsetOrArray, offsetOrArray, offsetOrArray, offsetOrArray];
	const [ot, or, ob, ol] = offsets;
	const width = w - ol - or;
	const height = h - ot - ob;
	const minSize = Math.min(width, height) * 0.5;
	const radii = (Array.isArray(radiusOrArray) ? radiusOrArray : [radiusOrArray, radiusOrArray, radiusOrArray, radiusOrArray]).map((r, i) => Math.max(0, Math.min(r - offsets[i], minSize)));

	let path;

	switch (type) {
	case CornerType.Round:
		path = path = createRoundPath({
			width,
			height,
			radii,
			offsets
		});

		break;
	case CornerType.Flat:
		path = path = createFlatPath({
			width,
			height,
			radii,
			offsets
		});

		break;
	case CornerType.Squircle:
	case CornerType.FigmaSquircle:
	default:
		path = createSquirclePath({
			width,
			height,
			smoothing,
			radii,
			offsets,
			preserveSmoothing
		})

		break;
	}

	path = path
		.filter(instructions => instructions[0])
		.map(([command, ...parameters]) => {
			const p = parameters.map(x => Number.isFinite(x) ? Number((x as number).toFixed(precision)) : x);
			const result = [
				command,
				isArray ? p : p.join(' ')
			];

			return isArray ? result : result.join('');
		});

	return isArray ? path : path.join('');
}

export function addCorners(element:HTMLElement, options:BackgroundOptions & ElementOptions) {
	const drawFunk = (drawOptions?:RedrawOptions) => {
		if (!(options.width && options.height)) {
			const rect = element.getBoundingClientRect();

			options.width = rect.width;
			options.height = rect.height;
		}

		const redrawOptions = {...options, ...drawOptions};

		if (redrawOptions.isRounded) {
			redrawOptions.width = Math.round(redrawOptions.width);
			redrawOptions.height = Math.round(redrawOptions.height);
		}

		if (options.clip) {
			element.style.clipPath = `path('${createPath(redrawOptions)}')`;
		} else if (options.color || options.border) {
			element.style.backgroundImage = createBackground(redrawOptions);
		}
	}

	drawFunk();

	return ElementManager.addElement(element, options, drawFunk);
}

export function draw(element?:HTMLElement) {
	ElementManager.draw(element);
}

export function untrack(element:HTMLElement) {
	ElementManager.untrack(element);
}