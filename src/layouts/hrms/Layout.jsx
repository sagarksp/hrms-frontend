'use client';
import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
// import MessagingSystem from "@/app/employee/dashboard/MessagingSystem";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
     {/* <div className={`mt-0 overflow-hidden h-auto ${collapsed ? "ml-[72px]" : "ml-[190px]"}`}></div> */}
      <div className={`mt-0 overflow-hidden h-auto ${collapsed ? "ml-[72px]" : "ml-[150px]"}`}>
        <Header status={collapsed} func={toggleCollapsed} />
        <Sidebar status={collapsed} func={toggleCollapsed} />
        {children}
      </div>
      {/* <MessagingSystem /> */}
      <Footer />
    </>
  );
};

export default Layout;