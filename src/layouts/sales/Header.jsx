import React from "react";
import { Layout as AntLayout, Button, Menu, Dropdown, Space, Input, Typography } from "antd";
import { BellOutlined, MailOutlined, SunOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from 'next/image';

const { Text } = Typography;
const { Header: AntHeader } = AntLayout;

const Header = ({ heading, status, func }) => {
  console.log("func", func);

  const items = [
    {
      key: "1",
      label: (
        <Link href="/">
          Logout
        </Link>
      ),
    },
  ];

  const items2 = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Notification 1
        </a>
      ),
    },
    {
      key: "2",
      danger: true,
      label: "Notification 2",
    },
  ];

  return (
    <AntHeader
      style={{
        padding: "0px",
        background: "#e9ecef",
        height: "40px",
        top: 0,
        width: "100vw",
        color: "black",
        position: "fixed",
        zIndex: 1,
        right: "-15px",
        left: 0,
      }}
    >
      {!status && ( // Render only if status is false
        <div
          className="header-logo"
          style={{ position: "absolute", left: "50px", bottom: "-10px" }}
        >
          <Text style={{ color: "black", fontSize: "16px", fontWeight: 600 }}>GIGANTIC</Text>
        </div>
      )}

      <Input
        placeholder="input search text"
        enterButton
        style={{ width: 200, position: "relative", bottom: 12, left: '65%', color: "black" }}
        suffix={<SearchOutlined style={{ color: 'black' }} />}
      />

      <div className="header-icons">
        <div
          style={{
            position: "absolute",
            bottom: -12,
            fontSize: "16px",
            left: "89.0%",
          }}
        >
          <Dropdown
            menu={{
              items: items2,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <BellOutlined style={{ color: "black" }} />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: "16px",
            bottom: -12,
            left: "88%",
            transform: "translateX(-70%)",
          }}
        >
          <MailOutlined style={{ color: "black" }} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -12,
            left: "84.6%",
            transform: "translateX(-85%)",
            fontSize: "16px",
          }}
        >
          <Link href="/layout/setting">
            <SettingOutlined style={{ color: "black" }} />
          </Link>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -12,
            left: "86.3%",
            transform: "translateX(-85%)",
            fontSize: "16px",
          }}
        >
          <SunOutlined style={{ color: "black" }} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -21,
            left: "93.5%",
            transform: "translateX(-85%)",
          }}
        >
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="Profile Picture"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <Button
        onClick={func}
        type="text"
        icon={status ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 30,
          height: 30,
          position: "absolute",
          top: 2,
          left: status ? 26 : 200,
          color: "black",
        }}
      />
    </AntHeader>
  );
};

export default Header;
