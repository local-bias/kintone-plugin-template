import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';

export const kintoneEventAtom = atom<kintoneAPI.js.EventType | null>(null);
