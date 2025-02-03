import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  // Toggle sidebar collapse state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Main wrapper for the layout */}
      <div
        style={{
          marginTop: 0,
          height: "auto",  // Make sure height is auto to adjust with content
          overflow: "hidden", // Prevent overflow
          // marginLeft: collapsed ? 72 : 190, // Adjust the margin depending on sidebar collapse state
          marginLeft: collapsed ? 72 : 190, // Adjust the margin depending on sidebar collapse state
          transition: "margin-left 0.3s ease", // Smooth transition for sidebar collapse
        }}
      >
        {/* Header with collapsing functionality */}
        <Header status={collapsed} func={toggleCollapsed} />
        
        {/* Sidebar with collapsing functionality */}
        <Sidebar status={collapsed} func={toggleCollapsed} />

        {/* Content goes here */}
        <div style={{ padding: "24px" }}>
          {children}
        </div>
      </div>

      {/* Footer component */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;













// import React, { useState } from "react";
// import Header from "../header";
// import Footer from "../footer";
// import Sidebar from "../sidebar";

// const Layout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(true);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };
//   return (
//     <>
//       <div
//         style={{
//           marginTop: 0,
//           height: "auto",
//           // height: "auto",
//           // padding: 24,
//           overflow: "hidden",

//           marginLeft: collapsed ? 72 : 190,
//         }}
//       >
//         <Header status={collapsed} func={toggleCollapsed} />
//         <Sidebar status={collapsed} func={toggleCollapsed} />
//         {children}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Layout;
