import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Pagination from "@components/molecules/Pagination";
import { Inputs } from "@components/molecules/inputs";
import useQueryString from "@hooks/useQueryString";
import {
  TFindCustomerRequest,
  deleteCustomer,
  findCustomers,
} from "@services/api/customer";
import { useToast } from "@store/context/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { timesAgo } from "@utils/timeAgo";
import { useForm } from "react-hook-form";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
  const form = useForm<TFindCustomerRequest>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [query, setQuery] = useQueryString<TFindCustomerRequest>();

  const { data: customers } = useQuery(["find_customers_admin", query], () =>
    findCustomers(query).then((res) => res.data)
  );

  const { mutate: handleDelete, isLoading } = useMutation(
    (id: string) => deleteCustomer(id).then((res) => res.data),
    {
      onSuccess: () => {
        addToast({
          title: "Cliente deletado com sucesso!",
          type: "success",
        });
        queryClient.invalidateQueries(["find_customers_admin", query]);
      },
      onError: (err) => {
        addToast({
          title: String(err),
          type: "error",
        });
        queryClient.invalidateQueries(["find_customers_admin", query]);
      },
    }
  );

  return (
    <Flex direction="column" gap={5}>
      <Flex gap={5} bg="white" p={5}>
        <Flex flex={1}>
          <Inputs.Text placeholder="Nome" form={form} name="name.contains" />
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
                <Th>Email</Th>
                <Th>Ativo ?</Th>
                <Th>customero atual</Th>
                <Th>Data de cadastro</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers?.rows.map((customer) => (
                <Tr key={customer.id}>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>
                    <Text color={customer.active ? "green.700" : "red.600"}>
                      {customer.active ? "Ativo" : "Inativo"}
                    </Text>
                  </Td>

                  <Td>{timesAgo(new Date(customer.created_at))}</Td>
                  <Td>
                    <Flex gap={5}>
                      <IconButton
                        colorScheme="green"
                        aria-label="Edit"
                        onClick={() =>
                          navigate(
                            `/admin/employee/customer/edit/${customer.id}`
                          )
                        }
                        icon={<FiEdit />}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete"
                        isLoading={isLoading}
                        onClick={() => handleDelete(customer.id)}
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
      <Pagination count={customers?.count} />
    </Flex>
  );
}
