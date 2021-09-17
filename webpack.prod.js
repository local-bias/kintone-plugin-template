const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = merge(common, {
  mode: 'production',

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
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
});
