import React from "react";
import { Modal, Form, Row, Col, Input, DatePicker, Select } from "antd";
// import AntButton from "@/app/hrdepartment/common/Button";
import AntButton from "../../../app/hrdepartment/common/Button";

const { Option } = Select;

const LeaveModal = ({ visible, onCancel, onSubmit, form, employeeName }) => {
  return (
    <Modal
      title="Leave"
      open={visible} // Updated from `visible` to `open`
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Employee Name"
              name="employeeName"
              initialValue={employeeName?.firstName + " " + employeeName?.lastName}
              // rules={[{ required: true, message: "Employee Name is required" }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="From Date to To Date"
              name="dateRange"
              rules={[{ required: true, message: "Date range is required" }]}
            >
              <DatePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Type of Leave"
              name="leaveType"
              rules={[{ required: true, message: "Leave type is required" }]}
            >
              <Select>
                <Option value="vacation">Vacation</Option>
                <Option value="sick">Sick</Option>
                <Option value="personal">Personal</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Vacation Address"
              name="vacationAddress"
              rules={[
                { required: true, message: "Vacation address is required" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Contact Number"
              name="contactNumber"
              rules={[{ required: true, message: "Contact number is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="1st Level Contact"
              name="firstLevelContact"
              rules={[
                { required: true, message: "First level contact is required" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <AntButton type="default" onClick={onCancel}>
              Cancel
            </AntButton>
            <AntButton type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              Submit
            </AntButton>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default LeaveModal;
