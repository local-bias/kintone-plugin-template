import React, { FC, memo, VFCX } from 'react';
import styled from '@emotion/styled';

import { StorageContainer } from '../contexts';

type Props = {
  storage: PluginStorage;
};

const Component: VFCX<Props> = memo(({ className, storage }) => {
  return <div className={className}>設定の必要はありません🍀</div>;
});

const StyledComponent = styled(Component)``;

const Container: FC = () => {
  const { storage } = StorageContainer.useContainer();

  return <StyledComponent storage={storage} />;
};

export default Container;
