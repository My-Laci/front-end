import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile.jsx";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Canvas from "../pages/Canvas/Canvas.jsx";
import AdminCreateVoucher from "../pages/admin/admin-create-voucher";
import AdminListVoucher from "../pages/admin/admin-list-voucher";
import AdminListBatch from "../pages/admin/admin-list-batch";
import Homepage from "../pages/homepage/homepage";
import Popular from "../pages/popular/popular";
import AccountInfoPage from "../pages/account-info-page/account-info-page";
import ChangeNamePage from "../pages/change-name-page/change-name-page";
import ChangeEmailPage from "../pages/change-email-page/change-email-page";
import ChangePasswordPage from "../pages/change-password-page/change-password-page";
import SearchResultPage from "../pages/search-result-page/search-result-page";
import OtpEmailPage from "../pages/otp-email-page/otp-email-page";

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
    path: "/Canvas",
    element: <Canvas />,
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
    path: "/AdminListVoucher",
    element: <AdminListVoucher />,
  },
  {
    path: "/AdminListBatch",
    element: <AdminListBatch />,
  },
  {
    path: "/AccountInfo",
    element: <AccountInfoPage />,
  },
  {
    path: "/ChangeName",
    element: <ChangeNamePage />,
  },
  {
    path: "/ChangeEmail",
    element: <ChangeEmailPage />,
  },
  {
    path: "/ChangePassword",
    element: <ChangePasswordPage />,
  },
  {
    path: "/EmailVerification",
    element: <OtpEmailPage />,
  },
  {
    path: "/SearchResult",
    element: <SearchResultPage />,
  },
]);