import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import ElementManager from './utils/ElementManager';
import { createGradient } from './utils/LinearGradient';
import {
	draw,
	createPath,
	addCorners,
	unobserve,
	Squircle,
	Flat,
	Round,
	Inset,
	RoundInverse,
	FigmaSquircle,
} from './index';

const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

const ResizeObserverMock = vi.fn(function (cb: ResizeObserverCallback) {
	return {
		observe: vi.fn((element: HTMLElement) => {
			const width = parseFloat(element.style.width) || 0;
			const height = parseFloat(element.style.height) || 0;

			const entry = {
				target: element,
				contentRect: { width, height },
				borderBoxSize: [{ inlineSize: width, blockSize: height }],
			};

			cb(
				[entry] as unknown as ResizeObserverEntry[],
				{} as ResizeObserver
			);
		}),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	};
});

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// happy-dom strictly validates values assigned to styles, patched so that it accepts all strings:

const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
const originalGetPropertyValue = CSSStyleDeclaration.prototype.getPropertyValue;
const rawStyleValues = new WeakMap<CSSStyleDeclaration, Map<string, string>>();

Object.defineProperty(CSSStyleDeclaration.prototype, 'backgroundImage', {
	set(value: string) {
		let styles = rawStyleValues.get(this);
		if (!styles) {
			styles = new Map();
			rawStyleValues.set(this, styles);
		}
		styles.set('background-image', value);
		try {
			originalSetProperty.call(this, 'background-image', value);
		} catch {
			// ignore
		}
	},
	get() {
		const styles = rawStyleValues.get(this);
		if (styles && styles.has('background-image')) {
			return styles.get('background-image');
		}
		return originalGetPropertyValue.call(this, 'background-image');
	},
	configurable: true,
});

describe('test suite', () => {
	describe('create path', () => {
		it('should return an empty string if width or height is 0', () => {
			const path = createPath({ width: 0, height: 100, borderRadius: 10 });

			expect(path).toBe('');
		});

		it('should generate a path string for basic dimensions', () => {
			const path = createPath({ width: 100, height: 100, borderRadius: 20 });

			expect(path).toBeTypeOf('string');
			expect(path).toMatch(/^M/);
			expect(path).toMatch(/Z$/);
		});

		it('should handle individual border radii (array input)', () => {
			const path = createPath({
				width: 100,
				height: 100,
				borderRadius: [10, 20, 30, 40],
			});

			expect(path).toContain('M');
		});

		it('should handle array output format', () => {
			const path = createPath({
				width: 100,
				height: 100,
				borderRadius: 10,
				isArray: true,
			});

			expect(Array.isArray(path)).toBe(true);
			expect(path[0][0]).toBe('M');
		});

		it('should apply CSS background corner overlap reduction', () => {
			const pathLarge = createPath({
				width: 100,
				height: 100,
				borderRadius: 60,
				precision: 2,
			});

			const pathSmall = createPath({
				width: 100,
				height: 100,
				borderRadius: 10,
				precision: 2,
			});

			expect(pathLarge).not.toBe(pathSmall);
		});
	});

	describe('corner types', () => {
		const baseOpts = { width: 100, height: 100, borderRadius: 20 };

		it('squircle generates curves', () => {
			const path = createPath({ ...baseOpts, cornerType: Squircle });

			expect(path).toMatch(/c/i);
		});

		it('round generates valid path', () => {
			const path = createPath({ ...baseOpts, cornerType: Round });

			expect(path).toBeTypeOf('string');
		});

		it('flat generates lines', () => {
			const path = createPath({ ...baseOpts, cornerType: Flat });

			expect(path).toContain('L');
		});

		it('inset generates valid path', () => {
			const path = createPath({ ...baseOpts, cornerType: Inset });

			expect(path).toContain('L');
		});

		it('roundInverse generates valid path', () => {
			const path = createPath({ ...baseOpts, cornerType: RoundInverse });

			expect(path).toBeTypeOf('string');
		});

		it('figmaSquircle generates valid path', () => {
			const path = createPath({
				...baseOpts,
				cornerType: FigmaSquircle,
				smoothing: 0.6,
			});

			expect(path).toBeTypeOf('string');
		});
	});

	describe('linear gradients', () => {
		it('calculates coordinates for 180deg (to bottom)', () => {
			const svg = createGradient({
				id: 'test',
				angle: 180,
				colors: ['black', 'white'],
				precision: 2
			});
			expect(svg).toContain('x1="0.5" y1="0"');
			expect(svg).toContain('x2="0.5" y2="1"');
		});

		it('calculates coordinates for 90deg (to right)', () => {
			const svg = createGradient({
				id: 'test',
				angle: 90,
				colors: ['black', 'white'],
				precision: 2
			});
			expect(svg).toContain('x1="0" y1="0.5"');
			expect(svg).toContain('x2="1" y2="0.5"');
		});

		it('calculates coordinates for 135deg (magic corner: bottom-right)', () => {
			const svg = createGradient({
				id: 'test',
				angle: 135,
				colors: ['black', 'white'],
				precision: 2
			});
			expect(svg).toContain('x1="0" y1="0"');
			expect(svg).toContain('x2="1" y2="1"');
		});

		it('interpolates middle stops automatically', () => {
			const svg = createGradient({
				id: 'test',
				angle: 0,
				colors: ['red', 'green', 'blue'],
				precision: 2
			});

			expect(svg).toContain('stop offset="0" stop-color="red"');
			expect(svg).toContain('stop offset="0.5" stop-color="green"');
			expect(svg).toContain('stop offset="1" stop-color="blue"');
		});

		it('handles explicit percentages mixed with implicit', () => {
			const svg = createGradient({
				id: 'test',
				angle: 0,
				colors: ['red', 'white', 'black 75%', 'blue'],
				precision: 3
			});

			expect(svg).toContain('offset="0" stop-color="red"');
			expect(svg).toContain('offset="0.375" stop-color="white"');
			expect(svg).toContain('offset="0.75" stop-color="black"');
			expect(svg).toContain('offset="1" stop-color="blue"');
		});

		it('handles decimal percentages correctly', () => {
			const svg = createGradient({
				id: 'test',
				angle: 0,
				colors: ['red 0%', 'blue 33.33%', 'green 100%'],
				precision: 4
			});
			expect(svg).toContain('offset="0.3333" stop-color="blue"');
		});
	});

	describe('dom integration', () => {
		let div: HTMLDivElement;

		beforeEach(() => {
			document.body.innerHTML = '';
			div = document.createElement('div');

			div.style.width = '100px';
			div.style.height = '100px';

			document.body.appendChild(div);

			ResizeObserverMock.mockClear();
		});

		afterEach(() => {
			unobserve(div);

			if (ElementManager.observer) {
				ElementManager.observer.disconnect();
				ElementManager.observer = null;
			}
			ElementManager.elements = null;

			vi.restoreAllMocks();
		});

		it('should set clip-path on the element', async () => {
			addCorners(div, { borderRadius: 10, clip: true });
			await nextFrame();
			expect(div.style.clipPath).toContain("path('");
		});

		it('should set background-image if background color is provided', async () => {
			addCorners(div, { borderRadius: 10, background: '#ff0000' });
			await nextFrame();
			expect(div.style.backgroundImage).toContain("url('data:image/svg+xml");
		});

		it('should set background-image if border is provided', async () => {
			addCorners(div, { borderRadius: 10, border: [2, 'black'] });
			await nextFrame();
			expect(div.style.backgroundImage).toContain("url('data:image/svg+xml");
		});

		it('should generate gradient definitions within the data URI when border has gradient', async () => {
			addCorners(div, {
				borderRadius: 10,
				border: [5, 45, ['#f00', '#00f']]
			});

			await nextFrame();

			const bgImage = div.style.backgroundImage;
			expect(bgImage).toContain('data:image/svg+xml');

			const decoded = decodeURIComponent(bgImage);

			expect(decoded).toContain('<linearGradient');
			expect(decoded).toContain('stop-color="#f00"');
			expect(decoded).toContain('stop-color="#00f"');
			expect(decoded).toMatch(/stroke="url\(#.+?\)"/);
		});

		it('should observe the element via ResizeObserver', async () => {
			addCorners(div, { borderRadius: 10 });

			await nextFrame();

			const observerInstance = ResizeObserverMock.mock.results[0].value;

			expect(observerInstance.observe).toHaveBeenCalledWith(div);
		});

		it('should stop observing when unobserve is called', () => {
			addCorners(div, { borderRadius: 10 });
			unobserve(div);

			const observerInstance = ResizeObserverMock.mock.results[0].value;

			expect(observerInstance.unobserve).toHaveBeenCalledWith(div);
		});

		it('should trigger onResize callback when ResizeObserver fires', async () => {
			const onResizeSpy = vi.fn();

			addCorners(div, { borderRadius: 10, onResize: onResizeSpy });

			await nextFrame();

			expect(onResizeSpy).toHaveBeenCalledWith(
				{ width: 100, height: 100 },
				div,
			);
		});
	});

	describe('utils', () => {
		let div: HTMLDivElement;

		beforeEach(() => {
			document.body.innerHTML = '';
			div = document.createElement('div');

			div.style.width = '100px';
			div.style.height = '100px';

			document.body.appendChild(div);

			ResizeObserverMock.mockClear();
		});

		it('should encode SVG correctly', async () => {
			addCorners(div, {
				borderRadius: 10,
				background: 'red',
				clip: false,
			});

			await nextFrame();

			const bgImage = div.style.backgroundImage;

			expect(bgImage).toContain('data:image/svg+xml');
			expect(bgImage).not.toContain('<');
			expect(bgImage).toContain('%3C');
		});
	});

	describe('manual draw', () => {
		let div: HTMLDivElement;

		beforeEach(() => {
			document.body.innerHTML = '';
			div = document.createElement('div');
			div.style.width = '100px';
			div.style.height = '100px';
			document.body.appendChild(div);
			ResizeObserverMock.mockClear();
		});

		afterEach(() => {
			unobserve(div);
			vi.restoreAllMocks();
		});

		it('should draw immediately using DOM dimensions if cache is empty', () => {
			const wSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
			const hSpy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);

			addCorners(div, { borderRadius: 10, clip: true });

			const styleSpy = vi.spyOn(div.style, 'clipPath', 'set');

			draw(div);

			expect(wSpy).toHaveBeenCalled();
			expect(hSpy).toHaveBeenCalled();
			expect(styleSpy).toHaveBeenCalled();
			expect(div.style.clipPath).toContain('path');
		});

		it('should use cached dimensions and avoid DOM read if available', async () => {
			addCorners(div, { borderRadius: 10 });

			await nextFrame();

			const wSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500);
			const hSpy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(500);

			draw(div);

			expect(wSpy).not.toHaveBeenCalled();
			expect(hSpy).not.toHaveBeenCalled();
		});

		it('should update options when provided to draw', async () => {
			addCorners(div, { borderRadius: 10 });
			await nextFrame();

			const initialPath = div.style.clipPath;

			draw(div, { borderRadius: 50, clip: true });

			expect(div.style.clipPath).not.toBe(initialPath);
			expect(div.style.clipPath).toContain('path');
		});

		it('should draw all elements if no element provided', async () => {
			const div2 = document.createElement('div');
			div2.style.width = '50px';
			div2.style.height = '50px';
			document.body.appendChild(div2);

			addCorners(div, { borderRadius: 10 });
			addCorners(div2, { borderRadius: 10 });
			await nextFrame();

			const s1 = vi.spyOn(div.style, 'clipPath', 'set');
			const s2 = vi.spyOn(div2.style, 'clipPath', 'set');

			draw();

			expect(s1).toHaveBeenCalled();
			expect(s2).toHaveBeenCalled();
		});
	});
});
