import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              BCB – Big Chat Brasil
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              Conecte-se à seus consumidores
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
            architecto velit eligendi est voluptate ullam aliquid dicta. Odit
            vero impedit numquam harum! Eligendi totam, aliquid sunt voluptas
            doloribus ut consequuntur.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
              onClick={() => navigate("/auth/employee/login")}
            >
              Portal do Admin
            </Button>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
              onClick={() => navigate("/auth/customer/login")}
            >
              Portal do Consumidor
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
