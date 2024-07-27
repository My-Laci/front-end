import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile.jsx";
import Register from "../pages/Register/Register.jsx";

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
