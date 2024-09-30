import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Autocomplete, TextField } from '@mui/material';
import { Atom, useAtomValue } from 'jotai';
import { Loadable } from 'jotai/vanilla/utils/loadable';
import React, { ComponentProps, FC, useCallback } from 'react';

type ContainerProps = {
  fieldPropertiesAtom: Atom<Loadable<Promise<kintoneAPI.FieldProperty[]>>>;
  fieldCode: string;
  onChange: (code: string) => void;
  label?: string;
  placeholder?: string;
} & Omit<ComponentProps<typeof Autocomplete>, 'onChange' | 'value' | 'renderInput' | 'options'>;

type CompletedContainerProps = {
  fieldProperties: kintoneAPI.FieldProperty[];
} & ContainerProps;

type Props = Omit<ContainerProps, 'fieldPropertiesAtom' | 'onChange' | 'fieldCode'> & {
  value: kintoneAPI.FieldProperty | null;
  fieldProperties: kintoneAPI.FieldProperty[];
  onFieldChange: (_: any, field: kintoneAPI.FieldProperty | null) => void;
};

const Select: FC<Props> = ({
  fieldProperties,
  value,
  onFieldChange,
  label,
  placeholder,
  ...autocompleteProps
}) => (
  <Autocomplete
    value={value}
    options={fieldProperties}
    isOptionEqualToValue={(option, v) => option.code === v.code}
    getOptionLabel={(option) => `${option.label}(${option.code})`}
    onChange={onFieldChange}
    sx={autocompleteProps.sx}
    fullWidth={autocompleteProps.fullWidth}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        placeholder={placeholder}
        variant='outlined'
        color='primary'
      />
    )}
  />
);
Select.displayName = 'RecoilFieldSelect';

const JotaiFieldSelectComponent: FC<CompletedContainerProps> = ({
  fieldPropertiesAtom,
  onChange,
  fieldCode,
  fieldProperties,
  ...rest
}) => {
  const value = fieldProperties.find((field) => field.code === fieldCode) ?? null;

  const onFieldChange = useCallback(
    (_: any, field: kintoneAPI.FieldProperty | null) => onChange(field?.code ?? ''),
    [onChange]
  );

  return <Select {...{ onFieldChange, value, fieldProperties, ...rest }} />;
};

const JotaiFieldSelectPlaceHolder: FC<ContainerProps> = ({
  label,
  placeholder,
  ...autocompleteProps
}) => (
  <TextField label={label} placeholder={placeholder} value='' sx={autocompleteProps.sx} disabled />
);

export const JotaiFieldSelect: FC<ContainerProps> = (props) => {
  const fieldProperties = useAtomValue(props.fieldPropertiesAtom);

  if (fieldProperties.state === 'hasError') {
    throw fieldProperties.error;
  }

  if (fieldProperties.state === 'loading') {
    return <JotaiFieldSelectPlaceHolder {...props} />;
  }

  const completed: CompletedContainerProps = {
    label: '対象フィールド',
    placeholder: 'フィールドを選択してください',
    fieldProperties: fieldProperties.data,
    ...props,
    sx: {
      width: 400,
      ...props.sx,
    },
  };

  return <JotaiFieldSelectComponent {...completed} />;
};
