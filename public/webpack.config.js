/**
 * Created by NICK on 16/8/9.
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/',
    cache: true,
    debug: true,
    entry: {
        'page/index': './src/pages/index/index.ts',
        'page/style': './src/pages/style/index.ts'
    },
    devtool: "source-map",
    output: {
        path: __dirname + '/built',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.jade', '.scss', '.css'],
        // exclude: /node_modules|bower_components/,
        // root: 'node_modules',
        alias: {
            'svg-morpheus': __dirname + '/node_modules/svg-morpheus/compile/unminified/svg-morpheus',
            'angular.material.css': __dirname + '/node_modules/angular-material/angular-material.css',
            'angular.ui.tree.css': __dirname + '/node_modules/angular-ui-tree/dist/angular-ui-tree.css'
        }
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader?module=commonjs&warnImplicitAny'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'sass']},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.(png|jpg|ttf)$/, loader: 'url?limit=8192'},
            {test: /\.jade$/, loader: 'jade-loader'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'index.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'development'
        }),
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // }),
        new ExtractTextPlugin("dashboard.css")
    ]
};