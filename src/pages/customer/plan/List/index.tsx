import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { PriceWrapper } from "@components/molecules/PriceWrapper";
import { Buttons } from "@components/molecules/buttons";
import { connectPlanToCustomer, findPlans } from "@services/api/plan";
import { useToast } from "@store/context/useToast";
import {
  changePlanId,
  selectionUserData,
} from "@store/redux/reducers/userDataReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

export default function CustomPlanList() {
  const { addToast } = useToast();
  const { currentUser } = useSelector(selectionUserData);
  const dispatch = useDispatch();

  const { data: plans, refetch } = useQuery(["customer_plan_list"], () =>
    findPlans({ search: { active: true } }).then((res) => res.data)
  );

  const { mutate: mutatePlan, isLoading } = useMutation(
    (posPaidPlanId: string) =>
      connectPlanToCustomer({ posPaidPlanId }).then((res) => res.data)
  );

  const updatePlan = (posPaidPlanId: string) => {
    mutatePlan(posPaidPlanId, {
      onSuccess: () => {
        addToast({
          title: "Plano atualizado com sucesso !",
          type: "success",
        });
        dispatch(changePlanId(posPaidPlanId));
        refetch();
      },
    });
  };

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Selecione um plano Pós Pago
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          E começe a pagar após 30 dias
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {plans?.rows.map((plan) => (
          <PriceWrapper key={plan.id}>
            <PriceWrapper.Header
              title={plan.title}
              price={String(plan.price)}
              isMostPopular={plan.isMostPopular}
            />
            <PriceWrapper.Content listAdvantage={plan.description.split(",")}>
              <PriceWrapper.Footer>
                <PriceWrapper.Button
                  isMostPopular={plan.isMostPopular}
                  isActualPlan={
                    currentUser?.isCustomer
                      ? currentUser.customerData.posPaidPlanId === plan.id
                      : false
                  }
                  onClick={() => updatePlan(plan.id)}
                  isLoading={isLoading}
                />
              </PriceWrapper.Footer>
            </PriceWrapper.Content>
          </PriceWrapper>
        ))}
      </Stack>
      <VStack spacing={2} textAlign="center">
        <Buttons.Default title="Continuar com plano pré-pago" />
      </VStack>
    </Box>
  );
}
