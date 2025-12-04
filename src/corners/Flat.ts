export const createPath = ({
	width,
	height,
	radii,
	offsets
}:{
	width:number,
	height:number,
	radii:number[],
	offsets:number[]
}) => {
	const [ot,,, ol] = offsets
	const [rtl, rtr, rbr, rbl] = radii

	return [
		['M', ol + rtl, ot],
		['L', width - rtr + ol, ot],
		['L', width + ol, ot + rtr],
		['L', width + ol, height - rbr + ot],
		['L', width - rbr + ol, height + ot],
		['L', ol + rbl, height + ot],
		['L', ol, height - rbl + ot],
		['L', ol, ot + rtl],
		['Z']
	]
}