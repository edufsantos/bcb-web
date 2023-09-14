import {
  Box,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as LinkDOM, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateAccountUser, createAccountUser } from "@services/api/user";
import { Inputs } from "@components/molecules/inputs";
import { Buttons } from "@components/molecules/buttons";
import { useToast } from "@store/context/useToast";

const schema = yup.object().shape({
  name: yup.string().required("Este campo é obrigatório"),
  email: yup.string().required("Este campo é obrigatório"),
  phoneNumber: yup.string().required("Este campo é obrigatório"),
  cpf: yup.string().required("Este campo é obrigatório"),
  password: yup.string().required("Este campo é obrigatório"),
  password_confirmation: yup
    .string()
    .when("password", (password, field) =>
      password
        ? field
            .required("Este campo é obrigatório")
            .oneOf([yup.ref("password")], "Confirmação de senha não confere")
        : field
    ),
});

export default function CreateACcountEmployee() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const form = useForm<ICreateAccountUser>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation((data: ICreateAccountUser) =>
    createAccountUser(data).then((res) => res.data)
  );

  const handleSubmit = (data: ICreateAccountUser) => {
    mutate(data, {
      onSuccess: () => {
        addToast({
          title: "Conta criada com sucesso !",
          type: "success",
        });
        navigate("/auth/employee/login");
      },
      onError: (err) => {
        addToast({
          title: String(err),
          type: "error",
        });
      },
    });
  };

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          CRIE SUA CONTA
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <Inputs.Text
            form={form}
            name="name"
            label="Nome completo"
            placeholder="Fulano"
            required
          />
          <Inputs.Text
            form={form}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            required
          />
          <HStack>
            <Box>
              <Inputs.Text
                form={form}
                name="phoneNumber"
                label="Telefone"
                placeholder="+55 (99) 99999-9999"
                required
              />
            </Box>
            <Box>
              <Inputs.Text
                form={form}
                name="cpf"
                label="CPF"
                placeholder="999.999.999-99"
                required
              />
            </Box>
          </HStack>
          <Inputs.Password form={form} name="password" label="Senha" required />
          <Inputs.Password
            form={form}
            name="password_confirmation"
            label="Confirmar senha"
            required
          />
          <Stack spacing={10} pt={2}>
            <Buttons.Default
              title="Cadastrar"
              loadingText="Cadastrando"
              onClick={form.handleSubmit(handleSubmit)}
              isLoading={isLoading}
            />
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Já tem um cadastro?{" "}
              <Link>
                <LinkDOM to="/auth/employee/login">Login</LinkDOM>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
