// ApprovalMatrixContent.js
import React from 'react';
import { Row, Col, Form, InputNumber, Select, Radio, Checkbox } from 'antd';

const { Option } = Select;

// You can pass `checkboxOptions` as a prop or define it inside this component.
export const checkboxOptions = [
    "Appraisal",
    "Appraisal Ultimate",
    "Attendance Regularization",
    "Confirmation",
    "Daily Working Hours",
    "Earning Deduction",
    "Employee Details",
    "Employee In-Out Details",
    "Expense",
    "Face App",
    "IncomeTax Declaration",
    "IncomeTax Proof",
    "Increment",
    "Increment Scale",
    "Job Manager",
    "Leave",
    "Leave Encashment",
    "SelfService Loan",
    "On Duty",
    "OT Entry",
    "OT Entry Custom",
    "Payroll Loan",
    "Peer",
    "Project Management",
    "Selfservice Permission",
    "Selfservice Permission FromTo",
    "Selfservice Separation",
    "Selfservice TDS Entry",
    "Selfservice TDS Proof Entry",
    "Employee Separation",
    "Shift Schedule Entry",
    "Timesheet Entry",
    "Multi Transfer",
    "Travel",
  ];

const ApprovalMatrixContent = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Priority"
            name="priority"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Select Manager"
            name="selectManager"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <Select>
              <Option value="manager1">Manager 1</Option>
              <Option value="manager2">Manager 2</Option>
              {/* Add other manager options */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="View Only"
            name="viewOnly"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <Select>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Approval Must"
            name="approvalMust"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Approved Cancel Rights"
            name="approvedCancelRights"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            <Select>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {checkboxOptions.map((option, index) => (
          <Col span={6} key={index}>
            <Form.Item name={option} valuePropName="checked">
              <Checkbox>{option}</Checkbox>
            </Form.Item>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApprovalMatrixContent;
