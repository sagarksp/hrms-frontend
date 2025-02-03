import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link"; // Assuming you are using Next.js

const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarClient = ({ status, func }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
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
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ background: "#a78a7f", height: "100%", color: "white" }}
        className="menu"
      >
        <Menu.Item key="3" icon={<DashboardOutlined />}>
          <Link href="/hrdepartment/hrdashboard" style={{ textDecoration: "none", color: "white" }}>
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<FormOutlined />}>
          <Link href="/hrdepartment/staffview" style={{ color: "white" }}>
            Staff Registration
          </Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<ShopOutlined />} title="Masters">
          <Menu.Item key="12" icon={<ShopOutlined />}>
            <Link href="/hrdepartment/createdepartment" style={{ color: "white" }}>
              Department Master
            </Link>
          </Menu.Item>
          <Menu.Item key="13" icon={<ShopOutlined />}>
            <Link href="/hrdepartment/createlocation" style={{ color: "white" }}>
              Location Master
            </Link>
          </Menu.Item>
          <Menu.Item key="14" icon={<ShopOutlined />}>
            <Link href="/hrdepartment/createshift" style={{ color: "white" }}>
              Shift Timing Master
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="2-sub11" icon={<ShoppingCartOutlined />}>
          <Link href="/hrdepartment/inventory" style={{ color: "white" }}>
            HR Inventory
          </Link>
        </Menu.Item>
        <Menu.Item key="4-sub11" icon={<UserOutlined />}>
          <Link href="/hrdepartment/resigned" style={{ color: "white" }}>
            Resigned Employees
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarClient;
