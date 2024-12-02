export type RedrawOptions = {
	width?:number,
	height?:number
}

type ElementSpecs = {
	draw?: (drawOptions?:RedrawOptions) => void,
	onResize?: (rect:DOMRect, element:HTMLElement) => void,
	previousW: number | null,
	previousH: number | null,
	element: HTMLElement
}

export type ElementOptions = {
	observe?:boolean,
	onResize?:(rect:DOMRect, element:HTMLElement) => void
};

export default new class ElementManager {
	elements:Map<HTMLElement, ElementSpecs> | null
	observer:ResizeObserver | null

	constructor() {
		this.elements = null;
		this.observer = null;
	}

	onElementResize(resizeList:ResizeObserverEntry[]) {
		for (const entry of resizeList) {
			const rect = entry.target.getBoundingClientRect();
			const specs = this.elements?.get(entry.target as HTMLElement);

			if (!specs) {
				continue;
			}

			const {
				previousW,
				previousH,
				draw,
				onResize
			} = specs;

			if (
				previousW !== rect.width ||
				previousH !== rect.height
			) {
				draw?.({
					width: rect.width,
					height: rect.height
				})

				onResize?.(rect, entry.target as HTMLElement)

				specs.previousW = rect.width;
				specs.previousH = rect.height;
			}
		}
	}

	addElement(element:HTMLElement, options:ElementOptions, draw:(drawOptions?:RedrawOptions) => void) {
		if (!this.elements) {
			this.elements = new Map();
		}

		if (!this.observer) {
			this.observer = new ResizeObserver(resizeList => this.onElementResize(resizeList));
		}

		this.unobserve(element);

		const {
			observe = true,
			onResize
		} = options;

		if (observe) {
			this.observer.observe(element);

			const previousW = null;
			const previousH = null;

			this.elements.set(element, {
				draw,
				onResize,
				previousW,
				previousH,
				element
			});
		}

		return draw;
	}

	draw(element?:HTMLElement) {
		if (element) {
			this.elements?.get(element)?.draw?.();
		} else {
			this.elements?.forEach((o:ElementSpecs) => o.draw?.());
		}
	}

	unobserve(element:HTMLElement) {
		const funk = (el:HTMLElement) => {
			this.observer?.unobserve(element);
			this.elements?.delete(element);
		}

		if (element) {
			funk(element);
		} else {
			this.elements?.keys().forEach(el => funk(el));
		}
	}
}();