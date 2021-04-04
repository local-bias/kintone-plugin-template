import React, { memo, VFC } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { StorageContainer } from '../contexts';

type Received = { label: string };

type Props = Received & { addCondition: () => void };

const Component: VFC<Props> = memo(({ addCondition, label }) => (
  <Button
    variant='outlined'
    color='primary'
    size='small'
    startIcon={<AddIcon />}
    onClick={addCondition}
    style={{ marginTop: '16px' }}
  >
    {label}
  </Button>
));

const Container: VFC<Received> = ({ label }) => {
  const { addCondition } = StorageContainer.useContainer();
  return <Component label={label} addCondition={addCondition} />;
};

export default Container;
