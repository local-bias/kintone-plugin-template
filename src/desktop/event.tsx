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
import { t } from '@/lib/i18n';
import config from 'plugin.config.mjs';
import { ThemeProvider } from '@/lib/components/theme-provider';

const ROOT_ID = `🐸${config.id}-root`;

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
    <ThemeProvider>
      <Dialog>
        <DialogTrigger className='🐸'>
          <div className='fixed right-4 bottom-4'>
            <Alert icon={<Rocket className='h-4 w-4' />} severity='success'>
              <AlertTitle sx={{ fontWeight: 600 }}>{t('desktop.dialogtrigger.title')}</AlertTitle>
              {t('desktop.dialogtrigger.content')}
            </Alert>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{PLUGIN_NAME}</DialogTitle>
          </DialogHeader>
          <div>
            <h3>{t('desktop.dialog.title')}</h3>
            <div className='max-h-[40vh] overflow-y-auto'>
              <pre className='font-mono p-4 bg-foreground text-background m-0'>
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );

  return event;
});
