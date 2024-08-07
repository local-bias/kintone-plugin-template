import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Fab, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useRecoilValue } from 'recoil';
import { storageState } from '@/config/states/plugin';

const Content: FC = () => {
  const pluginConfig = useRecoilValue(storageState);

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
    <DialogTrigger className='fixed left-4 bottom-4'>
      <Tooltip title=''>
        <Fab color='inherit' size='small'>
          <BugReportIcon />
        </Fab>
      </Tooltip>
    </DialogTrigger>
    <DialogContent>
      <Content />
    </DialogContent>
  </Dialog>
);

export default Component;
