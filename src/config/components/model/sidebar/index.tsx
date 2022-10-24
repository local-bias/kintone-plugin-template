import styled from '@emotion/styled';
import React, { FC, FCX } from 'react';

import AdditionButton from './condition-addition-button';
import Tabs from './sidebar-tabs';

const Component: FCX = ({ className }) => (
  <div className={className}>
    <div>
      <AdditionButton />
      <Tabs />
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  grid-area: sidebar;

  > div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-right: 1px solid #0001;
  }
`;

export default StyledComponent;
