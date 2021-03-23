import { useCallback, Reducer, useReducer } from 'react';
import { createContainer } from 'unstated-next';

import { restoreStorage, storeStorage } from '@common/plugin';

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

  return { storage, save };
};

export default createContainer(hooks);
