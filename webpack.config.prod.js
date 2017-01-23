const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    devtool: 'inline-source-map',
    entry: './src/clientExtjs.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtJSReactWebpackPlugin({
            sdk: 'c:\\Users\\ToolsTeam\\Documents\\Architect\\frameworks\\ext62\\6.2.1.167\\commercial', // location of Ext JS SDK
            theme: 'theme-material',
            packages: ['charts']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack .optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV' : JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output:{
                comments:false
            },
            compress:{
                warnings:false,
                screw_ie8:false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
};