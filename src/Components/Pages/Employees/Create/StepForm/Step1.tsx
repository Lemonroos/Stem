// Step1.js
import React from "react";
import { Form, Input, Row, Col, Radio, Select, DatePicker } from "antd";
import { CaretDownOutlined, FilterOutlined } from "@ant-design/icons";
const { Option } = Select;

const Step1 = ({ }) => (
  <>
    <Row>
      <Col span={24}>
        <Form.Item
          label="Tên đăng nhập"
          name="loginname"
          // rules={[{ required: true, message: "Please enter the name" }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập tên đăng nhập" />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
          label="Email"
          name="email"
          // rules={[{ required: true, message: "Please enter the email" }]}
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập email" />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
          label="Mật khẩu"
          name="password"
          className="custom-form-item"
          extra="Mật khẩu cần ít nhất  một ký tự đặc biệt, một chữ in hoa và một số"
        >
          <Input size="large" placeholder="Nhập mật khẩu" type="password" />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
          label="Xác nhận mật khẩu"
          name="passwordconfirm"
          className="custom-form-item"
        >
          <Input size="large" placeholder="Nhập lại mật khẩu" type="password" />
        </Form.Item>
      </Col>
    </Row>
  </>
);

export default Step1;
