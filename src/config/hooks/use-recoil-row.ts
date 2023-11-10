import { RecoilState, useRecoilCallback } from 'recoil';

export const useRecoilRow = <T>(props: { state: RecoilState<T[]>; getNewRow: () => T }) => {
  const { state, getNewRow } = props;

  const addRow = useRecoilCallback(
    ({ set }) =>
      (index: number) => {
        set(state, (prev) => {
          const next = [...prev];
          next.splice(index + 1, 0, getNewRow());
          return next;
        });
      },
    [state, getNewRow]
  );

  const deleteRow = useRecoilCallback(
    ({ set }) =>
      (index: number) => {
        set(state, (prev) => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      },
    [state]
  );

  return { addRow, deleteRow };
};
