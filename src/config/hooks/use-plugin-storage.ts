import { t } from '@/lib/i18n';
import { migrateConfig } from '@/lib/plugin';
import { PLUGIN_NAME } from '@/lib/static';
import { onFileLoad } from '@konomi-app/kintone-utilities';
import { useAtom, useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import { ChangeEventHandler } from 'react';
import invariant from 'tiny-invariant';
import { loadingAtom, pluginConfigAtom } from '../states/plugin';

export const usePluginStorage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [pluginConfig, setPluginConfig] = useAtom(pluginConfigAtom);
  const setLoading = useSetAtom(loadingAtom);

  const importStorage: ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      const { files } = event.target;
      invariant(files?.length, 'ファイルが見つかりませんでした');
      const [file] = Array.from(files);
      const fileEvent = await onFileLoad(file!);
      const text = (fileEvent.target?.result ?? '') as string;
      setPluginConfig(migrateConfig(JSON.parse(text)));
      enqueueSnackbar(t('config.toast.import'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('config.error.import'), { variant: 'error' });
      throw error;
    }
  };

  const exportStorage = async () => {
    try {
      setLoading(true);
      const blob = new Blob([JSON.stringify(pluginConfig, null)], {
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
      setLoading(false);
    }
  };

  return { importStorage, exportStorage };
};
