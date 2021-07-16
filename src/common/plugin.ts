/**
 * プラグインがアプリ単位で保存している設定情報を返却します
 * @param id プラグインID
 * @returns 保存されていた設定情報
 */
export const restoreStorage = (id: string): kintone.plugin.Storage => {
  const config = kintone.plugin.app.getConfig(id);

  const keys = Object.keys(config);

  return keys.length
    ? keys.reduce<any>((accu, key) => ({ ...accu, [key]: JSON.parse(config[key]) }), {})
    : createConfig();
};

/**
 * アプリにプラグインの設定情報を保存します
 * @param target 保存する設定情報
 */
export const storeStorage = (target: Record<string, any>, callback?: () => void) => {
  const config: Record<string, string> = {};

  for (const key in target) {
    config[key] = JSON.stringify(target[key]);
  }

  kintone.plugin.app.setConfig(config, callback);
};

/**
 * プラグインの設定情報のひな形を返却します
 * @returns プラグインの設定情報のひな形
 */
const createConfig = (): kintone.plugin.Storage => ({
  conditions: [getNewCondition()],
});

export const getNewCondition = (): PluginCondition => ({});
