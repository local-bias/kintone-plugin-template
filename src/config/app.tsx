import React from 'react';

import { ConfigContainer } from './contexts';
import { SocialIcons, Form } from './components';

const Component: React.FC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <ConfigContainer.Provider initialState={pluginId}>
      <Form />
    </ConfigContainer.Provider>
    <SocialIcons />
  </>
);

export default Component;
