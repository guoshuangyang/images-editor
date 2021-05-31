import rollupTypescript from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json'
// import commonjs from '@rollup/plugin-commonjs';

const plugins = [
    // commonjs(),
    nodeResolve(),
    json(),
    rollupTypescript(),
    babel({ babelHelpers: 'bundled' }),
    serve(),
]
const outArr = [
    { out: 'umd', file: pkg.main },
    { out: 'iife', file: 'lib/script.js' }
]

export default {
    input: 'src/index.ts',
    output: outArr.map(item => {
        return {
            file: item.file,
            format: item.out,
            banner: '/* my-library version ' + pkg.version + ' */',
            footer: '/* follow me ! */',
            name: 'ImagesEditor'
        }
    }),
    plugins
}