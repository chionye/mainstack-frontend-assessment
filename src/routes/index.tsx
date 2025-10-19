/** @format */

import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/pages/Layout";
import Revenue from "@/pages/Revenue/Revenue";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Navigate to='/revenue' />,
        },
        {
          path: "/revenue",
          element: <Revenue />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <ErrorBoundary error={{ status: 404 } as Error & { status: number }} />
      ),
    },
  ]);
  return { routes };
};

export default Routes;
