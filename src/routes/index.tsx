/** @format */

import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/pages/Layout";
import Revenue from "@/pages/Revenue/Revenue";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
  ]);
  return { routes };
};

export default Routes;
