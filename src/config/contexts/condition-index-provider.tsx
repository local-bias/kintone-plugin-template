import React, { ReactNode, createContext, useContext } from 'react';

type ProviderProps = {
  children: ReactNode;
  conditionIndex: number;
};

const Context = createContext<number>(0);

export const useConditionIndex = () => {
  return useContext(Context);
};

export const ConditionIndexProvider = ({ children, conditionIndex }: ProviderProps) => {
  return <Context.Provider value={conditionIndex}>{children}</Context.Provider>;
};
