import { Tab, Tabs } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { conditionsState, tabIndexState } from '../../../states/plugin';

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
    <Tabs value={tabIndex} onChange={onTabChange} orientation='vertical' variant='scrollable'>
      {conditions.map((condition, i) => (
        <Tab label={`設定${i + 1}${condition.fields}`} key={i} />
      ))}
    </Tabs>
  );
};

export default Component;
