import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/Profile",
    element: <Profile />,
  },

  {
    path: "/Register",
    element: <Register />,
  },
]);
