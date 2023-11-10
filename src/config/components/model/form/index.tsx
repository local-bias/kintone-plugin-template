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

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>メモ</PluginFormTitle>
      <PluginFormDescription last>
        この設定はサンプルです。プラグインにテキスト情報を保存することができます。
      </PluginFormDescription>
      <RecoilText
        state={getConditionPropertyState('memo')}
        label='📝 メモ'
        placeholder='テキストを入力'
      />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>対象フィールド</PluginFormTitle>
      <PluginFormDescription last>
        この設定はサンプルです。このアプリの設定情報から、フィールド一覧を取得して表示しています。
      </PluginFormDescription>
      <FieldsForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>スイッチのサンプル</PluginFormTitle>
      <PluginFormDescription last>
        有効・無効などを切り替えるスイッチのサンプルです。
      </PluginFormDescription>
      <RecoilSwitch state={getConditionPropertyState('isSampleUIShown')} label='サンプル' />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
