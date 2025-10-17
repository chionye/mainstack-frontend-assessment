
import { RouterProvider } from "react-router-dom";
import Routes from "./routes";

function App() {
  const { routes } = Routes();

  return <RouterProvider router={routes} />;
}

export default App;
