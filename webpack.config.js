var webpack = require('webpack');
var path = require('path');

var config = {
  entry: [
    'babel-polyfill',
    './src/js/app.js'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dev/js'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

module.exports = config;
