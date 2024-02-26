import {
  HomeOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
// const { SubMenu, Item } = Menu;
// const { Title } = Typography;

export default function StudentSideNav() {
  const location = useLocation();
  const selectedKey =
    location.pathname === "/departments"
      ? "2"
      : location.pathname === "/employees"
        ? "4"
        : location.pathname === "/create"
          ? "5"
          : location.pathname === "/empcontract"
            ? "14"
            : location.pathname === "/usercontract"
              ? "15"
              : "1";

  // Get the initial state of the submenus from sessionStorage
  const [openKeys, setOpenKeys] = useState(
    JSON.parse(sessionStorage.getItem("openKeys") as string) || []
  );

  // Save the state of the submenus to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  function getItem(label: any, key: any, icon: any, children: any) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link to="/student">Dashboard</Link>, "1", <HomeOutlined />, ""),
    getItem(<Link to="/student/my-groups">My Groups</Link>, "2", <HiUserGroup />, ""),
    getItem(<Link to="/student/my-programs">My Programs</Link>, "3", <HomeOutlined />, ""),
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
