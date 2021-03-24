import React, { VFCX, useCallback } from 'react';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { useSnackbar } from 'notistack';

import { StorageContainer } from '../contexts';

const Component: VFCX = ({ className }) => {
  const { save } = StorageContainer.useContainer();
  const { enqueueSnackbar } = useSnackbar();

  const onClickSave = useCallback(() => {
    save();
    enqueueSnackbar('設定を保存しました', {
      variant: 'success',
    });
  }, []);

  const historyBack = () => history.back();

  return (
    <div className={className}>
      <Button variant='contained' color='primary' onClick={onClickSave} startIcon={<SaveIcon />}>
        設定を保存
      </Button>
      <Button variant='contained' onClick={historyBack} startIcon={<SettingsBackupRestoreIcon />}>
        プラグイン一覧へ戻る
      </Button>
    </div>
  );
};

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

export default StyledComponent;
