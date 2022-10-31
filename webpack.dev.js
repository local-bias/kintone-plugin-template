const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = merge(common, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'plugin'),
    filename: '[name].js',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './dist/private.ppk',
      pluginZipPath: './dist/plugin-dev.zip',
    }),
  ],
});
