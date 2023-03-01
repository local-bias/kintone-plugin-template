import { createConfig } from '@/common/plugin';
import { restoreStorage } from '@konomi-app/kintone-utilities';

const events: launcher.Events = ['app.record.index.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage<kintone.plugin.Storage>(pluginId) ?? createConfig();

  console.log('fsafassfafsa', { pluginId, event, config });
  return event;
};

export default { events, action };
