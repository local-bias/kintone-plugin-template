import React, { FC } from 'react';
import { LOCAL_STORAGE_KEY, PLUGIN_VERSION } from '@/lib/static';
import { NewVersionAlert } from '../../ui/new-version-alert';
import { PluginLocalStorage } from '@konomi-app/kintone-utilities';

const localStorage = new PluginLocalStorage(LOCAL_STORAGE_KEY);
localStorage.updateVersion(String(PLUGIN_VERSION));

const Component: FC = () => {
  if (!localStorage.hasNewVersion) {
    return null;
  }
  return (
    <div>
      <NewVersionAlert />
    </div>
  );
};

export default Component;
