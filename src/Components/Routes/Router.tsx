import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";
import EmpContract from "../Pages/Contract/EmpContract";
import UserContract from "../Pages/Contract/UserContract";
import Departments from "../Pages/Departments/Departments";
import Create from "../Pages/Employees/Create";
import Employees from "../Pages/Employees/Employees";
import GroupList from "../Pages/Groups/GroupList";
import MyPrograms from "../Pages/Programs/MyPrograms";
export default function Router() {
  return (
    <>
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/create" element={<Create />} />
        <Route path="/empcontract" element={<EmpContract />} />
        <Route path="/usercontract" element={<UserContract />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/programs/myPrograms" element={<MyPrograms />} />
      </Routes>
    </>
  )
}
