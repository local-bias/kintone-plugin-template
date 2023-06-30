import React, { FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { produce } from 'immer';

import { getNewCondition } from '@/lib/plugin';
import { storageState } from '../../../states/plugin';
import { PluginConditionAppendButton } from '@konomi-app/kintone-utility-component';

const Container: FC = () => {
  const addCondition = useRecoilCallback(
    ({ set }) =>
      () => {
        set(storageState, (_storage) =>
          produce(_storage, (draft) => {
            draft.conditions.push(getNewCondition());
          })
        );
      },
    []
  );

  return <PluginConditionAppendButton onClick={addCondition} />;
};

export default memo(Container);
