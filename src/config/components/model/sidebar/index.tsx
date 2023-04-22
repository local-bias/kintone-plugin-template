import React, { FCX } from 'react';

import AdditionButton from './condition-addition-button';
import Tabs from './sidebar-tabs';
import { PluginSidebar } from '@konomi-app/kintone-utility-component';

const Component: FCX = ({ className }) => (
  <PluginSidebar>
    <AdditionButton />
    <Tabs />
  </PluginSidebar>
);

export default Component;
