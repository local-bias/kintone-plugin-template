import React, { FC, FCX } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { URL_HOMEPAGE, URL_INQUIRY } from '@/common/static';
import { ErrorBoundary } from '@sentry/react';
import { ErrorIcon } from '../icon/error';

const Component: FCX<{ error: Error; resetError: () => void }> = ({
  className,
  error,
  resetError,
}) => (
  <div {...{ className }}>
    <ErrorIcon width={512} />
    <div className='container'>
      <h1>エラーが発生しました</h1>

      <div>
        <p>予期しないエラーが発生しました</p>
        <p>リトライしても解決しない場合は、開発者までお問い合わせください。</p>
        <Button
          variant='contained'
          color='inherit'
          size='large'
          onClick={() => window.open(URL_INQUIRY, '_blank')}
        >
          お問い合わせ
        </Button>
        <a href={URL_HOMEPAGE}>開発者HP</a>
        <p className='error'>{error.message}</p>
      </div>
      <Button variant='contained' color='primary' size='large' onClick={resetError}>
        リトライ
      </Button>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  width: 100%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  background-color: #fff;

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #777;
  }

  svg {
    width: 200px;
    max-width: 95vw;
  }

  & > .container {
    min-width: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    & > h1 {
      margin: 16px 0;
    }
    & > div > .error {
      font-size: 60%;
    }
  }
`;

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={(errorProps) => <StyledComponent {...errorProps} />}>
    {children}
  </ErrorBoundary>
);

export const PluginErrorBoundary = Container;
