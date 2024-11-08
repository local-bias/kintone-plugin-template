import { getCommonPropertyAtom } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { JotaiText } from '@konomi-app/kintone-utilities-jotai';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import { FC } from 'react';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.memo.title')}</PluginFormTitle>
      <PluginFormDescription last>{t('config.common.memo.description')}</PluginFormDescription>
      <JotaiText
        atom={getCommonPropertyAtom('memo')}
        label={t('config.common.memo.label')}
        placeholder={t('config.common.memo.placeholder')}
      />
    </PluginFormSection>
  </div>
);

export default Component;
