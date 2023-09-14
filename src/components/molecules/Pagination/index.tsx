import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import usePagination from "@hooks/usePagination";

interface IPagButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}
const PagButton = (props: IPagButtonProps) => {
  const activeStyle = {
    bg: "brand.600",
    _dark: { bg: "brand.500" },
    color: "white",
  };
  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      color="gray.700"
      _dark={{ color: "white", bg: "gray.800" }}
      opacity={props.disabled ? 0.6 : undefined}
      _hover={!props.disabled ? activeStyle : undefined}
      cursor={props.disabled ? "not-allowed" : undefined}
      {...(props.active && activeStyle)}
      onClick={!props.disabled ? props.onClick : undefined}
    >
      {props.children}
    </Button>
  );
};

export interface PaginationProps {
  count?: number;
}

const Pagination: React.FC<PaginationProps> = ({ count = 0 }) => {
  const { page, pages, take, prevPage, nextPage, setSkip } =
    usePagination(count);

  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={5}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton disabled={page === 1} onClick={() => prevPage()}>
          Anterior
        </PagButton>
        {page > 1 && <PagButton onClick={() => setSkip(0)}>1</PagButton>}
        {page > 2 && <PagButton disabled>...</PagButton>}
        <PagButton active>{page}</PagButton>
        {page + 1 < pages && <PagButton disabled>...</PagButton>}
        {page < pages && (
          <PagButton onClick={() => setSkip((pages - 1) * take)}>
            {pages}
          </PagButton>
        )}
        <PagButton disabled={page >= pages} onClick={nextPage}>
          Próximo
        </PagButton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
