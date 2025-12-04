import { CornerOptions } from ".."

export interface RedrawOptions {
	width:number,
	height:number
}

export interface ResizeDetail {
	width: number,
	height: number
}

interface ElementSpecs {
	draw: (redrawOptions?:RedrawOptions) => void,
	cornerOptions: CornerOptions,
	onResize?: (size: ResizeDetail, element:HTMLElement) => void,
	previousW: number | null,
	previousH: number | null,
	element: HTMLElement
}

export interface ElementOptions {
	observe?:boolean,
	onResize?:(size:ResizeDetail, element:HTMLElement) => void
}

export default new class ElementManager {
	elements:Map<HTMLElement, ElementSpecs> | null
	observer:ResizeObserver | null

	rafID: number | null = null
	queue: ResizeObserverEntry[] = []

	public resizePrecisionPower = 10 ** 0

	constructor() {
		this.elements = null
		this.observer = null
	}

	onElementResize(resizeList:ResizeObserverEntry[]) {
		this.queue.push(...resizeList)

		if (!this.rafID) {
			this.rafID = requestAnimationFrame(() => this.flushQueue())
		}
	}

	flushQueue() {
		const uniqueUpdates = new Map<HTMLElement, ResizeObserverEntry>()

		for (const entry of this.queue) {
			uniqueUpdates.set(entry.target as HTMLElement, entry)
		}

		this.queue = []

		uniqueUpdates.forEach((entry, element) => {
			if (!element.isConnected) {
				this.unobserve(element)

				return
			}

			const specs = this.elements?.get(element)

			if (!specs) {
				return
			}

			let {
				inlineSize: width,
				blockSize: height
			} = entry.borderBoxSize[0]

			if (specs.cornerOptions.isRounded) {
				width = Math.round(width)
				height = Math.round(height)
			}

			const {
				previousW,
				previousH,
				draw,
				onResize
			} = specs

			if (
				previousW !== width ||
				previousH !== height
			) {
				draw?.({
					width,
					height
				})

				onResize?.({width, height}, entry.target as HTMLElement)

				specs.previousW = width
				specs.previousH = height
			}
		})

		this.rafID = null
	}

	getDrawOptions = (element:HTMLElement):CornerOptions | null => this.elements?.get(element)?.cornerOptions ?? null

	setCornerOptions(element:HTMLElement, cornerOptions:CornerOptions) {
		const specs = this.elements?.get(element)

		if (specs) {
			specs.cornerOptions = cornerOptions

			this.elements?.set(element, specs)
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

			this.observer.observe(element)
		}

		return draw
	}

	draw(element?:HTMLElement, cornerOptions?:CornerOptions) {
		const run = (specs: ElementSpecs) => {
			if (!specs.element.isConnected) {
				return
			}

			let { previousW: width, previousH: height } = specs

			if (width === null || height === null) {
				width = specs.element.offsetWidth
				height = specs.element.offsetHeight

				specs.previousW = width
				specs.previousH = height
			}

			specs.draw?.({ width, height })
		}

		if (element) {
			if (cornerOptions) {
				this.setCornerOptions(element, cornerOptions)
			}

			const specs = this.elements?.get(element)

			if (specs) {
				run(specs)
			}
		} else {
			this.elements?.forEach(run)
		}
	}

	unobserve(element?:HTMLElement) {
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