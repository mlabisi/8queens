const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        entry: './src/main/electron.ts',
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [{loader: 'ts-loader'}]
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        {
                            // Adds CSS to the DOM by injecting a `<style>` tag
                            loader: 'style-loader'
                        },
                        {
                            // Interprets `@import` and `url()` like `import/require()` and will resolve them
                            loader: 'css-loader'
                        },
                        {
                            // Loader for webpack to process CSS with PostCSS
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        {
                            // Loads a SASS/SCSS file and compiles it to CSS
                            loader: 'sass-loader'
                        }]
                }
                ]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'electron.js'
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
