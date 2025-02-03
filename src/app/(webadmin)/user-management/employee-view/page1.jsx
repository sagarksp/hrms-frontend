'use client'
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  DatePicker,
  Select,
  Upload,
  Steps,
  Card,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Typography,
  Tooltip,
  notification,
message,
Modal
} from "antd";
import {
  InfoCircleOutlined,
  UploadOutlined,
  UserOutlined,
  SolutionOutlined,
  TeamOutlined,
  EditOutlined,
  SmileOutlined,
  DollarCircleOutlined,
  ClockCircleOutlined,
  FormOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  PlusOutlined,
  HourglassOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import axios from "axios";
import moment from "moment";
import { useRouter } from 'next/navigation';
import { getRoles } from "../../../api/roleService"; // Adjust the path as needed
import { getDepartments } from "../../../api/departmentService"; // Adjust the path as needed
import API_BASE_URL from "../../../../../config/config";
import { fetchShifts } from "@/app/api/hrms/shiftApi";
const { Option } = Select;
const { Step } = Steps;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const EmployeeWizard = ({onSuccess}) => {
  const router = useRouter();
  const [shifts, setShifts] = useState([]);
  const [locationss, setLocationss] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeCode, setSelectedEmployeeCode] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [locations, setLocations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = React.useState([]);
  const [avatar, setAvatar] = useState([]);
  const [fileinfo, setFilInfo] = useState([]);

  const [loading, setLoading] = useState(false);
  const [enableTempSchedule, setEnableTempSchedule] = useState(false); // State to manage checkbox state
const [fileList, setFileList] = useState({
    pan: [],
    adhar: [],
    photo: [],
  });
  const validateFile = (file, allowedTypes) => {
    const isAllowedType = allowedTypes.includes(file.type);
    if (!isAllowedType) {
      message.error(`${file.name} is not a valid file type.`);
      return false;
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2;
    if (!isLessThan2MB) {
      message.error(`${file.name} is larger than 2MB.`);
      return false;
    }

    return true;
  };

  // Handle file upload directly when file is selected
  const handleFileChange = async (type, info) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const isValid = info.fileList.every((file) => validateFile(file, allowedTypes));

    if (isValid) {
      const formData = new FormData();
      formData.append(type, info.file.originFileObj || info.file); // Use info.file directly if originFileObj is not available
      // Call the API directly after the file is selected
      try {
        const response = await axios.post('https://api.gtel.in/hrms/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Set file status to done
        setFileList({ ...fileList, [type]: info.fileList });
        message.success(`${type.toUpperCase()} uploaded successfully!`);
      } catch (error) {
        message.error(`Failed to upload ${type}.`);
      }
    }
  };
  useEffect(() => {
    const loadShifts = async () => {
      try {
        const fetchedShifts = await fetchShifts();
        console.log('fetchshift',fetchedShifts)
        setShifts(fetchedShifts);
      } catch (error) {
        message.error('Failed to fetch shift timings');
      }
    };

    loadShifts();
  }, []);


  useEffect(() => {
    fetchLocations();
}, []);



useEffect(() => {
    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hrms/location`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocationss(data.locations);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = async (value) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/hrms/dispensary/${value}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      form.setFieldsValue({ dispensaryName: data.disp.name }); // Update the dispensary name field
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      form.setFieldsValue({ dispensaryName: '' }); // Clear the dispensary name if there's an error
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await getRoles();
        // console.log("roleleeeee", rolesResponse.data.data);
        setRoles(rolesResponse.data.data);

        const departmentsResponse = await getDepartments();
        // console.log("departmentsResponse", departmentsResponse.data.data);
        setDepartments(departmentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
        // notification.error({ message: "Failed to fetch data" });
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, []);


const fetchLocations = async () => {
    try {
        const response = await axios.get('http://localhost:8000/hrms/locations'); // Adjust URL as per your backend route
        setLocations(response.data);
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
};

  useEffect(() => {
    // Fetch employee data from API
    axios.get(`https://api.gtel.in/noceye/api/v1/attendance`)
      .then(response => {
        // console.log('API Responseeeeeee:', response.data.data);

        // Create a set to store unique employee codes
        const uniqueEmployeeData = Array.from(new Set(response.data.data.map(emp => emp.EmployeeCode)))
          .map(code => {
            return response.data.data.find(emp => emp.EmployeeCode === code);
          });

        setEmployeeData(uniqueEmployeeData);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleEmployeeChange = (employeeCode) => {
    console.log('Selected Employee Code:', employeeCode);
    
    // Update form field value
    form.setFieldsValue({
      employeeCode,
    });
  
    const employee = employeeData.find(emp => emp.EmployeeCode === employeeCode);
    
    if (employee) {
      console.log('Selected Employee Details:', employee);
      setSelectedEmployee(employee);
      form.setFieldsValue({
        employeeName: employee.EmployeeName,
      });
    } else {
      console.log('Employee not found for code:', employeeCode);
      setSelectedEmployee(null);
      form.setFieldsValue({
        employeeName: '',
      });
      message.error('Employee not found');
    }
  };


//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/hrms/departments"
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//         message.error("Failed to fetch departments");
//       }
//     };

//     fetchDepartments();
//   }, []);

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/hrms/departments/${id}`);
      message.success('Department deleted successfully');
      // Optionally, update state or fetch departments again after deletion
    } catch (error) {
      console.error('Error deleting department:', error);
     
    }
  };


  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleChange = async (info) => {
   console.log('info',info)
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    //const path = avatar.map((url) =>url.path)
    //const paths = avatar.map(file => file.path);
    //console.log(paths)
    //form.setFieldsValue({ dispensaryName: paths}); // Update the dispensary name field

  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('files', file);
    // console.log(formData)
    try {

     const result = await axios.post(`${API_BASE_URL}/hrms/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  //  console.log(result.data.files)
  // setAvatar(result.data.files)
  setAvatar(prevAvatar => [...prevAvatar, ...result.data.files]);
   //setFilInfo(result.data.files);
   setFilInfo(prevFileInfo => [...prevFileInfo, ...result.data.files]);
      onSuccess();
    } catch (error) {
      onError(error);
    }
    form.setFieldsValue({ dispensaryName: avatar }); // Update the dispensary name field

  };
console.log("avatar", avatar)
  const showModal = () => {
    setIsModalVisible(true);
};

const handleOk = () => {
    setIsModalVisible(false);
};

const handleCancel = () => {
    setIsModalVisible(false);
};

const onLocationFinish = async (values) => {
  setLoading(true);
  try {
      const response = await axios.post('http://localhost:8000/hrms/locations/submit', values); // Adjust URL as per your backend route
      console.log('Location added:', response.data);
      message.success('Location added successfully!');
      fetchLocations(); // Fetch locations again after adding a new one
      form.resetFields(); // Clear the form input fields
  } catch (error) {
      console.error('Error adding location:', error);
      message.error('Failed to add location');
  } finally {
      setLoading(false);
  }
};
const next = () => {
  form
    .validateFields()
    .then(values => {
      console.log('template',values)
      console.log('Current Step:', currentStep);
      if (currentStep === 0) {
        const formData = new FormData();

        const {employeeCode,firstName,middleName,lastName,gender,category,dob,dateOfJoining,location,dispensaryName,biometricMachineLocation,profTaxLocation,metroOrNonMetro,avatar,employeeName} = values
        console.log("this is shabbir",values)
        formData.append('employeeCode',employeeCode)
        formData.append('firstName',firstName)
        formData.append('middleName',middleName)
        formData.append('lastName',lastName)
        formData.append('gender',gender)
        formData.append('category',category)
        formData.append('dob',dob)
        formData.append('dateOfJoining',dateOfJoining)
        formData.append('location',location)
        formData.append('dispensaryName',dispensaryName)
        formData.append('biometricMachineLocation',biometricMachineLocation)
        formData.append('profTaxLocation',profTaxLocation)
        formData.append('metroOrNonMetro',metroOrNonMetro)
        formData.append('avatar',JSON.stringify(avatar))
        formData.append('uploadFileInfo',JSON.stringify(fileinfo,null,2))
        formData.append('employeeName',employeeName)


const data = {
  employeeCode:formData.get('employeeCode'),
  firstName:formData.get('firstName'),
  middleName:formData.get('middleName'),
  lastName:formData.get('lastName'),
  gender:formData.get('gender'),
  category:formData.get('category'),
  dob:formData.get('dob'),
  dateOfJoining:formData.get('dateOfJoining'),
  location:formData.get('location'),
  dispensaryName:formData.get('dispensaryName'),
  biometricMachineLocation:formData.get('biometricMachineLocation'),
  profTaxLocation:formData.get('profTaxLocation'),
  metroOrNonMetro:formData.get('metroOrNonMetro'),
  avatar:formData.get('avatar'),
  uploadFileInfo:formData.get('uploadFileInfo'),
  employeeName:formData.get('employeeName')















}

console.log("object",formData.get('uploadFileInfo'))
console.log("object2",formData.get('uploadFileInfo'))
const uploadFileInfoString = formData.get('uploadFileInfo');
console.log('Raw string data:', uploadFileInfoString);

try {
  // Attempt to decode if needed
  const decodedString = decodeURIComponent(uploadFileInfoString);

  // Attempt to parse JSON
  const fileInfo = JSON.parse(decodedString);
  console.log('Decoded and parsed JSON data:', fileInfo);
} catch (error) {
  console.error('Error decoding or parsing:', error);
}


        



        axios.post(`${API_BASE_URL}/hrms/basicemployees`, data)
          .then(response => {
            console.log('Employee added:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error adding employee:', error);
          });
      } else if (currentStep === 1) {
        axios.post(`${API_BASE_URL}/hrms/employees`, values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }  else if (currentStep === 2) {
        axios.post(`${API_BASE_URL}/hrms/personal-details`, values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      } else if (currentStep === 4) {
        axios.post(`${API_BASE_URL}/hrms/financial-details`, values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }else if (currentStep === 5) {
        axios.post(`${API_BASE_URL}/hrms/requests`, values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }else if (currentStep === 6) {
        axios.post(`${API_BASE_URL}/hrms/shifts`, values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
    
      // }else if (currentStep === 9) {
      //   axios.post(`${API_BASE_URL}/hrms/users, values)
      //     .then(response => {
      //       console.log('Another API response:', response.data);
      //       setCurrentStep(currentStep + 1);
      //     })
      //     .catch(error => {
      //       console.error('Error with another API:', error);
      //     });
      }else {
        setCurrentStep(currentStep + 1);
      }
    })
    .catch(error => {
      console.error('Validation Failed:', error);
    });
};

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish =  () => {
    form
      .validateFields()
      .then(values => {
        axios.post(`${API_BASE_URL}/hrms/signup`, values)
          .then(response => {
            console.log('Employee created:', response.data);
          //  onSuccess(); // Notify the parent component of the successful submission
            form.resetFields(); // Reset the form fields
            router.push('/hrdepartment/staffview'); // Redirect to the desired route
          })
          .catch(error => {
            console.error('There was an error creating the employee!', error);
          });
      })
      .catch(error => {
        console.error('Validation Failed:', error);
      });
  };

  const checkboxOptions = [
    "Appraisal",
    "Appraisal Ultimate",
    "Attendance Regularization",
    "Confirmation",
    "Daily Working Hours",
    "Earning Deduction",
    "Employee Details",
    "Employee In-Out Details",
    "Expense",
    "Face App",
    "IncomeTax Declaration",
    "IncomeTax Proof",
    "Increment",
    "Increment Scale",
    "Job Manager",
    "Leave",
    "Leave Encashment",
    "SelfService Loan",
    "On Duty",
    "OT Entry",
    "OT Entry Custom",
    "Payroll Loan",
    "Peer",
    "Project Management",
    "Selfservice Permission",
    "Selfservice Permission FromTo",
    "Selfservice Separation",
    "Selfservice TDS Entry",
    "Selfservice TDS Proof Entry",
    "Employee Separation",
    "Shift Schedule Entry",
    "Timesheet Entry",
    "Multi Transfer",
    "Travel",
  ];

  const steps = [
    {
      title: "Basic Details",
      icon: (
        <UserOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item
    label="Employee Code"
    name="employeeCode"
    rules={[{ required: true, message: "Please enter Employee Code" }]}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select
        style={{ flex: 1 }}
        showSearch
        placeholder="Select an employee"
        onChange={handleEmployeeChange}
        value={form.getFieldValue('employeeCode')} // Link value to form field
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        notFoundContent="Employee not found"
      >
        {employeeData.map(emp => (
          <Option key={emp.EmployeeCode} value={emp.EmployeeCode}>
            {emp.EmployeeCode}
          </Option>
        ))}
      </Select>
      <Tooltip placement="right" title="Employee Code Imports From ESSL DB. Run reports -> Recalculate.">
        <InfoCircleOutlined style={{ marginLeft: 8 }} />
      </Tooltip>
    </div>
  </Form.Item>
    </Col>
        <Col span={12}>
        <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter First Name" }]}
              >
                <Input />
              </Form.Item>
        </Col>
      </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Middle Name" name="middleName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select Gender" }]}
              >
                <Select>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select Category" }]}
              >
                <Select>
                  <Option value="Vendor">General</Option>
                  <Option value="Higher">Higher</Option>
                  {/* Add other category options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date Of Birth"
                name="dob"
                rules={[
                  { required: true, message: "Please select Date of Birth" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of Joining"
                name="dateOfJoining"
                rules={[
                  { required: true, message: "Please select Date of Joining" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
        name="location"
        label="Select ESI Location"
        rules={[{ required: true, message: 'Please select a location!' }]}
      >
        <Select
          placeholder="Select a location"
          onChange={handleLocationChange}
          loading={loading}
        >
          {locationss.map(location => (
            <Option key={location._id} value={location._id}>
              {location.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
        name="dispensaryName"
        label="Dispensary Name"
      >
        <Input
          placeholder="Dispensary Name"
          readOnly
        />
      </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Biometric Machine Location"
                            name="biometricMachineLocation"
                        >
                            {/* <Select 
                                suffixIcon={
                                    <Tooltip title="Add Location">
                                        <PlusOutlined 
                                            onClick={showModal} 
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                width: '20px', 
                                                height: '20px', 
                                                borderRadius: '50%', 
                                                backgroundColor: '#a78a7f', 
                                                cursor: 'pointer',
                                                color: "white",
                                                boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
                                            }} 
                                        />
                                    </Tooltip>
                                }
                            >
                                {locations.map(location => (
                                    <Option key={location._id} value={location._id}>
                                        {location.name}
                                    </Option>
                                ))}
                            </Select> */}
                             <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Prof.Tax Location" name="profTaxLocation">
                            {/* <Select>
                                {locations.map(location => (
                                    <Option key={location._id} value={location._id}>
                                        {location.name}
                                    </Option>
                                ))}
                            </Select> */}
                             <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Modal
                    title="Add New Location"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                   <Form
                    form={form2}
                    layout="inline"
                    onFinish={onLocationFinish}
                >
                    <Form.Item
                        name="name"
                        label="Location Name"
                        rules={[
                            { required: true, message: 'Please enter the location name' },
                        ]}
                    >
                        <Input placeholder="Enter location name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add Location
                        </Button>
                    </Form.Item>
                </Form>
                 
                </Modal>
          <Row gutter={16}>
            {/* <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                // rules={[{ required: true, message: "Please enter Username" }]}
              >
                <Input />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="Metro/Non-Metro (TDS)"
                name="metroOrNonMetro"
                rules={[
                  {
                    required: true,
                    message: "Please select Metro or Non-Metro",
                  },
                ]}
              >
                <Select>
                  <Option value="Metro">Metro</Option>
                  <Option value="Non-Metro">Non-Metro</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Upload Photo:" name="avatar">
            <Upload
      // customRequest={customRequest}
      // showUploadList={false}
      // onChange={handleChange}
      // multiple
      fileList={fileList.files}
      onChange={(info) => handleFileChange('pan', info)}
      beforeUpload={() => false}
      multiple
    >
      <Button icon={<UploadOutlined />}>Select Joining Doc</Button>
    </Upload>
  
                </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                // rules={[{ required: true, message: "Please enter Password" }]}
              >
                <Input.Password 
                  name="password"
                  placeholder="Enter your password..."
                  />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item label="Essl Name" name="employeeName"  rules={[{ required: true, message: "Please enter Password" }]}>
          <Input placeholder="Employee Name" />
        </Form.Item>
            </Col>
           

           
          </Row>

        
        </div>
      ),
    },
    {
      title: "Employment",
      icon: (
        <SolutionOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Father Name" name="fatherName">
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="Department" name="department">
                <Select
                  style={{ width: 200 }}
                  placeholder="Select Department"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  {departments.map((dept) => (
                    <Option key={dept._id} value={dept.name}>
                      {dept.name}
                    </Option>
                  ))}
                </Select>
             
              </Form.Item>
            </Col> */}
               <Col span={12}>
              <Form.Item label="Designation" name="designation">
              <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
         
            <Col span={12}>
              <Form.Item label="Marital Status" name="maritalStatus">
                <Select>
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Divorced">Divorced</Option>
                  {/* Add other marital status options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ESIC Date of Joining" name="esicDateOfJoining">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Confirmation Period (Month)"
                name="confirmationPeriod"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Confirmation Date" name="confirmationDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Date of Anniversary" name="dateOfAnniversary">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Retirement Age" name="retirementAge">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Date of Retirement" name="dateOfRetirement">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="PF Account No." name="pfAccountNo">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ESI No." name="esiNo">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Grade" name="grade">
                <Select>
                  <Option value="grade1">Grade 1</Option>
                  <Option value="grade2">Grade 2</Option>
                  {/* Add other grade options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="No. Of Children" name="noOfChildren">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Cost Centre" name="costCentre">
                <Select>
                  <Option value="costCentre1">Cost Centre 1</Option>
                  <Option value="costCentre2">Cost Centre 2</Option>
                  {/* Add other cost centre options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Branch" name="branch">
                <Select>
                  <Option value="branch1">Branch 1</Option>
                  <Option value="branch2">Branch 2</Option>
                  {/* Add other branch options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="UAN NUMBER" name="uanNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="PAN/GIR No. (TDS)" name="panGirNo">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="EMP.PF (%)" name="empPf">
                <Input suffix="%" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Pension Fund (%)" name="pensionFund">
                <Input suffix="%" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Stop Payment" name="stopPayment">
                <Select>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                  {/* Add other options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="PF Date Of Joining" name="pfDateOfJoining">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Termination Date" name="terminationDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Bank Name" name="bankName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Location" name="location">
              <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Pay Mode" name="payMode">
              <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Senior Citizen" name="seniorCitizen">
                <Select>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                  {/* Add other options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Payroll Process" name="payrollProcess">
                <Select>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                  {/* Add other options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ITAX Regime Type" name="itaxRegimeType">
                <Select>
                  <Option value="New Regime">New Regime</Option>
                  <Option value="Old Regime">Old Regime</Option>
                  {/* Add other ITAX regime type options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Reporting Manager" name="reportingManager">
                <Input />
              </Form.Item>
            </Col>
            <Col>
      <Form.Item>
        <Upload
          fileList={fileList.emphistory}
          onChange={(info) => handleFileChange('emphistory', info)}
          beforeUpload={() => false} // Prevent auto-upload
          multiple

        >
          <Button icon={<UploadOutlined />}>Select Employment History</Button>
        </Upload>
      </Form.Item>
      </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Personal",
      icon: (
        <TeamOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Personal Email Id" name="personalEmail">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Blood Group" name="bloodGroup">
                <Select>
                  <Option value="O+">O+</Option>
                  <Option value="A+">A+</Option>
                  <Option value="B+">B+</Option>
                  {/* Add other blood group options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Address 1" name="address1">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address 2" name="address2">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Place" name="place">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="PIN Code" name="pinCode">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Personal Mobile No" name="personalMobileNo">
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="Email Id" name="email">
                <Input />
              </Form.Item>
            </Col> */}
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Print Cheque" name="printCheque">
                <Select>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                  {/* Add other options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bank Account Number" name="bankAccountNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Bank Branch Code" name="bankBranchCode">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Correspondence Address1"
                name="correspondenceAddress1"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Correspondence Address2"
                name="correspondenceAddress2"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Correspondence Place"
                name="correspondencePlace"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Correspondence City" name="correspondenceCity">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Correspondence Phone"
                name="correspondencePhone"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Correspondence Pin Code"
                name="correspondencePinCode"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Office Extension No." name="officeExtensionNo">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Office Mobile No." name="officeMobileNo">
                <Input />
              </Form.Item>
            </Col>
           
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Handicap" name="handicap">
                <Select>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                  {/* Add other options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
		  <Row gutter={16}>
      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.pan}
          onChange={(info) => handleFileChange('pan', info)}
          beforeUpload={() => false} // Prevent auto-upload
        >
          <Button icon={<UploadOutlined />}>Select PAN</Button>
        </Upload>
      </Form.Item>
      </Col>
      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.adhar}
          onChange={(info) => handleFileChange('adhar', info)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Aadhar</Button>
        </Upload>
      </Form.Item>
      </Col>
      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.photo}
          onChange={(info) => handleFileChange('photo', info)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Photo</Button>
        </Upload>
      </Form.Item>
      </Col>

      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.photo}
          onChange={(info) => handleFileChange('education', info)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Education</Button>
        </Upload>
      </Form.Item>
      </Col>

      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.photo}
          onChange={(info) => handleFileChange('voterid', info)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Voterid</Button>
        </Upload>
      </Form.Item>
      </Col>

      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.photo}
          onChange={(info) => handleFileChange('familycard', info)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select FamilyCard</Button>
        </Upload>
      </Form.Item>
      </Col>

      <Col>
      <Form.Item>
        <Upload
          fileList={fileList.photo}
          onChange={(info) => handleFileChange('cancelcheque', info)}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Cancel Cheque</Button>
        </Upload>
      </Form.Item>
      </Col>
    </Row>
        </div>
      ),
    },
    {
      title: "User Defined Field",
      icon: (
        <EditOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div style={{ textAlign: "center" }}>
          <h2>Review and Submit</h2>
          <p>Please review all the information and submit the form.</p>
        </div>
      ),
    },
    {
      title: "Salary Details",
      icon: (
        <DollarCircleOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Earning Details">
                <Form.Item label="FIXED BASIC" name="fixedBasic">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="ARREAR BASIC" name="arrearBasic">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Earnings Total" name="earningsTotal">
                  <InputNumber style={{ width: "100%" }}  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Deduction Details">
                <Form.Item label="INCOME TAX" name="incomeTax">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Deductions Total" name="deductionsTotal">
                  <InputNumber style={{ width: "100%" }}  />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Approval Matrix",
      icon: (
        <CheckSquareOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Priority"
                name="priority"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Select Manager"
                name="selectManager"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <Select>
                  <Option value="manager1">Manager 1</Option>
                  <Option value="manager2">Manager 2</Option>
                  {/* Add other manager options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="View Only"
                name="viewOnly"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Approval Must"
                name="approvalMust"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Approved Cancel Rights"
                name="approvedCancelRights"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {checkboxOptions.map((option, index) => (
              <Col span={6} key={index}>
                <Form.Item name={option} valuePropName="checked">
                  <Checkbox>{option}</Checkbox>
                </Form.Item>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      title: "Shift Details",
      icon: (
        <ClockCircleOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div style={{ textAlign: "center" }}>
       <Row gutter={16}>
  {/* Permanent Schedule Card */}
  <Col span={12}>
    <Card
      title={<Typography.Title level={4} style={{ textAlign: 'center', marginBottom: 0 }}>Permanent Scheduler</Typography.Title>}
      bordered={false}
      style={{ marginBottom: "16px" }}
    >
      <Form.Item
        label="Shift Name"
        name="shiftName"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Select
          defaultValue="Select a shift"
          style={{ width: '100%' }}
        >
          {shifts.map(shift => (
            <Option key={shift._id} value={shift._id}>
              {moment(shift.fromTime).format('HH:mm')} - {moment(shift.toTime).format('HH:mm')}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Date Range"
        name="dateRange"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>
    </Card>
  </Col>

  {/* Temporary Schedule Card */}
  <Col span={12}>
  <Card
    title={<Typography.Title level={4} style={{ textAlign: 'center', marginBottom: 0 }}>Temporary Scheduler</Typography.Title>}
    bordered={false}
    style={{ marginBottom: "16px" }}
  >
    <Row justify="space-between" align="middle">
      <Col span={16}>
        <Form.Item
          label="Shift Name"
          name="tempShiftName"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select
            defaultValue="Select a shift"
            style={{ width: '100%' }}
            disabled={!enableTempSchedule} // Disable if temporary scheduler is not enabled
          >
            {shifts.map(shift => (
              <Option key={shift._id} value={shift._id}>
                {moment(shift.fromTime).format('HH:mm')} - {moment(shift.toTime).format('HH:mm')}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Date Range"
          name="tempDateRange"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <RangePicker style={{ width: "100%" }} disabled={!enableTempSchedule} />
        </Form.Item>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <Form.Item>
          <Checkbox onChange={(e) => setEnableTempSchedule(e.target.checked)}>Enable</Checkbox>
        </Form.Item>
      </Col>
    </Row>
  </Card>
</Col>

</Row>


          <Row gutter={16} justify="center">
            <Col span={12}>
              <Card
                title="Employee Enroll Mapping"
                style={{
                  maxWidth: 600,
                  margin: "0 auto",
                  marginBottom: "16px",
                }}
              >
                <Form.Item
                  label="DELHI OFFICE"
                  name="delhiOffice"
                 
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
                <Form.Item
                  label="TDI LOCATION"
                  name="tdiLocation"
                
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
                <Form.Item
                  label="Sonipat"
                  name="sonipat"
                 
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
                <Form.Item
                  label="OP Jindal"
                  name="opJindal"
                 
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
                <Form.Item
                  label="OMAX"
                  name="omax"
                 
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
                <Form.Item
                  label="Metro View"
                  name="metroView"
                 
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
                <Form.Item
                  label="GISPL"
                  name="gispl"
                
                >
                  <Input placeholder="Device Enroll No" />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Week Off"
                style={{ maxWidth: 600, margin: "0 auto" }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Week days" />
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Half day" />
                  </Col>
                </Row>
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <Row gutter={16} key={day}>
                    <Col span={12}>
                      <Form.Item name={day.toLowerCase()}>
                        <Checkbox>{day}</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={`${day.toLowerCase()}HalfDay`}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Leave Details",
      icon: (
        <CalendarOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <div style={{ textAlign: "center" }}>
          <h2>Review and Submit</h2>
          <p>Please review all the information and submit the form.</p>
        </div>
      ),
    },
    {
      title: "Login Details",
      icon: (
        <CalendarOutlined
          style={{
            background: "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <>
        <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Username"
            name="username"
            // rules={[{ required: true, message: "Please enter Username" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter Password" }]}
          >
            <Input.Password 
              name="password"
              placeholder="Enter your password..."
              />
          </Form.Item>
        </Col>
      </Row>
        <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter Username" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
             rules={[{ required: true, message: "Please enter Password" }]}
          >
            <Input.Password 
              name="password"
              placeholder="Enter your password..."
              />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="department"
                    label="Department"
                    rules={[
                      {
                        required: true,
                        message: "Please select your department!",
                      },
                    ]}
                  >
                    <Select placeholder="Select a department">
                      {departments.map((department) => (
                        <Option key={department._id} value={department._id}>
                          {department.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                      { required: true, message: "Please select your role!" },
                    ]}
                  >
                    <Select placeholder="Select a role">
                      {roles.map((role) => (
                        <Option key={role._id} value={role._id}>
                          {role.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
      </>
      ),
    },
  ];

  return (

      <div style={{paddingBottom:"30px"}}>
        <Steps
          current={currentStep}
          style={{ background: "#f8edeb", padding: "40px", width: "100%" }}
        >
          {steps.map((item, index) => (
            <Step
              key={item.title}
              icon={item.icon}
              onClick={() => goToStep(index)}
            />
          ))}
        </Steps>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            top: -35,
            right: 6,
          }}
        >
          {steps.map((item, index) => (
            <Text
              key={item.title}
              style={{
                flex: "1",
                textAlign: "center",
                fontWeight: 500,
                color: "#a78a7f",
              }}
            >
              {item.title}
            </Text>
          ))}
        </div>
        <br />
        <Form
          form={form}
          name="employee_form"
        //   initialValues={{ gender: "Male" }}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {steps[currentStep].content}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
  
  );
};

export default EmployeeWizard;
