const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/clientExtjs.js',
  devtool: 'inline-source-map',

  output: {
    path: './public',
    filename: 'bundle.js'       
  },
  plugins: [
      new ExtJSReactWebpackPlugin({
          sdk: '/Users/mbrocato/sencha/ext-6.2.1', // location of Ext JS SDK
          theme: 'theme-material',
          packages: ['charts']
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