'use client'; // This ensures the component is treated as a client component

import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content style={{ margin: '24px 16px 0', overflow: 'initial', padding: 24, background: '#fff', marginTop: 64 }}>
      <div>Your content goes here</div>
    </Content>
  );
};

export default ContentComponent;
