import { RecoilState, atom, selector, selectorFamily } from 'recoil';
import { getUpdatedStorage, restorePluginConfig } from '@/lib/plugin';

const PREFIX = 'plugin';

export const storageState = atom<Plugin.Config>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const conditionsState = selector<Plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
});

const conditionPropertyState = selectorFamily<
  Plugin.Condition[keyof Plugin.Condition],
  keyof Plugin.Condition
>({
  key: `${PREFIX}conditionPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      const conditionIndex = get(tabIndexState);
      const storage = get(storageState);
      return storage.conditions[conditionIndex][key];
    },
  set:
    (key) =>
    ({ get, set }, newValue) => {
      const conditionIndex = get(tabIndexState);
      set(storageState, (current) =>
        getUpdatedStorage(current, {
          conditionIndex,
          key,
          value: newValue as Plugin.Condition[keyof Plugin.Condition],
        })
      );
    },
});

export const memoState = conditionPropertyState('memo') as RecoilState<string>;
export const fieldsState = conditionPropertyState('fields') as RecoilState<string[]>;
