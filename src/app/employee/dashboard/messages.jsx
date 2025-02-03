import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  message as antdMessage,
  Space,
  Pagination,
  Tag,
  Modal,
} from "antd";
import { DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import io from "socket.io-client";
import { fetchMessages, deleteMessage } from "../../api/hrms/messagesApi"; // Adjust the import path as needed
import styles from "./style.module.css";
// import AntButton from "@/app/hrdepartment/common/Button";
import AntButton from "../../../app/hrdepartment/common/Button";
// import API_BASE_URL from "../../../../config/config";
const API_BASE_URL="http://localhost:3000"
// const socket = io(`${API_BASE_URL}`, {
//   credentials: "include",
// }); 

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchMessagesData();

    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    // Listen for new messages from HR
    // socket.on("new_message", handleNewMessage);

    // return () => {
    //   socket.off("new_message", handleNewMessage); // Clean up listener
    // };
  }, []);

  const fetchMessagesData = async () => {
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (error) {
      antdMessage.error("Error fetching messages: " + error.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      antdMessage.success("Message deleted successfully");
      fetchMessagesData();
    } catch (error) {
      antdMessage.error("Error: " + error.message);
    }
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <>
      <Card
        title={
          <div className={styles.cardTitle}>
            Circular / News
            <a onClick={showModal} style={{ float: "right" }}>
              View All
            </a>
          </div>
        }
        className={styles.circularCard}
      >
        {messages.slice(startIndex, endIndex).map((message) => (
          <Card
            key={message._id}
            style={{
              width: "auto",
              position: "relative",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {message.type === "circular" && <Tag color="blue">Circular</Tag>}
                {message.type === "important" && (
                  <Tag color="red">Important</Tag>
                )}
                <h4 style={{ margin: 0, color: "green" }}>Sutesha Sadana</h4>
              </div>
              <p style={{ margin: 0, color: "grey", fontSize: "12px" }}>
                <CalendarOutlined style={{ marginRight: 4 }} />
                {moment(message.createdAt).format("Do MMMM YYYY, h:mm a")}
              </p>
            </div>
            <p style={{ margin: 0 }}>{message.content}</p>
            <AntButton
              type="text"
              danger
              style={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => handleDeleteMessage(message._id)}
            >
              <DeleteOutlined />
            </AntButton>
          </Card>
        ))}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={messages.length}
          onChange={onPageChange}
          style={{ textAlign: "center", marginTop: 16 }}
        />
      </Card>

      <Modal
        title="All Messages"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {messages.map((message) => (
          <Card
            key={message._id}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {message.type === "circular" && <Tag color="blue">Circular</Tag>}
                {message.type === "important" && (
                  <Tag color="red">Important</Tag>
                )}
                <h4 style={{ margin: 0, color: "green" }}>Sutesha Sadana</h4>
              </div>
              <p style={{ margin: 0, color: "grey", fontSize: "12px" }}>
                <CalendarOutlined style={{ marginRight: 4 }} />
                {moment(message.createdAt).format("Do MMMM YYYY, h:mm a")}
              </p>
            </div>
            <p style={{ margin: 0 }}>{message.content}</p>
            <AntButton
              type="text"
              danger
              style={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => handleDeleteMessage(message._id)}
            >
              <DeleteOutlined />
            </AntButton>
          </Card>
        ))}
      </Modal>
    </>
  );
};

export default Messages;










// import React, { useEffect, useState } from "react";
// import { Card, Button, message as antdMessage, Space, Pagination, Tag, Modal } from "antd";
// import { DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
// import moment from 'moment';
// import io from 'socket.io-client';
// import { fetchMessages, deleteMessage } from "../../api/hrms/messagesApi"; // Adjust the import path as needed
// import styles from "./style.module.css";
// import AntButton from "@/app/hrdepartment/common/Button";
// import API_BASE_URL from "../../../../config/config";

// const socket = io(`${API_BASE_URL}`, {
//   withCredentials: true,
//   extraHeaders: {
//     "Access-Control-Allow-Origin": "https://api.gtel.in"
//   }
// });

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     // Fetch initial messages
//     fetchMessagesData();

//     // Listen for new messages from HR
//     socket.on('new_message', (message) => {
//       setMessages([message, ...messages]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [messages]);

//   const fetchMessagesData = async () => {
//     try {
//       const data = await fetchMessages();
//       setMessages(data);
//     } catch (error) {
//       // antdMessage.error('Error fetching messages: ' + error.message);
//     }
//   };

//   const handleDeleteMessage = async (id) => {
//     try {
//       await deleteMessage(id);
//       antdMessage.success('Message deleted successfully');
//       fetchMessagesData();
//     } catch (error) {
//       antdMessage.error('Error: ' + error.message);
//     }
//   };

//   const onPageChange = (page, pageSize) => {
//     setCurrentPage(page);
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;

//   return (
//     <>
//       <Card
//         title={
//           <div className={styles.cardTitle}>
//             Circular / News
//             <a onClick={showModal} style={{ float: 'right' }}>View All</a>
//           </div>
//         }
//         className={styles.circularCard}
//       >
//         {messages.slice(startIndex, endIndex).map((message, index) => (
//           <Card
//             key={index}
//             style={{
//               width: "auto",
//               position: "relative",
//             }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 {message.type === 'circular' && <Tag color="blue">Circular</Tag>}
//                 {message.type === 'important' && <Tag color="red">Important</Tag>}
//                 <h4 style={{ margin: 0, color: "green" }}>Sutesha Sadana</h4>
//               </div>
//               <p style={{ margin: 0, color: "grey", fontSize: "12px" }}>
//                 <CalendarOutlined style={{ marginRight: 4 }} />
//                 {moment(message.createdAt).format('Do MMMM YYYY, h:mm a')}
//               </p>
//             </div>
//             <p style={{ margin: 0 }}>{message.content}</p>
//             <AntButton
//               type="text"
//               danger
//               style={{
//                 position: "absolute",
//                 top: 30,
//                 right: 8,
//               }}
//               onClick={() => handleDeleteMessage(message._id)}
//             >
//               {/* <DeleteOutlined /> */}
//             </AntButton>
//           </Card>
//         ))}
//       </Card>

//       <Modal
//         title="All Messages"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//         width={800}
//       >
//         {messages.map((message, index) => (
//           <Card
//             key={index}
//             style={{
//               width: "100%",
//               marginBottom: "10px",
//             }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 {message.type === 'circular' && <Tag color="blue">Circular</Tag>}
//                 {message.type === 'important' && <Tag color="red">Important</Tag>}
//                 <h4 style={{ margin: 0, color: "green" }}>Sutesha Sadana</h4>
//               </div>
//               <p style={{ margin: 0, color: "grey", fontSize: "12px" }}>
//                 <CalendarOutlined style={{ marginRight: 4 }} />
//                 {moment(message.createdAt).format('Do MMMM YYYY, h:mm a')}
//               </p>
//             </div>
//             <p style={{ margin: 0 }}>{message.content}</p>
//             <AntButton
//               type="text"
//               danger
//               style={{
//                 position: "absolute",
//                 top: 30,
//                 right: 8,
//               }}
//               onClick={() => handleDeleteMessage(message._id)}
//             >
              
//             </AntButton>
//           </Card>
//         ))}
//       </Modal>
//     </>
//   );
// };

// export default Messages;
