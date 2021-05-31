// import typescript from '@rollup/plugin-typescript';
import rollupTypescript from 'rollup-plugin-typescript2'

import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json'
// import commonjs from '@rollup/plugin-commonjs';


// rollup.config.js

// import merge from 'deepmerge';
// import { createBasicConfig } from '@open-wc/building-rollup';

// const baseConfig = createBasicConfig();

const plugins = [
    // commonjs(),
    nodeResolve(),
    json(),
    rollupTypescript(),
    babel({ babelHelpers: 'bundled' })
]

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'ImagesEditor'
        },
        {
            file: 'lib/script.js',
            format: 'iife',
            name: 'ImagesEditor'
        }
    ],
    plugins
}