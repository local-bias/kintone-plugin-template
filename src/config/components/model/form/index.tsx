import React, { FCX } from 'react';
import styled from '@emotion/styled';

import FieldsForm from './form-fields';
import DeletionButton from './condition-deletion-button';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <div>
        <h3>対象フィールド</h3>
        <FieldsForm />
      </div>
      <DeletionButton />
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
