'use client';
import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Tooltip, Input, Button, message, Form, Card, Space } from 'antd';
import { createRole } from '../../api/roleService'; // Adjust the import path as necessary
import Layout from '@/layouts/web/Layout';
import axios from 'axios';

const PermissionTable = () => {
  const [data, setData] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [checkedIds, setCheckedIds] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:5001/hrms/permission')
      .then(response => {
        if (!response.data.error) {
          // Transform data to fit table structure
          const transformedData = response.data.data.map((item, index) => ({
            key: index.toString(),
            access: item.access,
            permissions: item.permissionIds.map((id, i) => ({
              permissionId: id,
              name: item.names[i],
              description: item.descriptions[i],
              resource: item.resources[i]
            }))
          }));
          setData(transformedData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCheckedIds(prevIds =>
      checked
        ? [...prevIds, value]
        : prevIds.filter(id => id !== value)
    );
  };

  const handleRoleChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleAddRole = async () => {
    if (!roleName.trim()) {
      message.warning('Role name cannot be empty');
      return;
    }
  
    try {
      await createRole({ name: roleName, permissions: checkedIds });
      message.success('Role added successfully');
      setRoleName(''); // Clear the input field
      setCheckedIds([]); // Clear the selected checkboxes
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error('Error adding role:', error);
      message.error('Failed to add role');
    }
  };
  
  const columns = [
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
      sorter: (a, b) => a.access.localeCompare(b.access),
      render: text => <strong>{text}</strong>
    },
    {
      title: 'Permissions',
      key: 'permissions',
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {record.permissions.map(permission => (
            <Tooltip key={permission.permissionId} title={permission.description}>
              <Checkbox
                value={permission.permissionId}
                onChange={handleCheckboxChange}
                style={{ marginBottom: '8px' }}
              >
                {permission.name}
              </Checkbox>
            </Tooltip>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <Card 
          title="Permissions" 
          style={{ marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={{ pageSize: 10 }} 
            bordered
          />
        </Card>
        <Card 
          title="Add New Role" 
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <Form form={form} layout="inline">
            <Form.Item
              label="Role Name"
              style={{ marginBottom: '16px' }}
            >
              <Input
                placeholder="Enter role name"
                value={roleName}
                onChange={handleRoleChange}
                style={{ width: '300px', marginRight: '8px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                onClick={handleAddRole}
                style={{ width: '120px' }}
              >
                Add Role
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default PermissionTable;
