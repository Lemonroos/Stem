import React, { useState } from 'react';
import { Steps, Button,Typography } from 'antd';
import Step1 from './StepForm/Step1';
import Step2 from './StepForm/Step2';
import createEmployee from './CreateHandler';
import PageLayout from '../../../ProjectLayOut/PageLayout';

const { Step } = Steps;

const StepForm = ({ employeeData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [newEmployee, setNewEmployee] = useState({
    loginName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    surname: '',
    firstName: '',
    gender: '',
    country: '',
    phoneNumber: '',
    dob: null,
    address: '',
    department: '',
    governmentIdNumber: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankName: ''
  });
  const { Title, Text } = Typography;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewEmployee((prevState) => ({ ...prevState, dob: date }));
  };

  const handleSelectChange = (value) => {
    setNewEmployee((prevState) => ({ ...prevState, department: value }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    createEmployee(employeeData, newEmployee);
  };

  return (
    <PageLayout
    headerContent={
      <>
        <Title level={3} style={{ color: "#000", marginTop: 0 }}>
          Thêm nhân viên
        </Title>
      </>
    }
    footerContent={<div>Home Page Footer</div>}
  >
    <>
      <Steps current={currentStep}>
        <Step title="Login Information" />
        <Step title="Personal Information" />
      </Steps>
      <div>
        {currentStep === 0 && (
          <Step1
            newEmployee={newEmployee}
            handleInputChange={handleInputChange}
          />
        )}
        {currentStep === 1 && (
          <Step2
            newEmployee={newEmployee}
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange}
            handleSelectChange={handleSelectChange}
          />
        )}
      </div>
      <div>
        <Button onClick={handlePrev} disabled={currentStep === 0}>
          Return
        </Button>
        {currentStep === 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </>
    </PageLayout>
  );
};

export default StepForm;
