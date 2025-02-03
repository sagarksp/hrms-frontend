import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Select,
  Checkbox,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ShiftDetailsContent = ({
  shifts,
  enableTempSchedule,
  setEnableTempSchedule,
}) => {
  const shifts1 = [
    { _id: 1, fromTime: "2025-01-01T10:00:00", toTime: "2025-01-01T19:00:00" },
    { _id: 2, fromTime: "2025-01-01T10:00:00", toTime: "2025-01-01T20:00:00" },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <Row gutter={16}>
        {/* Permanent Schedule Card */}
        <Col span={12}>
          <Card
            title={
              <Typography.Title
                level={4}
                style={{ textAlign: "center", marginBottom: 0 }}
              >
                Permanent Scheduler
              </Typography.Title>
            }
            bordered={false}
            style={{ marginBottom: "16px" }}
          >
            <Form.Item
              label="Shift Name"
              name="shiftName"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select defaultValue="Select a shift" style={{ width: "100%" }}>
                <Option value="10:00am to 19:00pm">10:00am to 19:00pm</Option>
                <Option value="10:00am to 20:00pm">10:00am to 20:00pm</Option>
                <Option value="9:00am to 18:00pm">9:00am to 18:00pm</Option>
                <Option value="12:00pm to 21:00pm">12:00pm to 21:00pm</Option>
                <Option value="13:00pm to 22:00pm">13:00pm to 22:00pm</Option>
                <Option value="10:30am to 18:30pm">10:30am to 18:30pm</Option>
                <Option value="20:00PM to 8:00am">20:00PM to 8:00am</Option>
                <Option value="12:00pm to 20:00pm">12:00pm to 20:00pm</Option>
                <Option value="10:30am to 19:30pm">10:30am to 19:30pm</Option>
                <Option value="10:00am to 18:00pm">10:00am to 18:00pm</Option>
                <Option value="8:00am to 17:00pm">8:00am to 17:00pm</Option>
                <Option value="21:00pm to 8:00am">21:00pm to 8:00am</Option>
                <Option value="8:00am to 18:00pm">8:00am to 18:00pm</Option>
                <Option value="9:00am to 19:00pm">9:00am to 19:00pm</Option>
                <Option value="Flexible shift">Flexible shift</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Date Range"
              name="dateRange"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Card>
        </Col>

        {/* Temporary Schedule Card */}
        <Col span={12}>
          <Card
            title={
              <Typography.Title
                level={4}
                style={{ textAlign: "center", marginBottom: 0 }}
              >
                Temporary Scheduler
              </Typography.Title>
            }
            bordered={false}
            style={{ marginBottom: "16px" }}
          >
            <Row justify="space-between" align="middle">
              <Col span={16}>
                <Form.Item
                  label="Shift Name"
                  name="tempShiftName"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Select
                    defaultValue="Select a shift"
                    style={{ width: "100%" }}
                    disabled={!enableTempSchedule}
                  >
                    {shifts1.map((shift) => (
                      <Option key={shift._id} value={shift._id}>
                        {moment(shift.fromTime).format("HH:mm")} -{" "}
                        {moment(shift.toTime).format("HH:mm")}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Date Range"
                  name="tempDateRange"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  <RangePicker
                    style={{ width: "100%" }}
                    disabled={!enableTempSchedule}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Checkbox
                    onChange={(e) => setEnableTempSchedule(e.target.checked)}
                  >
                    Enable
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} justify="center">
        <Col span={12}>
          <Card
            title="Employee Enroll Mapping"
            style={{ maxWidth: 600, margin: "0 auto", marginBottom: "16px" }}
          >
            <Form.Item label="DELHI OFFICE" name="delhiOffice">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
            <Form.Item label="TDI LOCATION" name="tdiLocation">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
            <Form.Item label="Sonipat" name="sonipat">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
            <Form.Item label="OP Jindal" name="opJindal">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
            <Form.Item label="OMAX" name="omax">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
            <Form.Item label="Metro View" name="metroView">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
            <Form.Item label="GISPL" name="gispl">
              <Input placeholder="Device Enroll No" />
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Week Off" style={{ maxWidth: 600, margin: "0 auto" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Week days" />
              </Col>
              <Col span={12}>
                <Form.Item label="Half day" />
              </Col>
            </Row>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <Row gutter={16} key={day}>
                <Col span={12}>
                  <Form.Item name={day.toLowerCase()}>
                    <Checkbox>{day}</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={`${day.toLowerCase()}HalfDay`}
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShiftDetailsContent;
