import { restorePluginConfig } from '@/lib/plugin';
import { atom } from 'jotai';

export const pluginConfigAtom = atom(restorePluginConfig());
