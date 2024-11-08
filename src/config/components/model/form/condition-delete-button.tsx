import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';
import {
  conditionsAtom,
  conditionsLengthAtom,
  selectedConditionIdAtom,
} from '../../../states/plugin';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useAtomCallback(
    useCallback(
      async (get, set) => {
        const selectedConditionId = get(selectedConditionIdAtom);
        set(conditionsAtom, (prev) =>
          prev.filter((condition) => condition.id !== selectedConditionId)
        );
        set(selectedConditionIdAtom, null);
        enqueueSnackbar('設定を削除しました', { variant: 'success' });
      },
      [enqueueSnackbar]
    )
  );

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

const Container: FC = () => {
  const conditionsLength = useAtomValue(conditionsLengthAtom);

  if (conditionsLength < 2) {
    return null;
  }
  return <Component />;
};

export default Container;
