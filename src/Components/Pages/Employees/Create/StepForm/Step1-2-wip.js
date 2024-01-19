import React from 'react';
import { Form, Input, Radio, Select, DatePicker } from 'antd';

const Step1Form = ({ onChange, values }) => {
  const handleFormChange = (changedValues) => {
    onChange(changedValues);
  };

  return (
    <Form
      layout="vertical"
      onValuesChange={handleFormChange}
      initialValues={values}
    >
      <Form.Item
        label="Login Name"
        name="loginName"
        rules={[{ required: true, message: 'Please enter a login name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter an email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter a password' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

const Step2Form = ({ onChange, values }) => {
  const handleFormChange = (changedValues) => {
    onChange(changedValues);
  };

  return (
    <Form
      layout="vertical"
      onValuesChange={handleFormChange}
      initialValues={values}
    >
      <Form.Item label="Surname" name="surname">
        <Input />
      </Form.Item>
      <Form.Item label="First Name" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Country" name="country">
        <Select>
          {/* Add options for countries here */}
          <Select.Option value="vietnam">Vietnam</Select.Option>
          {/* ... */}
        </Select>
      </Form.Item>
      <Form.Item label="Phone Number" name="phoneNumber">
        <Input />
      </Form.Item>
      <Form.Item label="Birthdate" name="birthdate">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Department" name="department">
        <Select>
          {/* Add options for departments here */}
          <Select.Option value="finance">Finance</Select.Option>
          {/* ... */}
        </Select>
      </Form.Item>
      <Form.Item label="Government ID Number" name="governmentIdNumber">
        <Input />
      </Form.Item>
      <Form.Item label="Bank Account Name" name="bankAccountName">
        <Input />
      </Form.Item>
      <Form.Item label="Bank Account Number" name="bankAccountNumber">
        <Input />
      </Form.Item>
      <Form.Item label="Bank Name" name="bankName">
        <Input />
      </Form.Item>
    </Form>
  );
};

export { Step1Form, Step2Form };
