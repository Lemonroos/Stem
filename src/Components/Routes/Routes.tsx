import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import AboutUs from "../Pages/Home/AboutUs";
import Homepage from "../Pages/Home/Homepage";
import News from "../Pages/Home/News";
import Programs from "../Pages/Home/Programs";
import Login from "../Pages/Login/Login";

import StudentDashboard from "../Pages/Student/StudentDashboard";
import StudentLayout from "../layout/StudentLayout";
import MyGroupList from "../Pages/Student/MyGroupList";
import MyGroupDetails from "../Pages/Student/MyGroupDetails";
import GroupList from "../Pages/Manager/GroupList";
import MyProgramsList from "../Pages/Student/MyProgramsList";
import MyProgramDetails from "../Pages/Student/MyProgramsDetails"

import TeacherLayout from "../layout/TeacherLayout";
import TeacherDashboard from "../Pages/Teacher/TeacherDashboard";

import ManagerLayout from "../layout/ManagerLayout";
import ManagerDashBoard from "../Pages/Manager/ManagerDashboard";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../Pages/Admin/AdminDashboard";

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
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { index: true, element: <HomePage /> },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      { path: "groups", element: <GroupList /> },
    ]
  },
  {
    path: "/manager",
    element: <ManagerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ManagerDashBoard /> },
      // {
      //   //   path: "dashboard",
      //   //   element: <Dashboard />,
      //   // },
      //   // { path: "groups", element: <GroupList /> },
    ]
  },
  {
    path: "/student",
    element: <StudentLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: "details",
        // student account details (info)
      },
      {
        path: "my-groups",
        element: <MyGroupList />,
        // MYGROUP
        children: [
          {
            path: "details/:id",
            element: <MyGroupDetails />,
            //La chi tiet 1 group ma user dc co trong day. Khi lam thi kieu table va
            //  display theo trinh tu team cung nhu hoc column team de biet user team nao
          }
        ]
      },
      {
        path: "my-programs",
        element: <MyProgramsList />,
        // MYGROUP
        children: [
          {
            path: "details/:id",
            element: <MyProgramDetails />,
            // children: [
            //   {
            //     path: "labs/:id",
            //     element: </>,
            //     // MY LABS
            //   },
            // ],
          }
        ]
      },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: "details",

        // teacher account details (info)
      },
      {
        path: "my-groups",
        element: <MyGroupList />,
        // MYGROUP
        children: [
          {
            path: "details/:id",
            element: <MyGroupDetails />,
             //La chi tiet 1 group ma user dc co trong day. Khi lam thi kieu table va
            //  display theo trinh tu team cung nhu hoc column team de biet user team nao
          }
        ]
      },
      {
        path: "my-programs",
        element: <MyProgramsList />,
        // MYGROUP
        children: [
          {
            path: "details/:id",
            element: <MyProgramDetails />,
            // children: [
            //   {
            //     path: "labs/:id",
            //     element: </>,
            //     // MY LABS
            //   },
            // ],
          }
        ]
      },
    ],
  }
]);
