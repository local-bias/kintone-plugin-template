import { getConditionField, getUpdatedStorage } from '@/lib/plugin';
import { produce } from 'immer';
import { atom, selector, selectorFamily } from 'recoil';

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

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const conditionsState = selector<kintone.plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
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

export const fieldsState = selector<string[]>({
  key: `${PREFIX}fieldsState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'fields',
      defaultValue: [''],
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      getUpdatedStorage(current, {
        conditionIndex,
        key: 'fields',
        value: newValue as string[],
      })
    );
  },
});
