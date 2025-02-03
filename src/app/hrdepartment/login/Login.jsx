import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, message, Tabs } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import Image from 'next/image';

const LoginType = "account";

const Login = () => {
  const [loginType, setLoginType] = useState("account");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://api.gtel.in/noceye/api/v1/users/login", {
        email: email,
        password: password,
      });
      console.log("response: ", response);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token)
        window.location.href = "/hrdepartment/hrdashboard";
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      //  backgroundColor: "#f0f2f5",
        padding: "20px"
      }}
    >
      <div style={{ display: "flex", width: "100%", maxWidth: "1000px", backgroundColor: "#fff", overflow: "hidden" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1712056290~exp=1712056890~hmac=80c1414be8073b0bee4e373c05ca9885f5e35a2f4e91f95c6d0d247ad9bfe6f2"
            alt="Gigantic Logo"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div style={{ flex: 1, padding: "40px" }}>
          <Form
            onFinish={handleLogin}
            initialValues={{ remember: true }}
            style={{ maxWidth: 300, margin: "0 auto" }}
          >
            <h1 style={{ color: '#e46f11' , textAlign: "center"}}>GIGANTIC</h1>
            <p style={{ textAlign: "center" }}>The world&apos;s largest code Broadband platform.</p>
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey)}
              style={{ marginBottom: "24px" }}
            >
              <Tabs.TabPane key={"account"} tab={"Account Password Login"} />
            </Tabs>
            {loginType === "account" && (
              <>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className={"prefixIcon"} />}
                    placeholder={"Username: admin or user"}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className={"prefixIcon"} />}
                    placeholder={"Password: admin@123"}
                    onChange={(e) => handleInputChange(e, "password")}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Form.Item name="autoLogin" valuePropName="checked" noStyle>
                <Checkbox>Auto login</Checkbox>
              </Form.Item>
              <a
                style={{
                  float: "right",
                }}
              >
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;