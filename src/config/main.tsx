import React from 'react';
import { render } from 'react-dom';

import App from './app';

const main = (pluginId: string): void => {
  render(<App {...{ pluginId }} />, document.getElementById('settings'));
};

export default main;
