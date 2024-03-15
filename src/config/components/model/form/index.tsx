import React, { FC } from 'react';

import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
  RecoilText,
  RecoilSwitch,
} from '@konomi-app/kintone-utilities-react';
import FieldsForm from './form-fields';
import DeleteButton from './condition-delete-button';
import { getConditionPropertyState } from '@/config/states/plugin';
import { t } from '@/lib/i18n';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.memo.title')}</PluginFormTitle>
      <PluginFormDescription last>{t('config.condition.memo.description')}</PluginFormDescription>
      <RecoilText
        state={getConditionPropertyState('memo')}
        label={t('config.condition.memo.label')}
        placeholder={t('config.condition.memo.placeholder')}
      />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.field.title')}</PluginFormTitle>
      <PluginFormDescription last>{t('config.condition.field.description')}</PluginFormDescription>
      <FieldsForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.isSampleUIShown.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.isSampleUIShown.description')}
      </PluginFormDescription>
      <RecoilSwitch
        state={getConditionPropertyState('isSampleUIShown')}
        label={t('config.condition.isSampleUIShown.label')}
      />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
