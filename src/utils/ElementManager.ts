type ElementSpecs = {
	draw: () => void,
	observer: ResizeObserver,
	element: HTMLElement
}

export type RedrawOptions = {
	width?:number,
	height?:number
}

export type ElementOptions = {
	observe:boolean,
	track:boolean,
	draw:boolean,
	onResize?:(rect:DOMRect, element:HTMLElement) => void
};

export default new class ElementManager {
	elements = new Map();

	constructor() {
		this.elements = new Map();
	}

	addElement(element:HTMLElement, options:ElementOptions, drawFunk:(drawOptions:RedrawOptions) => void) {
		this.untrack(element);

		const {
			track = true,
			observe = true,
			draw = true,
			onResize
		} = options;

		let observer;

		if (observe) {
			let previousW:number | null = null;
			let previousH:number | null = null;

			const onResizeFunk = (resizeList:ResizeObserverEntry[]) => {
				for (const entry of resizeList) {
					const rect = entry.target.getBoundingClientRect();

					if (
						previousW !== rect.width ||
						previousH !== rect.height
					) {
						if (draw) {
							drawFunk({
								width: rect.width,
								height: rect.height
							});
						}

						onResize?.(rect, entry.target as HTMLElement);

						previousW = rect.width;
						previousH = rect.height;
					}
				}
			};

			observer = new ResizeObserver(onResizeFunk);

			observer.observe(element);
		}

		if (track) {
			this.elements.set(element, {
				draw: drawFunk,
				element,
				observer
			});
		}

		return drawFunk;
	}

	draw(element?:HTMLElement) {
		if (element) {
			this.elements.get(element)?.draw?.();
		} else {
			this.elements.forEach((o:ElementSpecs) => o.draw?.());
		}
	}

	untrack(element:HTMLElement) {
		const funk = (el:HTMLElement) => {
			const specs:ElementSpecs = this.elements.get(el);

			if (specs) {
				const { observer } = specs;

				observer?.disconnect();
				this.elements.delete(element);
			}
		}

		if (element) {
			funk(element);
		} else {
			this.elements.forEach(([, el]) => funk(el));
		}
	}
}();