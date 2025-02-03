import React from 'react';
import { Row, Col, Card, Form, InputNumber } from 'antd';

const SalaryDetailsContent = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Earning Details">
            <Form.Item label="FIXED BASIC" name="fixedBasic">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="ARREAR BASIC" name="arrearBasic">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Earnings Total" name="earningsTotal">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Deduction Details">
            <Form.Item label="INCOME TAX" name="incomeTax">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Deductions Total" name="deductionsTotal">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalaryDetailsContent;














// import React, { useState, useEffect } from "react";
// import { Row, Col, Form, Input, Button } from "antd";

// const SalaryDetailsContent = () => {
//   const [inputValue, setInputValue] = useState(""); // Initialize with "hi"

//   const handleSubmit = () => {
//     setInputValue("suraj"); // Update the value to "suraj" on button click
//   };

//   useEffect(() => {
//     // Log whenever inputValue changes
//     console.log(inputValue);
//   }, [inputValue]);

//   return (
//     <div>

     
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="firstName"
//                 rules={[{ required: true, message: "Please enter First Name" }]}
//               >
//                 <Input
//                   value={inputValue} // Controlled value from the state
//                   onChange={(e) => setInputValue(e.target.value)} // Update state on input change
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
       


      
//       <Row gutter={16}>
//         <Col span={12}>
       
//           <Form.Item
//             name="firstName" 
//             rules={[{ required: true, message: "Please enter First Name" }]}
//           >
//             <Input
            
//               value={inputValue} // Controlled value from the state
//               placeholder="Enter your name" // Static placeholder text
//               onChange={(e) => setInputValue(e.target.value)} // Update state on input change
//             />
//           </Form.Item>
//         </Col>

      



//         <Col span={12}>
//           <Button type="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default SalaryDetailsContent;




// import React, { useState } from 'react';
// import { Row, Col, Form, Button, Input } from 'antd';

// const SalaryDetailsContent = () => {
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission
//     setIsSubmitted(true); // Set submitted flag
//   };

//   return (
//     <div>
//       <Row gutter={16}>
//       <Col span={12}>
//               <Form.Item
//                 // label="First Name"
//                 name="firstName"
//                 rules={[{ required: true, message: "Please enter First Name" }]}
//               >
//                 <Input />
//               </Form.Item>
//         </Col>

//         {/* <Col span={12}>
//           <Form.Item
//             label="Data"
//             name="data"
//             rules={[{ required: true, message: 'Please Submit ALL Document' }]}
//           >
//             {!isSubmitted ? (
//               <Button
//                 type="primary"
//                 onClick={handleSubmit}
//                 style={{ width: '100%' }}
//               >
//                 Submit
//               </Button>
//             ) : (
//               <span
//                 style={{
//                   width: '100%',
//                   display: 'block',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   color: 'green',
//                 }}
//               >
//                 Submitted
//               </span>
//             )}
//           </Form.Item>
//         </Col> */}
//       </Row>
//     </div>
//   );
// };

// export default SalaryDetailsContent;





// import React from 'react';
// import { Row, Col, Card, Form, InputNumber } from 'antd';

// const SalaryDetailsContent = () => {
//   return (
//     <div>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Card title="Deduction Details">

//             <Form.Item label="Deductions Total" name="deductionsTotal">
//               <InputNumber style={{ width: '100%' }} />
//             </Form.Item>


//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default SalaryDetailsContent;
