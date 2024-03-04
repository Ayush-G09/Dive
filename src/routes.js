import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login/Login";
import Discover from "./views/Discover/Discover";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/discover",
    element: <Discover />,
  }
]);