var webpack = require('webpack');
var path = require('path');
var WorkboxBuildWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './client/src/index'],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/public/dist'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxBuildWebpackPlugin({
      globDirectory: 'public',
      globPatterns: ['**\/*.{html,js,json,css,png,ico}'],
      swSrc: './public/service-worker.js',
      swDest: './public/dist/service-worker.js',
    })
  ]
};

