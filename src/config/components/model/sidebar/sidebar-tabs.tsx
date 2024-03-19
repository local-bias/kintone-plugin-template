import { Tab } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { PluginConditionTabs } from '@konomi-app/kintone-utilities-react';
import { conditionsState, tabIndexState } from '../../../states/plugin';
import { t } from '@/lib/i18n';

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
        <Tab label={`${t('config.sidebar.tab.label')} ${i + 1}${condition.fields}`} key={i} />
      ))}
    </PluginConditionTabs>
  );
};

export default Component;
