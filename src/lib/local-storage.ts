import { PLUGIN_KEY, PLUGIN_VERSION } from './static';

export const updateVersion = () => {
  const currentVersion = PLUGIN_VERSION;
  const stored = localStorage.getItem(PLUGIN_KEY) ?? '{}';
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

  localStorage.setItem(PLUGIN_KEY, JSON.stringify(newStorage));
};
