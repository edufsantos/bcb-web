import { Box, Flex, HStack, Stack, useColorModeValue } from "@chakra-ui/react";
import {
  ICreateAccountUser,
  findCustomerById,
  updateCustomer,
} from "@services/api/customer";
import { useToast } from "@store/context/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Buttons } from "../../../../components/molecules/buttons";
import { Inputs } from "../../../../components/molecules/inputs";
import { findPlans } from "@services/api/plan";

export default function CustomerForm() {
  const form = useForm<ICreateAccountUser>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { id } = useParams();
  const isNewRecord = id === "new";

  const { mutate: mutateUpdatePlan, isLoading: isLoadingUpdate } = useMutation(
    (data: Partial<ICreateAccountUser>) =>
      updateCustomer(id as string, data).then((res) => res.data)
  );

  const handleSubmit = (data: Partial<ICreateAccountUser>) => {
    if (!isNewRecord) {
      delete data.password_confirmation;
      delete data.password;
      mutateUpdatePlan(data, {
        onSuccess: () => {
          addToast({
            title: "Cliente atualizado com sucesso!",
            type: "success",
          });
          navigate(-1);
        },
        onError: (err) => {
          addToast({
            title: String(err),
            type: "error",
          });
        },
      });
    }
  };

  useEffect(() => {
    if (!isNewRecord && id) {
      findCustomerById(id).then((res) => {
        form.reset(res.data);
      });
    }
  }, []);

  const { data: plans } = useQuery(["plans_to_customer"], () =>
    findPlans({ search: { active: true } }).then((res) => res.data)
  );

  return (
    <Flex gap={20}>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        flex={1}
      >
        <Flex direction="column" gap={5}>
          <Inputs.Text form={form} name="name" label="Nome completo" required />
          <HStack>
            <Inputs.Text
              form={form}
              name="email"
              label="Email"
              required
              type="email"
            />
            <Inputs.Text
              form={form}
              name="phoneNumber"
              label="Telefone"
              required
            />
            <Inputs.Text form={form} name="cpf" disabled label="CPF" required />
          </HStack>
          <HStack>
            <Inputs.Text form={form} name="cnpj" label="CNPJ" required />
            <Inputs.Text
              form={form}
              name="companyName"
              label="Nome da empresa"
              required
            />
          </HStack>

          <Inputs.Checkbox form={form} name="active" label="Ativo ?" required />
          <HStack>
            <Inputs.Select
              form={form}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.title}
              options={plans?.rows ?? []}
              name="posPaidPlanId"
              label="Selecione um plano"
              required
            />
            <Inputs.Text
              form={form}
              name="balanceCredits"
              label="Créditos disponiveis"
              required
              type="number"
            />
            <Inputs.Text
              form={form}
              name="consumptionPlan"
              label="Consumo do plano"
              required
              type="number"
            />
          </HStack>

          <Stack maxWidth="-webkit-fit-content" spacing={10} pt={2}>
            <Buttons.Default
              title="Salvar"
              loadingText="Salvando informcações!"
              onClick={form.handleSubmit(handleSubmit)}
              isLoading={isLoadingUpdate}
            />
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
}
