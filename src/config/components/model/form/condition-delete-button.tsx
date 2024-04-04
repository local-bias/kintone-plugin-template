import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import { storageState, tabIndexState } from '../../../states/plugin';
import { useSnackbar } from 'notistack';

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const storage = useRecoilValue(storageState);
  const index = useRecoilValue(tabIndexState);

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions.splice(index, 1);
          })
        );
        set(tabIndexState, (i) => (i === 0 ? i : i - 1));
        enqueueSnackbar('設定を削除しました', { variant: 'success' });
      },
    [index]
  );

  if ((storage?.conditions.length ?? 0) < 2) {
    return null;
  }

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

export default memo(Container);
