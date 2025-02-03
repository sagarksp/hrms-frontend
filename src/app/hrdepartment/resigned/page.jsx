'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Input, Button, Space, Modal } from 'antd';
import Layout from '../components/layout/Layout';
import styles from "../hrdashboard/CustomSpin.module.css";
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('https://api.gtel.in/noceye/api/v1/attendance');
        const rawData = response.data.data;

        const resignedEmployees = rawData.filter(item => item.ResigStatus === 'Resigned');

        const uniqueResignedEmployees = [];
        const seenNames = new Set();

        resignedEmployees.forEach(item => {
          if (!seenNames.has(item.EmployeeName)) {
            seenNames.add(item.EmployeeName);
            uniqueResignedEmployees.push(item);
          }
        });

        setData(uniqueResignedEmployees);
      } catch (error) {
        setError('Failed to fetch attendance data');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const CustomSpin = () => (
    <div className={styles["custom-spin-container"]}>
      <Image
        src="https://www.gtel.in/wp-content/uploads/2019/07/logo.png"
        alt="Loading"
        className={`${styles["custom-spin-img"]} ${styles["pulse-animation"]}`}
        width={100}
        height={100}
      />
      <p>Loading...</p>
    </div>
  );

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const showModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'EmployeeName',
      key: 'EmployeeName',
      sorter: (a, b) => a.EmployeeName.localeCompare(b.EmployeeName),
      ...getColumnSearchProps('EmployeeName'),
      render: (text, record) => <a onClick={() => showModal(record)}>{text}</a>,
    },
    {
      title: 'Employee Code',
      dataIndex: 'EmployeeCode',
      key: 'EmployeeCode',
      sorter: (a, b) => a.EmployeeCode.localeCompare(b.EmployeeCode),
      ...getColumnSearchProps('EmployeeCode'),
      render: (text, record) => <a onClick={() => showModal(record)}>{text}</a>,
    },
   
    {
      title: 'Resigned Employees',
      dataIndex: 'ResigStatus',
      key: 'ResigStatus',
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin indicator={<CustomSpin />} spinning={loading}>
          {loading ? null : <CustomSpin />}
        </Spin>
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h3>Resigned Employees Data</h3>
        <Table columns={columns} dataSource={data} rowKey="id" />
        <Modal
          title="Employee Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedEmployee && (
            <div>
               <p><b>Employee Name:</b> {selectedEmployee.EmployeeName}</p>
              <p><b>Employee Code:</b> {selectedEmployee.EmployeeCode}</p>
              <p><b>Resigned Employees:</b> {selectedEmployee.ResigStatus}</p>
              {/* Add more employee details here */}
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}
