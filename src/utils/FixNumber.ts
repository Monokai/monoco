export const fix = (precision:number) => {
	const power = 10 ** precision

	return (x: number) => Math.round(x * power) / power
}
