import React, { FC } from 'react';

import FieldsForm from './form-fields';
import DeleteButton from './condition-delete-button';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utilities-react';
import FormText from '@/lib/components/form-text';
import { memoState } from '@/config/states/plugin';

const Component: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>メモ</PluginFormTitle>
        <PluginFormDescription last>
          この設定はサンプルです。プラグインにテキスト情報を保存することができます。
        </PluginFormDescription>
        <FormText state={memoState} label='📝 メモ' placeholder='テキストを入力' />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>対象フィールド</PluginFormTitle>
        <PluginFormDescription last>
          この設定はサンプルです。このアプリの設定情報から、フィールド一覧を取得して表示しています。
        </PluginFormDescription>
        <FieldsForm />
      </PluginFormSection>
      <DeleteButton />
    </div>
  );
};

export default Component;
