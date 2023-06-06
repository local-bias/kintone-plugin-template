import { restoreStorage } from '@konomi-app/kintone-utilities';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import { PluginErrorBoundary } from '@/lib/components/functional/error-boundary';
import { URL_BANNER, URL_PROMOTION } from '@/lib/static';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';
import { pluginIdState, storageState } from './states/plugin';
import { createConfig } from '@/lib/plugin';
import { PluginBanner, PluginContent, PluginLayout } from '@konomi-app/kintone-utility-component';
import { LoaderWithLabel } from '@konomi-app/ui-react';

const Component: FC<{ pluginId: string }> = ({ pluginId }) => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage<kintone.plugin.Storage>(pluginId) ?? createConfig());
      }}
    >
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
            <PluginLayout>
              <Sidebar />
              <PluginContent>
                <Form />
              </PluginContent>
              <PluginBanner url={URL_BANNER} />
              <Footer />
            </PluginLayout>
          </Suspense>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <iframe
      title='promotion'
      loading='lazy'
      src={URL_PROMOTION}
      style={{ border: '0', width: '100%', height: '64px' }}
    />
  </Suspense>
);

export default Component;
