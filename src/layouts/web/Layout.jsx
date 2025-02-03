'use client'
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div
        style={{
          marginTop: 0,
          height: "auto",
          overflow: "hidden",
        }}
      >
        <Header status={collapsed} func={toggleCollapsed} />
        <motion.div
          initial={{ width: collapsed ? 72 : 190 }}
          animate={{ width: collapsed ? 72 : 190 }}
          transition={{ duration: 0.5 }}
        >
          <Sidebar status={collapsed} func={toggleCollapsed} />
        </motion.div>
        <motion.div
          initial={{ marginLeft: collapsed ? 72 : 190 }}
          animate={{ marginLeft: collapsed ? 72 : 190 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
