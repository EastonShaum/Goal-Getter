const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
    mode: "production",
    entry: {
        customBootstrap: "./src/app.js",
        getStarted: "./src/getStarted.js",
        helpers: "./src/helpers.js",
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'public/assets/css')
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [{
                    // inject CSS to page
                    loader: 'style-loader'
                }, 
                {
                    loader: MiniCssExtractPlugin.loader
                },                
                {
                    // translates CSS into CommonJS modules
                    loader: 'css-loader'
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader'
                }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanWebpackPlugin()
    ]
};