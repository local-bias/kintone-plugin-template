import { restoreStorage } from '@/common/plugin';

const events: launcher.Events = ['app.record.index.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  console.log('fsafassfafsa', { pluginId, event, config });
  return event;
};

export default { events, action };
