/** @format */

import { createBrowserRouter } from "react-router-dom";
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
          element: <Revenue />,
        },
      ],
    },
  ]);
  return { routes };
};

export default Routes;
