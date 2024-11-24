import typescript from '@rollup/plugin-typescript';
// import typescriptEngine from 'typescript';
// import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';

const dist = './dist';
const name = 'monoco';

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
				// dir: `${dist}`,
				file: `${dist}/index.esm.js`
				// preserveModules: true
			},
			{
				file: `${dist}/index.umd.js`,
				format: 'umd',
				esModule: true,
				name
			}
		],
		plugins: [
				commonjs(),
				typescript(),
				// dts(),
				// babel({
				// 	exclude: 'node_modules/**',
				// 	presets: [
				// 		[
				// 			'@babel/env',
				// 			{
				// 				modules: false,
				// 				corejs: 3,
				// 				debug: true,
				// 				useBuiltIns: 'usage'
				// 			}
				// 		]
				// 	]
				// }),
				terser({
					compress: {
						drop_console: true,
						passes: 2
					}
				}),
				del({
					targets: `${dist}/*`
				})
		]
	},
	{
		input: 'src/index.ts',
		output: [
			{
				file: `${dist}/index.d.ts`,
				format: 'esm'
			}
		],
		plugins: [
			typescript(),
			dts()
		]
	}
];