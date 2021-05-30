import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';

import pkg from './package.json'
const plugins = [
    nodeResolve(),
    json(),
    typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
]
export default {
    input: 'src/index.ts',
    output:[
        {
            file: pkg.main,
            format: 'umd',
            name: 'imagesEditor'
        },
        {
            file: 'lib/script.js',
            format: 'iife',
            name: 'imagesEditor'
        }
    ],
    plugins
  };