'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Input, Modal, Spin, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import RoleTable from '../add-role/page'; // Adjust the import path as necessary
import EditRole from './EditRole'; // Import the EditRole component
import API_BASE_URL from '../../../../../config/config';
const { Search } = Input;

const CreateRole = () => {
  const [rolesData, setRolesData] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const fetchPermissions = async () => {
    setLoading(true);
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
        setPermissionsData(transformedData);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/hrms/role`);
      console.log('response.data.data', response.data.data);
      setRolesData(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/hrms/role/${roleId}`);
      message.success('Role deleted successfully');
      fetchRoles(); // Refresh the list after deletion
    } catch (error) {
      message.error('Failed to delete role');
    }
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const filteredRolesData = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColumns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
        const uniquePermissions = new Set();
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditRole(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => handleDeleteRole(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Existing Roles</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Search
                placeholder="Search roles"
                onSearch={handleSearch}
                enterButton
                allowClear
                style={{ width: 200 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedRole(null);
                  setIsEditing(false);
                  setIsModalVisible(true);
                }}
              >
                Add Role
              </Button>
            </div>
          </div>
        }
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        bordered={false}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin tip="Loading..." />
          </div>
        ) : (
          <Table
            columns={roleColumns}
            dataSource={filteredRolesData}
            pagination={{ pageSize: 10 }}
            bordered
          />
        )}
      </Card>

      <Modal
        title={isEditing ? "Edit Role" : "Create Role"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
          setIsEditing(false);
        }}
        width={800}
      >
        {isEditing ? (
          <EditRole
            role={selectedRole}
            permissionsData={permissionsData}
            onSuccess={() => {
              setIsModalVisible(false);
              fetchRoles(); // Refresh roles after editing
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        ) : (
          <RoleTable
            onSuccess={() => {
              setIsModalVisible(false);
              fetchRoles(); // Refresh roles after creation
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default CreateRole;
