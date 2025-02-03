import React, { useState } from "react";
import { Card, Modal, Image as AntImage } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import styles from "./style.module.css";

// const EmployeeCard = ({ userData }) => {
//   const [modalVisible, setModalVisible] = useState(false);
  
//   if(userData?.lastName=="undefined"){
//     userData?.lastName="";
//   }

//   const handleModalToggle = () => {
//     setModalVisible(!modalVisible);
//   };

//   return (
//     <>
//       <Card
//         title={
//           <div className="flex justify-between items-center">
//             <span>Employee Data</span>
//             <EyeOutlined
//               style={{ fontSize: "20px", color: "#008FFB", cursor: "pointer" }}
//               onClick={handleModalToggle}
//             />
//           </div>
//         }
//         className="w-full md:w-1/3 lg:w-1/4" // Responsive width
//         style={{ margin: "10px auto" }}
//       >
//         <div className="flex flex-col items-center h-full">
//           <div className="mt-4 flex flex-col items-center">
//             {/* Use Ant Design's Image component for Base64 strings */}
//             <AntImage
//               src={userData?.profileImage || "/default-profile.png"} // Fallback to default image
//               alt="Employee Profile"
//               style={{
//                 width: "100%", // Adjust width as percentage of parent
//                 borderRadius: "50%", // For rounded images
//               }}
//               preview={false} // Disable image preview on click
//             />

//             <div className="text-center mt-4 text-xs">
//               <p className="text-sm">
//                 <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
//               </p>
//               <p className="text-sm">
//                 <strong>Email:</strong> {userData?.email}
//               </p>
//               <p className="text-sm">
//                 <strong>Employee Code:</strong> {userData?.employeeCode}
//               </p>
//               <p className="text-sm">
//                 <strong>Department:</strong> {userData?.department}
//               </p>
//               <p className="text-sm">
//                 <strong>Role:</strong> {userData?.role}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Card>

//       <Modal
//       title={<h2 className="text-xl font-bold">Employee Details</h2>} // Styled title
//       open={modalVisible}
//       onCancel={handleModalToggle}
//       width="80%" // Use a percentage for responsive width
//       footer={null}
//       bodyStyle={{
//         padding: "20px",
//         backgroundColor: "#f9fafb", // Light gray background for a clean look
//         borderRadius: "8px",
//       }}
//       >
//       <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
//         {/* Left Section */}
//         <div className="flex flex-col items-center w-full md:w-1/3">
//           <AntImage
//             src={userData?.profileImage || "/default-profile.png"} // Fallback to default image
//             alt="Employee Profile"
//             style={{
//               width: "100%",
//               maxWidth: "200px", // Limit max width for responsiveness
//               borderRadius: "1%", // Circular image
//             }}
//             preview={false} // Disable image preview on click
//           />
//           <p className="text-center mt-4 text-lg font-semibold">
//             {userData?.firstName} {userData?.lastName}
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-sm font-medium text-gray-600">Full Name</p>
//             <p className="text-base font-semibold">{userData?.firstName} {userData?.lastName}</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-sm font-medium text-gray-600">Email</p>
//             <p className="text-base font-semibold">{userData?.email}</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-sm font-medium text-gray-600">Employee Code</p>
//             <p className="text-base font-semibold">{userData?.employeeCode}</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-sm font-medium text-gray-600">Department</p>
//             <p className="text-base font-semibold">{userData?.department}</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-sm font-medium text-gray-600">Role</p>
//             <p className="text-base font-semibold">{userData?.role}</p>
//           </div>
//         </div>
//       </div>
//       </Modal>

//     </>
//   );
// };

// export default EmployeeCard;




const EmployeeCard = ({ userData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Create a modifiable copy of userData
  const modifiedUserData = { ...userData };

  if (modifiedUserData.lastName === "undefined") {
    modifiedUserData.lastName = "";
  }

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Employee Data</span>
            <EyeOutlined
              style={{ fontSize: "20px", color: "#008FFB", cursor: "pointer" }}
              onClick={handleModalToggle}
            />
          </div>
        }
        className="w-full md:w-1/3 lg:w-1/4"
        style={{ margin: "10px auto" }}
      >
        <div className="flex flex-col items-center h-full">
          <div className="mt-4 flex flex-col items-center">
            <AntImage
              src={modifiedUserData.profileImage || "/default-profile.png"}
              alt="Employee Profile"
              style={{
                width: "100%",
                borderRadius: "50%",
              }}
              preview={false}
            />
            <div className="text-center mt-4 text-xs">
              <p className="text-sm">
                <strong>Name:</strong> {modifiedUserData.firstName} {modifiedUserData.lastName}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {modifiedUserData.email}
              </p>
              <p className="text-sm">
                <strong>Employee Code:</strong> {modifiedUserData.employeeCode}
              </p>
              <p className="text-sm">
                <strong>Department:</strong> {modifiedUserData.department}
              </p>
              <p className="text-sm">
                <strong>Role:</strong> {modifiedUserData.role}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        title={<h2 className="text-xl font-bold">Employee Details</h2>}
        open={modalVisible}
        onCancel={handleModalToggle}
        width="80%"
        footer={null}
        bodyStyle={{
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
        }}
      >
        <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
          <div className="flex flex-col items-center w-full md:w-1/3">
            <AntImage
              src={modifiedUserData.profileImage || "/default-profile.png"}
              alt="Employee Profile"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "1%",
              }}
              preview={false}
            />
            <p className="text-center mt-4 text-lg font-semibold">
              {modifiedUserData.firstName} {modifiedUserData.lastName}
            </p>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-sm font-medium text-gray-600">Full Name</p>
              <p className="text-base font-semibold">{modifiedUserData.firstName} {modifiedUserData.lastName}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-base font-semibold">{modifiedUserData.email}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-sm font-medium text-gray-600">Employee Code</p>
              <p className="text-base font-semibold">{modifiedUserData.employeeCode}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-sm font-medium text-gray-600">Department</p>
              <p className="text-base font-semibold">{modifiedUserData.department}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-base font-semibold">{modifiedUserData.role}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmployeeCard;












// import React, { useState } from "react";
// import { Card, Modal } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
// import Image from "next/image";
// import styles from "./style.module.css";
// import API_BASE_URL from "../../../../config/config";

// const EmployeeCard = (p) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   console.log("line ->11",p.userData);
//   const userData=p.userData;
//   console.log("line ->12",p);

//   const handleModalToggle = () => {
//     setModalVisible(!modalVisible);
//   };

//   return (
//     <>
//       <Card
//         title={
//           <div className="flex justify-between">
//             <span>Employee Data</span>
//             <EyeOutlined
//               style={{ fontSize: "20px", color: "#008FFB" }}
//               onClick={handleModalToggle}
//             />
//           </div>
//         }
//         className="w-1/4" // Adjust width as needed (Tailwind class for width 25%)
//       >
//         <div className="flex flex-col items-center justify-between h-full">
//           <div className="mt-1  flex flex-col items-center">
//             <Image
//               src={userData?.profileImage}
//               //   src={`${API_BASE_URL}/${userData.uploadFileInfo}`}
//               alt="Employee Profile"
//               // width={80}
//               // height={80}
//               width={200}
//               height={80}
//               className="rounded-full"
//             />

//             <div className="text-center text-xs">
//               <div>
//                 <p className="text-sm">
//                   <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
//                 </p>
//                 <p className="text-sm">
//                   <strong>Email:</strong> {userData?.email}
//                 </p>
//                 <p className="text-sm">
//                   <strong>Employee Code:</strong> {userData?.employeeCode}
//                 </p>
//                 <p className="text-sm">
//                   <strong>Department:</strong> {userData?.department}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>

//       <Modal
//         title="Employee Details"
//         open={modalVisible} // Updated from `visible` to `open`
//         onCancel={handleModalToggle}
//         width={1300}
//         footer={null}
//       >
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           {/* Content for Employee Details Modal can go here */}
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default EmployeeCard;
