import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

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
          // height: "auto",
          // padding: 24,
          overflow: "hidden",

          marginLeft: collapsed ? 72 : 190,
        }}
      >
        <Header status={collapsed} func={toggleCollapsed} />
        <Sidebar status={collapsed} func={toggleCollapsed} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
