import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from "@/layouts/full/shared/loadable/Loadable";
import { ProtectedRoute, PublicRoute } from "@/components/shared/AuthGuards";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("@/layouts/full/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("@/layouts/blank/BlankLayout")));

// authentication
const Login = Loadable(lazy(() => import("@/views/authentication/auth/Login")));
const ForgotPassword = Loadable(
  lazy(() => import("@/views/authentication/auth/ForgotPassword")),
);

// Dashboard & Pages
const Dashboard = Loadable(lazy(() => import("@/views/dashboard/Dashboard")));
const UserProfile = Loadable(
  lazy(() => import("@/views/user-profile/UserProfile")),
);
const Error = Loadable(lazy(() => import("@/views/authentication/Error")));

const Router = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <FullLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/user-profile", element: <UserProfile /> },
          { path: "*", element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
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
