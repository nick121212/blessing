/**
 * Created by NICK on 16/8/9.
 */

var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: __dirname + "/",
    entry: {
        'index/index': './src/pages/index/index.ts',
        // 'detail/detail': './src/pages/detail/index.js'
    },
    devtool: "source-map",
    output: {
        path: __dirname + '/built',
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.jade', '.scss'],
        exclude: /node_modules|bower_components/
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss/, loaders: ['style', 'css', 'sass']},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.(png|jpg|ttf)$/, loader: 'url?limit=8192'},
            {test: /\.jade$/, loader: 'jade-loader'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new  HtmlWebpackPlugin()
    ]
};