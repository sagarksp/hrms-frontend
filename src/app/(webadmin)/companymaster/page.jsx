'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, List, Spin, Typography, Space, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CompanyMaster = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form] = Form.useForm();

  // Fetch companies from the backend
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://api.gtel.in/hrms/company/show');
      console.log(response.data.data)
      setCompanies(response.data.data);
      setFilteredCompanies(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle form submission to create or update a company
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      if (editingCompany) {
        await axios.patch(`http://localhost:8000/hrms/company/${editingCompany._id}`, values);
      } else {
        await axios.post('http://localhost:5000/hrms/company/create', values);
      }
      setEditingCompany(null);
      form.resetFields();
      fetchCompanies();
    } catch (error) {
      console.error('Error submitting company:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/hrms/company/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  // Handle edit
  const handleEdit = (company) => {
    setEditingCompany(company);
    form.setFieldsValue(company);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = companies.filter(company =>
      company.companyName.toLowerCase().includes(query) ||
      company.address.toLowerCase().includes(query) ||
      company.gstNumber.toLowerCase().includes(query) ||
      company.state.toLowerCase().includes(query) ||
      company.alias?.toLowerCase().includes(query)
    );

    setFilteredCompanies(filtered);
  };

  return (
      <div style={{ padding: '24px', paddingBottom: '40px' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>Company Master</Title>
          </Col>
          <Col>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ width: '300px' }}
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[{ required: true, message: 'Please input the company name!' }]}
              >
                <Input placeholder="Company Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please input the address!' }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gstNumber"
                label="GST Number"
                rules={[{ required: true, message: 'Please input the GST number!' }]}
              >
                <Input placeholder="GST Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: 'Please input the state!' }]}
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="alias"
                label="Alias"
                rules={[{ required: true, message: 'Please input the alias!' }]}
              >
                <Input placeholder="Alias" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item style={{paddingTop:"29px"}}>
                <Button type="primary" htmlType="submit">
                  {editingCompany ? 'Update Company' : 'Add Company'}
                </Button>
                {editingCompany && (
                  <Button
                    type="default"
                    onClick={() => {
                      setEditingCompany(null);
                      form.resetFields();
                    }}
                    style={{ marginLeft: '10px' }}
                  >
                    Cancel
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {loading ? (
          <Spin size="large" />
        ) : (
          <List
  bordered
  dataSource={filteredCompanies}
  renderItem={item => (
    <List.Item
      key={item._id} // Add the key here using a unique field like _id
      actions={[
        <Button key={`edit-${item._id}`} onClick={() => handleEdit(item)} type="link">Edit</Button>,
        <Button key={`delete-${item._id}`} onClick={() => handleDelete(item._id)} type="link" danger>
          Delete
        </Button>,
      ]}
      style={{ marginBottom: '8px' }}
    >
      <Space direction="vertical" size="small">
        <div><strong>Company Name:</strong> {item.companyName}</div>
        <div><strong>Address:</strong> {item.address}</div>
        <div><strong>GST Number:</strong> {item.gstNumber}</div>
        <div><strong>State:</strong> {item.state}</div>
        <div><strong>Alias:</strong> {item.alias}</div>
      </Space>
    </List.Item>
  )}
/>

        )}
      </div>
  );
};

export default CompanyMaster;
