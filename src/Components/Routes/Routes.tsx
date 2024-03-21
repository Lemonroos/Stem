import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import AboutUs from "../Pages/Home/AboutUs";
import Homepage from "../Pages/Home/Homepage";
import News from "../Pages/Home/News";
// import Programs from "../Pages/Home/Programs";
import Login from "../Pages/Login/Login";

import StudentDashboard from "../Pages/Student/StudentDashboard";
import StudentLayout from "../layout/StudentLayout";
import MyGroupList from "../Pages/Student/MyGroupList";
import MyGroupDetails from "../Pages/Student/MyGroupDetails";
import GroupList from "../Pages/Manager/GroupList";
import MyProgramsList from "../Pages/Student/MyProgramsList";
import MyProgramDetails from "../Pages/Student/MyProgramsDetails";
import AllPrograms from "../Pages/Student/AllPrograms";
import ProgramDetails from "../Pages/Student/ProgramDetails";
import LabDetails from "../Pages/Student/LabDetails";

import TeacherLayout from "../layout/TeacherLayout";
import TeacherDashboard from "../Pages/Teacher/TeacherDashboard";
import ProgramsOfTeacher from "../Pages/Teacher/ProgramsOfTeacher";
import TeamSubmissions from "../Pages/Teacher/TeamSubmissions";
import ProgramDetailsOfTeacher from "../Pages/Teacher/ProgramDetailsOfTeacher";
import GroupDetailsOfTeacher from "../Pages/Teacher/GroupDetailsOfTeacher";
import TeamDetailsOfTeacher from "../Pages/Teacher/TeamDetailsOfTeacher";

import ManagerLayout from "../layout/ManagerLayout";
import ManagerDashBoard from "../Pages/Manager/ManagerDashboard";
import ProgramList from "../Pages/Manager/ProgramList";
import Submissions from "../Pages/Manager/Submissions";
import ProgramDetailsOfManager from "../Pages/Manager/ProgramDetailsOfManager";
import GroupDetails from "../Pages/Manager/GroupDetails";
import SolutionDetailsOfManager from "../Pages/Manager/SolutionDetailsOfManager";

import SystemAdminPageLayout from "../layout/AdminLayout";
import SystemAdminDashboard from "../Pages/SystemAdmin/SystemAdminDashboard";

import SchoolAdminPageLayout from "../layout/SchoolAdminLayout";
import SchoolAdminDashboard from "../Pages/SchoolAdmin/SchoolAdminDashboard";

import PrivateRoute from "../../config/RoleBasedRoutes";
import AdminProgram from "../Pages/SystemAdmin/AdminProgram";
import AdminProgramDetails from "../Pages/SystemAdmin/AdminProgramDetails";
import LabsDetail from "../Pages/SystemAdmin/LabsDetail";










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
      // { path: "programs", element: <Programs /> },
      { path: "about-us", element: <AboutUs /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "/system-admin",
    element: (
      <PrivateRoute requiredRoles={["System Admin"]}>
        <SystemAdminPageLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // { index: true, element: <HomePage /> },
      {
        path: "dashboard",
        element: <SystemAdminDashboard />,
      },
      { path: "groups", element: <GroupList /> },
      { path: "programs", element: <AdminProgram /> },
      { path: "programs/details/:id", element: <AdminProgramDetails /> },
      { path: "programs/details/:id/labs/:id", element: <LabsDetail />  }
    ],
  },
  {
    path: "/school-admin",
    element: (
      <PrivateRoute requiredRoles={["School Admin"]}>
        <SchoolAdminPageLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // { index: true, element: <HomePage /> },
      {
        index: true,
        element: <SchoolAdminDashboard />,
      },
      { path: "groups", element: <GroupList /> },
    ],
  },
  {
    path: "/manager",
    element: (
      <PrivateRoute requiredRoles={["Manager"]}>
        <ManagerLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ManagerDashBoard /> },
      // {
      //   //   path: "dashboard",
      //   //   element: <Dashboard />,
      //   // },
      //   // { path: "groups", element: <GroupList /> },
      {
        path: "programs",
        element: <ProgramList />,
      },
      {
        path: "programs/details/:id",
        element: <ProgramDetailsOfManager />,
      },
      {
        path: "programs/details/:programId/groups/:groupId",
        element: <GroupDetails />,
      },
      {
        path: "submissions",
        element: <Submissions />,
      },
      {
        path: "submissions/:solutionId/details",
        element: <SolutionDetailsOfManager />,
      },
    ],
  },
  {
    path: "/student",
    element: (
      <PrivateRoute requiredRoles={["Student"]}>
        <StudentLayout />
      </PrivateRoute>
    ),
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
        // children: [
        //   {
        //     path: "details/:id",
        //     element: <MyGroupDetails />,
        //     //La chi tiet 1 group ma user dc co trong day. Khi lam thi kieu table va
        //     //  display theo trinh tu team cung nhu hoc column team de biet user team nao
        //   }
        // ]
      },
      {
        path: "my-groups/details/:id",
        element: <MyGroupDetails />,
        // student account details (info)
      },
      {
        path: "programs",
        element: <AllPrograms />,
      },
      {
        path: "programs/details/:id",
        element: <ProgramDetails />,
      },
      {
        path: "my-programs",
        element: <MyProgramsList />,
        // MYGROUP
        // children: [
        //   {
        //     path: "details/:id",
        //     element: <MyProgramDetails />,
        //     // children: [
        //     //   {
        //     //     path: "labs/:id",
        //     //     element: </>,
        //     //     // MY LABS
        //     //   },
        //     // ],
        //   }
        // ]
      },
      {
        path: "my-programs/details/:id",
        element: <MyProgramDetails />,
      },
      {
        path: "my-programs/details/:programId/labs/:labId",
        element: <LabDetails />,
      },
    ],
  },
  {
    path: "/teacher",
    element: (
      <PrivateRoute requiredRoles={["Teacher"]}>
        <TeacherLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: "team-submissions",
        element: <TeamSubmissions />,
      },
      {
        path: "my-programs",
        element: <ProgramsOfTeacher />,
      },
      {
        path: "my-programs/details/:programId",
        element: <ProgramDetailsOfTeacher />,
      },
      {
        path: "my-programs/details/:programId/groups/:groupId",
        element: <GroupDetailsOfTeacher />,
      },
      {
        path: "my-programs/details/:programId/groups/:groupId/teams/:teamId",
        element: <TeamDetailsOfTeacher />,
      },
    ],
  },
]);
