import React from "react";
import { Row, Col, Form, Input, Select } from "antd";

const { Option } = Select;

const LoginDetailsContent = ({ departments, roles }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Username"
            name="username"
            // rules={[{ required: true, message: "Please enter Username" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter Password" }]}
          >
            <Input.Password name="password" placeholder="Enter your password..." />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter Username" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please enter Password" }]}
          >
            <Input.Password name="password" placeholder="Enter your password..." />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[
              {
                required: true,
                message: "Please select your department!",
              },
            ]}
          >
            <Select placeholder="Select a department">
              {departments.map((department) => (
                <Option key={department._id} value={department._id}>
                  {department.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="Select a role">
              {roles.map((role) => (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default LoginDetailsContent;
