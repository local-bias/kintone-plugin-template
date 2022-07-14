import React, { FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Autocomplete, TextField } from '@mui/material';
import produce from 'immer';

import { kx } from '@type/kintone.api';
import { appFieldsState } from '../../../states/kintone';
import { storageState } from '../../../states/plugin';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };

const Component: FCX<ContainerProps> = ({ className, condition, index }) => {
  const appFields = useRecoilValue(appFieldsState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (field: kx.FieldProperty | null) => {
        if (!field) {
          return;
        }
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[index].field = field.code;
          })
        );
      },
    []
  );

  return (
    <div {...{ className }}>
      <div>
        <h3>対象フィールド</h3>
        <Autocomplete
          value={Object.values(appFields).find((field) => field.code === condition.field)}
          sx={{ width: '350px' }}
          options={Object.values(appFields)}
          onChange={(_, option) => onFieldChange(option)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label='対象フィールド' variant='outlined' color='primary' />
          )}
        />
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
