import { ThemeProvider } from '@/components/theme-provider';
import { manager } from '@/lib/event-manager';
import { t } from '@/lib/i18n';
import { restorePluginConfig } from '@/lib/plugin';
import { PLUGIN_NAME } from '@/lib/static';
import { Alert, AlertTitle, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Rocket } from 'lucide-react';
import config from 'plugin.config.mjs';
import React, { FC, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';

const ROOT_ID = `🐸${config.id}-root`;

let cachedRoot: Root | null = null;

const Component: FC<{ pluginConfig: Plugin.Config }> = ({ pluginConfig }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className='🐸'>
        <div className='fixed right-4 bottom-4 cursor-pointer' onClick={handleOpen}>
          <Alert icon={<Rocket className='h-4 w-4' />} severity='success'>
            <AlertTitle sx={{ fontWeight: 600 }}>{t('desktop.dialogtrigger.title')}</AlertTitle>
            {t('desktop.dialogtrigger.content')}
          </Alert>
        </div>
      </div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogTitle>{PLUGIN_NAME}</DialogTitle>
          <div>
            <h3>{t('desktop.dialog.title')}</h3>
            <div className='max-h-[40vh] overflow-y-auto'>
              <pre className='font-mono p-4 bg-foreground text-background m-0'>
                {JSON.stringify(pluginConfig, null, 2)}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

manager.add(['app.record.index.show', 'app.record.detail.show'], async (event) => {
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
      <Component pluginConfig={config} />
    </ThemeProvider>
  );

  return event;
});
