import { useAtomValue, Provider } from 'jotai';
import React, { type FC } from 'react';
import { pluginConfigAtom } from '../public-state';
import { kintoneEventAtom } from './state';
import { store } from '@/lib/store';

const Condition: FC<{ condition: Plugin.Condition }> = ({ condition }) => {
  const id = condition.id;

  return (
    <div>
      <div>
        <pre>{JSON.stringify({ id, condition }, null, 2)}</pre>
      </div>
    </div>
  );
};

const Component: FC = () => {
  const pluginConfig = useAtomValue(pluginConfigAtom);
  const kintoneEvent = useAtomValue(kintoneEventAtom);
  console.log({ pluginConfig });

  return (
    <Provider store={store}>
      <div className='fixed left-full top-0 z-20 w-[25dvw] box-border p-4 bg-gray-900 text-white min-h-[125dvh] overflow-auto'>
      <div className='flex gap-2 sticky top-0 bg-gray-900 border-b'>
        <div className='text-3xl'>🐛</div>
        <div className='mb-4 text-sm text-green-300 font-bold'>
          Plugin Debug Menu
          <div className='text-xs'>(Not displayed in production)</div>
        </div>
      </div>
      <pre>
        {JSON.stringify({
          kintoneEvent,
        })}
      </pre>
      {pluginConfig.conditions.map((condition) => (
        <Condition key={condition.id} condition={condition} />
      ))}
    </div>
    </Provider>
  );
};

export default Component;
