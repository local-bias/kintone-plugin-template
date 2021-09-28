import React, { VFC, VFCX } from 'react';
import { useRecoilCallback } from 'recoil';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import { storeStorage } from '@common/plugin';

import { storageState } from '../states';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: VFCX<Props> = ({ className, onSaveButtonClick, onBackButtonClick }) => (
  <div {...{ className }}>
    <Button
      variant='contained'
      color='primary'
      onClick={onSaveButtonClick}
      startIcon={<SaveIcon />}
    >
      設定を保存
    </Button>
    <Button
      variant='contained'
      color='inherit'
      onClick={onBackButtonClick}
      startIcon={<SettingsBackupRestoreIcon />}
    >
      プラグイン一覧へ戻る
    </Button>
  </div>
);

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 24px;
  margin-top: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;

  button {
    margin: 8px;
  }
`;

const Container: VFC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = () => history.back();

  const onSaveButtonClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const storage = await snapshot.getPromise(storageState);

        storeStorage(storage!, () => true);
        enqueueSnackbar('設定を保存しました', {
          variant: 'success',
          action: (
            <Button color='inherit' onClick={onBackButtonClick}>
              プラグイン一覧に戻る
            </Button>
          ),
        });
      },
    []
  );

  return <StyledComponent {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
