import {
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import getUser from '../../config/auth';
import Spin from '../UI/spin';
import StudentSideNav from "./LayoutSider/StudentSideNav";
import { CContent, CHeader, CSideHeader, CSider } from "./PayLayoutStyle";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;




const StudentPageLayout: React.FC = () => {
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
    // setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  // useEffect(() => {
  //   if(!user){
  //     setUser(JSON.parse(sessionStorage.getItem('user') || ''));
  //     setIsLoading(!isLoading)
  //   }
  // }, [isLoading && !user]);

  const logout = () => {
    window.open('https://stem-backend.vercel.app/auth/logout', '_self');
    localStorage.setItem('success', 'false');
  }
  // let user = JSON.parse(localStorage.getItem('user') || '');
  // console.log(user)
  if (isLoading) {

    return <><Spin /></>;

  }
  function previous() {
    if (location.pathname === '/student') {
    }
    window.history.go(-1);
  }
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

              src={user ? user.Avatar : ''}
            />
            <Title level={4} style={{ marginTop: 0 }}>
              {user ? user.Name : ''}

            </Title>
          </Space>
        </Header>

        <Sider style={CSider} width={300}>
          <StudentSideNav />
        </Sider>

        <Layout style={{ marginLeft: 300 }}>


          <Header style={CHeader}>
            {window.location.pathname != '/student' && (
              <Button type="primary" onClick={previous} id="backward">
                Back
              </Button>
            )}
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
              onClick={logout}
            >

            </Button>
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


export default StudentPageLayout;


