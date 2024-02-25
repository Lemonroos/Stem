import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import RootLayout from "../layout/RootLayout";
import StudentLayout from "../layout/StudentLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import ProgramGroups from "../Pages/Groups/GroupList";
import AboutUs from "../Pages/Home/AboutUs";
import Homepage from "../Pages/Home/Homepage";
import News from "../Pages/Home/News";
import Programs from "../Pages/Home/Programs";
import Login from "../Pages/Login/Login";
import MyPrograms from "../Pages/Programs/MyPrograms";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "news",
        element: <News />,
      },
      { path: "programs", element: <Programs /> },
      { path: "about-us", element: <AboutUs /> },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <PageLayout />, 
  //   errorElement: <ErrorPage />,
  //   children: [
  //     // { index: true, element: <HomePage /> },
  //     {
  //       path: "dashboard",
  //       element: <Dashboard />,
  //     },
  //     { path: "groups", element: <GroupList /> },
  //   ]
  // },
  // {
  //   path: "/manager",
  //   element: <PageLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     // { index: true, element: <HomePage /> },
  //     {
  //       path: "dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "create",
  //       element: <Create />,
  //     },
  //     { path: "groups", element: <GroupList /> },
  //   ]
  // },
  {
    path: "/student",
    element: <StudentLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "details",

        // student account details (info)
      },
      {
        path: "my-groups",
        element: <ProgramGroups />,
        // MYGROUP
      },
      {
        path: "my-programs",
        element: <MyPrograms />,
        children: [
          {
            path: ":id",
            element: <MyPrograms />,
            children: [
              {
                path: "mylabs",
                element: <MyPrograms />,
                // MY LABS
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: "/teacher",
  //   element: <PageLayout />,
  //   errorElement: <ErrorPage />,
  //   // errorElement: <ErrorPage />,
  //   children: [
  //     // { index: true, element: <HomePage /> },
  //     {
  //       path: "dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "employees",
  //       element: <Employees />,
  //     },
  //     {
  //       path: "create",
  //       element: <Create />,
  //     },
  //     { path: "groups", element: <GroupList /> },
  //     { path: "programs/myPrograms", element: <MyPrograms /> },
  //   ]
  // }
]);
