'use client';
import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Tooltip, Input, Button, message, Form, Card, Space, Modal } from 'antd';
import { createRole, getRoles } from '../../../api/roleService'; // Adjust the import path as necessary
import axios from 'axios';
import API_BASE_URL from '../../../../../config/config';
const RoleTable = ({onSuccess}) => {
  const [permissionsData, setPermissionsData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [checkedIds, setCheckedIds] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hrms/permission`);
      if (!response.data.error) {
        const transformedData = response.data.data.map((item, index) => ({
          key: index.toString(),
          access: item.access,
          permissions: item.permissionIds.map((id, i) => ({
            permissionId: id,
            name: item.names[i],
            description: item.descriptions[i],
            resource: item.resources[i],
          })),
        }));
        console.log('transformedData', transformedData)
        setPermissionsData(transformedData);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      console.log(response.data.data)
      setRolesData(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCheckedIds((prevIds) =>
      checked ? [...prevIds, value] : prevIds.filter((id) => id !== value)
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
      setRoleName('');
      setCheckedIds([]);
      form.resetFields();
      onSuccess();
      fetchRoles();

    } catch (error) {
      console.error('Error adding role:', error);
      message.error('Failed to add role');
    }
  };

  const handleViewClick = (permission) => {
    setSelectedPermission(permission);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPermission(null);
  };

  const permissionColumns = [
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
      sorter: (a, b) => a.access.localeCompare(b.access),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Permissions',
      key: 'permissions',
      render: (text, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {record.permissions.map((permission) => (
            <Tooltip key={permission.permissionId} title={permission.description}>
              <Checkbox
                value={permission.permissionId}
                onChange={handleCheckboxChange}
                style={{ marginBottom: '8px' }}
              >
                {permission.name}
              </Checkbox>
              <Button
                type="link"
                onClick={() => handleViewClick(permission)}
                style={{ paddingLeft: '0' }}
              >
                View
              </Button>
            </Tooltip>
          ))}
        </div>
      ),
    },
  ];

  const roleColumns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Permission Name',
      key: 'permissionName',
      render: (text, record) => (
        <div>
          {record.permissions.map(permission => permission.name).join(', ')}
        </div>
      ),
    },    
    {
      title: 'Access List',
      key: 'accessList',
      render: (text, record) => {
        // Use a Set to keep track of unique permissions
        const uniquePermissions = new Set();
    
        // Filter out duplicates
        const filteredPermissions = record.permissions.filter(permission => {
          if (uniquePermissions.has(permission.access)) {
            return false;
          } else {
            uniquePermissions.add(permission.access);
            return true;
          }
        });
    
        return (
          <div>
            {filteredPermissions.map((permission, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <strong>{permission.access}</strong>
              </div>
            ))}
          </div>
        );
      },
    }
    
  ];
  

  return (
 
      <div >
        <Card
          title="Permissions"
          style={{ marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <Table
            columns={permissionColumns}
            dataSource={permissionsData}
            pagination={{ pageSize: 10 }}
            bordered
          />
        </Card>
        <Card
          title="Add New Role"
          style={{ marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <Form form={form} layout="inline">
            <Form.Item label="Role Name" style={{ marginBottom: '16px' }}>
              <Input
                placeholder="Enter role name"
                value={roleName}
                onChange={handleRoleChange}
                style={{ width: '300px', marginRight: '8px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleAddRole} style={{ width: '120px' }}>
                Add Role
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {/* <Card title="Existing Roles" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Table
            columns={roleColumns}
            dataSource={rolesData}
            pagination={{ pageSize: 10 }}
            bordered
          />
        </Card> */}

        <Modal
          title="Permission Details"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedPermission && (
            <div>
              <p>
                <strong>Name:</strong> {selectedPermission.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedPermission.description}
              </p>
              <p>
                <strong>Resource:</strong> {selectedPermission.resource}
              </p>
            </div>
          )}
        </Modal>
      </div>

  );
};

export default RoleTable;
