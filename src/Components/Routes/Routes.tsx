import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
// import EmpContract from "../Pages/Contract/EmpContract";
// import UserContract from "../Pages/Contract/UserContract";
// import Departments from "../Pages/Departments/Departments";
import Create from "../Pages/Employees/Create";
import Employees from "../Pages/Employees/Employees";
import GroupList from "../Pages/Groups/GroupList";
import MyPrograms from "../Pages/Programs/MyPrograms";
import StudentLayout from "../ProjectLayOut/StudentLayout";
import ErrorPage from "../Pages/Error/ErrorPage"
import Login from "../Pages/Login/Login";
import RootLayout from "../ProjectLayOut/RootLayout";
import Homepage from "../Pages/Home/Homepage";
import News from "../Pages/Home/News";
import AboutUs from "../Pages/Home/AboutUs";
import Programs from "../Pages/Home/Programs";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    errorElement: <ErrorPage />,
    children: [
      {
        index: true, element: <Homepage />,
      },
      {
        path: "news",
        element: <News/>,
      },
      { path: "programs", element: <Programs /> },
      { path: "about-us", element: <AboutUs /> },
      {
        path: "login",
        element: <Login />,
      },
    ]
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
      { index: true, element: <Dashboard /> },
      {
        path: "details",
        element: <Employees />
        // student account details (info)
        ,
      },

      {
        path: "mygroups", element: <GroupList />
        // MYGROUP
      },
      {
        path: "programs", element: <MyPrograms />,
      },
      {
        path: "myprograms", element: <MyPrograms />,
        children: [
          {
            path: ":id", element: <MyPrograms />,
            children: [
              {
                path: "mylabs", element:  <MyPrograms />
// MY LABS
              }
            ]
          }
        ]
      },
    ]



  
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
]
)
