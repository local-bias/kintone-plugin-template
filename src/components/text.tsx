import { TextField, TextFieldProps } from '@mui/material';
import React, { ChangeEventHandler, FC, Suspense } from 'react';
import { type PrimitiveAtom, useAtom } from 'jotai';

type Props = {
  atom: PrimitiveAtom<string>;
  width?: number;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

const JotaiTextComponent: FC<Props> = ({ atom, width, ...textFieldProps }) => {
  const [value, setValue] = useAtom(atom);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={onChange}
      sx={{ ...textFieldProps.sx, width }}
    />
  );
};

const JotaiTextPlaceHolder: FC<Props> = ({ label, placeholder, width }) => (
  <TextField label={label} placeholder={placeholder} value='' sx={{ width }} disabled />
);

const JotaiTextContainer: FC<Props> = (props) => {
  const completed: Props = {
    sx: { width: 400 },
    ...props,
  };

  return (
    <Suspense fallback={<JotaiTextPlaceHolder {...completed} />}>
      <JotaiTextComponent {...completed} />
    </Suspense>
  );
};

export const JotaiText = JotaiTextContainer;
