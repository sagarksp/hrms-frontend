'use client'
import React, { useState } from "react";
import Image from 'next/image';
import { Form, Input, Button, message, Tooltip, Typography } from "antd";
import { LockOutlined, InfoCircleOutlined } from "@ant-design/icons";
import API_BASE_URL from "../../../../config/config";
import { motion } from "framer-motion";

const { Title } = Typography;

const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // Prepare the payload
    const payload = {
      currentPassword: values.currentPassword,
      password: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    try {
      // Make the API request
      const response = await fetch(`${API_BASE_URL}/hrms/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const result = await response.json();
      console.log("payload",payload)
console.log("result",result)
      if (response.ok) {
        message.success("Password changed successfully!");
        form.resetFields();
      } else {
        message.error(result.message || "Failed to change password. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateNewPassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long")
      );
    }
    return Promise.resolve();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{
          maxWidth: 400,
          width: '100%',
          padding: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
          backgroundColor: '#fff',
        }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <Image
            src="https://wibro.in/wp-content/uploads/2020/01/cropped-wibro.png"
            alt="Logo"
            width={200}
            height={40}
          />
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          <Title level={3}>Change Password</Title>
        </motion.div>

        <Form
          form={form}
          name="change_password"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: "Please enter your current password" }]}
            tooltip={{ title: "Enter your current password", icon: <InfoCircleOutlined /> }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Current Password"
              style={{ borderRadius: 5 }}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
              { validator: validateNewPassword },
            ]}
            hasFeedback
            tooltip={{ title: "Password must be at least 8 characters long", icon: <InfoCircleOutlined /> }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              style={{ borderRadius: 5 }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords that you entered do not match")
                  );
                },
              }),
            ]}
            tooltip={{ title: "Re-enter your new password to confirm", icon: <InfoCircleOutlined /> }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
              style={{ borderRadius: 5 }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block style={{ borderRadius: 5 }}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default ChangePasswordForm;
