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
        vendors: ['jquery', 'lodash'],
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
            'jsonPathProcessor': __dirname + '/node_modules/json-path-processor/json-path-processor',
            'svg-morpheus': __dirname + '/node_modules/svg-morpheus/compile/unminified/svg-morpheus',
            'restangular': __dirname + '/node_modules/restangular/dist/restangular',
            'angular.material.css': __dirname + '/node_modules/angular-material/angular-material.css',
            'angular.ui.tree.css': __dirname + '/node_modules/angular-ui-tree/dist/angular-ui-tree.css',
            'angular-schema-form': __dirname + '/node_modules/angular-schema-form/dist/schema-form',
            'angular-schema-form-bootstrap': __dirname + '/node_modules/angular-schema-form/dist/bootstrap-decorator',
            'angular-schema-form-ng-material': __dirname + '/src/directives/angular-schema-form-material/material-decorator',
            'angular-material-data-table.css': __dirname + '/node_modules/angular-material-data-table/dist/md-data-table.css',
            'angular-motion.css': __dirname + '/node_modules/angular-motion/dist/angular-motion.css'
            // 'md-data-table': __dirname + '/node_modules/md-data-table/dist/md-data-table',
            // 'md-data-table-template': __dirname + '/node_modules/md-data-table/dist/md-data-table-templates',
            // 'md-data-table.css': __dirname + '/node_modules/md-data-table/dist/md-data-table-style.css'

        }
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader?module=commonjs&warnImplicitAny'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'sass']},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.(png|jpg|ttf)$/, loader: 'url?limit=8192'},
            {test: /\.jade$/, loader: 'jade-loader'},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'index.html', // Load a custom template
            // inject: 'body' // Inject all scripts into the body
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'development'
        }),
        new ExtractTextPlugin("dashboard.css")
    ]
};