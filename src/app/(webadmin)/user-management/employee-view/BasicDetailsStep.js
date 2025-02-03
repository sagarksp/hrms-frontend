
import React from "react";
import {Row,Col,Form,Input,Select,Tooltip,DatePicker,Upload,Button,Modal} from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const BasicDetailsStep = ({
  employeeData,
  selectedEmployeeCode,
  handleEmployeeChange,
  locationss,
  handleLocationChange,
  loading,
  dispname,
  area,
  isModalVisible,
  handleOk,
  handleCancel,
  form2,
  onLocationFinish,
  handleFileChange,
  fileList,
}) => {
  return (
    <div>
      {/* Row 1 */}
      <Row gutter={16}>
        <Col span={12}>

          {/* <Form.Item
            label="Company Name"
            name="employeeCode"
            rules={[{ required: true, message: "Please select Employee Code" }]}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                style={{ flex: 1 }}
                showSearch
                placeholder="Select an employee"
                onChange={handleEmployeeChange}
                value={selectedEmployeeCode}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                notFoundContent="Employee not found"
              >
                {employeeData.map((emp) => (
                  <Option key={emp.companyName} value={emp.companyName}>
                    {emp.companyName}  
                  </Option>
                ))}
              </Select>
              <Tooltip
                placement="right"
                title="Employee Code Imports From ESSL DB. Run reports -> Recalculate."
              >
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </div>
          </Form.Item> */}


          <Form.Item
            label="Company Name"
            name="employeeCode"
            rules={[
              { required: true, message: "Please select Company Name" },
            ]}
          >
            <Select
              onChange={handleEmployeeChange}
              value={selectedEmployeeCode}
            >
            {employeeData.map((emp) => (
                  <Option key={emp.companyName} value={emp.companyName}>
                    {emp.companyName} 
                  </Option>
                ))}
            </Select>
          </Form.Item>

        </Col>

        
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter First Name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Middle Name" name="middleName">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 3 */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Essl Name"
            name="employeeName"
            rules={[{ required: true, message: "Please enter Employee Name" }]}
          >
            <Input placeholder="Employee Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Next Emp Code"
            name="nextEmployeeCode"
            rules={[{ required: true, message: "Please enter the Employee Code" }]}
          >
            <Input placeholder="Next EmpCode"  />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 4 */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select Gender" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select Category" }]}
          >
            <Select>
              <Option value="Vendor">General</Option>
              <Option value="Higher">Higher</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Row 5 */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[{ required: true, message: "Please select Date of Birth" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          
        </Col>
        <Col span={12}>
          <Form.Item
            label="Date of Joining"
            name="dateOfJoining"
            rules={[{ required: true, message: "Please select Date of Joining" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 6 */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Select ESI Location"
            rules={[{ required: true, message: "Please select a location!" }]}
          >
            <Select
              placeholder="Select a location"
              onChange={handleLocationChange}
              loading={loading}
            >
              {locationss.map((location) => (
                <Option key={location._id} value={location._id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="dispensaryName" label="Dispensary Name">
            <Select placeholder="Select a Dispensary">
              {dispname.map((disp) => (
                <Option key={disp._id} value={disp._id}>
                  {disp.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Row 7 */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Biometric Machine Location"
            name="biometricMachineLocation"
          >
            <Select>
              <Option value="" disabled>
                Select a Location
              </Option>
              {area.map((area) => (
                <Option key={area._id} value={area._id}>
                  {area.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Prof.Tax Location" name="profTaxLocation">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 8 */}
      <Row gutter={16}>
        <Col span={12}>

          <Form.Item
            label="Metro/Non-Metro (TDS)"
            name="metroOrNonMetro"
            rules={[
              { required: true, message: "Please select Metro or Non-Metro" },
            ]}
          >
            <Select>
              <Option value="Metro">Metro</Option>
              <Option value="Non-Metro">Non-Metro</Option>
            </Select>
          </Form.Item>

        </Col>
        <Col span={12}>

            {/* upload 
          <Form.Item label="Upload Photo:" name="avatar">
            <Upload
              fileList={fileList.files}
              onChange={(info) => handleFileChange("joining", info)}
              beforeUpload={() => false}
              // multiple
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Select Joining Doc</Button>
            </Upload>
          </Form.Item> */}



        </Col>
      </Row>

      {/* Modal */}
      <Modal
        title="Add New Location"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form2} layout="inline" onFinish={onLocationFinish}>
          <Form.Item
            name="name"
            label="Location Name"
            rules={[{ required: true, message: "Please enter the location name" }]}
          >
            <Input placeholder="Enter location name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Location
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BasicDetailsStep;
