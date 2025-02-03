// StaffView.js

import React, { useState, useEffect } from "react";
import { FileAddOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Table, Button, Modal, Typography } from "antd";
const { Text } = Typography;
import axios from "axios";
import Layout from "../components/layout/Layout";
import Node from "./page";

const StaffView = ({ collaps }) => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/hrms/auth/users");
        console.log("staff view data", response.data.data); // Log all user values
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleEdit = (record) => {
    setModalData(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Employee Code", dataIndex: "employeeCode", key: "employeeCode" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Date of Joining", dataIndex: "dateOfJoining", key: "dateOfJoining" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Office Mobile No", dataIndex: "officeMobileNo", key: "officeMobileNo" },
    { title: "Place", dataIndex: "place", key: "place" },
    { title: "Pin Code", dataIndex: "pinCode", key: "pinCode" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "10px" }}>
        <Link href="/hrdepartment/createuser">
          <Button
            type="primary"
            style={{ position: "absolute", right: 13, zIndex: 111 }}
            icon={<FileAddOutlined />}
          >
            Add User
          </Button>
        </Link>
        <div style={{ padding: 20 }}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: "600",
              position: "fixed",
              top: -6,
              left: 240,
              zIndex: 11111,
              color: "white",
              fontSize: "16px",
              marginLeft: collaps ? -150 : 0,
            }}
          >
            <Text strong style={{ color: "white", fontSize: "16px" }}>
              STAFF REGISTRATION DATA:{" "}
            </Text>
          </h2>
          <div className="responsive-table-container">
            <Table dataSource={users} columns={columns} rowKey="_id" className="responsive-table" />
          </div>
        </div>
      </div>

      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={1400}
      >
        {modalData && <Node modaldata={modalData} />}
      </Modal>
    </Layout>
  );
};

export default StaffView;
