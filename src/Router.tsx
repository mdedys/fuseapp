import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { useAuth } from "~/contexts/Auth.js";
import NewUserView from "~/views/auth/NewUserView.js";
import HomeView from "~/views/home/HomeView.js";
import GenerateKeys from "~/views/auth/GenerateKeys.js";
import UnlockAccount from "~/views/auth/UnlockAccount.js";

export const Paths = {
  SignUp: "/signup",
  NewKeys: "/keys",
  Unlock: "/unlock",
  Home: "/",
};

const Gate = () => {
  const { accountExists, isAuthenticated } = useAuth();
  if (!isAuthenticated && accountExists) return <Navigate to={Paths.Unlock} replace />;
  if (!isAuthenticated) return <Navigate to={Paths.SignUp} replace />;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: Paths.SignUp,
    element: <NewUserView />,
  },
  {
    path: Paths.NewKeys,
    element: <GenerateKeys />,
  },
  {
    path: Paths.Unlock,
    element: <UnlockAccount />,
  },
  {
    element: <Gate />,
    children: [
      {
        path: Paths.Home,
        element: <HomeView />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
