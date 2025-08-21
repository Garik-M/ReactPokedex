import "./styles/App.scss";
import HomePage from "./page/Home";
import Pokemon from "./page/Pokemon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>404 | NOT FOUND</div>,
  },
  {
    path: "/pokemon/:id",
    element: <Pokemon />,
    errorElement: <div>404 | NOT FOUND</div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
