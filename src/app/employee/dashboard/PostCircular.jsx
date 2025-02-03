import React, { useState, useRef, useEffect } from "react";
import { Card, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import AntButton from "@/app/hrdepartment/common/Button";
const PostCircular = () => {
  const [message, setMessage] = useState("");
  const cardRef = useRef(null);

  const handleSend = () => {
    console.log("Message sent:", message);
    // Add logic to handle sending the message
    setMessage(""); // Clear the input field after sending
  };

  useEffect(() => {
    // Scroll to the bottom of the card when message updates
    if (cardRef.current) {
      cardRef.current.scrollTop = cardRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <Card
      style={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
      title= "Post Circular"
      ref={cardRef}
    >
      <div style={{ flex: 1 }}>
        {/* This div ensures messages stay at the bottom */}
        {/* Messages go here */}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px", position: "relative", top: "260px" }}>
        <Input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSend}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <AntButton
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send
        </AntButton>
      </div>
    </Card>
  );
};

export default PostCircular;
