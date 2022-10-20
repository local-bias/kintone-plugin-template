import produce from 'immer';
import { atom, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

export const pluginIdState = atom<string>({ key: `${PREFIX}pluginIdState`, default: '' });

export const storageState = atom<kintone.plugin.Storage | null>({
  key: `${PREFIX}storageState`,
  default: null,
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const conditionState = selectorFamily<kintone.plugin.Condition | null, number>({
  key: `${PREFIX}conditionState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      const storage = get(storageState);
      return !storage ? null : storage.conditions[conditionIndex] ?? null;
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        produce(current, (draft) => {
          if (!draft) {
            return;
          }
          draft.conditions[conditionIndex] = newValue as kintone.plugin.Condition;
        })
      );
    },
});
