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
import { FindMessageRequest, findMessages } from "@services/api/message";
import { useModal } from "@store/context/useModal";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import { timesAgo } from "@utils/timeAgo";
import { SearchIcon } from "@chakra-ui/icons";

const MessageList: React.FC = () => {
  const { openModal } = useModal();
  const form = useForm<FindMessageRequest>();
  const [query, setQuery] = useQueryString<FindMessageRequest>();

  const { data: messages } = useQuery(["find_messages", query], () =>
    findMessages(query).then((res) => res.data)
  );

  const appendMessage = () => {
    openModal({
      key: "add_message",
      title: "Enviar mensagem",
      bodyChildren: <Form />,
    });
  };

  return (
    <Flex p={5} gap={5} display={"flex"} flexDir="column">
      <Flex gap={5}>
        <Buttons.Default
          title="Nova mensagem"
          bg="#C53030"
          color="white"
          onClick={appendMessage}
        />
        <Flex flex={1}>
          <Inputs.Text
            placeholder="Telefone"
            form={form}
            name="phoneNumber.contains"
          />
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
                <Th>Número de telefone</Th>
                <Th>Texto</Th>
                <Th>é WhatsApp ?</Th>
                <Th>Data de envio</Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages?.rows.map((plan) => (
                <Tr key={plan.id}>
                  <Td>{plan.phoneNumber}</Td>
                  <Td>{plan.text}</Td>
                  <Td>{plan.isWhatsApp ? "Sim" : "Não"}</Td>
                  <Td>{timesAgo(new Date(plan.created_at))}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination count={messages?.count} />
    </Flex>
  );
};

export default MessageList;
