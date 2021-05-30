const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageInfo = require('./package.json')
const webpack = require('webpack');
module.exports = {
    target: 'web',
    entry: './src/index.ts',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        open: true,
        hot: true,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: "ImagesEditor",
            type: 'var',
            export: 'default',
        },
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.BannerPlugin(`pacakge version：${packageInfo.version}`)
    ],

};