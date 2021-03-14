import { useState, useMemo, useCallback } from 'react';
import { createContainer } from 'unstated-next';

import { getPluginConfig, savePluginConfig } from '@common/plugin';

/**
 *
 * @param initialState
 * @returns 使用するReactのフック
 */
const hooks = (initialState: string = '') => {
  const pluginId = useMemo(() => initialState, [initialState]);

  const [config, setConfig] = useState<PluginStorage>(getPluginConfig(initialState));

  const saveConfig = useCallback(() => savePluginConfig(config), []);

  return { pluginId, config, setConfig };
};

export default createContainer(hooks);
