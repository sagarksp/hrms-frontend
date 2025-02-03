import React from 'react';
import { Row, Col, Card, Form, InputNumber } from 'antd';

const SalaryDetailsContent = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Earning Details">
            <Form.Item label="FIXED BASIC" name="fixedBasic">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="ARREAR BASIC" name="arrearBasic">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Earnings Total" name="earningsTotal">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Deduction Details">
            <Form.Item label="INCOME TAX" name="incomeTax">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Deductions Total" name="deductionsTotal">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalaryDetailsContent;
