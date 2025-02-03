'use client'
import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  AreaChartOutlined,
  UserAddOutlined,
  FormOutlined,
  VideoCameraOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
  TagOutlined,
  UserOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  StockOutlined,
} from "@ant-design/icons";
import Link from "next/link"; // Assuming you are using Next.js

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ status, func }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Layout style={{ padding: "auto", paddingBottom: "30px" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={!isHovered && status} // Collapsed if not hovered and status is true
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          height: "100%",
          zIndex: 555,
          top: 40,
        }}
        onMouseEnter={func}
        onMouseLeave={func}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme={{
            token: {
              colorBgContainer: "#f6ffed",
            },
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "#e9ecef", height: "100%", color: "black" }} // Changed text color to black
          className="menu"
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link href="/hrdepartment/dashboard" style={{ textDecoration: "none", color: "black" }}>Dashboard</Link>
          </Menu.Item>
         
          <SubMenu key="8" icon={<UserAddOutlined />} title="Lead Management">
            <Menu.Item key="8-1" icon={<UserAddOutlined />}>
              <Link href="/salesdepartment/leadmanagement" style={{ color: "black" }}>Leads List</Link>
            </Menu.Item>
           
          </SubMenu>
          <SubMenu key="sub1" icon={<FormOutlined />} title="New Order">
            <Menu.Item key="2-1" icon={<FormOutlined />}>
              <Link href="/hrdepartment/neworderprocess" style={{ color: "black" }}>New Order Process</Link>
            </Menu.Item>
            <Menu.Item key="2-2" icon={<FormOutlined />}>
              <Link href="/hrdepartment/vieworderprocess" style={{ color: "black" }}>View Order Process</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<AreaChartOutlined />}>
            <Link href="/hrdepartment/taskscheduling" style={{ textDecoration: "none", color: "black" }}>Task Scheduling</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ReconciliationOutlined />}>
            <Link href="/hrdepartment/orderstatus" style={{ textDecoration: "none", color: "black" }}>Order Status</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ThunderboltOutlined />}>
            <Link href="/hrdepartment/feasibilitycheck" style={{ textDecoration: "none", color: "black" }}>Feasibility Check</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<TagOutlined />}>
            <Link href="/hrdepartment/quotationgeneration" style={{ textDecoration: "none", color: "black" }}>Quotation Generation</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UserOutlined />}>
            <Link href="/hrdepartment/kyccompliance" style={{ textDecoration: "none", color: "black" }}>KYC Compliance</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
