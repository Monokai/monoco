function encode(content:string) {
	return encodeURIComponent(content)
		.replace(/%20/g, ' ')
		.replace(/%3D/g, '=')
		.replace(/%3A/g, ':')
		.replace(/%2F/g, '/')
		.replace(/%2C/g, ',')
		.replace(/%3B/g, ';')
}

export function createSVG(content:string) {
	return `<svg xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

export function createSVGDatURI(paths:string[], clipPath:string, id:string = 'c') {
	return `url('data:image/svg+xml,${
		encode(createSVG((clipPath ? [
			`<defs><clipPath id="${id}"><path d="${clipPath}" /></clipPath></defs>`,
			`<g clip-path="url(#${id})">${paths.join('')}</g>`
		] : paths).join('')))
	}')`
}