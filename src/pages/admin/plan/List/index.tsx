import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Pagination from "@components/molecules/Pagination";
import { Buttons } from "@components/molecules/buttons";
import { Inputs } from "@components/molecules/inputs";
import useQueryString from "@hooks/useQueryString";
import { FindPlansRequest, deletePlan, findPlans } from "@services/api/plan";
import { useToast } from "@store/context/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { timesAgo } from "@utils/timeAgo";
import { useForm } from "react-hook-form";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function PlanList() {
  const form = useForm<FindPlansRequest>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [query, setQuery] = useQueryString<FindPlansRequest>();

  const { data: plans } = useQuery(["find_plans_admin", query], () =>
    findPlans(query).then((res) => res.data)
  );

  const { mutate: handleDelete, isLoading } = useMutation(
    (id: string) => deletePlan(id).then((res) => res.data),
    {
      onSuccess: () => {
        addToast({
          title: "Plano deletado com sucesso!",
          type: "success",
        });
        queryClient.invalidateQueries(["find_plans_admin", query]);
      },
      onError: (err) => {
        addToast({
          title: String(err),
          type: "error",
        });
        queryClient.invalidateQueries(["find_plans_admin", query]);
      },
    }
  );
  return (
    <Flex direction="column" gap={5}>
      <Flex gap={5}>
        <Buttons.Default
          title="Novo plano"
          bg="#C53030"
          color="white"
          onClick={() => navigate("/admin/employee/plan/edit/new")}
        />
        <Flex flex={1}>
          <Inputs.Text placeholder="Título" form={form} name="title.contains" />
        </Flex>
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          onClick={form.handleSubmit((onValid) => {
            setQuery({
              search: onValid,
            });
          })}
          icon={<SearchIcon />}
        />
      </Flex>
      <Box bg="white">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Ativo ? </Th>
                <Th isNumeric>Valor</Th>
                <Th>Data de envio</Th>
              </Tr>
            </Thead>
            <Tbody>
              {plans?.rows.map((plan) => (
                <Tr key={plan.id}>
                  <Td>{plan.title}</Td>
                  <Td>{plan.active ? "Ativo" : "Inativo"}</Td>
                  <Td isNumeric>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(plan.price)}
                  </Td>
                  <Td>{timesAgo(new Date(plan.created_at))}</Td>
                  <Td>
                    <Flex gap={5}>
                      <IconButton
                        colorScheme="green"
                        aria-label="Edit"
                        onClick={() =>
                          navigate(`/admin/employee/plan/edit/${plan.id}`)
                        }
                        icon={<FiEdit />}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete"
                        isLoading={isLoading}
                        onClick={() => handleDelete(plan.id)}
                        icon={<FiTrash />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination count={plans?.count} />
    </Flex>
  );
}
