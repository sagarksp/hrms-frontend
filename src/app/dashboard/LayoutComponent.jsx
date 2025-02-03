'use client'; // This ensures the component is treated as a client component

import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import HeaderComponent from './HeaderComponent';
import ContentComponent from './ContentComponent';

const { Content } = Layout;

const LayoutComponent = ({ accessData }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout style={{ marginTop: 64 }}>
        <Sidebar accessData={accessData} />
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <ContentComponent />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
