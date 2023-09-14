import {
  Checkbox as CheckboxC,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface IInputProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T, FieldValues>;
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Checkbox = <T extends FieldValues>({
  form,
  label,
  name,
  disabled,
  required,
}: IInputProps<T>) => {
  const { formState, register } = form;

  const { error } = useMemo(() => {
    return form.getFieldState(name);
  }, [formState]);

  return (
    <FormControl id={name} isRequired={required} isInvalid={!!error?.message}>
      {label && <FormLabel>{label}</FormLabel>}
      <CheckboxC required={required} disabled={disabled} {...register(name)} />
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
