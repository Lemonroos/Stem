

import React, { useState } from "react";
import { Steps, Form, Input, Button, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import PageLayout from "../../ProjectLayOut/PageLayout";
import Step1 from "./Create/StepForm/Step1";
import Step2 from "./Create/StepForm/Step2";
import employeesData from "../../data/employeesData";

const { Title, Text } = Typography;
const { Step } = Steps;

const steps = [
  {
    title: "Tạo tài khoản",
    content: <Step1 />,
    // content:'',
  },
  {
    title: "Thông tin cá nhân",
    content: <Step2 />,
    // content:'',
  },
];

const Create = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // const onFinish = (values) => {
  //   console.log(values);

  //   const newId = employeesData.length + 1;
  //   // Create a new employee object
  //   const newEmployee = {
  //     key: newId,
  //     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  //     id: newId,
  //     name: values.name,
  //     department: values.department,
  //     phone: values.phone,
  //     gender: values.gender,
  //     email: values.email,
  //     bank: values.bank,
  //     birthdate: values.birthdate,
  //     address: values.address,
  //     country: values.country,
  //     account: values.account,
  //     role: values.role,
  //   };

  //   // Push the new employee to the employeesData array
  //   employeesData.push(newEmployee);
  //   console.log(employeesData);
  // };

  return (
    <>
      <PageLayout
        headerContent={
          <>
            <Title level={3} style={{ color: "#000", marginTop: 0 }}>
              Danh Sách Nhân Viên
            </Title>
          </>
        }
        footerContent={<div>Home Page Footer</div>}
      >
        <Steps current={currentStep} style={{ marginBottom: "30px" }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>

        <Form
          form={form}
          //  onFinish={onFinish}
        >
          {steps[currentStep].content}
          <div className="space">
            <Button
              style={{ margin: "0 8px" }}
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Quay về
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button
                type="primary"
                // htmlType="submit"
              >
                <Link to="/employees">Hoàn thành</Link>
              </Button>
            ) : (
              <Button type="primary" onClick={nextStep}>
                Tiếp
              </Button>
            )}
          </div>
        </Form>
      </PageLayout>
    </>
  );
};

export default Create;
