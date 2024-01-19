import React from "react";
import { Layout, Space, Avatar, Typography, Button } from "antd";
import SideNav from "./LayoutMainComponents/SideNav";
import {
  UserOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { CSideHeader, CHeader, CSider, CContent } from "./PayLayoutStyle";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({ children, headerContent, footerContent }) => {
  return (
    <>
      <Layout style={{ height: "100vh", overflow: "initial" }}>
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
          {/* 300 */}
          <Header style={CHeader}>
            {headerContent}
            {/* <Button type="primary" size={"large"} icon={<LogoutOutlined />} /> */}
            <Link to="/">
            <Button
              type="ghost" // set type to "ghost"
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
                padding: "0 10% 0 10%",
              }}
            >
              {children}
            </div>
          </Content>
          {/* <Footer style={footerStyle}>{footerContent}</Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default PageLayout;
