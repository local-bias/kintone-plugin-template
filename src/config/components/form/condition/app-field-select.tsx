import React, { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { TextField, Autocomplete } from '@mui/material';

import { kx } from '../../../../types/kintone.api';
import { appFieldsState } from '../../../states/kintone';

type ContainerProps = {
  fieldCode: string;
  onChange: (code: string) => void;
};

type Props = {
  value: kx.FieldProperty | null;
  fields: kx.FieldProperty[];
  onFieldChange: (_: any, field: kx.FieldProperty | null) => void;
};

const Component: FC<Props> = ({ fields, value, onFieldChange }) => (
  <Autocomplete
    value={value}
    sx={{ width: '350px' }}
    options={fields}
    isOptionEqualToValue={(option, v) => option.code === v.code}
    getOptionLabel={(option) => `${option.label}(${option.code})`}
    onChange={onFieldChange}
    renderInput={(params) => (
      <TextField {...params} label='対象フィールド' variant='outlined' color='primary' />
    )}
  />
);

const Container: FC<ContainerProps> = (props) => {
  const fields = useRecoilValue(appFieldsState);

  const value = fields.find((field) => field.code === props.fieldCode) ?? null;

  const onFieldChange = useCallback(
    (_: any, field: kx.FieldProperty | null) => {
      props.onChange(field?.code ?? '');
    },
    [props.onChange]
  );

  return <Component {...{ onFieldChange, value, fields }} />;
};

export default Container;
