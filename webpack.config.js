const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
          theme: 'theme-material'
      }),
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          hash: true
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