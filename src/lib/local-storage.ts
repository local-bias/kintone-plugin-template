import { LOCAL_STORAGE_PREFIX, PLUGIN_KEY, PLUGIN_VERSION } from './static';

const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}${PLUGIN_KEY}`;

export const updateVersion = () => {
  const currentVersion = PLUGIN_VERSION;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}';
  const parsed = JSON.parse(stored);

  const latestVersion: string = parsed.latestVersion ?? currentVersion;

  const newStorage = {
    ...parsed,
    version: currentVersion,
  };

  const [latestMajor, latestMinor] = latestVersion.split('.').map((v) => parseInt(v, 10));
  const [currentMajor, currentMinor] = currentVersion.split('.').map((v) => parseInt(v, 10));

  newStorage.hasNewVersion =
    latestMajor > currentMajor || (latestMajor === currentMajor && latestMinor > currentMinor);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStorage));
};
