import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile.jsx";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Canvas from "../pages/Canvas/Canvas.jsx";

export const router = createBrowserRouter([
  {
    path: "/Profile",
    element: <Profile />,
  },

  {
    path: "/Register",
    element: <Register />,
  },

  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/Canvas",
    element: <Canvas />,
  },
]);
