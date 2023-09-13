import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { RecoilState, useRecoilCallback, useRecoilValue } from 'recoil';

type Props = {
  state: RecoilState<boolean>;
  label?: string;
};

const Component: FC<Props> = ({ state, label }) => {
  const enables = useRecoilValue(state);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(state, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label={label}
    />
  );
};

export const FormSwitch = memo(Component);
