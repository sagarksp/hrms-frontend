'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, message, Card, Row, Col, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Layout from '@/layouts/web/Layout';

const { Title } = Typography;

const PermissionsTable = () => {
  const [permissions, setPermissions] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5001/hrms/permission', values);
      message.success('Permission Created Successfully');
      form.resetFields();
      fetchPermissions(); // Refresh the permissions list
    } catch (error) {
      message.error('Failed to create permission');
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/hrms/permission');
      const { permissionIds, names, descriptions, resources, access } = response.data.data[0];
      
      const formattedPermissions = permissionIds.map((id, index) => ({
        _id: id,
        name: names[index],
        description: descriptions[index],
        resources: resources[index],
        access: access
      }));

      setPermissions(formattedPermissions);
    } catch (error) {
      message.error('Failed to fetch permissions');
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Route Resources',
      dataIndex: 'resources',
      key: 'resources',
    },
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
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
                  name="description"
                  label={<span>Description <Tooltip title="Enter a brief description of the permission"><QuestionCircleOutlined style={{ marginLeft: 8 }} /></Tooltip></span>}
                >
                  <Input.TextArea placeholder="Enter description" rows={4} />
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
        <Card title={<Title level={3}>Permissions List</Title>} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Table 
            dataSource={permissions} 
            columns={columns} 
            rowKey="_id"
            pagination={{ pageSize: 10 }} // Adjust the pagination size as needed
            bordered
          />
        </Card>
      </div>
    </Layout>
  );
};

export default PermissionsTable;
