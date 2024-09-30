import { nanoid } from 'nanoid';
import { PLUGIN_ID } from './global';

export const getNewCondition = (): Plugin.Condition => ({
  id: nanoid(),
  memo: '',
  fields: [''],
  isSampleUIShown: true,
});

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 1,
  common: {
    memo: '',
    fields: [],
  },
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * 各バージョンは次のバージョンへの変換処理を持ち、再帰的なアクセスによって最新のバージョンに変換されます
 *
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: Plugin.AnyConfig): Plugin.Config => {
  const { version } = anyConfig;
  switch (version) {
    case undefined:
      return migrateConfig({ ...anyConfig, version: 1 });
    case 1:
    default: // `default` -> `config.js`と`desktop.js`のバージョンが一致していない場合に通る可能性があるため必要
      // もし新しいバージョンを追加したらここに追加する
      // return migrateConfig({ version: 2, ...anyConfig });
      return anyConfig;
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage(PLUGIN_ID);
  return migrateConfig(config);
};

export const getConditionField = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<Plugin.Condition[T]>;
  }
): NonNullable<Plugin.Condition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};

/**
 * アプリにプラグインの設定情報を保存します
 *
 * #### compileVersion2
 * １つのプロパティに格納できる文字数に制限があるため、`conditions`プロパティはそのまま保存するのではなく、`conditionKeys`プロパティと各`condition`プロパティの`key`を使用し、オブジェクト構造を均して保存します
 *
 * @param target プラグインの設定情報
 * @param callback 保存成功後に実行する処理. 省略すると、アプリ設定のプラグインの一覧画面に遷移し、設定完了メッセージを表示します。指定すると、アプリ設定のプラグインの一覧画面には遷移しません。
 */
export const storePluginConfig = (target: Plugin.Config, callback?: () => void): void => {
  const conditionIds = target.conditions.map((c) => c.id);

  const converted = {
    version: String(target.version),
    common: JSON.stringify(target.common),
    conditionIds: JSON.stringify(conditionIds),
    ...conditionIds.reduce<Record<string, string>>(
      (acc, id) => ({
        ...acc,
        [id]: JSON.stringify(target.conditions.find((c) => c.id === id)),
      }),
      {}
    ),
  };

  process.env.NODE_ENV === 'development' && console.log(`📦 compiled config`, converted);

  kintone.plugin.app.setConfig(converted, callback);
};

/**
 * プラグインがアプリ単位で保存している設定情報を返却します
 *
 * 設定情報の取得に失敗した場合は、nullを返却します
 * @param id プラグインID
 * @returns プラグインの設定情報
 */
export const restoreStorage = (id: string): Plugin.AnyConfig => {
  const config: Record<string, string> = kintone.plugin.app.getConfig(id);

  process.env.NODE_ENV === 'development' && console.log(`📦 restored config`, config);

  if (!Object.keys(config).length) {
    return createConfig();
  }

  if ('conditionIds' in config) {
    const conditionIds: string[] = JSON.parse(config.conditionIds);
    const conditions = conditionIds.map((key) => JSON.parse(config[key]!));
    const common = 'common' in config ? JSON.parse(config.common) : {};
    return { version: Number(config.version), common, conditions } as Plugin.AnyConfig;
  }

  return Object.entries(config).reduce<any>(
    (acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }),
    {}
  );
};
