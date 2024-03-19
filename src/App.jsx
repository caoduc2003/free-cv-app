import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, { RootLoader } from "./pages/Root";
import Login, { LoginAction } from "./pages/auth/Login";
import React from "react";
import { logout } from "./utils/logout";
import GuestHomepage from "./pages/home/GuestHomepage";
import UserHomepage from "./pages/home/UserHomepage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: RootLoader,
    children: [
      {
        index: true,
        element: <GuestHomepage />,
      },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "home",
        element: <UserHomepage />,
      },
      {
        path: "logout",
        action: logout,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
