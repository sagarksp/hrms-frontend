import React from 'react';
import { Row, Col, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const PersonalStepContent = ({ fileList, handleFileChange, ifscCode, handleIfscChange, bankDetails }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Personal Email Id" name="personalEmail">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Remarks" name="remarks">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Blood Group" name="bloodGroup">
            <Select>
              <Option value="O+">O+</Option>
              <Option value="A+">A+</Option>
              <Option value="B+">B+</Option>
              {/* Add other blood group options */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Address 1" name="address1">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Address 2" name="address2">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Place" name="place">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="PIN Code" name="pinCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Personal Mobile No" name="personalMobileNo">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Print Cheque" name="printCheque">
            <Select>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
              {/* Add other options */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Bank Account Number" name="bankAccountNumber">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="IFSC Code">
            <Input
              placeholder="Enter IFSC Code"
              value={ifscCode}
              onChange={handleIfscChange}
              maxLength={11}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Bank Name" name="bankName">
            <Input value={bankDetails.bankName} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Branch" name="branch">
            <Input placeholder="Branch Name" value={bankDetails.branchName} readOnly />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Bank Branch Code" name="bankBranchCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Correspondence Address1" name="correspondenceAddress1">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Correspondence Address2" name="correspondenceAddress2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Correspondence Place" name="correspondencePlace">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Correspondence City" name="correspondenceCity">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Correspondence Phone" name="correspondencePhone">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Correspondence Pin Code" name="correspondencePinCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Office Extension No." name="officeExtensionNo">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Office Mobile No." name="officeMobileNo">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Handicap" name="handicap">
            <Select>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
              {/* Add other options */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* <Row gutter={16}>
        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.pan}
              onChange={(info) => handleFileChange('pan', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select PAN</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.adhar}
              onChange={(info) => handleFileChange('adhar', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Aadhar</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.photo}
              onChange={(info) => handleFileChange('photo', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Photo</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.education}
              onChange={(info) => handleFileChange('education', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Education</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.voterid}
              onChange={(info) => handleFileChange('voterid', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Voterid</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.familycard}
              onChange={(info) => handleFileChange('familycard', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select FamilyCard</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Upload
              fileList={fileList.cancelcheque}
              onChange={(info) => handleFileChange('cancelcheque', info)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Cancel Cheque</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row> */}
    </div>
  );
};

export default PersonalStepContent;
