import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import { PrimitiveAtom, useAtom } from 'jotai';
import { FC, Suspense } from 'react';

type Props = {
  atom: PrimitiveAtom<boolean>;
  label?: string;
} & Omit<SwitchProps, 'checked'>;

const JotaiSwitchComponent: FC<Props> = ({ atom, label, ...switchProps }) => {
  const [value, setValue] = useAtom(atom);

  const onChange = (checked: boolean) => {
    setValue(checked);
  };

  return (
    <FormControlLabel
      control={<Switch checked={value} {...switchProps} />}
      onChange={(_, checked) => onChange(checked)}
      label={label}
    />
  );
};

const JotaiSwitchPlaceHolder: FC<Props> = ({ label, atom, ...switchProps }) => (
  <FormControlLabel control={<Switch {...switchProps} disabled defaultChecked />} label={label} />
);

export const JotaiSwitch: FC<Props> = (props) => (
  <Suspense fallback={<JotaiSwitchPlaceHolder {...props} />}>
    <JotaiSwitchComponent {...props} />
  </Suspense>
);
