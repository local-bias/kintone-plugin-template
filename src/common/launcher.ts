import { LOCAL_STORAGE_KEY, PLUGIN_NAME } from '@common/statics';

class Launcher {
  private readonly _pluginId: string;

  /**
   * 複数の処理を、各イベントに登録することができます
   */
  public constructor(pluginId: string) {
    this._pluginId = pluginId;
    this.pushLocalStorage();
  }

  /**
   * 指定された各処理を、各イベント発生時に実行されるよう登録していきます.
   * 特に指定がない場合、モバイル向けにもイベントが登録されます.
   */
  public launch = (configs: launcher.Config[]): void => {
    for (const config of configs) {
      const {
        enables = () => true,
        events = ['app.record.index.show'],
        action,
        disableMobile = false,
      } = config;

      const desktopEvents = typeof events === 'function' ? events(this._pluginId) : events;

      const mobileEvents = !disableMobile ? desktopEvents.map((type) => `mobile.${type}`) : [];

      const handler = (event: kintone.Event) => {
        try {
          return enables(event, this._pluginId) ? action(event, this._pluginId) : event;
        } catch (error) {
          event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
          console.error('エラー', error);
        }
        return event;
      };

      kintone.events.on([...desktopEvents, ...mobileEvents], handler);
    }
  };

  private pushLocalStorage() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const local = stored ? JSON.parse(stored) : {};
    local.pluginNames = local.pluginNames || [];
    if (!local.pluginNames.includes(PLUGIN_NAME)) {
      local.pluginNames.push(PLUGIN_NAME);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
  }
}

export default Launcher;
