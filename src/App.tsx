// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import EmpContract from "./Components/Pages/Contract/EmpContract";
import UserContract from "./Components/Pages/Contract/UserContract";
import Departments from "./Components/Pages/Departments/Departments";
import Create from "./Components/Pages/Employees/Create";
import Employees from "./Components/Pages/Employees/Employees";
import Home from "./Components/Pages/Home/Home";

function App() {
  return (
    <div className="App">
      {/* <AnimatedCursor
        innerSize={8}
        outerSize={20}
        color="192, 192, 192"
        outerAlpha={0.2}
        innerScale={1}
        outerScale={3}
        clickables={[
          "a",
          "input",
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
          "ul",
          "li",
          "span",
          "i",
          // "div{role='menuitem'}",
        ]}
      /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/create" element={<Create />} />
        <Route path="/empcontract" element={<EmpContract />} />
        <Route path="/usercontract" element={<UserContract />} />
      </Routes>
    </div>
  );
}

export default App;
