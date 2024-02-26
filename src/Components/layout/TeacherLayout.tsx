import {
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import StudentSideNav from "./LayoutSider/StudentSideNav";
import { CContent, CHeader, CSideHeader, CSider } from "./PayLayoutStyle";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const TeacherPageLayout = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user);



  return (
    <>
      <Layout style={{ height: "100vh" }}>
        {/* AVATAR's header */}
        <Header style={CSideHeader}>
          <Space align="center" size={"small"} direction="horizontal">
            <Avatar
              shape="square"
              size={"large"}
              icon={<UserOutlined />}
              style={{ marginBottom: 20 }}

              src={user?.photos?.[0]?.value}
            />
            <Title level={4} style={{ marginTop: 0 }}>
              {user?.displayName}

            </Title>
          </Space>
        </Header>

        <Sider style={CSider} width={300}>
          <StudentSideNav />
        </Sider>

        <Layout style={{ marginLeft: 300 }}>


          <Header style={CHeader}>
            <Link to="/">
              <Button
                size={"large"}
                icon={<UploadOutlined style={{ fontSize: "200%" }} />}
                style={{
                  color: "#1890ff",
                  backgroundColor: "#fff",
                  borderColor: "1px solid #ccc",
                  boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
                  rotate: "90deg",
                  padding: 0,
                }}
              >

              </Button>
            </Link>
          </Header>


          <Content style={CContent}>
            <div
              style={{
                padding: "0 5% 0 5%",
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};


export default TeacherPageLayout;


