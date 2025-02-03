import React from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmploymentForm = ({ area, fileList, handleFileChange }) => (
  <div>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Father Name" name="fatherName">
          <Input />
        </Form.Item>
      </Col>

      {/* <Col span={12}>
        <Form.Item label="Department" name="department">
          <Select>
            <Option value="Hr Dep">Hr Dep</Option>
          </Select>
        </Form.Item>
      </Col> */}
      
      <Col span={12}>
        <Form.Item label="Designation" name="designation">
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Marital Status" name="maritalStatus">
          <Select>
            <Option value="Single">Single</Option>
            <Option value="Married">Married</Option>
            <Option value="Divorced">Divorced</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="ESIC Date of Joining" name="esicDateOfJoining">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Confirmation Period (Month)" name="confirmationPeriod">
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Confirmation Date" name="confirmationDate">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Date of Anniversary" name="dateOfAnniversary">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Retirement Age" name="retirementAge">
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Date of Retirement" name="dateOfRetirement">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="PF Account No." name="pfAccountNo">
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="ESI No." name="esiNo">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Grade" name="grade">
          <Select>
            <Option value="grade1">Grade 1</Option>
            <Option value="grade2">Grade 2</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="No. Of Children" name="noOfChildren">
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Cost Centre" name="costCentre">
          <Select>
            <Option value="costCentre1">Cost Centre 1</Option>
            <Option value="costCentre2">Cost Centre 2</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Location" name="location" initialValue="">
          <Select>
            <Option value="" disabled>Select a Location</Option>
            {area.map((area) => (
              <Option key={area._id} value={area._id}>
                {area.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="UAN NUMBER" name="uanNumber">
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="PAN/GIR No. (TDS)" name="panGirNo">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="EMP.PF (%)" name="empPf">
          <Input suffix="%" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Pension Fund (%)" name="pensionFund">
          <Input suffix="%" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Stop Payment" name="stopPayment">
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="PF Date Of Joining" name="pfDateOfJoining">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Termination Date" name="terminationDate">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Pay Mode" name="payMode">
          <Select>
            <Option value="Cash">Cash</Option>
            <Option value="Account Transfer">Account Transfer</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Senior Citizen" name="seniorCitizen">
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Payroll Process" name="payrollProcess">
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="ITAX Regime Type" name="itaxRegimeType">
          <Select>
            <Option value="New Regime">New Regime</Option>
            <Option value="Old Regime">Old Regime</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Reporting Manager" name="reportingManager">
          <Input />
        </Form.Item>
      </Col>
      <Col>

        {/* <Form.Item>
          <Upload
            fileList={fileList.emphistory}
            onChange={(info) => handleFileChange('emphistory', info)}
            beforeUpload={() => false} // Prevent auto-upload
            multiple
          >
            <Button icon={<UploadOutlined />}>Select Employment History</Button>
          </Upload>
        </Form.Item> */}

      </Col>
    </Row>
  </div>
);

export default EmploymentForm;
