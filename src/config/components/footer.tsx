import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

import { StorageContainer } from '../contexts';

const Component: React.VFCX = ({ className }) => {
  const { save } = StorageContainer.useContainer();
  const [open, setOpen] = useState(false);

  const onClickSave = () => {
    save();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const historyBack = () => history.back();

  return (
    <>
      <div className={className}>
        <Button variant='contained' color='primary' onClick={onClickSave} startIcon={<SaveIcon />}>
          設定を保存
        </Button>
        <Button variant='contained' onClick={historyBack} startIcon={<SettingsBackupRestoreIcon />}>
          プラグイン一覧へ戻る
        </Button>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant='filled'
          severity='success'
          action={
            <>
              <Button color='inherit' size='small' onClick={historyBack}>
                プラグイン一覧へ戻る
              </Button>
              <IconButton size='small' color='inherit' onClick={handleClose}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </>
          }
        >
          設定を保存しました
        </Alert>
      </Snackbar>
    </>
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
