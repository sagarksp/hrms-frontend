'use client'; // This ensures the component is treated as a client component

import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ accessData }) => {
  // Define an array of icons
  const icons = [HomeOutlined, UserOutlined, SettingOutlined];

  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{ backgroundColor: '#a78a7f', height: '100vh', position: 'fixed', left: 0 }} // Full height and fixed position
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0, backgroundColor: '#a78a7f' }} // Ensure Menu inherits the same background color
      >
        {accessData.map((item, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <Menu.Item key={index} icon={<IconComponent key={`icon-${index}`} />}>
              <Link href={item.resources}>{item.menuName}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
