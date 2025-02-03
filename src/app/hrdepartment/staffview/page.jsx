'use client'
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import Layout from '../components/layout/Layout';
import EmployeeWizard from '@/app/(webadmin)/user-management/employee-view/page';
import API_BASE_URL from '../../../../config/config';
// import IOSGallery from '../gallery/page';
import { useRouter } from "next/navigation";


const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [photos, setPhotos] = useState([]);

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
            uploadFileInfo: basicEmployee.uploadFileInfo,
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
    setIsModalVisible(false);
    fetchEmployees();
  };

  const columns = [
    { title: 'Employee Code', dataIndex: 'employeeCode', key: 'employeeCode' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Joining', dataIndex: 'dateOfJoining', key: 'dateOfJoining' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Documents',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal2(record)}>
          View
        </Button>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/hrdepartment/staffregistration");
  };


  const showModal2 = (record) => {
    setSelectedEmployee(record);

    // Prepare the photos array from the uploadFileInfo
    const photosArray = record.uploadFileInfo.map((file) => ({
      src: `${API_BASE_URL}/${file.path}`, // Adjust this based on your file storage location
      width: 4,
      height: 3,
    }));

    setPhotos(photosArray);
    setIsModalVisible2(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  return (
    <Layout>
      <div style={{ padding: 24 }}>
        <Card
          title="Staff View"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleNavigate}>
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
          footer={null}
        >
          <EmployeeWizard onSuccess={handleSuccess} />
        </Modal>

        <Modal
          title="Documents"
          visible={isModalVisible2}
          onCancel={handleCancel2}
          footer={null}
          width={1300}
        >
          {/* <IOSGallery photos={photos} /> */}
        </Modal>
      </div>
    </Layout>
  );
};

export default EmployeeTable;
