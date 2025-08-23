import "./styles/App.scss";
import HomePage from "page/Home";
import Pokemon from "page/Pokemon";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import NotFound from "page/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/pokemon/:id",
    element: <Pokemon />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404"/>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
