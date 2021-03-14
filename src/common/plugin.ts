/**
 * プラグインがアプリ単位で保存している設定情報を返却します
 * @param id プラグインID
 * @returns 保存されていた設定情報
 */
export const getPluginConfig = (id: string): PluginStorage => {
  const config = kintone.plugin.app.getConfig(id);

  return Object.keys(config).reduce<any>((accu, key) => ({ ...accu, [key]: JSON.parse(config[key]) }), {});
};

/**
 * アプリにプラグインの設定情報を保存します
 * @param target 保存する設定情報
 */
export const savePluginConfig = (target: Record<string, any>) => {
  const config: Record<string, string> = {};

  for (const key in target) {
    config[key] = JSON.stringify(target[key]);
  }

  kintone.plugin.app.setConfig(config);
};

/**
 * プラグインの設定情報のひな形を返却します
 * @returns プラグインの設定情報のひな形
 */
export const createConfig = (): PluginStorage => ({});
