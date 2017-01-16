const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = {
  entry: './src/clientExtjs.js',
  output: {
    path: './public',
    filename: 'bundle.js'       
  },
  plugins: [
        new ExtJSReactWebpackPlugin({
            sdk: 'c:\\Users\\Admin\\Documents\\Architect\\frameworks\\ext62\\6.2.1.167\\commercial', // location of Ext JS SDK
            theme: 'theme-material',
            packages: ['charts']
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