'use client'
// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import API_BASE_URL from '../../../../config/config';
import axios from 'axios';


const { Title, Paragraph } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/hrms/forgot`, values);
      message.success('Password reset link sent successfully!');
    } catch (error) {
      message.error('Failed to send password reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Forgot Password</Title>
        <Paragraph style={{ textAlign: 'center' }}>Enter your email address and we&apos;ll send you a link to reset
        your password.</Paragraph>
        <Form
          name="forgot_password"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
