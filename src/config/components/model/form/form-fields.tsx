import { Autocomplete, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { appFieldsState } from '../../../states/kintone';
import { fieldsState } from '../../../states/plugin';

const Component: FC = () => {
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
    <div className='flex flex-col gap-4'>
      {selectedFields.map((value, i) => (
        <div key={i} className='flex items-center gap-2'>
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

const Placeholder: FC = () => (
  <div className='flex flex-col gap-4'>
    {new Array(3).fill('').map((_, i) => (
      <div key={i} className='flex items-center gap-2'>
        <Skeleton variant='rounded' width={360} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Container: FC = () => {
  return (
    <Suspense fallback={<Placeholder />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
