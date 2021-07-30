const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require("webpack")

module.exports = {
    mode: "production",
    entry: {
        customBootstrap: "./src/app.js",
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'public/assets/css')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
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
    }
};