import React, { useState, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import { DashboardOutlined, HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { checkPermission } from "@/utils/checkPermission";
import Link from "next/link";

const { Sider } = Layout;

const Sidebar = ({ status, func }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const permissions = await checkPermission();
      setMenuItems(permissions);
    };

    fetchPermissions();
  }, []);

  const icons = [
    <HomeOutlined key="home" />,
    <UserOutlined key="user" />,
    <SettingOutlined key="settings" />,
    <DashboardOutlined key="dashboard" />,
  ];

  // old
  // const menuItemsData = [
  //   {
  //     key: "dashboard",
  //     icon: <DashboardOutlined />,
  //     label: (
  //       <Link href="/employee/dashboard" style={{ textDecoration: "none", color: "white" }}>
  //         Dashboard
  //       </Link>
  //     ),
  //   },

  //   ...menuItems?.map((item, index) => ({
  //     key: item._id,
  //     icon: icons[index % icons.length],
  //     label: (
  //       <Link href={item.resources} style={{ textDecoration: "none", color: "white" }}>
  //         {item.menuName}
  //       </Link>
  //     ),
  //   })),


  // ];

 console.log("menuIteam->####################",menuItems)
  const menuItemsData = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: (
        <Link href="/employee/dashboard" style={{ textDecoration: "none", color: "white" }}>
          Dashboard
        </Link>
      ),
    },
    ...(menuItems && Array.isArray(menuItems)
      ? menuItems.map((item, index) => ({
          key: item._id,
          icon: icons[index % icons.length],
          label: (
            <Link href={item.resources} style={{ textDecoration: "none", color: "white" }}>
              {item.menuName}
            </Link>
          ),
        }))
      : []), // Provide an empty array as fallback if menuItems is undefined or not an array
  ];
  




  const { token } = theme.useToken(); // Use token for custom styling if necessary

  return (
    <Layout style={{ padding: "auto", paddingBottom: "30px" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={status}
        style={{ overflow: "auto", position: "fixed", left: 0, height: "100%", zIndex: 555, top: 40, }}
        width={150} // final width
        collapsedWidth={72}  // initial width
        // onClick={func} // Toggle collapsed state on click
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          style={{ background: "#82dd97", height: "100%", color: "black"}}
          items={menuItemsData} // Use 'items' instead of 'children'
        />

      </Sider>
    </Layout>
  );
};

export default Sidebar;
