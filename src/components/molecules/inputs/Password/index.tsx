import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export interface IInputProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T, FieldValues>;
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const Password = <T extends FieldValues>({
  form,
  label,
  name,
  disabled,
  placeholder,
  required,
}: IInputProps<T>) => {
  const { formState, register } = form;
  const [showPassword, setShowPassword] = useState(false);

  const { error } = useMemo(() => {
    return form.getFieldState(name);
  }, [formState.errors]);

  return (
    <FormControl id={name} isRequired={required} isInvalid={!!error?.message}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          required={required}
          disabled={disabled}
          {...register(name)}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
