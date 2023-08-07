import React, { FCX } from 'react';
import styled from '@emotion/styled';

import FieldsForm from './form-fields';
import DeleteButton from './condition-delete-button';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utility-component';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
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

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
`;

export default StyledComponent;
