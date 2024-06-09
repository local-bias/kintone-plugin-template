import { Tab } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { PluginConditionTabs } from '@konomi-app/kintone-utilities-react';
import { conditionsLengthState, conditionsState, tabIndexState } from '../../../states/plugin';
import { t } from '@/lib/i18n';

const SidebarLabel: FC<{ index: number }> = ({ index }) => {
  const conditions = useRecoilValue(conditionsState);
  const condition = conditions[index];

  if (!condition?.memo) {
    return <>{`${t('config.sidebar.tab.label')}${index + 1}`}</>;
  }
  return <>{`${t('config.sidebar.tab.label')}${index + 1}(${condition.memo})`}</>;
};

const Component: FC = () => {
  const tabIndex = useRecoilValue(tabIndexState);
  const length = useRecoilValue(conditionsLengthState);

  const onTabChange = useRecoilCallback(
    ({ set }) =>
      (_: unknown, index: number) => {
        set(tabIndexState, index);
      },
    []
  );

  return (
    <PluginConditionTabs tabIndex={tabIndex} onChange={onTabChange}>
      {new Array(length).fill('').map((_, i) => (
        <Tab label={<SidebarLabel index={i} />} key={i} />
      ))}
    </PluginConditionTabs>
  );
};

export default Component;
