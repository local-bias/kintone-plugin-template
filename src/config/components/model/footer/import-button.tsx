import React, { ChangeEventHandler, FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useSnackbar } from 'notistack';
import { IconButton, Tooltip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { storageState } from '../../../states/plugin';

const onFileLoad = (file: File | Blob, encoding = 'Shift_JIS') => {
  return new Promise<ProgressEvent<FileReader>>((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.readAsText(file, encoding);

      reader.onload = (event) => resolve(event);
      reader.onerror = (event) => reject(event);
    } catch (error) {
      reject(error);
    }
  });
};

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      async (event) => {
        try {
          const { files } = event.target;
          if (!files?.length) {
            return;
          }
          const [file] = Array.from(files);
          const fileEvent = await onFileLoad(file);
          const text = (fileEvent.target?.result ?? '') as string;
          set(storageState, JSON.parse(text));
          enqueueSnackbar('設定情報をインポートしました', { variant: 'success' });
        } catch (error) {
          enqueueSnackbar(
            '設定情報のインポートに失敗しました、ファイルに誤りがないか確認してください',
            { variant: 'error' }
          );
          throw error;
        }
      },
    []
  );

  return (
    <Tooltip title='プラグイン設定をインポート'>
      <IconButton component='label'>
        <input hidden accept='application/json' type='file' onChange={onChange} />
        <UploadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default memo(Component);
