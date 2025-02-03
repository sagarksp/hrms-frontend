'use client'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card, Spin, Row, Col, notification, Typography } from 'antd';
import { createDepartment, getDepartments } from '../../../api/departmentService';
import { getRoles } from '../../../api/roleService';

const { Title } = Typography;

const DepartmentForm = ({ onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

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
      onSuccess(); // Call the success handler
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
    <Card style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
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
              // rules={[{ required: true, message: 'Please select at least one role' }]}
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
  );
};

export default DepartmentForm;
