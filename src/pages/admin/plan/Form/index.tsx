import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { PriceWrapper } from "@components/molecules/PriceWrapper";
import {
  ICreatePlan,
  createPlan,
  findPlanById,
  updatePlan,
} from "@services/api/plan";
import { useToast } from "@store/context/useToast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Buttons } from "../../../../components/molecules/buttons";
import { Inputs } from "../../../../components/molecules/inputs";
import { useEffect } from "react";

export default function FormPlan() {
  const form = useForm<ICreatePlan>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { id } = useParams();
  const { price, description, title } = form.watch();
  const isNewRecord = id === "new";

  const { mutate: mutateCreatePlan, isLoading: isLoadingCreate } = useMutation(
    (data: ICreatePlan) => createPlan(data).then((res) => res.data)
  );
  const { mutate: mutateUpdatePlan, isLoading: isLoadingUpdate } = useMutation(
    (data: ICreatePlan) =>
      updatePlan(id as string, data).then((res) => res.data)
  );

  const handleSubmit = (data: ICreatePlan) => {
    if (isNewRecord) {
      mutateCreatePlan(data, {
        onSuccess: () => {
          addToast({
            title: "Plano criado com sucesso!",
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
    } else {
      mutateUpdatePlan(data, {
        onSuccess: () => {
          addToast({
            title: "Plano atualizado com sucesso!",
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
      findPlanById(id).then((res) => {
        form.reset(res.data);
      });
    }
  }, []);

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
          <Inputs.Text form={form} name="title" label="Título" required />
          <Inputs.Text
            form={form}
            name="description"
            label="Descrição"
            required
          />
          <Inputs.Text
            form={form}
            name="price"
            label="Valor"
            required
            type="number"
          />
          <Inputs.Checkbox form={form} name="active" label="Ativo ?" required />
          <Inputs.Checkbox
            form={form}
            name="isMostPopular"
            label="Popular ?"
            required
          />
          <Inputs.Text
            form={form}
            name="balanceCredits"
            label="Quantidade de créditos"
            type="number"
            required
          />

          <Stack maxWidth="-webkit-fit-content" spacing={10} pt={2}>
            <Buttons.Default
              title="Salvar"
              loadingText="Salvando informcações!"
              onClick={form.handleSubmit(handleSubmit)}
              isLoading={isLoadingCreate || isLoadingUpdate}
            />
          </Stack>
        </Flex>
      </Box>
      <PriceWrapper>
        <PriceWrapper.Header price={String(price)} title={title} />
        <PriceWrapper.Content listAdvantage={description?.split(",") || []} />
      </PriceWrapper>
    </Flex>
  );
}
