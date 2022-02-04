import { LOCAL_STORAGE_KEY, PLUGIN_NAME } from '@common/static';

type LocalStorage = Record<string, unknown> & {
  pluginNames: string[];
};

const getParsedLocalStorage = (): Partial<LocalStorage> => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    return {};
  }
  try {
    const parsed = JSON.parse(stored);
    return typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
};

export const pushPluginName = () => {
  const storage = getParsedLocalStorage();
  storage.pluginNames = storage.pluginNames || [];
  if (!storage.pluginNames.includes(PLUGIN_NAME)) {
    storage.pluginNames.push(PLUGIN_NAME);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
};
