declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV1;

  /** 🔌 プラグインの共通設定 */
  type Common = Config['common'];

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1; // | ConfigV2 | ...;

  type ConfigV1 = {
    version: 1;
    common: {
      memo: string;
      fields: string[];
    };
    conditions: {
      id: string;
      memo: string;
      fields: string[];
      isSampleUIShown: boolean;
    }[];
  };
}
