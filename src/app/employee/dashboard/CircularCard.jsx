import React from "react";
import { Card } from "antd";

const CircularCard = ({ title, description }) => {
  return (
    <Card
      style={{
        width: "auto",
  //      textAlign: "center",
        height: 70, // Adjust height as needed
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px"
      //  padding: "20px",
      }}
    >
      <h4 style={{ margin: 0 , color: "green"}}>{title}</h4>
      <p style={{ margin: 0 }}>{description}</p>
    </Card>
  );
};

export default CircularCard;
