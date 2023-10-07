import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, Suspense, memo } from 'react';
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

const PlaceHolder: FC<Props> = ({ label }) => (
  <FormControlLabel control={<Switch color='primary' disabled defaultChecked />} label={label} />
);

const Container: FC<Props> = (props) => (
  <Suspense fallback={<PlaceHolder {...props} />}>
    <Component {...props} />
  </Suspense>
);

export const FormSwitch = memo(Container);
