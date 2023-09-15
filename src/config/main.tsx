import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = document.getElementById('settings');
if (!root) {
  throw new Error(
    'プラグインのHTMLに、ルート要素が存在しません。プラグイン設定をレンダリングするためには、id="settings"の要素が必要です。'
  );
}
createRoot(root).render(<App />);
