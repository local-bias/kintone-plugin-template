import { createConfig } from '@/common/plugin';
import { KintoneEventListener, restoreStorage } from '@konomi-app/kintone-utilities';

export default (listener: KintoneEventListener) => {
  listener.add(['app.record.index.show'], async (event, otherProps) => {
    const { pluginId } = otherProps ?? {};
    if (!pluginId) {
      return event;
    }
    const config = restoreStorage<kintone.plugin.Storage>(pluginId) ?? createConfig();

    console.log('fsafassfafsa', { pluginId, event, config });
    return event;
  });
};
