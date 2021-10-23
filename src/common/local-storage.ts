import { LOCAL_STORAGE_KEY, PLUGIN_NAME } from '@common/statics';

type LocalStorage = {
  pluginNames: string[];
};

const parsable = (target: any) => {
  try {
    JSON.parse(target);
  } catch (error) {
    return false;
  }
  return true;
};

const isValid = (storage: any): storage is Partial<LocalStorage> => {
  return storage && parsable(storage) && typeof storage === 'object';
};

export const pushPluginName = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const local = isValid(stored) ? JSON.parse(stored) : {};
  local.pluginNames = local.pluginNames || [];
  if (!local.pluginNames.includes(PLUGIN_NAME)) {
    local.pluginNames.push(PLUGIN_NAME);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
};
