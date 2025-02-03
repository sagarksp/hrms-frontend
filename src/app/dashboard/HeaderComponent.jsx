'use client'; // This ensures the component is treated as a client component

import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ backgroundColor: '#a78a7f', padding: '0 20px', color: '#fff', textAlign: 'center', position: 'fixed', right: '10px',width: '100%', zIndex: 1 }}>
      <h1 style={{ margin: 0 }}>Dashboard Header</h1>
    </Header>
  );
};

export default HeaderComponent;
