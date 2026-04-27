import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from "@/layouts/full/shared/loadable/Loadable";
import { ProtectedRoute, PublicRoute } from "@/components/shared/AuthGuards";
import RouteErrorElement from "@/components/shared/RouteErrorElement";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("@/layouts/full/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("@/layouts/blank/BlankLayout")));

// authentication
const Login = Loadable(lazy(() => import("@/views/authentication/auth/Login")));
const ForgotPassword = Loadable(
  lazy(() => import("@/views/authentication/auth/ForgotPassword")),
);

// Home
const Dashboard = Loadable(lazy(() => import("@/views/home/Dashboard")));

// Payment
const DepositIndex = Loadable(
  lazy(() => import("@/views/payment/deposit/DepositIndex")),
);
const WithdrawalIndex = Loadable(
  lazy(() => import("@/views/payment/withdrawal/WithdrawalIndex")),
);
const PaymentAccountIndex = Loadable(
  lazy(() => import("@/views/payment/account/PaymentAccountIndex")),
);

// Profile Settings
const UserProfile = Loadable(
  lazy(() => import("@/views/user-settings/UserProfile")),
);

// Error
const Error = Loadable(lazy(() => import("@/views/authentication/Error")));

const Router = [
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <RouteErrorElement />,
    children: [
      {
        path: "/",
        element: <FullLayout />,
        children: [
          { index: true, element: <Dashboard /> },

          // payment
          { path: "/deposits", element: <DepositIndex /> },
          { path: "/withdrawals", element: <WithdrawalIndex /> },
          { path: "/payment-accounts", element: <PaymentAccountIndex /> },

          // user settings
          { path: "/profile", element: <UserProfile /> },

          { path: "*", element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    errorElement: <RouteErrorElement />,
    children: [
      {
        path: "/auth",
        element: <BlankLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "404", element: <Error /> },
          { path: "*", element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/404" />,
  },
];

const router = createBrowserRouter(Router);

export default router;
