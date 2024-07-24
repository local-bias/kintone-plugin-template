import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import {
  defaultSelectedConditionIdState,
  selectedConditionIdState,
  storageState,
} from '../../../states/plugin';
import { useSnackbar } from 'notistack';

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const storage = useRecoilValue(storageState);

  const onClick = useRecoilCallback(
    ({ reset, set, snapshot }) =>
      async () => {
        const id = await snapshot.getPromise(selectedConditionIdState);
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            const index = draft.conditions.findIndex((condition) => condition.id === id);
            draft.conditions.splice(index, 1);
          })
        );
        reset(selectedConditionIdState);
        enqueueSnackbar('設定を削除しました', { variant: 'success' });
      },
    []
  );

  if ((storage?.conditions.length ?? 0) < 2) {
    return null;
  }

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

export default memo(Container);
