import { atom } from 'recoil';

const state = atom<string>({ key: 'PluginId', default: '' });

export default state;
