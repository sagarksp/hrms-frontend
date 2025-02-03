"use client"

import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import moment from "moment";
import API_BASE_URL from "../../../../config/config";

const MessageCard = () => {
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch Messages
  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hrms/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };
    fetchMessagesData();
  }, []);

  // Modal Handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 w-[35%] bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-md">
    {/* Header */}
    <div className="flex justify-between items-center border-b pb-3">
      <h2 className="text-xl font-semibold text-gray-800">Circular / News</h2>
      <button
        onClick={showModal}
        className="text-blue-500 font-medium hover:underline"
      >
        View All
      </button>
    </div>
  
    {/* Display Cards (Vertical List) */}
    <div className="flex flex-col gap-4 mt-4">
      {messages.slice(0, 3).map((message) => (
        <div
          key={message._id}
          className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-lg ${
                message.type === "circular"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.type === "circular" ? "Circular" : "Important"}
            </span>
            <p className="text-xs text-gray-500">
              {moment(message.createdAt).format("Do MMM YYYY, h:mm a")}
            </p>
          </div>
          <h4 className="text-sm font-bold text-gray-800">
            {message.senderName || "Anonymous"}
          </h4>
          <p className="text-gray-700 text-sm mt-1 truncate">
            {message.content}
          </p>
        </div>
      ))}
    </div>
  
    {/* Modal for All Messages */}
    <Modal
      title="All Messages"
      open={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    
    >
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-lg ${
                  message.type === "circular"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.type === "circular" ? "Circular" : "Important"}
              </span>
              <p className="text-xs text-gray-500">
                {moment(message.createdAt).format("Do MMM YYYY, h:mm a")}
              </p>
            </div>
            <h4 className="text-sm font-bold text-gray-800">
              {message.senderName || "Anonymous"}
            </h4>
            <p className="text-gray-700 text-sm mt-1">{message.content}</p>
          </div>
        ))}
      </div>
    </Modal>
  </div>
  
  
  );
};

export default MessageCard;
