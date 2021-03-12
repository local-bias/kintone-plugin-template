import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { getConfig } from '@common/plugin';

/**
 *
 * @param initialState
 * @returns 使用するReactのフック
 */
const hooks = (initialState: string = '') => {
  const [pluginId, setPluginId] = useState<string>(initialState);
  const [config, setConfig] = useState<PluginStorage>(getConfig(initialState));

  return { pluginId, setPluginId, config, setConfig };
};

export default createContainer(hooks);
