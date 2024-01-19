import React, { useState, useEffect } from "react";
import { Menu, Space, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
  MailOutlined,
  SolutionOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  DollarOutlined,
  AuditOutlined,
} from "@ant-design/icons";
const { SubMenu, Item } = Menu;
const { Title } = Typography;

export default function SideNav() {
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
    JSON.parse(sessionStorage.getItem("openKeys")) || []
  );

  // Save the state of the submenus to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link to="/dashboard">Dashboard</Link>, "1", <HomeOutlined />),
    getItem("NHÂN VIÊN", "sub1", <TeamOutlined />, [
      getItem(<Link to="/departments">Phòng Ban</Link>, "2"),
      getItem("Phòng Ban của tôi", "3"),
      getItem(<Link to="/employees">Toàn bộ nhân viên</Link>, "4"),
      getItem(<Link to="/create">Tạo nhân viên mới</Link>, "5"),
    ]),
    getItem("TĂNG CA", "sub2", <FileDoneOutlined />, [
      getItem("Đơn Tăng Ca Nhân Viên", "6"),
      getItem("Đơn Tăng Ca Của Tôi", "7"),
    ]),
    getItem("NGHỈ PHÉP", "sub3", <SolutionOutlined />, [
      getItem("Đơn Nghỉ Phép Nhân Viên", "8"),
      getItem("Đơn Nghỉ Phép Của Tôi", "9"),
    ]),
    getItem("ĐƠN KHÁC", "sub4", <FileAddOutlined />, [
      getItem("Danh Sách Đơn Khác", "10"),
      getItem("Đơn Khác Của Tôi", "11"),
    ]),
    getItem("QUẢN LÍ LƯƠNG", "sub5", <DollarOutlined />, [
      getItem("Lương Nhân Viên", "12"),
      getItem("Lương Của Tôi", "13"),
    ]),
    getItem("HỢP ĐỒNG", "sub6", <AuditOutlined />, [
      getItem(<Link to="/empcontract">Hợp Đồng Nhân Viên</Link>, "14"),
      getItem(<Link to="/usercontract">Hợp Đồng Của Tôi</Link>, "15"),
    ]),
    getItem("TUYỂN DỤNG", "sub7", <MailOutlined />, [
      getItem("Danh sách ứng viên", "16"),
    ]),
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
