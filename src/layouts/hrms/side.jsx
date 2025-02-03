'use client'
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;

const Side = ({ status, func, accessData }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log("NOC Data:", accessData);
  }, [accessData]);

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
        collapsed={!isHovered && status}
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          height: "100%",
          zIndex: 555,
          top: 40,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          style={{ background: "#a3cef1", height: "100%", color: "black" }}
          className="menu"
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link href="/employee/dashboard" style={{ textDecoration: "none", color: "black" }}>
              Dashboard
            </Link>
          </Menu.Item>
          {accessData && accessData.length > 0 && accessData.map((item) => (
            <Menu.Item key={item._id} style={{ padding: "10px", color: "black" }}>
              <p><strong>{item.menuName}</strong>: {item.resources}</p>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Side;
