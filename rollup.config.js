import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';

const dist = './dist';
const name = 'monoco';

const plugins = [
	commonjs(),
	typescript(),
	terser({
		compress: {
			// drop_console: true,
			passes: 2
		}
	})
]

export default [
	{
		input: './src/index.ts',
		output: [
			{
				file: `${dist}/index.cjs.js`,
				format: 'cjs',
				esModule: true
			},
			{
				format: 'esm',
				file: `${dist}/index.esm.js`
			},
			{
				file: `${dist}/index.umd.js`,
				format: 'umd',
				esModule: true,
				name
			}
		],
		plugins: [
			...plugins,
			del({
				targets: `${dist}/*`
			})
		]
	},
	{
		input: [
			'src/index.ts'
		],
		output: [
			{
				dir: `${dist}`,
				format: 'esm'
			}
		],
		plugins: [
			typescript(),
			dts()
		]
	}
];