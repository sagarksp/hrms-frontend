'use client'
import React, {useState} from "react";
import Header from "../header";
import Footer from "../footer";
import Sidebar from "../sidebar";
import MessagingSystem from "../../dashboard/MessagingSystem";

const Layout = ({ children , accessData}) => {
  console.log(accessData)
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
    <div style={{  marginTop: 0,
      height: "auto",
                  // height: "auto",
      // padding: 24,
      overflow: "hidden",
   
      marginLeft: collapsed ? 72 : 190}}>
      <Header status={collapsed}  func={toggleCollapsed}   />
      <Sidebar   status={collapsed}  func={toggleCollapsed} noc={accessData}/>
      {children }
      
    </div>
    <MessagingSystem />
    <Footer />
    </>
  );
};

export default Layout;
