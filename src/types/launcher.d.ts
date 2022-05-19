declare namespace launcher {
  /** イベントタイプ以外の実行条件⚡ */
  type Enables = (event: kintone.Event, pluginId: string) => boolean;

  /** 処理を登録するイベント⚡ */
  type Events = kintone.EventType[] | ((pluginId: string) => kintone.EventType[]);

  /** 各イベントに登録する処理⚡ */
  type Action = (event: kintone.Event, pluginId: string) => kintone.Event | Promise<kintone.Event>;

  /**
   * イベント実行に必要なプロパティ情報⚡
   *
   * 必須はactionのみで、eventsに指定がない場合は一覧表示イベント(app.record.index.show)が設定されます
   */
  type Config = {
    action: Action;
    enables?: Enables;
    events?: Events;
    disableMobile?: boolean;
  };
}
