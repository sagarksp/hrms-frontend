'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Typography, notification, Checkbox, Card, Spin, Row, Col } from 'antd';
import { createDepartment, getDepartments } from '../../api/departmentService';
import { getRoles } from '../../api/roleService';
import Layout from '@/layouts/web/Layout';

const { Title } = Typography;

const DepartmentForm = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchRoles();
  }, []);

  const fetchDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const response = await getDepartments();
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await getRoles();
      setRoles(response.data.data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const onFinish = async (values) => {
    setLoadingCreate(true);
    try {
      await createDepartment({ ...values, roles: selectedRoles });
      notification.success({
        message: 'Success',
        description: 'Department created successfully',
      });
      form.resetFields();
      fetchDepartments();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create department',
      });
    } finally {
      setLoadingCreate(false);
    }
  };

  const onCheckboxChange = (checkedValues) => {
    setSelectedRoles(checkedValues);
  };

  return (
    <Layout>
      <Card style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Create Department</Title>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Department Name"
                rules={[{ required: true, message: 'Please enter department name' }]}
              >
                <Input placeholder="Enter department name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="roles"
                label="Roles"
                rules={[{ required: true, message: 'Please select at least one role' }]}
              >
                <Checkbox.Group
                  options={roles.map(role => ({
                    label: role.name,
                    value: role._id,
                  }))}
                  onChange={onCheckboxChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loadingCreate} style={{ width: '100%' }}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginTop: '20px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <Title level={3}>Departments List</Title>
        {loadingDepartments ? (
          <Spin tip="Loading departments..." />
        ) : (
          <List
            bordered
            dataSource={departments}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text strong>ID: {item._id}</Typography.Text> - 
                <Typography.Text strong> Name: {item.name}</Typography.Text> - 
                Roles: {item.roles.map(roleId => {
                  const role = roles.find(r => r._id === roleId);
                  return role ? role.name : 'Unknown Role';
                }).join(', ')}
              </List.Item>
            )}
          />
        )}
      </Card>
    </Layout>
  );
};

export default DepartmentForm;
