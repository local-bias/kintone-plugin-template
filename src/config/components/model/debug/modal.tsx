import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { pluginConfigAtom } from '@/config/states/plugin';
import BugReportIcon from '@mui/icons-material/BugReport';
import { Fab, Tooltip } from '@mui/material';
import { useAtomValue } from 'jotai';
import React, { FC } from 'react';

const Content: FC = () => {
  const pluginConfig = useAtomValue(pluginConfigAtom);

  return (
    <div>
      <h2 className='text-lg font-bold'>Plugin Config</h2>
      <pre className='bg-gray-800 text-gray-50 p-4 max-h-[40vh] overflow-auto'>
        {JSON.stringify(pluginConfig, null, 2)}
      </pre>
    </div>
  );
};

const Component: FC = () => (
  <Dialog>
    <DialogTrigger asChild className='!fixed left-4 bottom-4'>
      <Tooltip title='デバッグ'>
        <Fab color='inherit' size='small'>
          <BugReportIcon />
        </Fab>
      </Tooltip>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Debug</DialogTitle>
      <DialogDescription>この画面は開発時のみ表示されます。</DialogDescription>
      <Content />
    </DialogContent>
  </Dialog>
);

export default Component;
