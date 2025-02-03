'use client'
import React, {useState, useEffect} from "react";
import { Layout as AntLayout, Button, Dropdown, Space, Input, Typography, message } from "antd";
import { BellOutlined, MailOutlined, SunOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import API_BASE_URL from "../../../../../config/config";
const { Text } = Typography;
const { Header: AntHeader } = AntLayout;

const Header = ({ heading, status, func }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const CustomSpin = () => (
    // <div className={styless["custom-spin-container"]}>
      <Image
        src="https://www.gtel.in/wp-content/uploads/2019/07/logo.png"
        alt="Loading"
        width={100} // Set the width of the image
        height={100} // Set the height of the image
      />
    // </div>
  );

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });
      
      if (response.ok) {
        router.push('/'); // Redirect to login page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };




  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            const url = `${API_BASE_URL}/hrms/authdata`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include' // Include cookies with the request
            });
            console.log(response, "kdjdbjkfvhdlkfvhibuide")

            if (response.ok) {
                const result = await response.json();

                console.log("first header", result.data)
                setUserData(result.data); // Set data directly from API response
                setSelectedEmployee(result.data.name)
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('Something went wrong');
            console.error('Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchDashboardData();
}, []);

if (loading) return <CustomSpin size="large" />;

  const items = [
    {
      key: "1",
      label: (
        <Link href="/">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={handleLogout}>
          Logout
        </a>
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
        background: "#a3cef1",
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
          <MailOutlined />
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
          <SunOutlined />
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
