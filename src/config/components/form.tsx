import React from 'react';
import styled from '@emotion/styled';

import { ConfigContainer } from '../contexts';

const Component: React.VFCX = ({ className }) => {
  const { config, setConfig } = ConfigContainer.useContainer();

  return <div className={className}>設定の必要はありません🍀</div>;
};

const StyledComponent = styled(Component)``;

export default StyledComponent;
