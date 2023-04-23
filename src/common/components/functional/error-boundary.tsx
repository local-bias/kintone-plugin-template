import React, { FC, FCX } from 'react';
import styled from '@emotion/styled';
import { Alert, AlertTitle, Button } from '@mui/material';
import { URL_INQUIRY } from '@/common/static';
import { ErrorBoundary } from '@sentry/react';

const Component: FCX<{ error: Error; resetError: () => void }> = ({
  className,
  error,
  resetError,
}) => (
  <div {...{ className }}>
    <Alert severity='error'>
      <AlertTitle title={error.message}>エラーが発生しました</AlertTitle>
      <p>予期しないエラーが発生しました</p>
      <p>リトライしても解決しない場合は、開発者までお問い合わせください。</p>
      <div>
        <Button color='error' onClick={resetError}>
          リトライ
        </Button>
        <Button color='error' onClick={() => window.open(URL_INQUIRY, '_blank')}>
          お問い合わせ
        </Button>
      </div>
    </Alert>
  </div>
);

const StyledComponent = styled(Component)``;

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={(errorProps) => <StyledComponent {...errorProps} />}>
    {children}
  </ErrorBoundary>
);

export const PluginErrorBoundary = Container;
