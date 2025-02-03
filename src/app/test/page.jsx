'use client';
import React, { useState, useEffect } from 'react';
import { Select, Form, Input } from 'antd';

const { Option } = Select;

const DispensaryFetcher = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://api.gtel.in/hrms/location');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocations(data.locations);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = async (value) => {
    setLoading(true);

    try {
      const response = await fetch(`https://api.gtel.in/hrms/dispensary/${value}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      form.setFieldsValue({ dispensaryName: data.disp.name }); // Update the dispensary name field
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      form.setFieldsValue({ dispensaryName: '' }); // Clear the dispensary name if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form} // Attach the form instance
      layout="vertical"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Form.Item
        name="location"
        label="Select Location"
        rules={[{ required: true, message: 'Please select a location!' }]}
      >
        <Select
          placeholder="Select a location"
          onChange={handleLocationChange}
          loading={loading}
        >
          {locations.map(location => (
            <Option key={location._id} value={location._id}>
              {location.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="dispensaryName"
        label="Dispensary Name"
      >
        <Input
          placeholder="Dispensary Name"
          readOnly
        />
      </Form.Item>
    </Form>
  );
};

export default DispensaryFetcher;
