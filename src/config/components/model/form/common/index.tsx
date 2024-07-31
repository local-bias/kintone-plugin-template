import { getCommonPropertyState } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
  RecoilText,
} from '@konomi-app/kintone-utilities-react';
import React, { FC } from 'react';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.memo.title')}</PluginFormTitle>
      <PluginFormDescription last>{t('config.common.memo.description')}</PluginFormDescription>
      <RecoilText
        state={getCommonPropertyState('memo')}
        label={t('config.common.memo.label')}
        placeholder={t('config.common.memo.placeholder')}
      />
    </PluginFormSection>
  </div>
);

export default Component;
