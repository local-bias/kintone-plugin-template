const hp = 'https://konomi.app/';
const commonCdn = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest';
const cdn = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-template@latest';
const localhost = 'https://127.0.0.1:5500';

/** @type {import('./src/types/plugin-config').PluginConfig} */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '1.0.0',
      type: 'APP',
      name: {
        en: 'kintone-plugin-template',
        ja: 'プラグインテンプレート',
        zh: '插件模板',
      },
      description: {
        en: 'kintone-plugin-template',
        ja: 'プラグインの説明をここに記載します',
        zh: '插件模板',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp },
      desktop: {
        js: [`${commonCdn}/dist/desktop.js`],
        css: [],
      },
      mobile: {
        js: [`${commonCdn}/dist/desktop.js`],
        css: [],
      },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/dist/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: [`${localhost}/plugin/desktop.js`] },
      mobile: { js: [`${localhost}/plugin/desktop.js`] },
      config: { js: [`${localhost}/plugin/config.js`] },
    },
    prod: {
      desktop: { js: [`${cdn}/cdn/desktop.js`] },
      mobile: { js: [`${cdn}/cdn/desktop.js`] },
      config: { js: [`${cdn}/cdn/config.js`] },
    },
  },
};