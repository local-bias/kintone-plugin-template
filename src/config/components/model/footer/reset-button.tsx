import React, { FC, memo, useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useRecoilCallback } from 'recoil';
import { storageState } from '../../../states/plugin';
import { createConfig } from '@/lib/plugin';
import { useSnackbar } from 'notistack';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);

  const onIconButtonClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onDecisionButtonClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(storageState, createConfig());
        setOpen(false);
        enqueueSnackbar('設定をリセットしました', { variant: 'success' });
      },
    []
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>設定のリセット</DialogTitle>
        <DialogContent>
          <DialogContentText>
            このプラグインの設定を初期状態に戻します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={onDecisionButtonClick}>
            実行
          </Button>
          <Button color='inherit' variant='contained' onClick={onClose}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title='プラグインの設定をリセット'>
        <IconButton onClick={onIconButtonClick}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default memo(Component);
