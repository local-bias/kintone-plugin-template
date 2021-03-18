const { merge } = require('webpack-merge');
const common = require('./webpack.common.ts');
const TerserPlugin = require('terser-webpack-plugin');
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
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
        },
      }),
    ],
  },
});
