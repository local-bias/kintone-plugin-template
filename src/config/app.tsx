import React, { VFC } from 'react';
import { SnackbarProvider } from 'notistack';

import { StorageContainer } from './contexts';
import { Footer, Form, SocialIcons } from './components';

const Component: VFC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <StorageContainer.Provider initialState={pluginId}>
      <SnackbarProvider maxSnack={3}>
        <Form />
        <Footer />
      </SnackbarProvider>
    </StorageContainer.Provider>
    <SocialIcons />
  </>
);

export default Component;
