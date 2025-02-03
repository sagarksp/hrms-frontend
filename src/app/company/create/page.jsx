"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  notification,
  Form,
  Spin,
  Button,
  Row,
  Col,
  Select,
  Divider,
  Typography,
  Space,
  Radio,
  Tooltip,
} from "antd";
import { LoadingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Layout from "@/layouts/sales/Layout";

const { Title } = Typography;
const { Option } = Select;

const defaultBusiness = {
  business_name: "",
  legal_name: "",
  pan_number: "",
  date_of_registration: "",
  constitution_of_business: "",
  taxpayer_type: "",
  gstin_status: "",
  address: "",
  center_jurisdiction: "",
  state_jurisdiction: "",
  nature_bus_activities: [],
  nature_of_core_business_activity_description: "",
  aadhaar_validation: "",
  aadhaar_validation_date: "",
  einvoice_status: false,
  address_details: {
    street: "",
    city: "",
    state: "",
    postal_code: "",
    license: "",
  },
};

const BusinessSearch = () => {
  const [gstin, setGstin] = useState("");
  const [business, setBusiness] = useState(defaultBusiness);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [license, setLicense] = useState("");
  const [clientType, setClientType] = useState("");
  const [personName, setPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (gstin) {
      handleBlur();
    }
  }, [gstin]);

  const handleBlur = async () => {
    if (gstin) {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/hrms/business/${gstin}`
        );
        setBusiness(response.data);
      } catch (error) {
        notification.error({ message: "Business not found" });
        setBusiness(defaultBusiness);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    const businessData = {
      gstin,
      selectedCompany,
      clientType,
      personName,
      email,
      mobile,
      business,
      license, // Add this line
    };

    if (businessData) {
      setSubmitting(true);
      try {
        await axios.post(
          "http://localhost:5001/hrms/submit-business",
          businessData
        );
        notification.success({
          message: "Business data submitted successfully",
        });
        setBusiness(defaultBusiness);
        setGstin("");
        setSelectedCompany("");
        setClientType("");
        setPersonName("");
        setEmail("");
        setMobile("");
        setLicense(""); // Reset license
      } catch (error) {
        notification.error({ message: "Failed to submit business data" });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await fetch("http://localhost:8000/hrms/company");
      const result = await response.json();
      if (response.ok) {
        setCompanies(result);
      } else {
        console.error("Error fetching company data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleClientTypeChange = (e) => {
    setClientType(e.target.value);
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Company Registration Form
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="GSTIN"
                rules={[{ required: true, message: "Please enter GSTIN" }]}
              >
                <Input
                  placeholder="Enter GSTIN"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  onBlur={handleBlur}
                  disabled={loading || submitting}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Billing Ownership"
                tooltip="Select the billing ownership from the list"
              >
                <Select
                  value={selectedCompany}
                  onChange={setSelectedCompany}
                  placeholder="Select a company"
                  style={{ width: "100%" }}
                >
                  {companies.map((company) => (
                    <Option key={company.id} value={company.companyName}>
                      {company.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="clientType"
                label="Client Type"
                rules={[
                  { required: true, message: "Please select a client type!" },
                ]}
              >
                <Radio.Group
                  style={{ fontSize: "16px" }}
                  onChange={handleClientTypeChange}
                >
                  <Radio value="Corporate">Corporate</Radio>
                  <Radio value="Operator">Operator</Radio>
                  <Radio value="ISP">I.S.P</Radio>
                  <Radio value="Residential">Residential</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}></Row>
          {loading && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}

          {business && (
            <>
              <Divider orientation="left">Business Details</Divider>
              <br />
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Business Name">
                    <Input value={business.business_name} disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Legal Name">
                    <Input value={business.legal_name} disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Address">
                    <Input value={business.address} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="State">
                    <Input value={business.address_details.state} disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="PAN Number">
                    <Input value={business.pan_number} disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="license"
                    label={
                      <span>
                        ISP License No&nbsp;
                        <Tooltip title="Enter your ISP License Number if applicable">
                          <InfoCircleOutlined />
                        </Tooltip>
                      </span>
                    }
                    rules={[
                      {
                        required: clientType === "ISP",
                        message: "Please input ISP License No!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter ISP License No"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      disabled={clientType !== "ISP"}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <Form.Item
                label="Contact Person Name"
                name="personName"
                rules={[
                  {
                    required: true,
                    message: "Please input the contact person name!",
                  },
                ]}
              >
                <Input
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="First Person Name"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Invalid email address!" }]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Mobile Number"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input the mobile number!",
                  },
                ]}
              >
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Submit
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    setGstin("");
                    setBusiness(defaultBusiness);
                    setSelectedCompany("");
                    setClientType("");
                    setPersonName("");
                    setEmail("");
                    setMobile("");
                  }}
                  disabled={submitting}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default BusinessSearch;
