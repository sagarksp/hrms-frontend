'use client';
import React, { useEffect, useState } from 'react';
import { Table, message, Card, Typography, Button, Popconfirm, Spin, Modal, Collapse } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PermissionsCreate from '../add-permission/page';
import EditPermission from './EditPermission';
import API_BASE_URL from '../../../../../config/config';
const { Title } = Typography;
const { Panel } = Collapse;

const PermissionsTable = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/hrms/permission`);
      const permissionsData = response.data.data;
      
      const formattedPermissions = permissionsData.flatMap(item => 
        item.permissionIds.map((id, index) => ({
          _id: id,
          name: item.names[index],
          description: item.descriptions[index],
          resources: item.resources[index],
          access: item.access,
          menuName: item.menuName[index],
          department: item.department[index]
        }))
      );

      setPermissions(formattedPermissions);
    } catch (error) {
      message.error('Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hrms/permission/${id}`);
      message.success('Permission deleted successfully');
      fetchPermissions(); // Refresh the list after deletion
    } catch (error) {
      message.error('Failed to delete permission');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => (a.description || '').localeCompare(b.description || ''),
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedPermission(record);
              setIsEditing(true);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this permission?"
            onConfirm={() => handleDelete(record._id)}
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

  // Group permissions by department
  const permissionsByDepartment = permissions.reduce((acc, permission) => {
    const department = permission.department || 'No Department';
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(permission);
    return acc;
  }, {});

  return (
    <div>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3}>Permissions List</Title>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={fetchPermissions}
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedPermission(null);
                  setIsEditing(false);
                  setIsModalVisible(true);
                }}
              >
                Add Permission
              </Button>
            </div>
          </div>
        }
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin tip="Loading..." />
          </div>
        ) : (
          <Collapse accordion>
            {Object.entries(permissionsByDepartment).map(([department, deptPermissions]) => (
              <Panel header={department} key={department}>
                <Table
                  dataSource={deptPermissions}
                  columns={columns}
                  rowKey="_id"
                  pagination={{ pageSize: 10 }}
                  bordered
                />
              </Panel>
            ))}
          </Collapse>
        )}
      </Card>

      <Modal
        title={isEditing ? "Edit Permission" : "Create Permission"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {isEditing ? (
          <EditPermission
            permission={selectedPermission}
            onSuccess={() => {
              setIsModalVisible(false);
              fetchPermissions(); // Refresh permissions after editing
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        ) : (
          <PermissionsCreate
            onSuccess={() => {
              setIsModalVisible(false);
              fetchPermissions(); // Refresh permissions after creation
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default PermissionsTable;
