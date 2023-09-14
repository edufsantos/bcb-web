import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiCreditCard, FiMessageSquare } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Meu plano", icon: FiCreditCard, path: "plan/list" },
  {
    name: "Mensagen",
    icon: FiMessageSquare,
    path: "messages",
  },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathNameToConsult = pathname.replace("#", "");
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          BCB
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          icon={link.icon}
          _hover={{ bg: "#c530306b", color: "white" }}
          bg={pathNameToConsult.includes(link.path) ? "#c53030" : ""}
          color={pathNameToConsult.includes(link.path) ? "white" : ""}
          onClick={() => navigate(link.path)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
