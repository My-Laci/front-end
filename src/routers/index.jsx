import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Homepage from "../pages/homepage/homepage";
import Popular from "../pages/popular/popular";

export const router = createBrowserRouter([
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Homepage",
    element: <Homepage />,
  },
  {
    path: "/Popular",
    element: <Popular />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
]);
