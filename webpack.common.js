const path = require('path');

module.exports = {
  entry: {
    desktop: './src/desktop/index.ts',
    config: './src/config/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'plugin', 'js'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
    },
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
};
