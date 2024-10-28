import { JotaiSwitch, JotaiText } from '@/components/jotai';
import { commonSettingsShownAtom, getConditionPropertyAtom } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import { useAtomValue } from 'jotai';
import React, { FC } from 'react';
import CommonSettings from './common';
import DeleteButton from './condition-delete-button';
import FieldsForm from './form-fields';

const FormContent: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>{t('config.condition.memo.title')}</PluginFormTitle>
        <PluginFormDescription last>{t('config.condition.memo.description')}</PluginFormDescription>
        <JotaiText
          atom={getConditionPropertyAtom('memo')}
          label={t('config.condition.memo.label')}
          placeholder={t('config.condition.memo.placeholder')}
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.condition.field.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.condition.field.description')}
        </PluginFormDescription>
        <FieldsForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.condition.isSampleUIShown.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.condition.isSampleUIShown.description')}
        </PluginFormDescription>
        <JotaiSwitch
          atom={getConditionPropertyAtom('isSampleUIShown')}
          label={t('config.condition.isSampleUIShown.label')}
        />
      </PluginFormSection>
      <DeleteButton />
    </div>
  );
};

const FormContainer: FC = () => {
  const commonSettingsShown = useAtomValue(commonSettingsShownAtom);
  return commonSettingsShown ? <CommonSettings /> : <FormContent />;
};

export default FormContainer;
