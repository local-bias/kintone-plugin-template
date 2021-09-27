declare namespace kintone {
  /**
   * events.onに指定するイベント名の型を補完したもの☁️
   *
   * change系のイベントに対応していません
   */
  type EventType =
    | 'portal.show'
    | 'app.record.index.show'
    | 'app.record.index.edit.show'
    | 'app.record.index.edit.submit'
    | 'app.record.index.edit.submit.success'
    | 'app.record.index.delete.submit'
    | 'app.record.detail.show'
    | 'app.record.detail.delete.submit'
    | 'app.record.detail.process.proceed'
    | 'app.record.create.show'
    | 'app.record.create.change'
    | 'app.record.create.submit'
    | 'app.record.create.submit.success'
    | 'app.record.edit.show'
    | 'app.record.edit.change'
    | 'app.record.edit.submit'
    | 'app.record.edit.submit.success'
    | 'app.record.print.show'
    | 'mobile.app.record.index.show'
    | 'mobile.app.record.detail.show'
    | 'mobile.app.record.detail.delete.submit'
    | 'mobile.app.record.detail.process.proceed'
    | 'mobile.app.record.create.show'
    | 'mobile.app.record.create.change'
    | 'mobile.app.record.create.submit'
    | 'mobile.app.record.create.submit.success'
    | 'mobile.app.record.edit.show'
    | 'mobile.app.record.edit.change'
    | 'mobile.app.record.edit.submit'
    | 'mobile.app.record.edit.submit.success';

  /** events.onに指定するコールバック関数から受け取る引数の型を補完したもの☁️ */
  type Event<T = Record<string, any>> = {
    appId: number;
    viewId: number;
    recordId: number;
    record: T;
    error: string;
    url: string;
    type: EventType;
    changes?: {
      field: {
        type: string;
        value: string;
      };
      row: any;
    };
    records?: T[];
    viewType?: string;
    viewName?: string;
    offset?: number;
  };
}
