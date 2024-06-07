import { t } from '@/lib/i18n';
import React from 'react';
import { createRoot } from 'react-dom/client';
import invariant from 'tiny-invariant';
import App from './app';

const root = document.getElementById('settings');
invariant(root, t('error.config.root'));
createRoot(root).render(<App />);
