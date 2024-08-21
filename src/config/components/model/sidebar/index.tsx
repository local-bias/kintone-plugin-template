import { PluginSidebar } from '@konomi-app/kintone-utilities-react';
import React, { FC, useCallback } from 'react';
import AdditionButton from './condition-addition-button';
import Tabs from './sidebar-tabs';
import { t } from '@/lib/i18n';

const Component: FC = () => {
  const label = useCallback((params: { condition: Plugin.Condition; index: number }) => {
    const { condition, index } = params;
    return condition.memo ? (
      <>{`${t('config.sidebar.tab.label')}${index + 1}(${condition.memo})`}</>
    ) : (
      <>{`${t('config.sidebar.tab.label')}${index + 1}`}</>
    );
  }, []);

  return (
    <PluginSidebar>
      <AdditionButton />
      <Tabs label={label} />
    </PluginSidebar>
  );
};

export default Component;
