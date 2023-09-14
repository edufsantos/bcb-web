import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { useAccessToken } from "@hooks/useAccessToken";
import { findCurrentData } from "@services/api/auth";
import { changeCurrentUser } from "@store/redux/reducers/userDataReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./Sidebar";

export const LayoutAdminCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    findCurrentData().then((res) => {
      if (res.data.isCustomer) {
        dispatch(changeCurrentUser(res.data));
      } else {
        navigate("../../admin/employee/home");
      }
    });
  }, []);

  return useAccessToken.getAccessToken()?.accessToken ? (
    <Box minH="100vh" w="100vw" overflowX="hidden" bg={"gray.50"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to="/auth" />
  );
};
