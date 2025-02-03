'use client'
import React, { useState, useEffect } from 'react';
import { Table, Typography, Card, Spin, Button, Modal, Input, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { getDepartments, deleteDepartment } from '../../../api/departmentService';
import { getRoles } from '../../../api/roleService';
import DepartmentForm from '../add-department/page';
import EditDepartment from './EditDepartment'; // Ensure this import is correct

const { Title } = Typography;
const { Search } = Input;

const DepartmentTableView = () => {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      message.success('Department deleted successfully');
      fetchDepartments(); // Refresh the list after deletion
    } catch (error) {
      message.error('Failed to delete department');
    }
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roleIds) => {
        return roleIds.map(roleId => {
          const role = roles.find(r => r._id === roleId);
          return role ? role.name : 'Unknown Role';
        }).join(', ');
      },
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
              setSelectedDepartment(record);
              setIsEditing(true);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this department?"
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

  return (
    <div>
      <Card style={{ marginTop: '20px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>Departments List</Title>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Search
              placeholder="Search departments"
              onSearch={handleSearch}
              enterButton
              allowClear
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={fetchDepartments}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedDepartment(null);
                setIsEditing(false);
                setIsModalVisible(true);
              }}
            >
              Create Department
            </Button>
          </div>
        </div>
        {loadingDepartments || loadingRoles ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin tip="Loading departments..." />
          </div>
        ) : (
          <Table
            dataSource={filteredDepartments}
            columns={columns}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 10 }}
            style={{ marginTop: '20px' }}
            bordered
          />
        )}
      </Card>

      <Modal
        title={isEditing ? "Edit Department" : "Create Department"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {isEditing ? (
          <EditDepartment
            department={selectedDepartment}
            onSuccess={() => {
              setIsModalVisible(false);
              fetchDepartments(); // Refresh departments after editing
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        ) : (
          <DepartmentForm
            onSuccess={() => {
              setIsModalVisible(false);
              fetchDepartments(); // Refresh departments after creation
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default DepartmentTableView;
