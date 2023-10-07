import { TextField, TextFieldProps } from '@mui/material';
import React, { ChangeEventHandler, FC, Suspense, memo } from 'react';
import { RecoilState, useRecoilCallback, useRecoilValue } from 'recoil';

type Props = {
  state: RecoilState<string>;
  width?: number;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

const Component: FC<Props> = ({ state, width = 400, ...textFieldProps }) => {
  const query = useRecoilValue(state);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(state, event.target.value);
      },
    []
  );

  return (
    <TextField
      {...textFieldProps}
      value={query}
      onChange={onChange}
      sx={{ ...textFieldProps.sx, width }}
    />
  );
};

const PlaceHolder: FC<Props> = ({ label, placeholder, width = 400 }) => (
  <TextField label={label} placeholder={placeholder} value='' sx={{ width }} disabled />
);

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<PlaceHolder {...props} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default memo(Container);
