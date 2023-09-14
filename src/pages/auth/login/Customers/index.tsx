import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {} from "@reduxjs/toolkit";

import { Link as LinkDOM, useNavigate } from "react-router-dom";
import { useAccessToken } from "@hooks/useAccessToken";
import { useToast } from "@store/context/useToast";
import { IAuthUser, loginCustomer } from "@services/api/auth";
import { Inputs } from "@components/molecules/inputs";
import { Buttons } from "@components/molecules/buttons";

export default function LoginCutomer() {
  const form = useForm<IAuthUser>();
  const navigate = useNavigate();

  const { addToast } = useToast();

  const { mutate, isLoading } = useMutation((data: IAuthUser) =>
    loginCustomer(data).then((res) => res.data)
  );

  const handleSubmit = (data: IAuthUser) => {
    mutate(data, {
      onSuccess: (res) => {
        useAccessToken.setAccessToken({
          accessToken: res.access_token,
        });
        navigate("/admin/customer/plan/list");
      },
      onError: (err) => {
        addToast({
          title: String(err) as string,
          type: "error",
        });
      },
    });
  };

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Acesse sua conta
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Flex direction="column" gap={5}>
          <Inputs.Text
            form={form}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            required
          />

          <Inputs.Password form={form} name="password" label="Senha" required />

          <Stack spacing={10} pt={2}>
            <Buttons.Default
              title="Entrar"
              loadingText="Login"
              onClick={form.handleSubmit(handleSubmit)}
              isLoading={isLoading}
            />
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Ainda não é cadastrado ?
              <Link>
                <LinkDOM to="/auth/customer/create-account">
                  Criar conta
                </LinkDOM>
              </Link>
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Stack>
  );
}
