'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Received values: ', values);

    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      alert('Password reset successfully!');
    }, 2000);
  };

  const validatePassword = (_, value) => {
    if (value && value.length < 6) {
      return Promise.reject(new Error('Password must be at least 6 characters long!'));
    }
    return Promise.resolve();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
  
      <Card
        style={{ maxWidth: 400, width: '100%', padding: '2rem', borderRadius: '10px' }}
        bordered={false}
        hoverable
      >
        <Title level={2} style={{ textAlign: 'center' }}>Reset Password</Title>
        <Form
          form={form}
          layout="vertical"
          name="reset_password"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { validator: validatePassword },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block shape="round">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
