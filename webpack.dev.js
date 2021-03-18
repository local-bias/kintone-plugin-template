const { merge } = require('webpack-merge');
const common = require('./webpack.common.ts');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = merge(common, {
  mode: 'development',

  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin-dev.zip',
    }),
  ],
});
