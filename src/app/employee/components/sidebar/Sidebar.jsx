'use client'
import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { DashboardOutlined,HomeOutlined,UserOutlined,SettingOutlined } from "@ant-design/icons";
import Link from "next/link"; // Assuming you are using React Router
// import './slidebar.css'

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ status, func, noc }) => {
  console.log("noc",noc)
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
 // const icons = [<HomeOutlined />, <UserOutlined />, <SettingOutlined />];
  // console.log("props", status);
  return (
    <>
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
                // Seed Token
                // colorPrimary: '#00b96b',
                // borderRadius: 2,
                // Alias Token
                colorBgContainer: "#f6ffed", //     a78a7f,
              },
            }}
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ background: "#a3cef1", height: "100%", color: "black" }} // Changed text color to white
            className="menu"
          >
            <Menu.Item key="3" icon={<DashboardOutlined />}>
              <Link
                href="/employee/dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                Dashboard
              </Link>
            </Menu.Item>
            {/* {accessData.map((item, index) => (
          <Menu.Item key={index} icon={icons[index % icons.length]}>
           
              <Link href={item.resources}>{item.menuName}</Link>
         
          </Menu.Item>
        ))} */}
          </Menu>
        </Sider>
      </Layout>
    </>
  );
};

export default Sidebar;
