declare namespace kintone {
  namespace plugin {
    type LatestStorage = StorageV1;

    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = StorageV1; // | StorageV2 | ...;

    type StorageV1 = {
      version: 1;
      conditions: Condition[];
    };

    /** プラグインの制御単位の設定情報🔌 */
    type Condition = {
      memo: string;
      fields: string[];
    };
  }
}
