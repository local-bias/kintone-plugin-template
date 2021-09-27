declare namespace launcher {
  /** イベントタイプ以外の実行条件⚡ */
  type Enables = (event: kintone.Event) => boolean;

  /** 各イベントに登録する処理⚡ */
  type Action = (event: kintone.Event, pluginId: string) => kintone.Event | Promise<kintone.Event>;
}
