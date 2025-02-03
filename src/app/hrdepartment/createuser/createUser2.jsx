import React from 'react';
import { Steps, Form, Input, Button } from 'antd';
import axios from 'axios';
const { Step } = Steps;
const { Item } = Form;

const YourFormComponent = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = () => {
    const formData = form.getFieldsValue(true); // Include values of all fields
    axios
      .post("https://api.gtel.in/hrms/employees", formData)
      .then((response) => {
        console.log("Employee created:", response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the employee!", error);
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <Steps current={currentStep}>
        <Step title="Step 1" />
        <Step title="Step 2" />
      </Steps>

      <Form
        form={form}
        name="multi-step-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        {currentStep === 0 && (
          <div>
            <Item
              label="Username"
              name="lastName"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Item>
            <Item>
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            </Item>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <Item
              label="Password"
              name="firstName"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Item>
            <Item>
              <Button type="primary" onClick={prevStep} style={{ marginRight: 10 }}>
                Previous
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Item>
          </div>
        )}
      </Form>
    </div>
  );
};

export default YourFormComponent;
