import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../../../../../config/config';
const { Option } = Select;

const EditRole = ({ role, permissionsData, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        name: role.name,
        permissions: role.permissions.map(p => p._id),
      });
    }
  }, [role, form]);

  console.log('role',role)
  console.log('permissionsData',permissionsData)
  console.log(onSuccess)
  const handleEditRole = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/hrms/role/${role._id}`, values);
      message.success('Role updated successfully');
      onSuccess();
    } catch (error) {
      message.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleEditRole}
    >
      <Form.Item
        name="name"
        label="Role Name"
        rules={[{ required: true, message: 'Please input the role name!' }]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Form.Item
        name="permissions"
        label="Permissions"
        rules={[{ required: true, message: 'Please select the permissions!' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select permissions"
          style={{ width: '100%' }}
        >
          {permissionsData.map((item, index) =>
            item.permissions.map((permission) => (
              <Option key={permission.permissionId} value={permission.permissionId}>
                {permission.name} - {permission.resource} ({item.access})
              </Option>
            ))
          )}
        </Select>
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

export default EditRole;
