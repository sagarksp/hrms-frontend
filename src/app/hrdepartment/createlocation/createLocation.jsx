// components/LocationForm.js

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select, Table, Popconfirm } from 'antd';
import Layout from '../components/layout/Layout';
import axios from 'axios';

const { Option } = Select;

const LocationForm = () => {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://api.gtel.in/hrms/locations'); // Adjust URL as per your backend route
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.gtel.in/hrms/locations/submit', values); // Adjust URL as per your backend route
            console.log('Location added:', response.data);
            message.success('Location added successfully!');
            fetchLocations(); // Fetch locations again after adding a new one
            form.resetFields(); // Clear the form input fields
        } catch (error) {
            console.error('Error adding location:', error);
            message.error('Failed to add location');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (locationId) => {
        try {
            await axios.delete(`https://api.gtel.in/hrms/locations/${locationId}`); // Adjust URL as per your backend route
            message.success('Location deleted successfully!');
            fetchLocations(); // Fetch locations again after deletion
        } catch (error) {
            console.error('Error deleting location:', error);
            message.error('Failed to delete location');
        }
    };

    const columns = [
        {
            title: 'Location Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete this location?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" danger>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Layout>
            <div style={{ padding: "30px" }}>
                <Form
                    form={form}
                    layout="inline"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="Location Name"
                        rules={[
                            { required: true, message: 'Please enter the location name' },
                        ]}
                    >
                        <Input placeholder="Enter location name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add Location
                        </Button>
                    </Form.Item>
                </Form>

                <Table
                    dataSource={locations}
                    columns={columns}
                    rowKey="_id"
                    style={{ marginTop: 20 }}
                />
            </div>
        </Layout>
    );
};

export default LocationForm;
