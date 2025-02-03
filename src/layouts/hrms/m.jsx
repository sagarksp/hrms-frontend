"use client";
import React, { useState, useEffect } from "react";
import {
  Layout as AntLayout,
  Button,
  Dropdown,
  Space,
  Input,
  Typography,
} from "antd";
import {
  BellOutlined,
  MailOutlined,
  SunOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../../../config/config";
import toast, { Toaster } from "react-hot-toast";

const { Text } = Typography;
const { Header: AntHeader } = AntLayout;

const Header = ({ heading, status, func }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logout Successfully");
        router.push("/"); // Redirect to login page
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Failed to log out", error);
    }
  };

  const handleChangePassword = () => {
    setTimeout(() => {
      router.push("/hrdepartment/change-password");
    }, 1000);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const url = `${API_BASE_URL}/hrms/authdata`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          const employeeData = result.data[0];
          const { email, department, basicemployees, role } = employeeData;
          setUserData({
            email,
            department: department.name,
            role: role.name,
            firstName: basicemployees.firstName,
            lastName: basicemployees.lastName,
            employeeCode: basicemployees.employeeCode,
            uploadFileInfo: basicemployees.uploadFileInfo[0]?.path || "",
          });
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Something went wrong");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const CustomSpin = () => (
    <Image
      src="https://www.gtel.in/wp-content/uploads/2019/07/logo.png"
      alt="Loading"
      width={100}
      height={100}
    />
  );

  if (loading) return <CustomSpin size="large" />;

  const profileMenuItems = [
    {
      key: "1",
      label: userData?.email || "No email available",
    },
    {
      key: "2",
      label: <Link href="/employee/profile">Profile</Link>,
    },
    {
      key: "3",
      label: <a onClick={handleChangePassword}>Change Password</a>,
    },
    {
      key: "4",
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];

  const notificationMenuItems = [
    {
      key: "1",
      label: "Notification 1",
    },
    {
      key: "2",
      danger: true,
      label: "Notification 2",
    },
  ];

  return (
    <>

      <Toaster/>
      <AntHeader
        style={{ padding: "0px", background: "#82dd97", height: "40px", top: 0, width: "100vw", 
          color: "black", position: "fixed",zIndex: 1,right: "-15px",left: 0,
        }}
      >

        {/* text-Gigantic  */}
        {!status && (
          <div className="header-logo"style={{ position: "absolute", left: "50px", bottom: "-10px" }}>
            <Text style={{ color: "black", fontSize: "16px", fontWeight: 600 }}>
              GIGANTIC
            </Text>
          </div>
        )}


        <div
            className="header-container"
            style={{display: "flex",alignItems: "center",justifyContent: "end",height: "100%",padding: "0 20px", }}
        >
            {/* Search Bar */}
            <SearchBar />

            {/* Notification, Mail, Settings, Dark Mode */}
            <NotificationMailSettings notificationMenuItems={notificationMenuItems} />

            {/* Profile */}
            <Profile userData={userData} profileMenuItems={profileMenuItems} />
        </div>

       

        {/* menu button */}
        <Button
          onClick={func}
          type="text"
          icon={status ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{fontSize: "16px",width: 30,height: 30,position: "absolute", top: 2, left: status ? 26 : 200, color: "black",
          }}
        />
      </AntHeader>
    </>
  );
};

export default Header;















// {
//   "dependencies": {
//     "autoprefixer": "^10.4.20",
//     "framer-motion": "^11.3.23",
//     "html5-qrcode": "^2.3.8",
//     "jsqr": "^1.4.0",
//     "lucide-react": "^0.469.0",
//     "moment": "^2.30.1",
 
//     "postcss": "^8.4.49",
//     "qrcode.react": "^3.1.0",
//     "react-apexcharts": "^1.4.1",
//     "react-calendar": "^5.0.0",
//     "react-highlight-words": "^0.20.0",
//     "react-hot-toast": "^2.4.1",
//     "react-webcam": "^7.2.0",
//     "socket.io-client": "^4.7.5",
//     "tailwindcss": "^3.4.16",
//     "react": "^18.0.0",
//     "react-dom": "^18.0.0",
//     "antd": "^5.0.0"
//   },
//   "devDependencies": {
//     "@types/node": "22.10.1",
//     "@types/react": "18.0.0",  
//     "eslint": "^8",
//     "eslint-config-next": "14.2.5"
//   }
// }
