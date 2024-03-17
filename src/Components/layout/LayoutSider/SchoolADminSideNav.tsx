
import { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export default function StudentSideNav() {
  const location = useLocation();
  const selectedKey =
 location.pathname === "/student/my-programs"
      ? "2"
      : location.pathname === "/student/programs"
      ? "3"
      : location.pathname === "/student/my-groups"
      ? "4"
      : "1";

  // Get the initial state of the submenus from sessionStorage
  const [openKeys, setOpenKeys] = useState(
    JSON.parse(sessionStorage.getItem("openKeys") || "[]")
  );
  // Save the state of the submenus to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  function getItem(label:any, key:any, icon:any, children:any) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link to="/school-admin">Dashboard</Link>, "1", <HomeOutlined />,""),
    getItem("PROGRAMS", "1.1", <TeamOutlined />, [
      getItem(<Link to="./my-programs">MY PROGRAMS</Link>, "2","",""),
      getItem(<Link to="./programs">LIST OF AVAILABLE PROGRAMS</Link>, "3","",""),
    ]),
    getItem(<Link to="./my-groups">MY GROUPs</Link>, "4", <HomeOutlined />,""),
  ];

  return (
    <div>
      <Menu
        selectedKeys={[selectedKey]} // set the selected key
        openKeys={openKeys} // set the open keys
        onOpenChange={setOpenKeys} // update the open keys when they change
        mode="inline"
        items={items}
      />
    </div>
  );
}