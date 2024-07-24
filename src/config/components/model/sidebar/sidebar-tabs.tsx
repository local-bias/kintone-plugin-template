import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { conditionsState, selectedConditionIdState, storageState } from '../../../states/plugin';
import { t } from '@/lib/i18n';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { cn } from '@/lib/utils';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useTab } from './use-tab';

const SidebarTab: FC<{ condition: Plugin.Condition; index: number }> = ({ condition, index }) => {
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: condition.id });
  const { onTabChange } = useTab();
  const selectedId = useRecoilValue(selectedConditionIdState);

  const onClick = () => onTabChange(condition);

  const label = condition.memo ? (
    <>{`${t('config.sidebar.tab.label')}${index + 1}(${condition.memo})`}</>
  ) : (
    <>{`${t('config.sidebar.tab.label')}${index + 1}`}</>
  );

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'border-0 border-r-2 border-solid border-transparent z-10 grid grid-cols-[auto_1fr] bg-background items-center transition-colors active:bg-blue-100/70',
        {
          'z-20 shadow-md': isDragging,
          'border-blue-600 bg-blue-100/30 text-blue-600': selectedId === condition.id,
        }
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div
        className='grid place-items-center p-4 outline-none'
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        tabIndex={-1}
      >
        <GripVertical className='w-5 h-5 text-gray-400' />
      </div>
      <button
        role='button'
        tabIndex={0}
        onClick={onClick}
        className='p-4 pl-0 bg-transparent border-0 cursor-pointer outline-none text-left text-gray-600 text-sm'
      >
        {label}
      </button>
    </div>
  );
};

const Component: FC = () => {
  const conditions = useRecoilValue(conditionsState);

  return (
    <SortableContext items={conditions}>
      {conditions.map((condition, index) => (
        <SidebarTab key={condition.id} condition={condition} index={index} />
      ))}
    </SortableContext>
  );
};

const Container: FC = () => {
  const onDragEnd = useRecoilCallback(
    ({ set, snapshot }) =>
      async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over == null || active.id === over.id) {
          return;
        }
        const storage = await snapshot.getPromise(storageState);
        const conditions = storage.conditions;
        const oldIndex = conditions.findIndex((item) => item.id === active.id);
        const newIndex = conditions.findIndex((item) => item.id === over.id);
        const newConditions = arrayMove(conditions, oldIndex, newIndex);
        set(storageState, { ...storage, conditions: newConditions });
      },
    []
  );

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <Component />
    </DndContext>
  );
};

export default Container;
