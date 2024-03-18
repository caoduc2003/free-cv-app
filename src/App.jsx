import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, { RootLoader } from "./pages/Root";
import Login, { LoginAction } from "./pages/auth/Login";
import React from "react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: RootLoader,
    children: [
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
