import { createBrowserRouter } from "react-router-dom";
import AdminCreateVoucher from "../pages/admin/admin-create-voucher";
<<<<<<< HEAD
import AdminListVoucher from "../pages/admin/admin-list-voucher";
import AdminHistoryVoucher from "../pages/admin/admin-history-voucher";
import AdminListBatch from "../pages/admin/admin-list-batch";
=======
import AdminHistoryVoucher from "../pages/admin/admin-history-voucher";
>>>>>>> 920f0ff71a649808ebdb0fbdff658a19d1295f3c
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
  {
    path: "/AdminCreateVoucher",
    element: <AdminCreateVoucher />,
  },
  {
<<<<<<< HEAD
    path: "/AdminListVoucher",
    element: <AdminListVoucher />,
  },
  {
    path: "/AdminListBatch",
    element: <AdminListBatch />,
  },
  {
=======
>>>>>>> 920f0ff71a649808ebdb0fbdff658a19d1295f3c
    path: "/AdminHistoryVoucher",
    element: <AdminHistoryVoucher />,
  },
]);
