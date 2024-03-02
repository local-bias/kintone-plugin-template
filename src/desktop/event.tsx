import { restorePluginConfig } from '@/lib/plugin';
import { manager } from '@/lib/event-manager';
import { Root, createRoot } from 'react-dom/client';
import React from 'react';
import { Rocket } from 'lucide-react';
import { Alert, AlertTitle } from '@mui/material';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PLUGIN_NAME } from '@/lib/static';

const ROOT_ID = '🐸root';

let cachedRoot: Root | null = null;

manager.add(['app.record.index.show'], async (event) => {
  const config = restorePluginConfig();

  if (!cachedRoot || !document.getElementById(ROOT_ID)) {
    const rootElement = document.createElement('div');
    rootElement.id = ROOT_ID;
    document.body.append(rootElement);

    const root = createRoot(rootElement);

    cachedRoot = root;
  }

  cachedRoot.render(
    <>
      <Dialog>
        <DialogTrigger>
          <div className='fixed right-4 bottom-4'>
            <Alert icon={<Rocket className='h-4 w-4' />} severity='success'>
              <AlertTitle sx={{ fontWeight: 600 }}>プラグインが有効です</AlertTitle>
              クリックするとイベントの詳細を確認できます
            </Alert>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{PLUGIN_NAME}</DialogTitle>
          </DialogHeader>
          <div>
            <h3>プラグインの設定情報</h3>
            <pre className='font-mono p-4 bg-foreground text-background'>
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  return event;
});
