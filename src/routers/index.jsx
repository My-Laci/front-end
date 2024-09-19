import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile.jsx";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import AdminCreateVoucher from "../pages/admin/admin-create-voucher";
import AdminListVoucher from "../pages/admin/admin-list-voucher";
import AdminListBatch from "../pages/admin/admin-list-batch";
import Homepage from "../pages/homepage/homepage";
import Popular from "../pages/popular/popular";
import AccountInfoPage from "../pages/account-info-page/account-info-page.jsx";
import ChangeNamePage from "../pages/change-name-page/change-name-page.jsx";
import ChangeEmailPage from "../pages/change-email-page/change-email-page.jsx";
import ChangePasswordPage from "../pages/change-password-page/change-password-page.jsx";
import SearchResultPage from "../pages/search-result-page/search-result-page.jsx";
import OtpEmailPage from "../pages/otp-email-page/otp-email-page.jsx";
import NotFoundPage from "../pages/NotFound/NotFound.jsx";
import PostDetail from "../pages/post-detail-page/post-detail-page.jsx";
import AdminValidate from "../pages/admin/admin-validate.jsx";
import Certificate from "../pages/certificate-generator/CertificateGenarator.jsx";
import Article from "../pages/article-page/Article.jsx";
import Voucher from "../pages/voucher/voucher.jsx";
import ValidateUser from "../pages/validate-user/ValidateUser.jsx";
import DetailVoucher from "../pages/detail-voucher/DetailVoucher.jsx";

import UserLayout from "../layouts/UserLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Certificate",
    element: <Certificate />,
  },
  {
    path: "/Article",
    element: <Article />,
  },

  // User layout routes
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/Popular",
        element: <Popular />,
      },
      {
        path: "/PostDetail",
        element: <PostDetail />,
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
        path: "/Voucher",
        element: <Voucher />,
      },
      {
        path: "/Validate",
        element: <ValidateUser />,
      },
      {
        path: "/DetailVoucher",
        element: <DetailVoucher />,
      },
      {
        path: "/SearchResult",
        element: <SearchResultPage />,
      },
    ],
  },

  // Admin layout routes
  {
    path: "/Admin",
    element: <AdminLayout />,
    children: [
      {
        path: "CreateVoucher",
        element: <AdminCreateVoucher />,
      },
      {
        path: "ListVoucher", // Correct the path
        element: <AdminListVoucher />,
      },
      {
        path: "ListBatch", // Correct the path
        element: <AdminListBatch />,
      },
      {
        path: "Validate", // Correct the path
        element: <AdminValidate />,
      },
    ],
  },

  // Fallback for undefined routes
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
