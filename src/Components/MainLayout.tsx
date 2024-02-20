
// import Home from "./Pages/Home/Home";
import PageLayout from "./ProjectLayOut/PageLayout";
// import PageLayout from "./ProjectLayOut/PageLayout";
// import Departments from "./Pages/Departments/Departments";
// import Departments from "./Pages/Departments/Departments";
// import Employees from "./Pages/Contract/UserContract";
// import Create from "./Pages/Employees/Create";
// import EmployeeContract from "./Pages/Contract/EmpContract";
export default function Main() {
    return (
        <div>
            {/* <Home /> */}
            <PageLayout />
            {/* <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/create" element={<Create />} />
                <Route path="/empcontract" element={<EmployeeContract />} />
                <Route path="/usercontract" element={<UserContract />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/programs/myPrograms" element={<MyPrograms />} />
            </Routes> */}
        </div>
    )
}
