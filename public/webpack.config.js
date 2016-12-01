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
        'vendor': ['jquery', 'lodash', 'jquery-terminal', 'jquery-mousewheel'],
        'page/index': __dirname + '/src/pages/index/index.ts',
        'page/style': __dirname + '/src/pages/style/index.ts'
    },
    devtool: "source-map",
    output: {
        path: __dirname + '/built',
        filename: '[name].bundle.js'
    },
    // externals: {
    //     $: 'jQuery.noConflict()',
    //     jQuery: 'jQuery.noConflict()',
    //     _: "lodash",
    //     angular: "angular"
    // },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.jade', '.scss', '.css'],
        exclude: /node_modules/,
        root: __dirname + '/node_modules/',
        alias: {
            'tv4': 'tv4/tv4',
            // 'tty.js': __dirname + '/node_modules/tty.js/static/tty',
            // 'term.js': __dirname + '/node_modules/term.js/src/term',
            'restangular': 'restangular/dist/restangular',
            'jsoneditor.js': 'jsoneditor/dist/jsoneditor',
            'jsoneditor.css': 'jsoneditor/dist/jsoneditor.css',
            'ng-jsoneditor': 'ng-jsoneditor/ng-jsoneditor',
            'svg-morpheus': 'svg-morpheus/compile/unminified/svg-morpheus',
            'angular-schema-form': 'angular-schema-form/dist/schema-form',
            'angular-schema-form-ng-material': __dirname + '/src/directives/angular-schema-form-material/material-decorator',
            'angular.material.css': 'angular-material/angular-material.css',
            'angular.ui.tree.css': 'angular-ui-tree/dist/angular-ui-tree.css',
            'angular-material-data-table.css': 'angular-material-data-table/dist/md-data-table.css',
            'angular-motion.css': 'nganimationcss/build/nga.all.css',
            'angular-loading-bar.css': 'angular-loading-bar/build/loading-bar.css',
            'angular-gridster': 'angular-gridster/dist/angular-gridster.min',
            'angular-gridster.css': 'angular-gridster/dist/angular-gridster.min.css',
            'jquery': 'jquery/dist/jquery',
            'jquery-terminal': 'jquery.terminal/js/jquery.terminal.min',
            'jquery-mousewheel': 'jquery.mousewheel/jquery.mousewheel',
            'jquery-terminal.css': 'jquery.terminal/css/jquery.terminal.min.css'
        }
    },
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
            { test: /\.ts$/, loader: 'ts?module=commonjs' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.(png|jpg|ttf)$/, loader: 'url?limit=8192' },
            { test: /\.jade$/, loader: 'jade' },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'development'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new ExtractTextPlugin("dashboard.css"),
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'index.html',
            inject: 'body'
        })
    ]
};