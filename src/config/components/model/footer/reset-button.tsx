import { t } from '@/lib/i18n';
import { PluginConfigResetButton } from '@konomi-app/kintone-utilities-react';
import { useResetAtom } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import React, { FC, memo } from 'react';
import { pluginConfigAtom } from '../../../states/plugin';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const resetConfig = useResetAtom(pluginConfigAtom);

  const reset = () => {
    resetConfig();
    enqueueSnackbar(t('config.toast.reset'), { variant: 'success' });
  };

  return <PluginConfigResetButton reset={reset} />;
};

export default memo(Component);
