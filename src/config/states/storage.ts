import { atom } from 'recoil';

const state = atom<kintone.plugin.Storage | null>({
  key: 'PluginStorage',
  default: null,
});

export default state;
