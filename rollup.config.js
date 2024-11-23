import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';

const dist = './dist';
const name = 'monoco';

export default {
	input: './src/index.ts',
	output: [
		{
			file: `${dist}/cjs/index.js`,
			format: 'cjs',
			esModule: true
		},
		{
			format: 'esm',
			dir: `${dist}/esm`,
			preserveModules: true
		},
		{
			file: `${dist}/umd/index.js`,
			format: 'umd',
			esModule: true,
			name
		}
	],
	plugins: [
			typescript(),
			babel({
				exclude: 'node_modules/**',
				presets: [
					[
						'@babel/env',
						{
							modules: false,
							corejs: 3,
							debug: true,
							useBuiltIns: 'usage'
						}
					]
				]
			}),
			commonjs(),
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
};