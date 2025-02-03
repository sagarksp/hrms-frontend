'use client'
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import EmployeeWizard from '../employee-view/page'; // Import your EmployeeWizard component
import API_BASE_URL from '../../../../../config/config';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/hrms/employees`)
      .then(response => {
        const formattedData = response.data.map((user, index) => {
          const basicEmployee = user.basicemployees[0] || {};
          const employee = user.employees[0] || {};
          return {
            key: index,
            employeeCode: basicEmployee.employeeCode,
            firstName: basicEmployee.firstName,
            lastName: basicEmployee.lastName,
            department: user.department,
            designation: employee.designation,
            email: user.email,
            dateOfJoining: moment(basicEmployee.dateOfJoining).format('YYYY-MM-DD'),
            gender: basicEmployee.gender,
          };
        });
        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        message.error("There was an error fetching the data!");
        setLoading(false);
      });
  };

  const handleSuccess = () => {
    setIsModalVisible(false); // Close the modal
    fetchEmployees(); // Refresh the data
  };

  const columns = [
    { title: 'Employee Code', dataIndex: 'employeeCode', key: 'employeeCode' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    // { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Joining', dataIndex: 'dateOfJoining', key: 'dateOfJoining' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="Staff View"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Create Employee
          </Button>
        }
        style={{ marginBottom: 16 }}
      >
        <Table 
          columns={columns} 
          dataSource={data} 
          loading={loading} 
          pagination={{ pageSize: 10 }} 
          bordered 
          rowKey="key"
        />
      </Card>
      <Modal
        title="Create New Employee"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1300}
        footer={null} // No footer buttons needed since it's managed by EmployeeWizard
      >
        <EmployeeWizard onSuccess={handleSuccess} />  {/* Pass the handleSuccess callback */}
      </Modal>
    </div>
  );
};

export default EmployeeTable;
