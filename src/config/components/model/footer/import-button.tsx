import React, { ChangeEventHandler, FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useSnackbar } from 'notistack';
import { storageState } from '../../../states/plugin';
import { PluginConfigImportButton } from '@konomi-app/kintone-utility-component';

const onFileLoad = (file: File | Blob, encoding = 'UTF-8') => {
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

  return <PluginConfigImportButton onImportButtonClick={onChange} loading={false} />;
};

export default memo(Component);
