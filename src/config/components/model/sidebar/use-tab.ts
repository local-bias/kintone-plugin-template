import { selectedConditionIdState } from '@/config/states/plugin';
import { useRecoilCallback } from 'recoil';

export const useTab = () => {
  const onTabChange = useRecoilCallback(
    ({ set }) =>
      async (condition: Plugin.Condition) => {
        set(selectedConditionIdState, condition.id);
      },
    []
  );
  return { onTabChange };
};
