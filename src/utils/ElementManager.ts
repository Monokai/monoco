import { CornerOptions } from ".."

export interface RedrawOptions {
	width?:number,
	height?:number
}

interface ElementSpecs {
	draw: (redrawOptions?:RedrawOptions) => void,
	cornerOptions: CornerOptions,
	onResize?: (rect?:DOMRect, element?:HTMLElement) => void,
	previousW: number | null,
	previousH: number | null,
	element: HTMLElement
}

export interface ElementOptions {
	observe?:boolean,
	onResize?:(rect?:DOMRect, element?:HTMLElement) => void
}

export default new class ElementManager {
	elements:Map<HTMLElement, ElementSpecs> | null
	observer:ResizeObserver | null

	constructor() {
		this.elements = null
		this.observer = null
	}

	onElementResize(resizeList:ResizeObserverEntry[]) {
		for (const entry of resizeList) {
			const rect = entry.target.getBoundingClientRect()
			const specs = this.elements?.get(entry.target as HTMLElement)

			if (!specs) {
				continue
			}

			const {
				previousW,
				previousH,
				draw,
				onResize
			} = specs

			if (
				previousW !== rect.width ||
				previousH !== rect.height
			) {
				draw?.({
					width: rect.width,
					height: rect.height
				})

				onResize?.(rect, entry.target as HTMLElement)

				specs.previousW = rect.width
				specs.previousH = rect.height
			}
		}
	}

	getDrawOptions(element:HTMLElement):CornerOptions | null {
		return this.elements?.get(element)?.cornerOptions ?? null;
	}

	setCornerOptions(element:HTMLElement, cornerOptions:CornerOptions) {
		const specs = this.elements?.get(element);

		if (specs) {
			specs.cornerOptions = cornerOptions;

			this.elements?.set(element, specs);
		}
	}

	addElement(element:HTMLElement, cornerOptions:CornerOptions & ElementOptions, draw:(redrawOptions?:RedrawOptions) => void) {
		if (!this.elements) {
			this.elements = new Map()
		}

		if (!this.observer) {
			this.observer = new ResizeObserver(resizeList => this.onElementResize(resizeList))
		}

		this.unobserve(element)

		const {
			observe = true,
			onResize
		} = cornerOptions

		if (observe) {
			this.observer.observe(element)

			const previousW = null
			const previousH = null

			this.elements.set(element, {
				draw,
				cornerOptions,
				onResize,
				previousW,
				previousH,
				element
			})
		}

		return draw
	}

	draw(element?:HTMLElement, cornerOptions?:CornerOptions) {
		if (element) {
			if (cornerOptions) {
				this.setCornerOptions(element, cornerOptions)
			}

			this.elements?.get(element)?.draw?.()
		} else {
			this.elements?.forEach((o:ElementSpecs) => o.draw?.())
		}
	}

	unobserve(element:HTMLElement) {
		const funk = (el:HTMLElement) => {
			this.observer?.unobserve(el)
			this.elements?.delete(el)
		}

		if (element) {
			funk(element)
		} else {
			this.elements?.keys().forEach(el => funk(el))
		}
	}
}()