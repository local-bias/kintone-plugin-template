const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    desktop: './src/desktop/index.ts',
    config: './src/config/index.ts',
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
