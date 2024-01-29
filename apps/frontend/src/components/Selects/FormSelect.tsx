'use client';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { BaseSelect, BaseSelectProps, SelectOption } from './BaseSelect';

export interface FormSelectFormProps<T extends FieldValues, K extends string>
  extends Omit<BaseSelectProps, 'value' | 'onChange' | 'error'>,
    UseControllerProps<T, K> {}

export const FormSelect = <T extends FieldValues, K extends string>({
  name: selectName,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...rest
}: FormSelectFormProps<T, K>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: selectName,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  });

  return (
    <BaseSelect
      value={value as SelectOption}
      onChange={onChange}
      error={error?.message}
      {...rest}
    />
  );
};
