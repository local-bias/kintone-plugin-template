import { restoreStorage } from '@common/plugin';

const events: launcher.Events = ['mobile.app.record.edit.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  console.log('プラグインが有効です', { pluginId, event, config });
  return event;
};

export default { events, action };
