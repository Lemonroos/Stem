import { Button, Layout, Menu, Typography } from 'antd';
import { SetStateAction, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export default function RootLayout() {
  const items = [
    { label: 'Homepage', key: 'homepage', path: '/' },
    { label: 'News', key: 'news', path: '/news' },
    { label: 'About Us', key: 'about-us', path: '/about-us' },
  ];
  const [current, setCurrent] = useState('homepage');

  const handleClick = (e: { key: SetStateAction<string>; }) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header style={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 50px', background: '#001529' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '0px' }}>STEM Homepage</Title>
        <Menu theme="dark" mode="horizontal" selectedKeys={[current]} onClick={handleClick}>
          {items.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Link to="/login">
          <Button type="primary" size="large" style={{ marginTop: '15px' }}>
            Login
          </Button>
        </Link>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center', position: 'fixed', display: 'flex', justifyContent: 'center', width: '100%', bottom: 0 }}>
        STEM Program ©{new Date().getFullYear()} All Rights Reserved
      </Footer>
    </Layout>
  );
};
