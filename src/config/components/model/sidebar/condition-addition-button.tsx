import React, { FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { produce } from 'immer';

import { getNewCondition } from '@/common/plugin';
import { storageState } from '../../../states/plugin';
import { PluginConditionAppendButton } from '@konomi-app/kintone-utility-component';

const Container: FC = () => {
  const addCondition = useRecoilCallback(
    ({ set }) =>
      () => {
        set(storageState, (_, _storage = _!) =>
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
