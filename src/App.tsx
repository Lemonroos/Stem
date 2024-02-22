
import { RouterProvider } from "react-router-dom";
import { routes } from "./Components/Routes/Routes";
import "./App.css";
// import MainLayout from "./Components/MainLayout";
// import Login from "./Components/Pages/Login/Login";
// import Dashboard from "./Components/Dashboard";
// import EmpContract from "./Components/Pages/Contract/EmpContract";
// import UserContract from "./Components/Pages/Contract/UserContract";
// import Departments from "./Components/Pages/Departments/Departments";
// import Create from "./Components/Pages/Employees/Create";
// import Employees from "./Components/Pages/Employees/Employees";
// import Home from "./Components/Pages/Home/Home";
// import GroupList from "./Components/Pages/Groups/GroupList";
// import MyPrograms from "./Components/Pages/Programs/MyPrograms";

function App() {
  return (
    // <div className="App">
    //   {/* <AnimatedCursor
    //     innerSize={8}
    //     outerSize={20}
    //     color="192, 192, 192"
    //     outerAlpha={0.2}
    //     innerScale={1}
    //     outerScale={3}
    //     clickables={[
    //       "a",
    //       "input",
    //       "label[for]",
    //       "select",
    //       "textarea",
    //       "button",
    //       ".link",
    //       "ul",
    //       "li",
    //       "span",
    //       "i",
    //       // "div{role='menuitem'}",
    //     ]}
    //   /> */}
    //   <Routes>
    //     <Route path="/*" element={<MainLayout/>} />
    //     <Route path="/login" element={<Login/>} />
    //     {/* <Route path="/" element={<Home/>} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/departments" element={<Departments />} />
    //     <Route path="/employees" element={<Employees />} />
    //     <Route path="/create" element={<Create />} />
    //     <Route path="/empcontract" element={<EmpContract />} />
    //     <Route path="/usercontract" element={<UserContract />} />
    //     <Route path="/groups" element={<GroupList />} />
    //     <Route path="/programs/myPrograms" element={<MyPrograms />} /> */}
    //   </Routes>
    // </div>
    <>

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
