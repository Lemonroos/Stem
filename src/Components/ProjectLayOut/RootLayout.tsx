import { Button, Layout, Menu, MenuProps, Typography } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
const { Title } = Typography;

export default function RootLayout() {
  const { Header, Footer } = Layout;
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="/">
          Homepage
        </Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link to="/news">
          News
        </Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link to="/programs">
          Programs
        </Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link to="/about-us">
          About Us
        </Link>
      ),
      key: 'alipay',
    },
  ];
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5%' }}>
        <Title level={2} style={{ color: 'white' }}>STEM's Homepage</Title>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Link to="/login">
          <Button type="primary" size="large">
            Login
          </Button>
        </Link>
      </Header>

      <Outlet />

      <Footer style={{ textAlign: 'center' }}>
        STEM Program ©{new Date().getFullYear()} All Rights Reserved
      </Footer>
    </>
  );
};
