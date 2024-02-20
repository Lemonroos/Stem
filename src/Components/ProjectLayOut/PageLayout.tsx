import {
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { Link } from 'react-router-dom';
import SideNav from "./LayoutMainComponents/SideNav";
import { CContent, CHeader, CSideHeader, CSider } from "./PayLayoutStyle";
import RouterPaths from "../Routes/Router";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const PageLayout = () => {
  // const [headerContent,setHeaderContent] = useState(null)
  return (
    <>
      <Layout style={{ height: "100vh", overflow: "initial" }}>
        {/* AVATAR's header */}
        <Header style={CSideHeader}>
          <Space align="center" size={"small"} direction="horizontal">
            <Avatar
              shape="square"
              size={"large"}
              icon={<UserOutlined />}
              style={{ marginBottom: 20 }}
            />
            <Title level={4} style={{ marginTop: 0 }}>
              Logged In User
            </Title>
          </Space>
        </Header>

        <Sider style={CSider} width={300}>
          <SideNav />
        </Sider>

        <Layout style={{ marginLeft: 300 }}>

          
          <Header style={CHeader}>
            {/* <Title level={3} style={{ color: "#000", marginTop: 0 }}>
            {headerContent} This is the header
            </Title> */}
            {/* <Button type="primary" size={"large"} icon={<LogoutOutlined />} /> */}


            <Link to="/login">
               {/* Tạm thời route login, mốt route lại logout handler z đó */}

            <Button
              // type="ghost" // set type to "ghost"
              size={"large"}
              icon={<UploadOutlined style={{ fontSize: "200%" }} />}
              style={{
                color: "#1890ff",
                backgroundColor: "#fff",
                borderColor: "1px solid #ccc",
                boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
                rotate: "90deg",
                padding: 0,
                // fontSize: 20,
                // display: "inline-block",
                // textAlign: "center",
                // margin: 0,
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
              {/* {children} */}
              <RouterPaths />
            </div>
          </Content>
          {/* <Footer style={footerStyle}>{footerContent}</Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default PageLayout;
