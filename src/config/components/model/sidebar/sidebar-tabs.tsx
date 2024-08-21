import { RecoilDndContext } from '@/lib/components/recoil-dnd-context';
import { RecoilSortableContext } from '@/lib/components/recoil-sortable-context';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from '@emotion/styled';
import { GripVertical } from 'lucide-react';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  commonSettingsShownState,
  conditionsState,
  selectedConditionIdState,
} from '../../../states/plugin';
import { useTab } from './use-tab';

type Props = {
  label:
    | React.JSX.Element
    | ((params: { condition: Plugin.Condition; index: number }) => React.JSX.Element);
};

const CommonTab: FC = () => {
  const shown = useRecoilValue(commonSettingsShownState);

  const onClick = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(selectedConditionIdState);
      },
    []
  );

  return (
    <div
      className={cn(
        'border-0 border-r-2 border-solid border-transparent bg-background items-center transition-colors active:bg-blue-100/70',
        {
          'border-blue-600 bg-blue-100/30 text-blue-600': shown,
        }
      )}
    >
      <button
        role='button'
        tabIndex={0}
        onClick={onClick}
        className='p-4 pl-[52px] bg-transparent border-0 cursor-pointer outline-none text-left text-gray-600 text-sm w-full'
      >
        {t('config.sidebar.tab.common.label')}
      </button>
    </div>
  );
};

const SidebarTab: FC<{ condition: Plugin.Condition; index: number } & Props> = ({
  condition,
  index,
  label,
}) => {
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

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'border-0 border-r-2 border-solid border-transparent grid grid-cols-[auto_1fr] bg-background items-center transition-colors active:bg-blue-100/70',
        {
          'z-50 shadow-md': isDragging,
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
        {typeof label === 'function' ? label({ condition, index }) : label}
      </button>
    </div>
  );
};

const Component: FC<Props & { className?: string }> = ({ className, label }) => {
  const conditions = useRecoilValue(conditionsState);

  return (
    <div className={cn(className, 'h-full')}>
      <CommonTab />
      <RecoilSortableContext state={conditionsState}>
        {conditions.map((condition, index) => (
          <SidebarTab key={condition.id} condition={condition} index={index} label={label} />
        ))}
      </RecoilSortableContext>
    </div>
  );
};

const StyledComponent = styled(Component)`
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0004;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Container: FC<Props> = (props) => {
  return (
    <RecoilDndContext state={conditionsState}>
      <StyledComponent {...props} />
    </RecoilDndContext>
  );
};

export default Container;
