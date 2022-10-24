import React, { FC, FCX, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { storageState, tabIndexState } from '../../../states/plugin';
import styled from '@emotion/styled';

type Props = Readonly<{ onClick: () => void }>;

const Component: FCX<Props> = ({ className, onClick }) => (
  <div className={className}>
    <Tooltip title='この設定を削除'>
      <IconButton {...{ onClick }}>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  </div>
);

const StyledComponent = styled(Component)`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const Container: FC = () => {
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
      },
    [index]
  );

  return <StyledComponent {...{ onClick }} />;
};

export default memo(Container);
