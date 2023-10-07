import { Alert, AlertTitle, Button } from '@mui/material';
import React, { FC } from 'react';
import { URL_PLUGIN_LIST } from '@/lib/static';

const Component: FC = () => (
  <Alert severity='info'>
    <AlertTitle>新しいバージョンのプラグインが利用可能です</AlertTitle>
    <p>新しいバージョンのプラグインが公開されています</p>
    <p>ホームページよりプラグインをダウンロードし、インストールしてください。</p>
    <a href={URL_PLUGIN_LIST} target='_blank' rel='noopener noreferrer'>
      <Button color='primary' variant='contained'>
        プラグイン一覧へ
      </Button>
    </a>
  </Alert>
);

export const NewVersionAlert = Component;
