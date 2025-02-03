import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AreaChartOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  DashboardOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
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
          style={{ background: "#ccdad1", height: "100%", color: "black" }} // Changed text color to black
          className="menu"
        >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link
                href="/webadmin/add-dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                Dashboard
              </Link>
            </Menu.Item>
          {/* <SubMenu key="sub-1" icon={<ShopOutlined />} title="User Management"> */}
          
            <Menu.Item key="2" icon={<ShopOutlined />}>
              <Link
                href="/user-management"
                style={{ textDecoration: "none", color: "black" }}
              >
                User Management
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="3" icon={<AreaChartOutlined />}>
              <Link
                href="/webadmin/add-roles"
                style={{ textDecoration: "none", color: "black" }}
              >
                Roles Master
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ReconciliationOutlined />}>
              <Link
                href="/webadmin/add-department"
                style={{ textDecoration: "none", color: "black" }}
              >
                Department Master
              </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              <Link
                href="/webadmin/add-employee"
                style={{ textDecoration: "none", color: "black" }}
              >
                Employee Master
              </Link>
            </Menu.Item> */}
          {/* </SubMenu> */}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
