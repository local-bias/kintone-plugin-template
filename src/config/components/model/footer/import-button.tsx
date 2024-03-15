import React, { ChangeEventHandler, FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useSnackbar } from 'notistack';
import { onFileLoad } from '@konomi-app/kintone-utilities';
import { PluginConfigImportButton } from '@konomi-app/kintone-utilities-react';
import { storageState } from '../../../states/plugin';
import { migrateConfig } from '@/lib/plugin';
import { t } from '@/lib/i18n';

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
          set(storageState, migrateConfig(JSON.parse(text)));
          enqueueSnackbar(t('config.toast.import'), { variant: 'success' });
        } catch (error) {
          enqueueSnackbar(t('config.error.import'), { variant: 'error' });
          throw error;
        }
      },
    []
  );

  return <PluginConfigImportButton onImportButtonClick={onChange} loading={false} />;
};

export default memo(Component);
