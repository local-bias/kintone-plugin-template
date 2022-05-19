import React, { FC } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { produce } from 'immer';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { getNewCondition } from '@common/plugin';

import { storageState } from '../../states';

type Props = Readonly<{ addCondition: () => void }>;

const Component: FC<Props> = ({ addCondition }) => (
  <Button
    variant='outlined'
    color='primary'
    size='small'
    startIcon={<AddIcon />}
    onClick={addCondition}
    style={{ marginTop: '16px' }}
  >
    新しい設定
  </Button>
);

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

  return <Component {...{ addCondition }} />;
};

export default Container;
