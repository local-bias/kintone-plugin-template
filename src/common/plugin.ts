/**
 * プラグインがアプリ単位で保存している設定情報を返却します
 */
export const restoreStorage = (id: string): kintone.plugin.Storage => {
  const config: Record<string, string> = kintone.plugin.app.getConfig(id);

  if (!Object.keys(config).length) {
    return createConfig();
  }
  return Object.entries(config).reduce<any>(
    (acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }),
    {}
  );
};

/**
 * アプリにプラグインの設定情報を保存します
 */
export const storeStorage = (target: Record<string, any>, callback?: () => void): void => {
  const converted = Object.entries(target).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: JSON.stringify(value) }),
    {}
  );

  kintone.plugin.app.setConfig(converted, callback);
};

/**
 * プラグインの設定情報のひな形を返却します
 */
const createConfig = (): kintone.plugin.Storage => ({
  conditions: [getNewCondition()],
});

export const getNewCondition = (): kintone.plugin.Condition => ({ field: '' });
