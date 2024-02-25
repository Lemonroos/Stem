import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Homepage from "../pages/Home/Homepage";
import News from "../pages/Home/News";
import Programs from "../pages/Home/Programs";
import AboutUs from "../pages/Home/AboutUs";
import Login from "../pages/Login/Login";
import StudentLayout from "../layout/StudentLayout";
import Dashboard from "../Dashboard";
import ProgramGroups from "../pages/Groups/GroupList";
import MyPrograms from "../pages/Programs/MyPrograms";

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
]);
