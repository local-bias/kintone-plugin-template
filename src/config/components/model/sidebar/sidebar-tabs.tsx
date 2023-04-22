import { Tab } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { conditionsState, tabIndexState } from '../../../states/plugin';
import { PluginConditionTabs } from '@konomi-app/kintone-utility-component';

const Component: FC = () => {
  const tabIndex = useRecoilValue(tabIndexState);
  const conditions = useRecoilValue(conditionsState);

  const onTabChange = useRecoilCallback(
    ({ set }) =>
      (_: any, index: number) => {
        set(tabIndexState, index);
      },
    []
  );

  return (
    <PluginConditionTabs tabIndex={tabIndex} onChange={onTabChange}>
      {conditions.map((condition, i) => (
        <Tab label={`設定${i + 1}${condition.fields}`} key={i} />
      ))}
    </PluginConditionTabs>
  );
};

export default Component;
