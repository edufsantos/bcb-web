import { Flex, Stack } from "@chakra-ui/react";
import { Buttons } from "@components/molecules/buttons";
import { Inputs } from "@components/molecules/inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendMessageArgs, sendMessage } from "@services/api/message";
import { useModal } from "@store/context/useModal";
import { useToast } from "@store/context/useToast";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  isWhatsApp: yup.boolean().required(),
  text: yup.string().required(),
  phoneNumbers: yup.array(yup.string().required()).required(),
});

const Form: React.FC = () => {
  const { addToast } = useToast();
  const { closeAllModals } = useModal();
  const form = useForm<SendMessageArgs>({
    defaultValues: {
      isWhatsApp: true,
    },
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation(
    (data: SendMessageArgs) => sendMessage(data).then((res) => res.data),
    {
      onSuccess: () => {
        addToast({
          title: "Mensagem enviada com sucesso!",
          type: "success",
        });
        closeAllModals();
      },
      onError: (err) => {
        addToast({
          title: String(err),
          type: "error",
        });
      },
    }
  );

  return (
    <Flex direction="column" gap={5}>
      <Inputs.Text
        form={form}
        name="phoneNumbers.0"
        label="Telefone"
        placeholder="+55 (43) 99999-9999"
        required
      />
      <Inputs.Text form={form} name="text" label="Texto para envio:" required />

      <Stack spacing={10} pt={2}>
        <Buttons.Default
          title="Entrar"
          loadingText="Login"
          isLoading={isLoading}
          onClick={form.handleSubmit((onValid) => mutate(onValid))}
        />
      </Stack>
    </Flex>
  );
};

export default Form;
