import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import React, { PropsWithChildren } from 'react';
import { RecoilState, useRecoilCallback } from 'recoil';

type Props<T extends { id: string }> = {
  state: RecoilState<T[]>;
};

export const RecoilDndContext = <T extends { id: string }>({
  children,
  state,
}: PropsWithChildren<Props<T>>) => {
  const onDragEnd = useRecoilCallback(
    ({ set, snapshot }) =>
      async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over == null || active.id === over.id) {
          return;
        }
        const items = await snapshot.getPromise(state);
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        set(state, arrayMove(items, oldIndex, newIndex));
      },
    []
  );

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
};
