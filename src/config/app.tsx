import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { URL_BANNER, URL_PROMOTION } from '@/lib/static';
import {
  Notification,
  PluginBanner,
  PluginConfigProvider,
  PluginContent,
  PluginLayout,
} from '@konomi-app/kintone-utilities-react';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import config from 'plugin.config.mjs';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jaJP, enUS, zhCN, esES } from '@mui/material/locale';
import { LANGUAGE } from '@/lib/global';

const Component: FC = () => {
  return (
    <>
      <Sidebar />
      <PluginContent>
        <PluginErrorBoundary>
          <Form />
        </PluginErrorBoundary>
      </PluginContent>
      <PluginBanner url={URL_BANNER} />
      <Footer />
    </>
  );
};

const Container: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <ThemeProvider
      theme={createTheme(
        {},
        LANGUAGE === 'en' ? enUS : LANGUAGE === 'zh' ? zhCN : LANGUAGE === 'es' ? esES : jaJP
      )}
    >
      <RecoilRoot>
        <PluginErrorBoundary>
          <PluginConfigProvider config={config}>
            <Notification />
            <SnackbarProvider maxSnack={1}>
              <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
                <PluginLayout>
                  <Component />
                </PluginLayout>
              </Suspense>
            </SnackbarProvider>
          </PluginConfigProvider>
        </PluginErrorBoundary>
      </RecoilRoot>
    </ThemeProvider>
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Container;
