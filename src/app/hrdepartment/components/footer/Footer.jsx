"use client";

import React from "react";
import { Layout as AntLayout, Typography } from "antd"; // Renaming Layout to AntLayout
import footer from './footer.module.css'
import { Button } from "antd";
import Head from "next/head";
const { Text } = Typography;
const { Footer: AntFooter } = AntLayout; // Renaming Footer to AntFooter

const Footer = () => {
  return (
    <>
      <AntFooter
        className="footer"
        style={{
          bottom: 0,
          padding: "15px",
          background: "#001529",
          height: "10px",
          width: "100vw",
          color: "white",
          position: "fixed",
          zIndex: 1, // Ensure the header stays above the content
        }}
      >
        <div className="footer-content">
          <div
            className="footer-copyright"
            style={{
              position: "relative",
              bottom: 6,
              textAlign: "center",
              width: "100%",
              fontSize: "15px",
            }}
          >
         <Text style={{color: "white"}}>&copy; 2024 Gigantic. All rights reserved.</Text>
          </div>
        </div>
      </AntFooter>
    </>
  );
};

export default Footer;
