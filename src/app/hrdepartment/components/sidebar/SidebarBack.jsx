'use client'
import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { UploadOutlined, ShopOutlined,FormOutlined, ShoppingCartOutlined,ReconciliationOutlined, ThunderboltOutlined,TagOutlined, UserOutlined, DashboardOutlined,MoneyCollectOutlined,StockOutlined  } from "@ant-design/icons";
import Link from "next/link";// Assuming you are using React Router
// import './slidebar.css'



const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ status , func}) => {
   const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  console.log("props", status);
  return (
    <>
       <Layout style={{   padding: "auto", paddingBottom: '30px' }}>
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
          // onClick={func} // Toggle collapsed state on click

        //  width={150} // final width
        // collapsedWidth={72}  // initial width
       
        >
          <div className="demo-logo-vertical" />
          <Menu
  theme={{
    token: {
      // Seed Token
      // colorPrimary: '#00b96b',
      // borderRadius: 2,
      // Alias Token
       colorBgContainer: '#f6ffed'  //     a78a7f,
    },
  }}
  mode="inline"
  defaultSelectedKeys={["1"]}
  style={{ background: "#00000", height: "100%", color: "white" }} // Changed text color to white
  className="menu"
>
  {/* <Menu.Item key="3" icon={<DashboardOutlined />}>
    <Link href="/hrdepartment/hrdashboard" style={{ textDecoration: "none" , color: "white"}}>Dashboard</Link>
  </Menu.Item> */}

<Menu.Item key="3" icon={<DashboardOutlined />}>
    <Link href="/hrdepartment/staffregistration" style={{ textDecoration: "none" , color: "white"}}>Staffregistration</Link>
  </Menu.Item>

     <Menu.Item key="11" icon={<UserOutlined />}>
      <Link href="/employee/dashboard" style={{color: "white"}}>Employee Dashboard</Link>
    </Menu.Item>

  {/* <SubMenu key="sub11" icon={<MoneyCollectOutlined />} title="HR Department"> */}

    <Menu.Item key="11" icon={<FormOutlined />}>
      <Link href="/hrdepartment/staffview" style={{color: "white"}}>Staff Registration</Link>
    </Menu.Item>

    <Menu.Item key="11" icon={<FormOutlined />}>
      <Link href="/hrdepartment/staffedit" style={{color: "white"}}>Staff Edit</Link>
    </Menu.Item>

      {/* <SubMenu key="sub1" icon={<ShopOutlined />} title="Masters"> */}

    <Menu.Item key="12" icon={<ShopOutlined />}>
      <Link href="/hrdepartment/createdepartment" style={{color: "white"}}>Department Master</Link>
    </Menu.Item>

    {/* <Menu.Item key="13" icon={<ShopOutlined />}>
      <Link href="/hrdepartment/createlocation" style={{color: "white"}}>Location Master</Link>
    </Menu.Item> */}

    <Menu.Item key="14" icon={<ShopOutlined />}>
      <Link href="/hrdepartment/createshift" style={{color: "white"}}>Shift Timing Master</Link>
    </Menu.Item>

    {/* </SubMenu> */}

    <Menu.Item key="2-sub11" icon={<ShoppingCartOutlined />}>
      <Link href="/hrdepartment/inventory" style={{color: "white"}}>HR Inventory</Link>
    </Menu.Item>

    {/* <Menu.Item key="4-sub11" icon={<UserOutlined />}>
      <Link href="/hrdepartment/resigned" style={{color: "white"}}>Resigned Employees</Link>
    </Menu.Item> */}

  {/* </SubMenu> */}
  
</Menu>
        </Sider>
      </Layout>

    </>
  );
};

export default Sidebar;
