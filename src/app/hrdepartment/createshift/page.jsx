'use client'
import { DeleteOutlined } from "@ant-design/icons";
import moment from 'moment';
import Layout from '../components/layout/Layout';
import Image from "next/image";


const AddShift = () => {
 





  return (
    <Layout>
       <div className=" flex justify-center">

        {/* button */}
        <button className="bg-green-500 hover:bg-green-600 font-bold p-3 text-white rounded-xl            ">
                 Create Shift Time
        </button>
       </div>

       
       {/* Image */}
       <div className="mt-5 "> 

          <div className="overflow-hidden w-[65%] h-[50%] mx-auto">
            <div className="relative group">
              <Image
                src="/shiftTimeCreate1.png" // Image path in public folder
                alt="Shift Time Create"
                layout="responsive"
                width={1200}
                height={400}
                
              />
            </div>
            <div className="h-10"></div>
          </div>

       </div>
    </Layout>
  );
};

export default AddShift;




























// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, TimePicker, message, List, Row, Col, Card } from 'antd';
// import { DeleteOutlined } from "@ant-design/icons";
// import moment from 'moment';
// import Layout from '../components/layout/Layout';
// import { addShift, deleteShift, fetchShifts } from '../../api/hrms/shiftApi';

// const AddShift = () => {
//   const [fromTime, setFromTime] = useState(null);
//   const [toTime, setToTime] = useState(null);
//   const [shifts, setShifts] = useState([]);

//   const onFinish = async () => {
//     try {
//       const newShift = await addShift(fromTime.toISOString(), toTime.toISOString());
//       message.success('Shift timing added successfully');
//       setShifts(prevShifts => [...prevShifts, newShift]); // Update state with new shift
//     } catch (error) {
//       message.error('Failed to add shift timing');
//     }
//   };

//   const handleDeleteShift = async (id) => {
//     try {
//       await deleteShift(id);
//       setShifts(prevShifts => prevShifts.filter(shift => shift._id !== id));
//       message.success('Shift deleted successfully');
//     } catch (error) {
//       message.error('Failed to delete shift');
//     }
//   };

//   useEffect(() => {
//     const loadShifts = async () => {
//       try {
//         const fetchedShifts = await fetchShifts();
//         setShifts(fetchedShifts);
//       } catch (error) {
//         message.error('Failed to fetch shift timings');
//       }
//     };

//     loadShifts();
//   }, []);

//   return (
//     <Layout>
//       <div style={{ padding: "30px" }}>
//         <Card title="Add New Shift">
//           <Form onFinish={onFinish} layout="vertical">
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="From Time" required>
//                   <TimePicker
//                     value={fromTime}
//                     onChange={setFromTime}
//                     format="HH:mm"
//                     style={{ width: '100%' }}
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="To Time" required>
//                   <TimePicker
//                     value={toTime}
//                     onChange={setToTime}
//                     format="HH:mm"
//                     style={{ width: '100%' }}
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//                 Add Shift
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//         <Card title="Shift Timings" style={{ marginTop: 24 }}>
//           <List
//             bordered
//             dataSource={shifts}
//             renderItem={shift => (
//               <List.Item
//               key={shift._id} // Ensure _id is unique for each shift
//               actions={[
//                 <Button
//                   key={`delete-${shift._id}`} // Add a unique key for the Button
//                   type="primary"
//                   danger
//                   icon={<DeleteOutlined />}
//                   onClick={() => handleDeleteShift(shift._id)}
//                 >
//                   Delete
//                 </Button>
//               ]}
//             >
//               {moment(shift.fromTime).format('HH:mm')} - {moment(shift.toTime).format('HH:mm')}
//             </List.Item>
            
//             )}
//           />
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default AddShift;
