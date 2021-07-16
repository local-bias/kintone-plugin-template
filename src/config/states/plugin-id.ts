import { atom } from 'recoil';

const state = atom<string | null>({ key: 'pluginIdState', default: null });

export default state;
