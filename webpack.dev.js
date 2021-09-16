const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = merge(common, {
  mode: 'development',

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin-dev.zip',
    }),
  ],
});
