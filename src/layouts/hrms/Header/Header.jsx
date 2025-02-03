// components/Header.js
"use client";
import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Button, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../../../../config/config";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar";
import NotificationMailSettings from "./NotificationMailSettings";
import Profile from "./Profile";
import Link from "next/link";

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
          // console.log("depa@@@@@@@@@@@@@@@",department.roles.name);

          setUserData({
            email,
            department: department.name,
            role: role.name,
            firstName: basicemployees.firstName,
            lastName: basicemployees.lastName,
            employeeCode: basicemployees.employeeCode,
            profileImage:basicemployees?.profileImage,
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

  if (loading) return <div>Loading...</div>;

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
          <div className="header-logo"style={{ position: "absolute", left: "50px", bottom: "-11px" }}>
            <Text style={{ color: "black", fontSize: "16px", fontWeight: 600 }}>
            GIGANTIC
            </Text>
          </div>
        )}


              {/* text-Gigantic  */}
       {status && (
          <div className="header-logo"style={{ position: "absolute", left: "15px", bottom: "-11px" }}>
            <Text style={{ color: "black", fontSize: "16px", fontWeight: 600 }}>
             WIBRO
            </Text>
           </div>
        )}


        <div
            className="header-container"
            style={{display: "flex",alignItems: "center",justifyContent: "end",height: "100%",padding: "0 20px",gap:"20px" }}
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
          style={{fontSize: "16px",width: 30,height: 30,position: "absolute", top: 2, left: status ? 72 : 150, color: "black",
          }}
        />


      </AntHeader>
      </>
  );
};

export default Header;
 

