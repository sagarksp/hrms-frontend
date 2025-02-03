import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, notification } from "antd";
import Link from "next/link";
import styles from "./QuickLinksCard.module.css";
import axios from "axios";
import LeaveModal from "./LeaveModal";
import ResourcesModal from "./ResourcesModal";
import ReminderModal from "./ReminderModal";

const QuickLinksCard = ({ employeeName }) => {
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
  const [isResourcesModalVisible, setIsResourcesModalVisible] = useState(false);
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
  const [resources, setResources] = useState([]);
  const [form] = Form.useForm();
  const [resourcesForm] = Form.useForm();
  const [reminderForm] = Form.useForm();

  // Fetch resources from API
  // const fetchResources = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/hrms/resources");
  //     setResources(response.data);
  //   } catch (err) {
  //     notification.error({
  //       message: "Error",
  //       description: "Failed to fetch resources.",
  //     });
  //     console.error("Error fetching resources:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchResources();
  // }, []);

  // Modal handlers
  const handleLeaveClick = () => {
    setIsLeaveModalVisible(true);
    form.resetFields();
  };

  const handleResourcesClick = () => {
    setIsResourcesModalVisible(true);
    resourcesForm.resetFields();
  };

  const handleReminderClick = () => {
    setIsReminderModalVisible(true);
    reminderForm.resetFields();
  };

  // Form submission handlers
  const handleLeaveSubmit = async (values) => {
    try {
      const { dateRange, ...rest } = values;
      const leaveData = {
        ...rest,
        dateRange: {
          from: dateRange[0].toISOString(),
          to: dateRange[1].toISOString(),
        },
      };

      // Example API call
      // await axios.post("http://localhost:8000/hrms/leave/submit", leaveData);

      notification.success({
        message: "Success",
        description: "Leave submitted successfully.",
      });
      setIsLeaveModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to submit leave.",
      });
      console.error("Error submitting leave:", error);
    }
  };

  const handleResourceSubmit = async () => {
    try {
      const selectedResources = resourcesForm.getFieldValue("resources") || [];

      if (selectedResources.length === 0) {
        notification.warning({
          message: "Validation Error",
          description: "Please select at least one resource.",
        });
        return;
      }

      // Example API call
      // await axios.post("http://localhost:8000/hrms/resources/submit", {
      //   resources: selectedResources.join(", "),
      //   employeeName,
      // });

      notification.success({
        message: "Success",
        description: "Resources submitted successfully.",
      });
      setIsResourcesModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to submit resources.",
      });
      console.error("Error submitting resources:", error);
    }
  };

  const handleReminderSubmit = async (values) => {
    try {
      // Example API call
      // await axios.post("http://localhost:8000/hrms/reminders/submit", values);

      notification.success({
        message: "Success",
        description: "Reminder submitted successfully.",
      });
      setIsReminderModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to submit reminder.",
      });
      console.error("Error submitting reminder:", error);
    }
  };

  return (
    <>
      {/* Quick Links Card */}
      <Card
        title="Quick Links"
        className={styles.quickLinksCard}
        style={{ width: 350 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card className={styles.card}>
              <Link href="/communication">
                <div className={styles.link}>Communication</div>
              </Link>
            </Card>
          </Col>
          <Col span={12}>
            <Card className={styles.card2}>
              <Link href="/attendance">
                <div className={styles.link2}>Attendance</div>
              </Link>
            </Card>
          </Col>
          <Col span={12} onClick={handleLeaveClick} style={{ cursor: "pointer" }}>
            <Card className={styles.card3}>
              <div className={styles.link3}>Leave</div>
            </Card>
          </Col>
          <Col span={12} onClick={handleResourcesClick} style={{ cursor: "pointer" }}>
            <Card className={styles.card4}>
              <div className={styles.link4}>Resources</div>
            </Card>
          </Col>
          <Col span={12} onClick={handleReminderClick} style={{ cursor: "pointer" }}>
            <Card className={styles.card5}>
              <div className={styles.link5}>Reminder</div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Modals */}
      <LeaveModal
        visible={isLeaveModalVisible}
        onCancel={() => setIsLeaveModalVisible(false)}
        onSubmit={handleLeaveSubmit}
        form={form}
        employeeName={employeeName}
      />
      <ResourcesModal
        visible={isResourcesModalVisible}
        onCancel={() => setIsResourcesModalVisible(false)}
        onSubmit={handleResourceSubmit}
        form={resourcesForm}
        employeeName={employeeName}
        resources={resources}
      />
      <ReminderModal
        visible={isReminderModalVisible}
        onCancel={() => setIsReminderModalVisible(false)}
        onSubmit={handleReminderSubmit}
        form={reminderForm}
      />
    </>
  );
};

export default QuickLinksCard;




// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Form, notification } from "antd";
// import Link from "next/link";
// import styles from "./QuickLinksCard.module.css";
// import axios from "axios";
// import LeaveModal from "./LeaveModal";
// import ResourcesModal from "./ResourcesModal";
// import ReminderModal from "./ReminderModal";

// const QuickLinksCard = ({ employeeName }) => {
//   const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
//   const [isResourcesModalVisible, setIsResourcesModalVisible] = useState(false);
//   const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
//   const [resources, setResources] = useState([]);
//   const [form] = Form.useForm();
//   const [resourcesForm] = Form.useForm();
//   const [reminderForm] = Form.useForm();


//   // Fetch resources from API
//   const fetchResources = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/hrms/resources');
//       setResources(response.data);
//     } catch (err) {
//       console.error('Error fetching resources:', err);
//     }
//   };

//   // Load resources on component mount
//   useEffect(() => {
//     fetchResources();
//   }, []);

//   // Handle leave modal open
//   const handleLeaveClick = () => {
//     setIsLeaveModalVisible(true);
//     form.resetFields();
//   };

//   // Handle resources modal open
//   const handleResourcesClick = () => {
//     setIsResourcesModalVisible(true);
//     resourcesForm.resetFields();
//   };

//   // Handle reminder modal open
//   const handleReminderClick = () => {
//     setIsReminderModalVisible(true);
//     reminderForm.resetFields();
//   };

//   // Handle leave submission
//   const handleLeaveSubmit = async (values) => {
//     const { dateRange, ...rest } = values;
//     const leaveData = {
//       ...rest,
//       dateRange: {
//         from: dateRange[0].toISOString(),
//         to: dateRange[1].toISOString(),
//       },
//     };

//     try {
//       // const response = await axios.post('http://localhost:8000/hrms/leave/submit', leaveData);
//       // console.log('Leave submitted successfully:', response.data);
//       console.log(leaveData);
//       alert(leaveData);

//       notification.success({
//         message: 'Leave Submitted',
//         description: 'Leave has been successfully submitted.',
//       });

//       setIsLeaveModalVisible(false);
//     } catch (error) {
//       console.error('Error submitting leave:', error);
//     }
//   };

//   // Handle resource submission
//   const handleResourceSubmit = async () => {
//     try {
//       const selectedResources = resourcesForm.getFieldValue('resources').join(', ');

//       const response = await axios.post('http://localhost:8000/hrms/resources/submit', {
//         resources: selectedResources,
//         employeeName
//       });
//       console.log('Resources submitted successfully:', response.data);

//       notification.success({
//         message: 'Resources Submitted',
//         description: 'Resources have been successfully submitted.',
//       });

//       setIsResourcesModalVisible(false);
//     } catch (error) {
//       console.error('Error submitting resources:', error);
//     }
//   };

//   // Handle reminder submission
//   const handleReminderSubmit = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:8000/hrms/reminders/submit', values);
//       console.log('Reminder submitted successfully:', response.data);

//       notification.success({
//         message: 'Reminder Submitted',
//         description: 'Reminder has been successfully submitted.',
//       });

//       setIsReminderModalVisible(false);
//     } catch (error) {
//       console.error('Error submitting reminder:', error);
//     }
//   };

//   return (
//     <>
       
//        {/* just card for all-communication,attendance,leave,resourse,remainder */}
//       <Card title="Quick Links" className={styles.quickLinksCard} style={{ width: 350 }} >
//         <Row gutter={[16, 16]}>

//           {/* First Row */}
//           <Col span={12}>
//             <Card className={styles.card}>
//               <Link href="/communication">
//                 <div className={styles.link}> Communication </div>
//               </Link>
//             </Card>
//           </Col>

//           <Col span={12}>
//             <Card className={styles.card2}>
//               <Link href="/attendance">
//                 <div className={styles.link2}> Attendance </div>
//               </Link>
//             </Card>
//           </Col>

//           {/* Second Row */}
//           <Col span={12} style={{ cursor: "pointer" }}>
//             <Card className={styles.card3} onClick={handleLeaveClick}>
//               <div className={styles.link3}>Leave </div>
//             </Card>
//           </Col>

//           <Col span={12} style={{ cursor: "pointer" }}>
//             <Card className={styles.card4} onClick={handleResourcesClick}>
//               <div className={styles.link4}> Resources </div>
//             </Card>
//           </Col>

//           {/* Third Row */}
//           <Col span={12} style={{ cursor: "pointer" }}>
//             <Card className={styles.card5} onClick={handleReminderClick}>
//               <div className={styles.link5}> Reminder </div>
//             </Card>
//           </Col>
//         </Row>
//       </Card>


//       {/* Leave Modal */}
//       <LeaveModal
//         visible={isLeaveModalVisible}
//         onCancel={() => setIsLeaveModalVisible(false)}
//         onSubmit={handleLeaveSubmit}
//         form={form}
//         employeeName={employeeName}
//       />

//        {/* Resources Modal */}
//        <ResourcesModal
//         visible={isResourcesModalVisible}
//         onCancel={() => setIsResourcesModalVisible(false)}
//         onSubmit={handleResourceSubmit}
//         form={resourcesForm}
//         employeeName={employeeName}
//         resources={resources}
//       />
    
//        {/* Reminder Modal */}
//       <ReminderModal
//         visible={isReminderModalVisible}
//         onCancel={() => setIsReminderModalVisible(false)}
//         onSubmit={handleReminderSubmit}
//         form={reminderForm}
//       />
//     </>
//   );
// };

// export default QuickLinksCard;
