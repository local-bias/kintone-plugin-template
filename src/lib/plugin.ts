import { produce } from 'immer';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.Storage => ({
  conditions: [getNewCondition()],
});

export const getNewCondition = (): kintone.plugin.Condition => ({ fields: [''] });

export const getUpdatedStorage = <T extends keyof kintone.plugin.Condition>(
  storage: kintone.plugin.Storage,
  props: {
    conditionIndex: number;
    key: T;
    value: kintone.plugin.Condition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

export const getConditionField = <T extends keyof kintone.plugin.Condition>(
  storage: kintone.plugin.Storage,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<kintone.plugin.Condition[T]>;
  }
): NonNullable<kintone.plugin.Condition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};
