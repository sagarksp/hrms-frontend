import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../../../../config/config';
const { Option } = Select;

const EditPermission = ({ permission, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('permission',permission); // Check the structure and values of permission
    if (permission) {
      form.setFieldsValue({
        name: permission.name,
        description: permission.description,
        resources: permission.resources,
        access: permission.access,
        menuName: permission.menuName, // Set initial value for menuName
      });
    }
  }, [permission, form]);
  

  const handleEditPermission = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/hrms/permission/${permission._id}`, values);
      message.success('Permission updated successfully');
      onSuccess();
    } catch (error) {
      message.error('Failed to update permission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleEditPermission}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the permission name!' }]}
      >
        <Input placeholder="Enter permission name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the permission description!' }]}
      >
        <Input.TextArea placeholder="Enter permission description" />
      </Form.Item>

      <Form.Item
        name="resources"
        label="Route Resources"
        rules={[{ required: true, message: 'Please input the route resources!' }]}
      >
        <Input placeholder="Enter route resources" />
      </Form.Item>

      <Form.Item
        name="access"
        label="Access"
        rules={[{ required: true, message: 'Please select the access level!' }]}
      >
        <Select placeholder="Select access level">
          <Option value="read">Read</Option>
          <Option value="write">Write</Option>
          <Option value="update">Update</Option>
          <Option value="delete">Delete</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="menuName"
        label="Menu Name"
      >
        <Input placeholder="Enter menu name" />
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditPermission;
