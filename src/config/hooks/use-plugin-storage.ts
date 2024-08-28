import { useRecoilCallback } from 'recoil';
import { loadingState, storageState } from '../states/plugin';
import { PLUGIN_NAME } from '@/lib/static';
import { useSnackbar } from 'notistack';
import { t } from '@/lib/i18n';
import { ChangeEventHandler } from 'react';
import { onFileLoad } from '@konomi-app/kintone-utilities';
import { migrateConfig } from '@/lib/plugin';
import invariant from 'tiny-invariant';

export const usePluginStorage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const importStorage: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      async (event) => {
        try {
          const { files } = event.target;
          invariant(files?.length, 'ファイルが見つかりませんでした');
          const [file] = Array.from(files);
          const fileEvent = await onFileLoad(file!);
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

  const exportStorage = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        try {
          set(loadingState, true);
          const storage = await snapshot.getPromise(storageState);
          const blob = new Blob([JSON.stringify(storage, null)], {
            type: 'application/json',
          });
          const url = (window.URL || window.webkitURL).createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${PLUGIN_NAME}-config.json`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          enqueueSnackbar(t('config.toast.export'), { variant: 'success' });
        } catch (error) {
          enqueueSnackbar(t('config.error.export'), { variant: 'error' });
          throw error;
        } finally {
          set(loadingState, false);
        }
      },
    []
  );

  return { importStorage, exportStorage };
};
