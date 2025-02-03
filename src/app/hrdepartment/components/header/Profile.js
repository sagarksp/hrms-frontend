// components/Profile.js
import React from "react";
import { Dropdown, Image as AntImage } from "antd";

const Profile = ({ userData, profileMenuItems }) => {

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Greeting Text */}
      <span
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        Hi, {userData?.firstName || "Guest"}!
      </span>

      {/* Profile Dropdown */}
      <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          <AntImage
            src={userData?.profileImage || "/default-profile.png"} // Fallback to default image
            alt="Profile"
            style={{
              width: "36px", // Set a fixed width for the profile image
              height: "36px", // Ensure it's a perfect square
              borderRadius: "50%", // Make it circular
              objectFit: "cover", // Ensure the image fits well
              border: "2px solid #90EE90", // Optional: Add a border for better visibility
            }}
            preview={false} // Disable preview on click
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;


















// // components/Profile.js
// import React from 'react';
// import { Dropdown } from 'antd';
// import Image from 'next/image';
// import Link from 'next/link';

// const Profile = ({ userData, profileMenuItems }) => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//       <span
//         style={{
//           color: 'white',
//           fontWeight: 'bold',
//         }}
//       >
//         Hi, {userData?.firstName || 'Guest'}!
//       </span>
//       <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
//         {/* <Image
//           src="https://res.cloudinary.com/dxkxa0mkq/image/upload/v1737530176/surai_ljztg2.jpg"
//           alt="Profile"
//           width={30}
//           height={30}
//           style={{ borderRadius: '50%' }}
//         /> */}

//           <AntImage
//             src={userData?.profileImage || "/default-profile.png"} // Fallback to default image
//             alt="Employee Profile"
//             style={{
//               width: "100%",
//               maxWidth: "200px", // Limit max width for responsiveness
//               borderRadius: "50%", // Circular image
//             }}
//             preview={false} // Disable image preview on click
//           />



//       </Dropdown>
//     </div>
//   );
// };

// export default Profile;
