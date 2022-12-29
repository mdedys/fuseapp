import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { useAuth } from "~/contexts/Auth.js";
import ExistingUserView from "~/views/auth/ExistingUserView.js";
import NewUserView from "~/views/auth/NewUserView.js";
import HomeView from "~/views/home/HomeView.js";

const Paths = {
  SignUp: "/signup",
  SignIn: "/signin",
  Home: "/",
};

const Gate = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={Paths.SignUp} replace />;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: Paths.SignUp,
    element: <NewUserView />,
  },
  {
    path: Paths.SignIn,
    element: <ExistingUserView />,
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
