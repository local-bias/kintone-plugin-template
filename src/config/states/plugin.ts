import { DefaultValue, RecoilState, atom, selector, selectorFamily } from 'recoil';
import { getUpdatedStorage, restorePluginConfig } from '@/lib/plugin';
import { nanoid } from 'nanoid';

const PREFIX = 'plugin';

export const storageState = atom<Plugin.Config>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const selectedConditionIdState = atom<string | null>({
  key: `${PREFIX}selectedConditionIdState`,
  default: null,
});

export const commonSettingsShownState = selector<boolean>({
  key: `${PREFIX}commonSettingsShownState`,
  get: ({ get }) => {
    return get(selectedConditionIdState) === null;
  },
});

export const selectedConditionState = selector<Plugin.Condition>({
  key: `${PREFIX}selectedConditionState`,
  get: ({ get }) => {
    const storage = get(storageState);
    const selectedConditionId = get(selectedConditionIdState);
    return (
      storage.conditions.find((condition) => condition.id === selectedConditionId) ??
      storage.conditions[0]
    );
  },
});

export const conditionsState = selector<Plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return (storage?.conditions ?? []).map((condition) => {
      if ('id' in condition) {
        return condition;
      }
      // @ts-expect-error 定義通りであればidは必ず上書きされるが、そうでなかった場合を考慮
      return { id: nanoid(), ...condition };
    });
  },
});

export const conditionsLengthState = selector<number>({
  key: `${PREFIX}conditionsLengthState`,
  get: ({ get }) => {
    const conditions = get(conditionsState);
    return conditions.length;
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
      return get(selectedConditionState)[key];
    },
  set:
    (key) =>
    ({ get, set }, newValue) => {
      const conditionId = get(selectedConditionState).id;
      set(storageState, (current) => {
        if (newValue instanceof DefaultValue) {
          return current;
        }
        const conditionIndex = current.conditions.findIndex(
          (condition) => condition.id === conditionId
        );
        return getUpdatedStorage(current, { conditionIndex, key, value: newValue });
      });
    },
});

export const commonPropertyState = selectorFamily<
  Plugin.Common[keyof Plugin.Common],
  keyof Plugin.Common
>({
  key: `${PREFIX}commonPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      return get(storageState).common[key];
    },
  set:
    (key) =>
    ({ set }, newValue) => {
      set(storageState, (current) => {
        if (newValue instanceof DefaultValue) {
          return current;
        }
        return {
          ...current,
          common: {
            ...current.common,
            [key]: newValue,
          },
        };
      });
    },
});

export const getCommonPropertyState = <T extends keyof Plugin.Common>(property: T) =>
  commonPropertyState(property) as unknown as RecoilState<Plugin.Common[T]>;

export const getConditionPropertyState = <T extends keyof Plugin.Condition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<Plugin.Condition[T]>;

export const fieldsState = getConditionPropertyState('fields');
