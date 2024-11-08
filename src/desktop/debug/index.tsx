import { manager } from '@/lib/event-manager';
import { isProd } from '@/lib/global';
import { store } from '@/lib/store';
import { css } from '@emotion/css';
import { nanoid } from 'nanoid';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { kintoneEventAtom } from './state';

const ROOT_ID = nanoid();

manager.add(
  [
    'app.record.index.show',
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
  ],
  (event) => {
    if (isProd) {
      return event;
    }

    if (document.getElementById(ROOT_ID)) {
      return event;
    }

    store.set(kintoneEventAtom, event.type);
    console.log({ event });

    const rootElement = document.createElement('div');
    rootElement.id = ROOT_ID;
    rootElement.classList.add('🐸');
    const wrapperElement = document.body;
    wrapperElement.classList.add(css`
      transform: scale(0.8) translateX(-12.5%) translateY(-12.5%);
      height: 125dvh;
    `);
    wrapperElement.prepend(rootElement);
    const root = createRoot(rootElement);
    root.render(<App />);

    return event;
  }
);
