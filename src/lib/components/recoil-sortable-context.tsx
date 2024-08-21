import { SortableContext } from '@dnd-kit/sortable';
import React, { PropsWithChildren } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

type Props<T extends { id: string }> = {
  state: RecoilState<T[]>;
};

export const RecoilSortableContext = <T extends { id: string }>({
  children,
  state,
}: PropsWithChildren<Props<T>>) => {
  const items = useRecoilValue(state);
  return <SortableContext items={items}>{children}</SortableContext>;
};
