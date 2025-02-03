"use client";
import React, { useState } from 'react';
import Layout from '@/layouts/web/Layout';
import { Tabs } from 'antd';
import PermissionsTable from './view-permission/page';
import RoleTable from './view-role/page';
import DepartmentForm from './view-department/page';
import UserForm from './view-employee/page';
import Node from './employee-view/page';
import UserTable from './add-employee/page';

const { TabPane } = Tabs;

const Page = () => {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "1":
        return <UserTable/>;
      case "2":
        return<DepartmentForm /> ;
      case "3":
        return <RoleTable /> ;
      case "4":
        return <PermissionsTable />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Employee" key="1">
            {activeTab === "1" && renderContent()}
          </TabPane>
          <TabPane tab="Department" key="2">
            {activeTab === "2" && renderContent()}
          </TabPane>
          <TabPane tab="Role" key="3">
            {activeTab === "3" && renderContent()}
          </TabPane>
          <TabPane tab="Permission" key="4">
            {activeTab === "4" && renderContent()}
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Page;
