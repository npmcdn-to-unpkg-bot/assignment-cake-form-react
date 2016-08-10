import path from 'path';

module.exports = {
  entry: {
    app: ['./src/app/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'assets/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
