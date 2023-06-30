import { Autocomplete, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { appFieldsState } from '../../../states/kintone';
import { fieldsState } from '../../../states/plugin';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const selectedFields = useRecoilValue(fieldsState);
  const fields = useRecoilValue(appFieldsState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(fieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex] = value;
          })
        );
      },
    []
  );

  const addField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(fieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex + 1, 0, '');
          })
        );
      },
    []
  );

  const removeField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(fieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    []
  );

  return (
    <div className={className}>
      {selectedFields.map((value, i) => (
        <div key={i} className='row'>
          <Autocomplete
            value={fields.find((field) => field.code === value) ?? null}
            sx={{ width: '350px' }}
            options={fields}
            isOptionEqualToValue={(option, v) => option.code === v.code}
            getOptionLabel={(option) => `${option.label}(${option.code})`}
            onChange={(_, field) => onFieldChange(i, field?.code ?? '')}
            renderInput={(params) => (
              <TextField {...params} label='対象フィールド' variant='outlined' color='primary' />
            )}
          />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addField(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {selectedFields.length > 1 && (
            <Tooltip title='このフィールドを削除する'>
              <IconButton size='small' onClick={() => removeField(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

const Placeholder: FCX = ({ className }) => (
  <div className={className}>
    {new Array(3).fill('').map((_, i) => (
      <div key={i} className='row'>
        <Skeleton variant='rounded' width={360} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Styling = (Component: FC) => styled(Component)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const StyledComponent = Styling(Component);
const StyledPlaceHolder = Styling(Placeholder);

const Container: FC = () => {
  return (
    <Suspense fallback={<StyledPlaceHolder />}>
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
