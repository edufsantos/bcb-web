import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as SelectC,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface IInputProps<
  T extends FieldValues = FieldValues,
  TOptions extends FieldValues = FieldValues
> {
  form: UseFormReturn<T, FieldValues>;
  name: FieldPath<T>;
  options: TOptions[];
  keyExtractor: (item: TOptions) => string;
  labelExtractor: (item: TOptions) => string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Select = <T extends FieldValues, TOptions extends FieldValues>({
  form,
  label,
  name,
  disabled,
  placeholder,
  required,
  options,
  keyExtractor,
  labelExtractor,
}: IInputProps<T, TOptions>) => {
  const { formState, register } = form;

  const { error } = useMemo(() => {
    return form.getFieldState(name);
  }, [formState]);

  return (
    <FormControl id={name} isRequired={required} isInvalid={!!error?.message}>
      {label && <FormLabel>{label}</FormLabel>}
      <SelectC
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...register(name)}
      >
        {options.map((item) => (
          <option key={keyExtractor(item)} value={keyExtractor(item)}>
            {labelExtractor(item)}
          </option>
        ))}
      </SelectC>
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
