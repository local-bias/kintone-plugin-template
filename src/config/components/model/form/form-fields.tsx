import { JotaiFieldSelect } from '@/components/jotai';
import { useArray } from '@/config/hooks/use-array';
import { getConditionPropertyAtom } from '@/config/states/plugin';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Skeleton, Tooltip } from '@mui/material';
import { useAtomValue } from 'jotai';
import React, { FC, memo, Suspense } from 'react';
import { appFieldsAtom } from '../../../states/kintone';

const fieldsAtom = getConditionPropertyAtom('fields');

const Component: FC = () => {
  const fields = useAtomValue(fieldsAtom);
  const { addItem, deleteItem, updateItem } = useArray(fieldsAtom);

  return (
    <div className='flex flex-col gap-4'>
      {fields.map((value, i) => (
        <div key={i} className='flex items-center gap-2'>
          <JotaiFieldSelect
            fieldPropertiesAtom={appFieldsAtom}
            onChange={(code) => updateItem({ index: i, newItem: code })}
            fieldCode={value}
          />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addItem({ newItem: '', index: i + 1 })}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {fields.length > 1 && (
            <Tooltip title='このフィールドを削除する'>
              <IconButton size='small' onClick={() => deleteItem(i)}>
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
        <Skeleton variant='rounded' width={400} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Container: FC = () => (
  <Suspense fallback={<Placeholder />}>
    <Component />
  </Suspense>
);

export default memo(Container);
