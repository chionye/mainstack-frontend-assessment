import { Box } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/Header";

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box md={{ px: "32px" }} mt='144px'>
        <Header />
        <Outlet />
      </Box>
    </QueryClientProvider>
  );
};

export default Layout;
