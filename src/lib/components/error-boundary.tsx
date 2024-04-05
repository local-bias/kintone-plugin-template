import React, { FC, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { URL_INQUIRY } from '@/lib/static';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import styled from '@emotion/styled';
import config from 'plugin.config.mjs';

const Component: FC<FallbackProps & { className?: string }> = ({
  className,
  error,
  resetErrorBoundary,
}) => {
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
    <div className={className}>
      <Alert severity='error'>
        <AlertTitle title={error.message}>エラーが発生しました</AlertTitle>
        <h2>解決方法</h2>
        <ul>
          <li>
            <h3>1. 処理をリトライ</h3>
            <p>以下の「リトライ」ボタンをクリックして、処理を再実行してください。</p>
            <Button size='large' variant='contained' color='error' onClick={onRetry}>
              リトライ
            </Button>
          </li>
          {!!config.pluginReleasePageUrl && (
            <li>
              <h3>2. 最新版のプラグインをインストール</h3>
              <p>プラグインの最新版をインストールすることで、問題が解決する可能性があります。</p>
              <p>
                以下のリンクから最新版のプラグインをダウンロードし、再度インストールしてください。
              </p>
              <Button
                size='large'
                variant='contained'
                color='error'
                onClick={() => window.open(config.pluginReleasePageUrl, '_blank')}
              >
                最新版をダウンロード
              </Button>
            </li>
          )}
          <li>
            <h3>3. お問い合わせ</h3>
            <p>
              上記全てを試しても解決しない場合、下記のエラー内容を添えて開発者までお問い合わせください。
            </p>
            <pre>
              <code>
                {JSON.stringify(
                  {
                    プラグインID: config.id,
                    プラグイン名: config.manifest.base.name.ja,
                    バージョン: config.manifest.base.version,
                    エラーメッセージ: error?.message ?? '不明なエラー ',
                    エラースタック: error?.stack,
                    エラー詳細: error,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
            <Button
              size='large'
              variant='contained'
              color='error'
              onClick={() => window.open(URL_INQUIRY, '_blank')}
            >
              お問い合わせ
            </Button>
          </li>
        </ul>
      </Alert>
    </div>
  );
};

const StyledComponent = styled(Component)`
  margin: 8px;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 8px;
  }

  ul {
    display: grid;
    gap: 24px;
  }

  pre {
    display: grid;
    background-color: rgb(31 41 55);
    color: rgb(243 244 246);
    padding: 16px;
    margin-bottom: 8px;
  }

  code {
    width: 100%;
    overflow-x: auto;
  }
`;

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary FallbackComponent={StyledComponent}>{children}</ErrorBoundary>
);

export const PluginErrorBoundary = Container;
