const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './assets/js/_scripts.js',
    output: {
        path: path.resolve(__dirname, 'assets/js/dev/'),
        filename: 'scripts.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};