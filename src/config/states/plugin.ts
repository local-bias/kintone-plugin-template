import { atom, selector } from 'recoil';
import { getConditionField, getUpdatedStorage, restorePluginConfig } from '@/lib/plugin';

const PREFIX = 'plugin';

export const storageState = atom<kintone.plugin.LatestStorage>({
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

export const conditionsState = selector<kintone.plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
});

export const memoState = selector<string>({
  key: `${PREFIX}memoState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'memo',
      defaultValue: '',
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      getUpdatedStorage(current, {
        conditionIndex,
        key: 'memo',
        value: newValue as string,
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
