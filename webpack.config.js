import path from 'path';
import nodeExternals from 'webpack-node-externals';

// http://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
const target = 'web';
const externals = [nodeExternals({
  whitelist: [
    /^lodash/,
  ],
})];

// http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/
const presets = ['es2015', 'stage-0', 'react'];

module.exports = {
  entry: './src/app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'assets/',
    filename: 'bundle.js',
  },
  target,
  externals,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets },
      },
    ],
  },
};
