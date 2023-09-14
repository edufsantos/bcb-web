import { Center } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuth: React.FC = () => {
  return (
    <Center h="100vh" w="100vw" bg="gray.100">
      <Outlet />
    </Center>
  );
};

export default LayoutAuth;
