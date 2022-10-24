import React, { FC, FCX, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';
import { Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import { storeStorage } from '@common/plugin';
import { loadingState, storageState } from '../../../states/plugin';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FCX<Props> = ({ className, onSaveButtonClick, onBackButtonClick }) => {
  const loading = useRecoilValue(loadingState);

  return (
    <div {...{ className }}>
      <Button
        variant='contained'
        color='primary'
        disabled={loading}
        onClick={onSaveButtonClick}
        startIcon={loading ? <CircularProgress color='inherit' size={20} /> : <SaveIcon />}
      >
        設定を保存
      </Button>
      <Button
        variant='contained'
        color='inherit'
        disabled={loading}
        onClick={onBackButtonClick}
        startIcon={
          loading ? <CircularProgress color='inherit' size={20} /> : <SettingsBackupRestoreIcon />
        }
      >
        プラグイン一覧へ戻る
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 15px;
  margin-top: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 30;

  button {
    margin: 8px;
  }
`;

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        set(loadingState, true);
        try {
          const storage = await snapshot.getPromise(storageState);

          storeStorage(storage!, () => true);
          enqueueSnackbar('設定を保存しました', {
            variant: 'success',
            action: (
              <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                プラグイン一覧に戻る
              </Button>
            ),
          });
        } finally {
          set(loadingState, false);
        }
      },
    []
  );

  return <StyledComponent {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
