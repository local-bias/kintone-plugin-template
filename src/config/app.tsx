import React from 'react';

import { StorageContainer } from './contexts';
import { Footer, Form, SocialIcons } from './components';

const Component: React.FC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <StorageContainer.Provider initialState={pluginId}>
      <Form />
      <Footer />
    </StorageContainer.Provider>
    <SocialIcons />
  </>
);

export default Component;
