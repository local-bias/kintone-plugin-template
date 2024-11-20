import React, { FC, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { URL_INQUIRY } from '@/lib/constants';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import styled from '@emotion/styled';
import config from 'plugin.config.mjs';

const ErrorFallbackComponent: FC<FallbackProps & { className?: string }> = ({
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
        <ol>
          <li>
            <h3>処理をリトライ</h3>
            <p>以下の「リトライ」ボタンをクリックして、処理を再実行してください。</p>
            <Button variant='contained' color='error' onClick={onRetry}>
              リトライ
            </Button>
          </li>
          {!!config.pluginReleasePageUrl && (
            <li>
              <h3>最新版のプラグインをインストール</h3>
              <p>
                プラグインの最新版をインストールすることで、問題が解決する可能性があります。
                <br />
                以下のリンクから最新版のプラグインをダウンロードし、再度インストールしてください。
              </p>
              <Button
                variant='contained'
                color='error'
                onClick={() => window.open(config.pluginReleasePageUrl, '_blank')}
              >
                最新版をダウンロード
              </Button>
            </li>
          )}
          <li>
            <h3>プラグイン設定を更新</h3>
            <p>
              保存されているプラグイン設定情報が古くなっている可能性があります。
              <br />
              アプリ設定からこのプラグインの設定を開き、再度保存した上でアプリを更新してください。
            </p>
          </li>
          <li>
            <h3>お問い合わせ</h3>
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
        </ol>
      </Alert>
    </div>
  );
};

const StyledErrorFallback = styled(ErrorFallbackComponent)`
  margin: 8px;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  h3 {
    font-size: 18px;
    margin: 0 0 6px;
    font-weight: bold;
  }
  p {
    margin: 0 0 8px;
  }

  ol {
    display: grid;
    gap: 32px;
    padding-inline-start: 16px;
  }

  pre {
    display: grid;
    background-color: rgb(31 41 55);
    color: rgb(243 244 246);
    padding: 16px;
    margin-bottom: 8px;
    max-width: 400px;
  }

  code {
    width: 100%;
    overflow-x: auto;
  }
`;

export const PluginErrorBoundary: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary FallbackComponent={StyledErrorFallback}>{children}</ErrorBoundary>
);
