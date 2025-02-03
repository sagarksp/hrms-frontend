'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Typography, notification, Checkbox } from 'antd';
import { createRole, getRoles } from '../api/roleService';
import { getPermissions } from '../api/permissionService'; // Ensure this function exists

const { Title } = Typography;

const RoleForm = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data.data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await getPermissions();
      setPermissions(response.data.data);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      await createRole({ ...values, permissions: selectedPermissions });
      notification.success({
        message: 'Success',
        description: 'Role created successfully',
      });
      form.resetFields();
      setSelectedPermissions([]);
      fetchRoles();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create role',
      });
    }
  };

  const onCheckboxChange = (checkedValues) => {
    setSelectedPermissions(checkedValues);
  };

  return (
    <div>
      <Title level={2}>Create Role</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Role Name"
          rules={[{ required: true, message: 'Please enter role name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: 'Please select at least one permission' }]}
        >
          <Checkbox.Group
            options={permissions.map(permission => ({
              label: permission.name,
              value: permission._id,
            }))}
            onChange={onCheckboxChange}
            value={selectedPermissions}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>

      <Title level={3}>Roles List</Title>
      <List
        bordered
        dataSource={roles}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text strong>{item.name}</Typography.Text>
            : {item.permissions.map(p => p.name).join(', ')}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RoleForm;
