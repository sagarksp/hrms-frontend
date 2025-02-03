"use client";
import React, { useState, useEffect } from "react";
import {
  Layout as AntLayout,
  Button,
  Menu,
  Dropdown,
  Space,
  Input,
  Typography,
  Modal,
  Select,
  message,
  Badge,
  Popover,
  Spin,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  BellOutlined,
  MailOutlined,
  SunOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
  SendOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode.react";
import io from "socket.io-client"; // Import Socket.IO client
import AntButton from "../../common/Button";
import API_BASE_URL from "../../../../../config/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SearchBar from "@/layouts/hrms/Header/SearchBar";
import NotificationMailSettings from "@/layouts/hrms/Header/NotificationMailSettings";
// import Profile from "@/layouts/hrms/Header/Profile";
import Profile from "./Profile";
const { Text } = Typography;
const { Header: AntHeader } = AntLayout;
const { Option } = Select;

const Header = ({ heading, status, func }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [selectedDepartment, setSelectedDepartment] =useState("SelectDepartment");
  const [messageType, setMessageType] = useState("SelectType");
  const [userData, setUserData] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]); // State to store leave requests
  const [resourceRequests, setResourceRequests] = useState([]); // State to store resource requests
  const [allNotificationsVisible, setAllNotificationsVisible] = useState(false); // Define allNotificationsVisible state
  const [qrValue, setQrValue] = useState("");
  const [loadingQr, setLoadingQr] = useState(false);


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
        router.push("/"); // Redirect to login page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleChangePassword = () => {
    setTimeout(() => {
      router.push("/hrdepartment/change-password");
    }, 1000);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchQRCodeValue = async () => {
      setLoadingQr(true);
      try {
        const response = await axios.get("https://api.gtel.in/wa1/hrms/qr");
        console.log(response.data.qr);
        setQrValue(response.data.qr); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error fetching QR code value:", error);
      } finally {
        setLoadingQr(false);
      }
    };

    fetchQRCodeValue();
  }, []);

  const sendMessage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: selectedDepartment,
          type: messageType,
          messageContent: messageInput,
        }),
      });
      const data = await response.json();
      setMessageInput("");
      setSelectedDepartment("");
      setMessageType("");
      setModalVisible(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleApprove = async (_id, type) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/hrms/${type}s/approve/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "approved" }), // Assuming status field is updated to 'approved'
        }
      );
      const data = await response.json();
      console.log("Approved request:", data);
      // Update state or perform other actions as needed
    } catch (err) {
      console.error("Error approving request:", err);
    }
  };

  const handleReject = async (_id, type) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/hrms/${type}s/reject/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }), // Assuming status field is updated to 'rejected'
        }
      );
      const data = await response.json();
      console.log("Rejected request:", data);
      // Update state or perform other actions as needed
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  useEffect(() => {
    // Fetch leave requests and resource requests when the component mounts
    const fetchRequests = async () => {
      try {
        const leaveResponse = await fetch(`${API_BASE_URL}/hrms/leaves`);
        const leaveData = await leaveResponse.json();
        setLeaveRequests(leaveData);
        console.log(leaveData);
        const resourceResponse = await fetch(
          `${API_BASE_URL}/hrms/resources/submissions`
        );
        const resourceData = await resourceResponse.json();
        console.log("Submission Data", resourceData);
        setResourceRequests(resourceData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);


  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log("Header line ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ response");
      try {
        const url = `${API_BASE_URL}/hrms/authdata`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // Include cookies with the request
        });
      
        console.log("Header line 200 response",response);

        if (response.ok) {
          const result = await response.json();
          const employeeData = result.data[0];
          const { email, department, basicemployees, role } = employeeData;
          setUserData({
            email,
            department: department?.name,
            role: role?.name,
            firstName: basicemployees?.firstName,
            lastName: basicemployees?.lastName,
            employeeCode: basicemployees?.employeeCode,
            profileImage:basicemployees?.profileImage,
            uploadFileInfo: basicemployees?.uploadFileInfo[0]?.path
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
    // <div className={styless["custom-spin-container"]}>
    <Image
      src="https://www.gtel.in/wp-content/uploads/2019/07/logo.png"
      alt="Loading"
      // className={`${styless["custom-spin-img"]} ${styless["pulse-animation"]}`}
      width={100} // Set the width of the image
      height={100} // Set the height of the image
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


  const modalContent = (
    <div>
      <Select
        placeholder="Select department"
        style={{ width: "100%", marginBottom: "16px" }}
        onChange={(value) => setSelectedDepartment(value)}
        value={selectedDepartment}
      >
        <Option value="SelectDepartment">Select Department....</Option>
        <Option value="HR">HR Department</Option>
        <Option value="IT">IT Department</Option>
        <Option value="Finance">Finance Department</Option>
      </Select>
      <Select
        placeholder="Select message type"
        style={{ width: "100%", marginBottom: "16px" }}
        onChange={(value) => setMessageType(value)}
        value={messageType}
      >
        <Option value="SelectType">Select Type...</Option>
        <Option value="circular">Circular</Option>
        <Option value="important">Important</Option>
      </Select>
      <Input.TextArea
        rows={4}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message here..."
        style={{ marginBottom: "16px" }}
      />
      <AntButton type="primary" icon={<SendOutlined />} onClick={sendMessage}>
        Send
      </AntButton>
    </div>
  );

  const items = [
    {
      key: "1",
      label: userData?.email || "No email available", // Display the email
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

  // const notificationItems = leaveRequests.slice(0, 2).map((leave, index) => ({
  //   key: `leave-${index}`,
  //   label: (
  //     <div key={`leave-${index}`}>
  //       <Text>{`Leave Request: ${leave.employeeName}`}</Text>
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           marginTop: "4px",
  //         }}
  //       >
  //         <Text type="secondary">{`Leave Type: ${leave.leaveType}`}</Text>
  //         <div>
  //           <AntButton
  //             type="primary"
  //             size="small"
  //             icon={<CheckOutlined />}
  //             onClick={() => handleApprove(leave._id, "Approved")}
  //             style={{ marginRight: "8px" }}
  //           />
  //           <AntButton
  //             danger
  //             size="small"
  //             icon={<CloseOutlined />}
  //             onClick={() => handleReject(leave._id, "Denied")}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   ),
  // }));

  // const notificationResourceItems = resourceRequests
  //   .slice(0, 2)
  //   .map((resource, index) => ({
  //     key: `resource-${index}`,
  //     label: (
  //       <div key={`resource-${index}`}>
  //         <Text>{`Resource Request: ${resource.employeeName}`}</Text>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             marginTop: "4px",
  //           }}
  //         >
  //           <Text type="secondary">{`Resource Type: ${resource.resources}`}</Text>
  //           <div>
  //             <AntButton
  //               type="primary"
  //               size="small"
  //               icon={<CheckOutlined />}
  //               onClick={() => handleApprove(resource.id, "Approved")}
  //               style={{ marginRight: "8px" }}
  //             />
  //             <AntButton
  //               danger
  //               size="small"
  //               icon={<CloseOutlined />}
  //               onClick={() => handleReject(resource.id, "Denied")}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   }));

  // const handleViewAllNotifications = () => {
  //   setAllNotificationsVisible(true);
  // };

  return (
    <>
  
      <Toaster/>
      <AntHeader
      style={{ padding: "0px", background: "#00000", height: "40px", top: 0, width: "100vw", 
        color: "white", position: "fixed",zIndex: 1,right: "-15px",left: 0,
      }}
      >

      {/* text-Gigantic  */}
      {!status && (
        <div className="header-logo"style={{ position: "absolute", left: "50px", bottom: "-11px" }}>
          <Text style={{ color: "white", fontSize: "16px", fontWeight: 600 }}>
          GIGANTIC
          </Text>
        </div>
      )}

            {/* text-Gigantic  */}
      {status && (
        <div className="header-logo"style={{ position: "absolute", left: "15px", bottom: "-11px" }}>
          <Text style={{ color: "white", fontSize: "16px", fontWeight: 600 }}>
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
          {/* <NotificationMailSettings notificationMenuItems={notificationMenuItems} /> */}

          
          {/* mailmessage circuler,imp message send to employee  */}
          <div  onClick={toggleModal} > <MailOutlined />  </div>
          

          {/* Whatapps icon */}
          <Popover
            title="Scan to Chat on WhatsApp"
            content={
              loadingQr ? (
                <Spin />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <QRCode value={qrValue} />
                  <br />
                  <Button
                    type="primary"
                    onClick={handleLogout}
                    style={{
                      marginTop: "10px",
                      fontSize: "16px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )
            }
            trigger="hover"
          >
            <div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <WhatsAppOutlined />
              </a>
            </div>
          </Popover>


          {/* Profile */}
          <Profile userData={userData} profileMenuItems={profileMenuItems} />
      </div>


      {/* menu button */}
      <Button
        onClick={func}
        type="text"
        icon={status ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        // style={{fontSize: "16px",width: 30,height: 30,position: "absolute", top: 2, left: status ? 75 : 200, color: "white",
        style={{fontSize: "16px",width: 30,height: 30,position: "absolute", top: 2, left: status ? 75 : 200, color: "white",
        }}
      />

  
     {/* modal-> mailmessage circuler,imp message send to employee */}
     <Modal
        title="Send Message"
        visible={modalVisible}
        onCancel={toggleModal}
        footer={null}
      >
        {modalContent}
      </Modal>


      </AntHeader>

    </> 
  );
};

export default Header;




