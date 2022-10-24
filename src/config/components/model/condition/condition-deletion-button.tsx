import React, { FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { produce } from 'immer';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { storageState } from '../../../states/plugin';
import { useConditionIndex } from '../../../contexts/condition-index-provider';

type Props = Readonly<{ onClick: () => void }>;

const Component: FC<Props> = ({ onClick }) => (
  <Tooltip title='この設定を削除'>
    <IconButton {...{ onClick }}>
      <DeleteIcon fontSize='small' />
    </IconButton>
  </Tooltip>
);

const Container: FC = () => {
  const index = useConditionIndex();

  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions.splice(index, 1);
          })
        );
      },
    [index]
  );

  return <Component {...{ onClick }} />;
};

export default memo(Container);
