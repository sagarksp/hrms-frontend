import React, { useState, useEffect } from 'react';
import { Input, Button, Layout, Typography, message } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styles from './MessagingSystem.module.css';
import Image from 'next/image';
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const MessagingSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/hrms/auth/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        // message.error('Failed to load users.');
        // console.error('There was an error fetching the users!', error);
      });
  }, []);

  const toggleMessagingSystem = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.messagingSystem}>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        className={styles.messageIcon}
        onClick={toggleMessagingSystem}
      />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={styles.messagingInterface}
        >
          <Layout className={styles.layout}>
            <Header className={styles.header}>
              <Text style={{ color: 'black' }}>Chat to Employees</Text>
            </Header>
            <Content className={styles.messages}>
              {users.map(user => (
                <div key={user.id} className={styles.message}>
                  <Image
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className={styles.avatar}
                    width={50}
                    height={50}
                  />
                  <div className={styles.messageContent}>
                    <p><strong>{user.name}</strong></p>
                    <p>{user.message}</p>
                  </div>
                </div>
              ))}
            </Content>
            <Footer className={styles.inputArea}>
              <Input placeholder="Type a message" className={styles.input} />
              <Button type="primary" shape="round">
                Send
              </Button>
            </Footer>
          </Layout>
        </motion.div>
      )}
    </div>
  );
};

export default MessagingSystem;
