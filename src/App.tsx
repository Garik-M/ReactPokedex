import "./styles/App.scss";
import HomePage from "./page/Home";
import Pokemon from "./page/Pokemon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <div>error</div>,
  },
  {
    path: "/pokemon/:id",
    element: <Pokemon />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
