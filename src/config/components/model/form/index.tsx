import React, { FCX, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';

import { conditionState, storageState } from '../../../states/plugin';

import AppFieldSelect from './app-field-select';
import { Skeleton } from '@mui/material';
import { useConditionIndex } from '../../../contexts/condition-index-provider';

const Component: FCX = ({ className }) => {
  const index = useConditionIndex();
  const condition = useRecoilValue(conditionState(index));
  if (!condition) {
    return null;
  }

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (code: string | null) => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[index].field = code ?? '';
          })
        );
      },
    []
  );

  return (
    <div {...{ className }}>
      <div>
        <h3>対象フィールド</h3>
        <Suspense fallback={<Skeleton width={350} height={80} />}>
          <AppFieldSelect fieldCode={condition.field} onChange={onFieldChange} />
        </Suspense>
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    border-left: 2px solid #0002;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
`;

export default StyledComponent;
