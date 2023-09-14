/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  useColorModeValue,
  ButtonProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function PriceWrapper(props: PropsWithChildren<any>) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

interface IHeaderProps {
  title: string;
  price: string;
  isMostPopular?: boolean;
}

PriceWrapper.Header = ({ price, title, isMostPopular }: IHeaderProps) => {
  return (
    <Box py={4} px={12} position="relative">
      {isMostPopular && (
        <Box
          position="absolute"
          top="-16px"
          left="50%"
          style={{ transform: "translate(-50%)" }}
        >
          <Text
            textTransform="uppercase"
            bg={useColorModeValue("red.300", "red.700")}
            px={3}
            py={1}
            color={useColorModeValue("gray.900", "gray.300")}
            fontSize="sm"
            fontWeight="600"
            rounded="xl"
          >
            Mais Popular
          </Text>
        </Box>
      )}

      <Text fontWeight="500" fontSize="2xl">
        {title}
      </Text>
      <HStack justifyContent="center">
        <Text fontSize="3xl" fontWeight="600">
          R$
        </Text>
        <Text fontSize="5xl" fontWeight="900">
          {price}
        </Text>
        <Text fontSize="3xl" color="gray.500">
          /mês
        </Text>
      </HStack>
    </Box>
  );
};

interface IContentProps {
  listAdvantage: string[];
}

PriceWrapper.Content = ({
  listAdvantage,
  children,
}: PropsWithChildren<IContentProps>) => {
  return (
    <VStack
      bg={useColorModeValue("gray.50", "gray.700")}
      py={4}
      borderBottomRadius={"xl"}
    >
      <List spacing={3} textAlign="start" px={12}>
        {listAdvantage.map((item) => (
          <ListItem key={item}>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            {item}
          </ListItem>
        ))}
      </List>
      {children}
    </VStack>
  );
};

PriceWrapper.Footer = ({ children }: PropsWithChildren<any>) => {
  return (
    <Box w="80%" pt={7}>
      {children}
    </Box>
  );
};

type TButtonProps = ButtonProps & {
  isActualPlan?: boolean;
  isMostPopular?: boolean;
  onClick?: () => void;
};

PriceWrapper.Button = ({
  isActualPlan,
  isMostPopular,
  ...rest
}: TButtonProps) => {
  return (
    <Button
      w="full"
      disabled={isActualPlan}
      cursor={isActualPlan ? "not-allowed" : "pointer"}
      {...(isMostPopular ? { colorScheme: "red" } : {})}
      {...(isActualPlan ? { colorScheme: "blue" } : {})}
      {...rest}
    >
      {isActualPlan ? "Plano atual" : "Quero esse !"}
    </Button>
  );
};
