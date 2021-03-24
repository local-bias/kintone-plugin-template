import React, { VFCX } from 'react';
import styled from '@emotion/styled';

import { StorageContainer } from '../contexts';

const Component: VFCX = ({ className }) => {
  const { storage } = StorageContainer.useContainer();

  return <div className={className}>設定の必要はありません🍀</div>;
};

const StyledComponent = styled(Component)``;

export default StyledComponent;
