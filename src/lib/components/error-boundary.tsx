import React, { FC, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { URL_INQUIRY } from '@/lib/static';
import { LoaderWithLabel } from '@konomi-app/ui-react';

const Component: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const [loading, setLoading] = useState(false);

  const onRetry = () => {
    setLoading(true);
    setTimeout(() => {
      resetErrorBoundary();
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return <LoaderWithLabel label='再試行中' />;
  }

  return (
    <div className='m-2'>
      <Alert severity='error'>
        <AlertTitle title={error.message}>エラーが発生しました</AlertTitle>
        <p>予期しないエラーが発生しました</p>
        <p>
          リトライしても解決しない場合は、下記のエラー内容を添えて開発者までお問い合わせください。
        </p>
        <div className='p-4 bg-red-600 bg-opacity-10 rounded'>
          <details>
            <summary className='text-red-700 cursor-pointer'>
              {error.message ?? 'エラーの詳細'}
            </summary>
            <pre className='bg-gray-800 text-gray-100 p-4'>
              <code>{JSON.stringify(error, null, 2)}</code>
            </pre>
          </details>
        </div>
        <div className='mt-8 flex gap-4'>
          <Button color='error' onClick={onRetry}>
            リトライ
          </Button>
          <Button color='error' onClick={() => window.open(URL_INQUIRY, '_blank')}>
            お問い合わせ
          </Button>
        </div>
      </Alert>
    </div>
  );
};

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary FallbackComponent={Component}>{children}</ErrorBoundary>
);

export const PluginErrorBoundary = Container;
