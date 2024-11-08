import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Autocomplete, TextField } from '@mui/material';
import { Atom, useAtomValue } from 'jotai';
import { ComponentProps, FC, Suspense, useCallback } from 'react';

type ContainerProps = {
  fieldPropertiesAtom: Atom<Promise<kintoneAPI.FieldProperty[]>>;
  fieldCode: string;
  onChange: (code: string) => void;
  label?: string;
  placeholder?: string;
} & Omit<ComponentProps<typeof Autocomplete>, 'onChange' | 'value' | 'renderInput' | 'options'>;

type Props = Omit<ContainerProps, 'fieldPropertiesAtom' | 'onChange' | 'fieldCode'> & {
  value: kintoneAPI.FieldProperty | null;
  fieldProperties: kintoneAPI.FieldProperty[];
  onFieldChange: (_: any, field: kintoneAPI.FieldProperty | null) => void;
};

const JotaiFieldAutocomplete: FC<Props> = ({
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

const JotaiFieldSelectComponent: FC<ContainerProps> = ({
  fieldPropertiesAtom,
  onChange,
  fieldCode,
  ...rest
}) => {
  const fieldProperties = useAtomValue(fieldPropertiesAtom);
  const value = fieldProperties.find((field) => field.code === fieldCode) ?? null;

  const onFieldChange = useCallback(
    (_: any, field: kintoneAPI.FieldProperty | null) => onChange(field?.code ?? ''),
    [onChange]
  );

  return <JotaiFieldAutocomplete {...{ onFieldChange, value, fieldProperties, ...rest }} />;
};

const JotaiFieldSelectPlaceHolder: FC<ContainerProps> = ({
  label,
  placeholder,
  ...autocompleteProps
}) => (
  <TextField label={label} placeholder={placeholder} value='' sx={autocompleteProps.sx} disabled />
);

export const JotaiFieldSelect: FC<ContainerProps> = (props) => {
  const completed: ContainerProps = {
    label: '対象フィールド',
    placeholder: 'フィールドを選択してください',
    ...props,
    sx: { width: 400, ...props.sx },
  };

  return (
    <Suspense fallback={<JotaiFieldSelectPlaceHolder {...completed} />}>
      <JotaiFieldSelectComponent {...completed} />
    </Suspense>
  );
};
