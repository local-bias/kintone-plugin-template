import React from 'react';

import { ConfigContainer } from './contexts';
import { SocialIcons } from './components';

const Component: React.FC<{ pluginId: string }> = ({ pluginId }) => (
  <ConfigContainer.Provider initialState={pluginId}>
    <SocialIcons />
  </ConfigContainer.Provider>
);

export default Component;
