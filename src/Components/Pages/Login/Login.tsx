import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setRememberMe(e.target.checked);
  };

  const google = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }

  return (
    <div
      style={{
        // backgroundImage: `url('/Shared/HRBg.gif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <video autoPlay muted loop id="myVideo" >
        <source src="/Shared/HRBg.mp4" type="video/mp4" />
      </video>

      
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        }}
      />



      <Card
        style={{
          width: 500,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
          backgroundColor: "rgba(50, 50, 50, 0.4)",
          border: "none",
          backdropFilter: "blur(4px)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <Title level={1} style={{ textAlign: "center", color: "#fff" }}>
          Welcome to STEM
        </Title>
        <Form>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  style={{ color: "#fff" }}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Form.Item>
                <Link to="/forgot-password" style={{ color: "#fff" }}>
                  Forgot password?
                </Link>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Link to="/student">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Log in
                  </Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ borderColor: "white", color: "#fff" }}>Or</Divider>

          <Row justify="center">
            <Col span={24}>
              <Button
                // type="ghost"
                icon={<Avatar size="small" src="/Shared/ggIcon.svg" />}
                style={{
                  width: "100%",
                  color: "black",
                  borderTopColor: "red",
                  borderRightColor: "blue",
                  borderBottomColor: "green",
                  borderLeftColor: "yellow",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={google}
              >
                Log in with Google
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
