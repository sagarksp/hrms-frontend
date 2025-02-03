'use client'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Popconfirm, Modal, message, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import toast from 'react-hot-toast';

const CreateDepartment = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
 
  // Fetch departments and handle raw data being an object or array
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hrms/departments');
      const rawData = response.data; // Assuming this is where the raw data is being fetched

      // Check if rawData is an object with a data property or an array
      if (Array.isArray(rawData)) {
        setDepartments(rawData);
      } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
        setDepartments(rawData.data);
      } else {
        console.error('Error: rawData is neither an array nor contains an array in "data" property', rawData);
        message.error('Failed to fetch departments');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      message.error('Failed to fetch departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/hrms/departments', values);
      console.log('Department created:', response.data);
      toast.success("Department created successfully");
      form.resetFields();
      fetchDepartments();
    } catch (error) {
      console.error('Error creating department:', error);
      toast.error("Failed to create department");
    
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/hrms/departments/${id}`);
      message.success('Department deleted successfully');
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
      message.error('Failed to delete department');
    }
  };


  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a>{text}</a>
      ),
    },

  //   title: 'Department Name',
  //   dataIndex: 'name',
  //   key: 'name',
  //   render: (text, record) => (
  //     <a onClick={() => showAddEmployeeModal(record)}>{text}</a>
  //   ),
  // },

    // {
    //   title: 'Minimum Employee',
    //   dataIndex: 'minEmployee',
    //   key: 'minEmployee',
    // },
    // {
    //   title: 'Maximum Employee',
    //   dataIndex: 'maxEmployee',
    //   key: 'maxEmployee',
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this department?"
          onConfirm={() => handleDeleteDepartment(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ];

  return (

      <Layout>

      {/* Main layout container to wrap the entire page content */}
      <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        {/* Center the form horizontally */}
        <Row justify="center">
          <Col span={12}>
            {/* Header text for the "Create Department" section */}
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Department</h2>

            {/* Form for creating a department */}
            <Form form={form} onFinish={onFinish} layout="vertical">
              {/* Form item for the department name input */}
              <Form.Item
                label="Department Name"
                name="name"
                rules={[{ required: true, message: 'Please enter department name' }]}
              >
                {/* Input field for entering the department name */}
                <Input />
              </Form.Item>

              {/* Submit button for the form */}
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create
                </Button>
              </Form.Item>

            </Form>
          </Col>
        </Row>

        {/* Table for displaying the list of departments */}
        <Row justify="center" style={{ marginTop: '40px' }}>
          <Col span={18}>
            <Table columns={columns} dataSource={departments} rowKey="_id" />
          </Col>
        </Row>

      </div>
      </Layout>

  );
};

export default CreateDepartment;













// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Table, Popconfirm, Modal, message, Row, Col } from 'antd';
// import { DeleteOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import Layout from '../components/layout/Layout';
// import toast from 'react-hot-toast';

// const CreateDepartment = () => {
//   const [form] = Form.useForm();
//   const [employeeForm] = Form.useForm();
//   const [departments, setDepartments] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);

//   // Fetch departments and handle raw data being an object or array
//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/hrms/departments');
//       const rawData = response.data; // Assuming this is where the raw data is being fetched

//       // Check if rawData is an object with a data property or an array
//       if (Array.isArray(rawData)) {
//         setDepartments(rawData);
//       } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
//         setDepartments(rawData.data);
//       } else {
//         console.error('Error: rawData is neither an array nor contains an array in "data" property', rawData);
//         message.error('Failed to fetch departments');
//       }
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//       message.error('Failed to fetch departments');
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:5000/hrms/departments', values);
//       console.log('Department created:', response.data);
//       toast.success("Department created successfully");
//       form.resetFields();
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error creating department:', error);
//       toast.error("Failed to create department");
    
//     }
//   };

//   const handleDeleteDepartment = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/hrms/departments/${id}`);
//       message.success('Department deleted successfully');
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error deleting department:', error);
//       message.error('Failed to delete department');
//     }
//   };

//   const showAddEmployeeModal = (department) => {
//     setSelectedDepartment(department);
//     setIsModalVisible(true);
//     // Set initial values for employeeForm when modal opens
//     employeeForm.setFieldsValue({
//       minEmployee: department.minEmployee,
//       maxEmployee: department.maxEmployee,
//     });
//   };

//   const handleAddEmployeeStrength = async (values) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/hrms/departments/${selectedDepartment._id}`, {
//         ...selectedDepartment,
//         minEmployee: values.minEmployee,
//         maxEmployee: values.maxEmployee,
//       });
//       console.log('Employee strength updated:', response.data);
//       message.success('Employee strength updated successfully');
//       setIsModalVisible(false);
//       employeeForm.resetFields();
//       fetchDepartments();
//     } catch (error) {
//       console.error('Error updating employee strength:', error);
//       message.error('Failed to update employee strength');
//     }
//   };

//   const columns = [
//     {
//       title: 'Department Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text, record) => (
//         <a>{text}</a>
//       ),
//     },

//   //   title: 'Department Name',
//   //   dataIndex: 'name',
//   //   key: 'name',
//   //   render: (text, record) => (
//   //     <a onClick={() => showAddEmployeeModal(record)}>{text}</a>
//   //   ),
//   // },

//     // {
//     //   title: 'Minimum Employee',
//     //   dataIndex: 'minEmployee',
//     //   key: 'minEmployee',
//     // },
//     // {
//     //   title: 'Maximum Employee',
//     //   dataIndex: 'maxEmployee',
//     //   key: 'maxEmployee',
//     // },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Popconfirm
//           title="Are you sure to delete this department?"
//           onConfirm={() => handleDeleteDepartment(record._id)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button type="link" icon={<DeleteOutlined />} danger />
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (

//       <Layout>

//       {/* Main layout container to wrap the entire page content */}
//       <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
//         {/* Center the form horizontally */}
//         <Row justify="center">
//           <Col span={12}>
//             {/* Header text for the "Create Department" section */}
//             <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Department</h2>

//             {/* Form for creating a department */}
//             <Form form={form} onFinish={onFinish} layout="vertical">
//               {/* Form item for the department name input */}
//               <Form.Item
//                 label="Department Name"
//                 name="name"
//                 rules={[{ required: true, message: 'Please enter department name' }]}
//               >
//                 {/* Input field for entering the department name */}
//                 <Input />
//               </Form.Item>

//               {/* Submit button for the form */}
//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Create
//                 </Button>
//               </Form.Item>

//             </Form>
//           </Col>
//         </Row>

//         {/* Table for displaying the list of departments */}
//         <Row justify="center" style={{ marginTop: '40px' }}>
//           <Col span={18}>
//             <Table columns={columns} dataSource={departments} rowKey="_id" />
//           </Col>
//         </Row>

//         {/* Modal dialog for adding employee strength */}

       
//         <Modal
//           title="Add Employee Strength"
//           open={isModalVisible}
//           onCancel={() => setIsModalVisible(false)}
//           footer={null}
//         >
//           ////{/* Form inside the modal for adding employee strength */}
//           <Form form={employeeForm} onFinish={handleAddEmployeeStrength} layout="vertical">
//           /////  {/* Form item for minimum employee count */}
//             <Form.Item
//               label="Minimum Employee"
//               name="minEmployee"
//               rules={[{ required: true, message: 'Please enter minimum employee count' }]}
//             >
//              ///// {/* Input field for entering the minimum employee count */}
//               <Input type="number" />
//             </Form.Item>

//            //// {/* Form item for maximum employee count */}
//             <Form.Item
//               label="Maximum Employee"
//               name="maxEmployee"
//               rules={[{ required: true, message: 'Please enter maximum employee count' }]}
//             >
//             ////  {/* Input field for entering the maximum employee count */}
//               <Input type="number" />
//             </Form.Item>

//            //// {/* Submit button for the modal form */}
//             <Form.Item>
//               <Button type="primary" htmlType="submit" block>
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
        

      

//       </div>
//       </Layout>

//   );
// };

// export default CreateDepartment;