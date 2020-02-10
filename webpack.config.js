const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        entry: './src/main/app.ts',
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [{loader: 'ts-loader'}]
                }
                ]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        }
    },
    {
        mode: 'development',
        entry: './src/renderer/board-view.tsx',
        target: "electron-renderer",
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{loader: 'ts-loader'}]
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'board-view.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            })
        ]
    },
    {
        mode: 'development',
        entry: './src/renderer/settings-view.tsx',
        target: "electron-renderer",
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{loader: 'ts-loader'}]
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'settings-view.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            })
        ]
    }

];
