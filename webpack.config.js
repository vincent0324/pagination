const webpack = require('webpack');
const path = require('path');

const config = {

    entry: {
        page: path.resolve(__dirname, 'app.js')
    },

    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: '[name].debug.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|woff|svg|ttf|eot)$/,
                loader: 'url-loader?limit=10000' // 限制大小小于10k的
            }
        ]
    },

    // plugins: [],

    resolve: {
        alias: {}
    }
};

module.exports = config;
