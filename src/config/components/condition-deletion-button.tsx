import React, { memo, VFC } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { StorageContainer } from '../contexts';

type Received = { index: number };

type Props = Received & { removeCondition: (index: number) => void };

const Component: VFC<Props> = memo(({ index, removeCondition }) => (
  <IconButton onClick={() => removeCondition(index)}>
    <DeleteIcon fontSize='small' />
  </IconButton>
));

const Container: VFC<Received> = ({ index }) => {
  const { removeCondition } = StorageContainer.useContainer();
  return <Component index={index} removeCondition={removeCondition} />;
};

export default Container;
