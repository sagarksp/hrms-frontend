'use client'
import React, { useEffect, useState } from 'react';
import { Form, Button, Checkbox, Input, Table, message } from 'antd';
import Layout from '@/layouts/sales/Layout';
import axios from 'axios';
import { createRole } from '../api/roleService'; // Import the createRole function

const CreateRolesPermission = () => {
  const [permissions, setPermissions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:5001/hrms/permission')
      .then(response => {
        if (!response.data.error) {
          setPermissions(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
      });
  }, []);

  const columns = [
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
    },
    {
      title: 'Add',
      dataIndex: 'add',
      key: 'add',
      render: (text, record) => (
        <Form.Item name={[record.permissionIds, 'add']} valuePropName="checked" noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <Form.Item name={[record.permissionIds, 'edit']} valuePropName="checked" noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (text, record) => (
        <Form.Item name={[record.permissionIds, 'view']} valuePropName="checked" noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <Form.Item name={[record.permissionIds, 'delete']} valuePropName="checked" noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
  ];

  const dataSource = permissions.map(permission => ({
    key: permission.access,
    access: permission.access,
    permissionIds: permission.permissionIds,
  }));

  const onFinish = async (values) => {
    try {
      // Prepare the role data
      const roleData = {
        name: values.role,
        permissions: permissions
          .filter(permission => values[permission.permissionIds]) // Filter out unchecked permissions
          .map(permission => permission._id) // Map to ObjectIds
      };
  
      // Call createRole API
      await createRole(roleData);
      message.success('Role created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating role:', error);
      message.error('Failed to create role. Please try again.');
    }
  };
  

  return (
    <Layout>
      <div style={{ padding: '24px' }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please enter a role name!' }]}>
            <Input placeholder="Enter role name" />
          </Form.Item>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create New Role
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateRolesPermission;
