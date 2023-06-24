import React, { FC, FCX, PropsWithChildren } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { URL_INQUIRY } from '@/lib/static';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const Component: FCX<FallbackProps> = ({ className, error, resetErrorBoundary }) => (
  <div {...{ className }}>
    <Alert severity='error'>
      <AlertTitle title={error.message}>エラーが発生しました</AlertTitle>
      <p>予期しないエラーが発生しました</p>
      <p>リトライしても解決しない場合は、開発者までお問い合わせください。</p>
      <div>
        <Button color='error' onClick={resetErrorBoundary}>
          リトライ
        </Button>
        <Button color='error' onClick={() => window.open(URL_INQUIRY, '_blank')}>
          お問い合わせ
        </Button>
      </div>
    </Alert>
  </div>
);

const Container: FC<PropsWithChildren> = ({ children }) => (
  <ErrorBoundary FallbackComponent={Component}>{children}</ErrorBoundary>
);

export const PluginErrorBoundary = Container;
