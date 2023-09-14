import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface IInputProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T, FieldValues>;
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

export const Text = <T extends FieldValues>({
  form,
  label,
  name,
  disabled,
  placeholder,
  required,
  type = "text",
}: IInputProps<T>) => {
  const { formState, register } = form;

  const { error } = useMemo(() => {
    return form.getFieldState(name);
  }, [formState.errors]);

  return (
    <FormControl id={name} isRequired={required} isInvalid={!!error?.message}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        placeholder={placeholder}
        type={type}
        required={required}
        disabled={disabled}
        {...register(name)}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
