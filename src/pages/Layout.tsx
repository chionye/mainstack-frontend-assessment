/** @format */

import { Container, Box } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import FloatingSidebar from "@/components/shared/FloatingSidebar";

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxW='container.xl'>
        <Header />
        <FloatingSidebar />
        <Box px={{ base: 4, md: 32 }} mt='144px'>
          <Outlet />
        </Box>
      </Container>
    </QueryClientProvider>
  );
};

export default Layout;
