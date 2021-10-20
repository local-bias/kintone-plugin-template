const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'cdn'),
    filename: '[name].js',
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin-prod.zip',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
});
