import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile.jsx";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import AdminCreateVoucher from "../pages/admin/admin-create-voucher";
import AdminListVoucher from "../pages/admin/admin-list-voucher";
import AdminListBatch from "../pages/admin/admin-list-batch";
import Homepage from "../pages/homepage/homepage";
import Popular from "../pages/popular/popular";
import NotFoundPage from "../pages/NotFound/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/Register",
    element: <Register />,
  },

  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/",
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
  {
    path: "/AdminCreateVoucher",
    element: <AdminCreateVoucher />,
  },
  {
    path: "/AdminListVoucher",
    element: <AdminListVoucher />,
  },
  {
    path: "/AdminListBatch",
    element: <AdminListBatch />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
