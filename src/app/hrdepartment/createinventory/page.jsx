'use client'
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import Layout from '../components/layout/Layout';
import { fetchResources, addResource, deleteResource } from '../../api/hrms/resources';
const { Column } = Table;

const HRDashboard = () => {
  const [resources, setResources] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await fetchResources();
      setResources(data);
    } catch (error) {
      message.error('Error fetching resources');
    }
  };

  const handleAddResource = async (values) => {
    try {
      await addResource(values);
      loadResources(); // Refresh resource list after adding
      message.success('Resource added successfully');
      setVisible(false); // Close modal after successful addition
    } catch (error) {
      message.error('Error adding resource');
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await deleteResource(id);
      loadResources();
      message.success('Resource deleted successfully');
    } catch (error) {
      message.error('Error deleting resource');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '30px' }}>
        <Button type="primary" onClick={() => setVisible(true)}>Add Resource</Button>
        <Modal
          title="Add Resource"
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAddResource}>
            <Form.Item name="name" label="Resource Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form>
        </Modal>
        <Table dataSource={resources}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button danger onClick={() => handleDeleteResource(record._id)}>Delete</Button>
            )}
          />
        </Table>
      </div>
    </Layout>
  );
};

export default HRDashboard;
