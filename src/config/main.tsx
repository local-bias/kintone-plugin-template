import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const main = (): void => {
  const root = document.getElementById('settings');
  if (!root) {
    throw 'プラグインのHTMLに、ルート要素が存在しません。';
  }
  createRoot(root).render(<App />);
};

export default main;
