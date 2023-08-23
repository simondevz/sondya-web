import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, Home } from "./screens";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export default App;
