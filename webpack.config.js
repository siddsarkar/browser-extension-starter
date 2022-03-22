/* eslint-disable */

const { join } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('./node_modules/terser-webpack-plugin/dist')

const config = {
    devtool: false,
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                    output: {
                        beautify: true,
                        indent_level: 2,
                    },
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    module: {},
}

const chromeConfig = {
    ...config,
    name: 'chrome',
    entry: {
        background: __dirname + '/src/background.ts',
        'pages/popup/popup': __dirname + '/src/pages/popup/popup.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: join(__dirname, 'chrome'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src',
                    globOptions: {
                        ignore: ['**/utils', '**/input.css', '**/*.ts'],
                    },
                },
                {
                    from: './manifests/manifest.chrome.json',
                    to: 'manifest.json',
                },
            ],
        }),
    ],
}

module.exports = [chromeConfig]
