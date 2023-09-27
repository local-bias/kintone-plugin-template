declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = { version: 1 } & StorageV1; // | { version: 2 } & StorageV2 | ...;

    type StorageV1 = {
      conditions: Condition[];
    };

    /** プラグインの制御単位の設定情報🔌 */
    type Condition = {
      memo: string;
      fields: string[];
    };
  }
}
