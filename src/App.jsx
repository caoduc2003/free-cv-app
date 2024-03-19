import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, { RootLoader, RootSearchBarAction } from "./pages/Root";
import Login, { LoginAction } from "./pages/auth/Login";
import { logout } from "./utils/logout";
import GuestHomepage from "./pages/home/GuestHomepage";
import UserHomepage from "./pages/home/UserHomepage";
import JobDetails, { JobDetailsLoader } from "./pages/job/details/JobDetails";
import SearchResult from "./pages/search/SearchResult";
import CompanyDetails from "./pages/company/CompanyDetails";
import ListCompanies from "./components/company/ListCompanies";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: RootLoader,
    action: RootSearchBarAction,
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
        path: "search",
        element: <SearchResult />,
      },
      {
        path: "job/:id/details",
        element: <JobDetails />,
        loader: JobDetailsLoader,
      },
      {
        path: "company",
        element: <ListCompanies />,
      },
      {
        path: "company/:id/details",
        element: <CompanyDetails />,
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
