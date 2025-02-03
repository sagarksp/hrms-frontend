"use client"; // Add this line at the top of your file

import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Row,
  Col,
  Spin,
  Typography,
  Card,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"; // Import icons
import axios from "axios"; // Import axios
import { getRoles } from "../../../api/roleService"; // Adjust the path as needed
import { getDepartments } from "../../../api/departmentService"; // Adjust the path as needed
import Layout from "@/layouts/web/Layout";
import API_BASE_URL from "../../../../../config/config";
const { Option } = Select;
const { Title } = Typography;

const UserForm = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Add loading state

  // Fetch roles and departments for Select options
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await getRoles();
        console.log("roleleeeee", rolesResponse.data.data);
        setRoles(rolesResponse.data.data);

        const departmentsResponse = await getDepartments();
        console.log("departmentsResponse", departmentsResponse.data.data);
        setDepartments(departmentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
        notification.error({ message: "Failed to fetch data" });
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true); // Show loading spinner on submit
      // Replace with your API call for creating a user
      const response = await axios.post(
        `${API_BASE_URL}/hrms/signup`,
        values
      );
      console.log(response);
      notification.success({ message: "User created successfully" });
      form.resetFields();
    } catch (error) {
      console.error("Error creating user:", error); // Log any errors
      notification.error({ message: "Failed to create user" });
    } finally {
      setLoading(false); // Hide loading spinner after submission
    }
  };

  return (
 
      <div style={{ padding: "40px 20px", margin: "auto" }}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#1890ff",
          }}
        >
          Create User
        </Title>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" /> {/* Show loading spinner */}
          </div>
        ) : (
          <Card
            bordered={false}
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ margin: "auto" }}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your name"
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Invalid email!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                    />
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
                    rules={[
                      { required: true, message: "Please select your role!" },
                    ]}
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
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ width: "100%", height: "40px", fontSize: "16px" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
              {/* </Row> */}
            </Form>
          </Card>
        )}
      </div>

  );
};

export default UserForm;
