import React ,{useState}from 'react';
import {  Card, Button, Tabs, Avatar, Row, Col, Modal, Form, DatePicker, Input } from 'antd';
import { EditOutlined, LogoutOutlined, PrinterOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
const { TabPane } = Tabs;

const UserProfile = () => {
    const [resignModalVisible, setResignModalVisible] = useState(false);

    const showResignModal = () => {
        setResignModalVisible(true);
    };

    const handleCancel = () => {
        setResignModalVisible(false);
    };

    const handleResign = () => {
        // Handle resign logic (e.g., submit form data)
        // For demo purposes, you can console log the values
        console.log("Resign Date, Resign Reason, Reason Details:", values);
        setResignModalVisible(false);
    };
    return (
 
   <Layout>
            <div style={{ padding: '50px' }}>
                <Row justify="center">
                    <Col span={16}>
                        <Card>
                            <Row justify="space-between" align="middle">
                                <Col span={18}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            size={100}
                                            src="https://via.placeholder.com/100"
                                            style={{ marginRight: '20px' }}
                                        />
                                        <div>
                                            <h2 style={{ margin: 0 }}>Ashu Sagar</h2>
                                            <p style={{ margin: 0 }}>Designation Three - Department Three</p>
                                            <p style={{ margin: 0 }}>ashusagar@gmail.com</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        icon={<LogoutOutlined />}
                                        style={{ marginRight: '10px' }}
                                        onClick={showResignModal}
                                    >
                                        Resign
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card style={{ marginTop: '20px' }}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="General Info" key="1">
                                    <h4>Basic Info</h4>
                                    <p>First Name: Ashu</p>
                                    <p>Last Name: Sagar</p>
                                    <p>Employee ID: HWIBRO023</p>
                                    <p>Email: ashusagar@gmail.com</p>
                                </TabPane>
                                {/* Other Tab Panes */}
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                title="Resignation Details"
                visible={resignModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleResign}>
                        Resign
                    </Button>,
                ]}
            >
                <Form onFinish={handleResign}>
                    <Form.Item
                        name="resignDate"
                        label="Resign Date"
                        rules={[{ required: true, message: 'Please select resign date!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="resignReason"
                        label="Resign Reason"
                        rules={[{ required: true, message: 'Please input resign reason!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="reasonDetails"
                        label="Reason Details"
                        rules={[{ required: true, message: 'Please input reason details!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
    
            </Layout>
    );
};

export default UserProfile;