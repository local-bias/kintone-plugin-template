import { PluginBanner, PluginContent, PluginLayout } from '@konomi-app/kintone-utilities-react';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { URL_BANNER, URL_PROMOTION } from '@/lib/static';
import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import Announcement from './components/model/announcement';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <RecoilRoot>
      <PluginErrorBoundary>
        <Announcement />
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
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Component;
