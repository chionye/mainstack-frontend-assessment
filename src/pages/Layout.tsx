/** @format */

import { Container, Box } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/Header";

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxW='container.xl'>
        <Header />
        <Box mt={36}>
          <Outlet />
        </Box>
      </Container>
    </QueryClientProvider>
  );
};

export default Layout;
