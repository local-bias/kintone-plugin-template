import { useCallback, Reducer, useReducer } from 'react';
import { createContainer } from 'unstated-next';

import { restoreStorage, storeStorage, getNewCondition } from '@common/plugin';

type State = {
  storage: PluginStorage;
};

type Action =
  | {
      type: 'save';
    }
  | {
      type: 'update';
      storage: PluginStorage;
    }
  | {
      type: 'addCondition';
    }
  | {
      type: 'removeCondition';
      index: number;
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'save': {
      storeStorage(state.storage, () => true);
      return state;
    }
    case 'update': {
      return { ...state, storage: { ...action.storage } };
    }
    case 'addCondition': {
      return { ...state, storage: { ...state.storage, conditions: [...state.storage.conditions, getNewCondition()] } };
    }
    case 'removeCondition': {
      const newCondition = [...state.storage.conditions];
      newCondition.splice(action.index, 1);
      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
  }
};

/**
 *
 * @param initialState
 * @returns 使用するReactのフック
 */
const hooks = (initialState: string = '') => {
  const [{ storage }, dispatch] = useReducer(reducer, { storage: restoreStorage(initialState) });

  const save = useCallback(() => dispatch({ type: 'save' }), []);
  const addCondition = useCallback(() => dispatch({ type: 'addCondition' }), []);
  const removeCondition = useCallback((index: number) => dispatch({ type: 'removeCondition', index }), []);

  return { storage, save, addCondition, removeCondition };
};

export default createContainer(hooks);
