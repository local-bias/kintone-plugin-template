import { usePluginStorage } from '@/config/hooks/use-plugin-storage';
import { t } from '@/lib/i18n';
import { storeStorage } from '@konomi-app/kintone-utilities';
import {
  PluginConfigExportButton,
  PluginConfigImportButton,
  PluginFooter,
} from '@konomi-app/kintone-utilities-react';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, CircularProgress } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback } from 'react';
import { loadingAtom, pluginConfigAtom } from '../../../states/plugin';
import ResetButton from './reset-button';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FC<Props> = ({ onSaveButtonClick, onBackButtonClick }) => {
  const loading = useAtomValue(loadingAtom);
  const { exportStorage, importStorage } = usePluginStorage();

  return (
    <PluginFooter className='py-2'>
      <div className='flex items-center gap-4'>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          onClick={onSaveButtonClick}
          startIcon={loading ? <CircularProgress color='inherit' size={20} /> : <SaveIcon />}
        >
          {t('config.button.save')}
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
          {t('config.button.return')}
        </Button>
      </div>
      <div className='flex items-center gap-4'>
        <PluginConfigExportButton loading={loading} onExportButtonClick={exportStorage} />
        <PluginConfigImportButton onImportButtonClick={importStorage} loading={loading} />
        <ResetButton />
      </div>
    </PluginFooter>
  );
};

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const setLoading = useSetAtom(loadingAtom);
  const pluginConfig = useAtomValue(pluginConfigAtom);

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = async () => {
    setLoading(true);
    try {
      storeStorage(pluginConfig, () => true);
      enqueueSnackbar(t('config.toast.save'), {
        variant: 'success',
        action: (
          <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
            {t('config.button.return')}
          </Button>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return <Component {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
