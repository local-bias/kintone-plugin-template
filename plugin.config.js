/** @type {import('./src/types/plugin-config').PluginConfig} */
module.exports = {
  manifest: {
    base: {
      manifest_version: 1,
      version: 1,
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
      icon: 'image/icon.png',
      homepage_url: {
        ja: 'https://konomi.app/',
        en: 'https://konomi.app/',
      },
      desktop: {
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest/dist/desktop.js'],
        css: [],
      },
      mobile: {
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest/dist/desktop.js'],
        css: [],
      },
      config: {
        html: 'html/config.html',
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest/dist/config.js'],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
    prod: {
      desktop: {
        js: [
          'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-template@latest/cdn/desktop.js',
        ],
      },
      mobile: {
        js: [
          'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-template@latest/cdn/desktop.js',
        ],
      },
      config: {
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-template@latest/cdn/config.js'],
      },
    },
  },
};
