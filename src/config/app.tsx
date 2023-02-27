import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@/common/plugin';

import Layout from './components/model/layout';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';
import Footer from './components/model/footer';
import { Loading } from '@/common/components/loading';
import { pluginIdState, storageState } from './states/plugin';
import { PluginErrorBoundary } from '@/common/components/functional/error-boundary';
import { URL_PROMOTION } from '@/common/static';

const Component: FC<{ pluginId: string }> = ({ pluginId }) => (
  <Suspense fallback={<Loading label='画面の描画を待機しています' />}>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <Suspense fallback={<Loading label='設定情報を取得しています' />}>
            <Layout>
              <Sidebar />
              <Form />
              <Footer />
            </Layout>
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
