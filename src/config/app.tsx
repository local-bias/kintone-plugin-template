import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@common/plugin';
import { ErrorBoundary } from '@common/components/error-boundary';

import Form from './components/form';
import Footer from './components/footer';
import SocialIcons from './components/social-icons';

import { pluginIdState, storageState } from './states';
import { Loading } from '@common/components/loading';

const Component: FC<{ pluginId: string }> = ({ pluginId }) => (
  <Suspense fallback={<p>読み込み中...</p>}>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <ErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <Suspense fallback={<Loading label='設定情報を取得しています' />}>
            <Form />
            <Footer />
          </Suspense>
        </SnackbarProvider>
      </ErrorBoundary>
    </RecoilRoot>
    <SocialIcons />
  </Suspense>
);

export default Component;
