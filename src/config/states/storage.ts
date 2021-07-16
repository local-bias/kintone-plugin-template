import { atom } from 'recoil';

const state = atom<kintone.plugin.Storage | null>({
  key: 'pluginStorageState',
  default: null,
});

export default state;
