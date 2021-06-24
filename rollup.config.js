import rollupTypescript from 'rollup-plugin-typescript2'
// import serve from 'rollup-plugin-serve'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import { /*babel,*/getBabelOutputPlugin } from '@rollup/plugin-babel';
import pkg from './package.json'
import { uglify } from "rollup-plugin-uglify";
// import babel from 'rollup-plugin-babel';
// import commonjs from '@rollup/plugin-commonjs';

const createBanner = () => {
    return `/*!
    * ${pkg.name} v${pkg.version}
    * (c) ${new Date().getFullYear()} yyy
    * @license MIT
    */`
}
const plugins = [
    // commonjs(),
    nodeResolve(),
    // babel({
    //     exclude: "node_modules/**",
    //     babelHelpers: 'bundled'
    // }),
    json(),
    rollupTypescript(),
    getBabelOutputPlugin({
        allowAllFormats: true,
        presets: ['@babel/preset-env']
    }),
    uglify()
    // serve(),
]
const outArr = [
    { out: 'umd', file: pkg.main },
    { out: 'iife', file: 'lib/script.js' }
]

export default {
    input: 'src/imagesEditor.ts',
    output: outArr.map(item => {
        return {
            file: item.file,
            format: item.out,
            banner: createBanner(),
            footer: '/* follow me ! */',
            name: 'ImagesEditor'
        }
    }),
    plugins
}