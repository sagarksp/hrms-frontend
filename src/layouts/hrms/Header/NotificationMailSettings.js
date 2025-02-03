// components/NotificationMailSettings.js
import React from 'react';
import { Dropdown } from 'antd';
import { BellOutlined, MailOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons';
import Link from 'next/link';

const NotificationMailSettings = ({ notificationMenuItems }) => {
  return (
    <div
      className="header-icons"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      {/* Notification */}
      <Dropdown menu={{ items: notificationMenuItems }} trigger={['click']} placement="bottom">
        <BellOutlined
          style={{
            fontSize: '18px',
            color: 'black',
            cursor: 'pointer',
          }}
        />
      </Dropdown>

      {/* Mail */}
      <MailOutlined
        style={{
          fontSize: '18px',
          color: 'black',
          cursor: 'pointer',
        }}
      />

      {/* Settings */}
      <Link href="/layout/setting">
        <SettingOutlined
          style={{
            fontSize: '18px',
            color: 'black',
          }}
        />
      </Link>

      {/* Dark Mode */}
      <SunOutlined
        style={{
          fontSize: '18px',
          color: 'black',
        }}
      />
    </div>
  );
};

export default NotificationMailSettings;
