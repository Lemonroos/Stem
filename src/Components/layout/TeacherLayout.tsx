import {
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';
import getUser from "../../config/auth";
import MySpin from "../UI/spin";
import TeacherSideNav from "./LayoutSider/TeacherSideNav";
import { CContent, CHeader, CSideHeader, CSider } from "./PayLayoutStyle";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const TeacherPageLayout = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const resObject = await getUser();
      setUser(resObject.user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  function previous() {
    if (location.pathname === '/teacher') {
    }
    window.history.go(-1);
  }
  
  if (isLoading) {
    return <MySpin />;
  } else
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

              src={user?.Avatar}
            />
            <Title level={4} style={{ marginTop: 0 }}>
              {user?.Name}

            </Title>
          </Space>
        </Header>

        <Sider style={CSider} width={300}>
          <TeacherSideNav />
        </Sider>

        <Layout style={{ marginLeft: 300 }}>


          <Header style={CHeader}>
            {window.location.pathname != '/teacher' && (
              <Button type="primary" onClick={previous} id="backward">
                Back
              </Button>
            )}
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


