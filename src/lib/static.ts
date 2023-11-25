import config from '../../plugin.config.mjs';

export const PLUGIN_NAME = config.manifest.base.name.ja;
export const PLUGIN_VERSION = config.manifest.base.version;
export const LOCAL_STORAGE_KEY = config.id;
export const URL_HOMEPAGE = config.manifest.base.homepage_url?.ja;
export const URL_PLUGIN_LIST = config.pluginReleasePageUrl;

export const URL_INQUIRY = 'https://form.konomi.app';
export const URL_PROMOTION = 'https://promotion.konomi.app/kintone-plugin';
export const URL_BANNER = 'https://promotion.konomi.app/kintone-plugin/sidebar';
