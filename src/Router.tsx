import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { useAuth } from "~/contexts/Auth.js";
import Authenticate from "~/views/auth/AuthView.js";
import HomeView from "~/views/home/HomeView.js";

const Paths = {
  Authenticate: "/auth",
  Home: "/",
};

const Gate = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={Paths.Authenticate} replace />;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: Paths.Authenticate,
    element: <Authenticate />,
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
