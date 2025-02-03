'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Tooltip, Typography, message, Card, Select } from 'antd';
import { getDepartments } from '@/app/api/departmentService';
import { QuestionCircleOutlined } from '@ant-design/icons';
import API_BASE_URL from '../../../../../config/config';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const PermissionsCreate = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        console.log(response.data.data)
        setDepartments(response.data.data); // Assuming response.data contains an array of department objects
      } catch (error) {
        console.error('Failed to fetch departments:', error);
        message.error('Failed to load departments');
      }
    };

    fetchDepartments();
  }, []);

  const onFinish = async (values) => {
    try {
      // Send POST request to create permission
      const response = await axios.post(`${API_BASE_URL}/hrms/permission`, values);
      console.log('Response:', response); // Log the response for debugging
      message.success('Permission Created Successfully');
      form.resetFields();
      onSuccess(); // Call onSuccess after creation
    } catch (error) {
      // Log the actual error message
      console.error('Error:', error.response ? error.response.data : error.message);
      message.error('Failed to create permission');
    }
  };

  return (
    <div>
      <Card title={<Title level={4}>Create Permission</Title>} style={{ marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label={<span>Permission Name <Tooltip title="Enter the name of the permission"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
                rules={[{ required: true, message: 'Please input the permission name!' }]}
              >
                <Input placeholder="Enter permission name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="access"
                label={<span>Access <Tooltip title="Specify the access level (e.g., read, write, admin)"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
              >
                <Input placeholder="Enter access level" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="resources"
                label={<span>Route Resources <Tooltip title="Enter the route resources this permission applies to"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
                rules={[{ required: true, message: 'Please input the resources!' }]}
              >
                <Input placeholder="Enter route resources" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="menuName"
                label={<span>Menu Name <Tooltip title="Enter the name of the menu associated with this permission"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
              >
                <Input placeholder="Enter menu name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="description"
                label={<span>Description <Tooltip title="Enter a brief description of the permission"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
              >
                <Input.TextArea placeholder="Enter description" rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label={<span>Department <Tooltip title="Select the department associated with this permission"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
                rules={[{ required: true, message: 'Please select a department!' }]}
              >
                <Select placeholder="Select department">
                  {departments.map(department => (
                    <Option key={department._id} value={department.name}>
                      {department.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{ width: '100%' }} // Full-width button
            >
              Create Permission
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PermissionsCreate;
