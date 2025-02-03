'use client'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { updateDepartment } from '../../../api/departmentService';
import { getRoles } from '../../../api/roleService';

const { Option } = Select;

const EditDepartment = ({ department, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      form.setFieldsValue({
        name: department.name,
        roles: department.roles,
      });
    }
    fetchRoles();
  }, [department, form]);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data.data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await updateDepartment(department._id, values);
      message.success('Department updated successfully');
      onSuccess();
    } catch (error) {
      console.error('Failed to update department:', error);
      message.error('Failed to update department');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: department ? department.name : '',
        roles: department ? department.roles : [],
      }}
    >
      <Form.Item
        label="Department Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the department name' }]}
      >
        <Input placeholder="Enter department name" />
      </Form.Item>

      <Form.Item
        label="Roles"
        name="roles"
        rules={[{ required: true, message: 'Please select at least one role' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select roles"
          optionFilterProp="children"
        >
          {roles.map((role) => (
            <Option key={role._id} value={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Department
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditDepartment;
