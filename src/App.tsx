/** @format */

import { RouterProvider } from "react-router-dom";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./constants/theme";
import ErrorBoundary from "./components/shared/ErrorBoundary";

function App() {
  const { routes } = Routes();

  return (
    <ErrorBoundary>
      <ChakraProvider value={system}>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
