import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { clearRedux } from "@store/redux/clear";
import { selectionUserData } from "@store/redux/reducers/userDataReducer";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { currentUser } = useSelector(selectionUserData);
  const navigate = useNavigate();

  const signOut = () => {
    navigate("/auth");
    clearRedux();
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        BCB - Big Chat Brasil
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{currentUser?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    <Text fontSize="sm">{currentUser?.email}</Text>
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <ChevronDownIcon />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem icon={<FiLogOut />} onClick={() => signOut()}>
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
