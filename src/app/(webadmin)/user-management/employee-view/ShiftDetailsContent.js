import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Form, Select, Radio, Spin } from "antd";
import axios from "axios";

const { Option } = Select;

const ShiftDetailsContent = () => {
  const [shiftNames, setShiftNames] = useState([]); // State to store shift names
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [weekOff, setWeekOff] = useState("Sunday"); // Default week off set to Sunday

  useEffect(() => {
    setLoading(true); // Start loading
    setError(null); // Reset errors
    axios
      .get("/api/shiftName") // Use the relative URL, which will be proxied via next.config.js
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          console.log("API Response Data:", response.data);
          setShiftNames(response.data); // Set shift names if data is valid
        } else {
          setError("Invalid response from server");
        }
      })
      .catch((error) => {
        console.error("Error fetching shift names:", error);
        setError("Failed to fetch shift names. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []);

  const handleWeekOffChange = (e) => {
    setWeekOff(e.target.value);
    console.log("Selected Week Off:", e.target.value);
  };

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
                Shift Timing
              </Typography.Title>
            }
            bordered={false}
            style={{ marginBottom: "16px" }}
          >
            <Form.Item
              label="Shift Time"
              name="shiftTime"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: "Shift Name is required!" }]} // Validation rule
            >
              {loading ? (
                <Spin tip="Loading shifts..." />
              ) : error ? (
                <Typography.Text type="danger">{error}</Typography.Text>
              ) : (
                <Select defaultValue="Select a shift" style={{ width: "100%" }}>
                  {shiftNames.length > 0 ? (
                    shiftNames.map((shift) => (
                      <Option key={shift._id} value={shift.shiftName}>
                        {shift.shiftName}
                      </Option>
                    ))
                  ) : (
                    <Option value="no-data">No shifts available</Option>
                  )}
                </Select>
              )}
            </Form.Item>
          </Card>
        </Col>


        <Col span={12}>
          <Card title="Week Off" style={{ maxWidth: 600, margin: "0 auto" }}>
            <Form.Item
              name="weaklyOff"
              label="Weakly Off"
              rules={[{ required: true, message: "Week Off is required!" }]} // Validation rule
            >
              <Radio.Group onChange={handleWeekOffChange} value={weekOff}>
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <Radio key={day} value={day}>
                    {day}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Card>
        </Col>
      </Row>

     
    </div>
  );
};

export default ShiftDetailsContent;
