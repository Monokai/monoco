const ENCODE_REGEX = /[\r\n"%#()<>?[\\\]^`{|}\s']/g;

const ESCAPE_MAP: Record<string, string> = {
	'\r': '',
	'\n': ''
}

const encode = (content: string) => content.replace(ENCODE_REGEX, match => ESCAPE_MAP[match] ?? (ESCAPE_MAP[match] = `%${match.charCodeAt(0).toString(16).toUpperCase()}`))

export const createSVG = (content:string) => `<svg xmlns="http://www.w3.org/2000/svg">${content}</svg>`

export const createSVGDatURI = ({
	paths,
	gradients,
	clipPath,
	idPrefix
}: {
	paths:string[],
	gradients?:string[],
	clipPath:string,
	idPrefix:string
}) => {
	const clipID = `${idPrefix}c`
	const defs:string[] = []
	const result:string[] = []

	if (gradients) {
		gradients.forEach(gradient => {
			defs.push(gradient)
		})
	}

	if (clipPath) {
		defs.push(`<clipPath id="${clipID}"><path d="${clipPath}" /></clipPath>`)
	}

	if (defs.length) {
		result.push(`<defs>${defs.join('')}</defs>`)
	}

	if (clipPath) {
		result.push(`<g clip-path="url(#${clipID})">${paths.join('')}</g>`)
	} else {
		result.push(...paths)
	}

	return `url('data:image/svg+xml,${encode(createSVG(result.join('')))}')`
}
