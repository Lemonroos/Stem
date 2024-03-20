import {
    HomeOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { GrTasks } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const TeacherSideNav: React.FC = () => {
    const location = useLocation();
    const selectedKey =
        location.pathname === "/teacher/my-programs"
            ? "2"
            : location.pathname === "/teacher/submissions"
                ? "3"
                : "1";

    // Get the initial state of the submenus from sessionStorage
    const [openKeys, setOpenKeys] = useState(
        JSON.parse(sessionStorage.getItem("openKeys") || "[]")
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
        getItem(<Link to="/teacher">Dashboard</Link>, "1", <HomeOutlined />, ""),
        getItem("PROGRAMS", "1.1", <TeamOutlined />, [
            getItem(<Link to="./my-programs">My Programs</Link>, "2", "", ""),
        ]),
        getItem(<Link to="./team-submissions">Team Submission</Link>, "3", <GrTasks />, ""),

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
    )
}
export default TeacherSideNav;
