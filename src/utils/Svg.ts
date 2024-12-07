const encode = (content:string) => encodeURIComponent(content)
	.replace(/%20/g, ' ')
	.replace(/%3D/g, '=')
	.replace(/%3A/g, ':')
	.replace(/%2F/g, '/')
	.replace(/%2C/g, ',')
	.replace(/%3B/g, ';')

export const createSVG = (content:string) => `<svg xmlns="http://www.w3.org/2000/svg">${content}</svg>`

export const createSVGDatURI = (paths:string[], clipPath:string, id:string = 'c') =>
`url('data:image/svg+xml,${
	encode(createSVG((clipPath ? [
		`<defs><clipPath id="${id}"><path d="${clipPath}" /></clipPath></defs>`,
		`<g clip-path="url(#${id})">${paths.join('')}</g>`
	] : paths).join('')))
}')`