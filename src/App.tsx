/** @format */

import { RouterProvider } from "react-router-dom";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./constants/theme";

function App() {
  const { routes } = Routes();

  return (
    <ChakraProvider value={system}>
      <RouterProvider router={routes} />
    </ChakraProvider>
  );
}

export default App;
