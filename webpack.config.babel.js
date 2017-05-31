import webpack from 'webpack';
import path from 'path';
import WorkboxBuildWebpackPlugin from 'workbox-webpack-plugin';

const config = {
  entry: './client/src/index',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
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
    new WorkboxBuildWebpackPlugin({
      globDirectory: 'public',
      globPatterns: ['**\/*.{html,js,css}'],
      swSrc: './public/service-worker.js',
      swDest: './public/dist/service-worker.js',
    })
  ]
};

export default config;
