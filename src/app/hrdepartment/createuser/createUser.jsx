// src/components/EmployeeWizard.js
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
import Layout from "../components/layout/Layout";
import axios from "axios";
import moment from "moment";
const { Option } = Select;
const { Step } = Steps;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const EmployeeWizard = () => {
  const [shifts, setShifts] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [locations, setLocations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enableTempSchedule, setEnableTempSchedule] = useState(false); // State to manage checkbox state

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hrms/shifts');
        setShifts(response.data);
      } catch (error) {
        message.error('Failed to fetch shift timings');
      }
    };

    fetchShifts();
  }, []);


  useEffect(() => {
    fetchLocations();
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
    axios.get('https://api.gtel.in/noceye/api/v1/attendance')
      .then(response => {
        console.log('API Response:', response.data.data);

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
    const employee = employeeData.find(emp => emp.EmployeeCode === employeeCode);
    
    if (employee) {
      setSelectedEmployee(employee);
      form.setFieldsValue({
        employeeName: employee.EmployeeName
      });
    } else {
      // Handle case where employee does not exist
      setSelectedEmployee(null); // Optionally clear selected employee state
      form.setFieldsValue({
        employeeName: '' // Clear the employee name field or handle accordingly
      });
      message.error('Employee not found');
    }
  };
  


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/hrms/departments"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        message.error("Failed to fetch departments");
      }
    };

    fetchDepartments();
  }, []);

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
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
        setAvatar(info.file.originFileObj);
    }
};

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
      console.log('Current Step:', currentStep);
      if (currentStep === 0) {
        axios.post('https://api.gtel.in/hrms/basicemployees', values)
          .then(response => {
            console.log('Employee added:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error adding employee:', error);
          });
      } else if (currentStep === 1) {
        axios.post('https://api.gtel.in/hrms/employees', values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }  else if (currentStep === 2) {
        axios.post('https://api.gtel.in/hrms/personal-details', values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      } else if (currentStep === 4) {
        axios.post('https://api.gtel.in/hrms/financial-details', values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }else if (currentStep === 5) {
        axios.post('https://api.gtel.in/hrms/requests', values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }else if (currentStep === 6) {
        axios.post('https://api.gtel.in/hrms/shifts', values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      }else if (currentStep === 8) {
        axios.post('https://api.gtel.in/hrms/roles', values)
          .then(response => {
            console.log('Another API response:', response.data);
            setCurrentStep(currentStep + 1);
          })
          .catch(error => {
            console.error('Error with another API:', error);
          });
      // }else if (currentStep === 9) {
      //   axios.post('https://api.gtel.in/hrms/users', values)
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
        axios.post('https://api.gtel.in/hrms/users', values)
          .then(response => {
            console.log('Employee created:', response.data);
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
              <Tooltip placement="right" title="Employee Code Imports From ESSL DB. Run reports -> Recalculate. ">
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
                  <Option value="Vendor">Vendor</Option>
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
                label="ESI Location"
                name="esiLocation"
                rules={[
                  { required: true, message: "Please select ESI Location" },
                ]}
              >
                <Select>
                  <Option value="Delhi">Delhi</Option>
                  <Option value="Mumbai">Mumbai</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ESI Dispensary"
                name="esiDispensary"
                rules={[
                  { required: true, message: "Please select ESI Dispensary" },
                ]}
              >
                <Select>
                  <Option value="designation1">Designation 1</Option>
                  <Option value="designation2">Designation 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Biometric Machine Location"
                            name="biometricMachineLocation"
                        >
                            <Select 
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
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Prof.Tax Location" name="profTaxLocation">
                            <Select>
                                {locations.map(location => (
                                    <Option key={location._id} value={location._id}>
                                        {location.name}
                                    </Option>
                                ))}
                            </Select>
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
                // rules={[{ required: true, message: "Please enter Password" }]}
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
            <Form.Item label="Essl Name" name="employeeName"  rules={[{ required: true, message: "Please enter Password" }]}>
          <Input placeholder="Employee Name" />
        </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Avatar" name="avatar">
                    <Upload maxCount={1} onChange={handleAvatarChange}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Metro/Non-Metro (TDS)"
                name="esiDispensary"
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
            <Col span={12}>
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
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Designation" name="designation">
                <Select>
                  <Option value="designation1">Designation 1</Option>
                  <Option value="designation2">Designation 2</Option>
                  {/* Add other designation options */}
                </Select>
              </Form.Item>
            </Col>
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
                <Select>
                  <Option value="location1">Location 1</Option>
                  <Option value="location2">Location 2</Option>
                  {/* Add other location options */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Pay Mode" name="payMode">
                <Select>
                  <Option value="mode1">Mode 1</Option>
                  <Option value="mode2">Mode 2</Option>
                  {/* Add other pay mode options */}
                </Select>
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
            <Col span={12}>
              <Form.Item label="ESIC Date of Joining" name="esicDateOfJoining">
                <DatePicker style={{ width: "100%" }} />
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
              <Form.Item label="Email Id" name="email">
                <Input />
              </Form.Item>
            </Col>
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
              <Form.Item label="Personal Mobile No" name="personalMobileNo">
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
            <Col span={12}>
              <Form.Item label="Office Extension No." name="officeExtensionNo">
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
                  <InputNumber style={{ width: "100%" }} disabled />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Deduction Details">
                <Form.Item label="INCOME TAX" name="incomeTax">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Deductions Total" name="deductionsTotal">
                  <InputNumber style={{ width: "100%" }} disabled />
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
      title: "SelfService Details",
      icon: (
        <FormOutlined
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
            <Col span={12}>
              <Card
                title="Self Service Role"
                bordered={false}
                style={{ marginBottom: "16px" }}
              >
                <Form.Item
                  label="Role"
                  name="role"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Select placeholder="--Select--">
                    <Option value="role1">Role 1</Option>
                    <Option value="role2">Role 2</Option>
                    {/* Add other role options as needed */}
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                title="Declaration Activation"
                bordered={false}
                style={{ marginBottom: "16px" }}
              >
                <Form.Item
                  label="Select"
                  name="declarationActivation"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Select placeholder="--Select--">
                    <Option value="option1">Option 1</Option>
                    <Option value="option2">Option 2</Option>
                    {/* Add other options as needed */}
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card
                title="Activate Punch"
                bordered={false}
                style={{ marginBottom: "16px" }}
              >
                <Form.Item
                  label="Active"
                  name="activatePunch"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Radio.Group>
                    <Radio value="active">Active</Radio>
                    <Radio value="inactive">Inactive</Radio>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Col>
          </Row>
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
            // rules={[{ required: true, message: "Please enter Password" }]}
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
            // rules={[{ required: true, message: "Please enter Username" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            // rules={[{ required: true, message: "Please enter Password" }]}
          >
            <Input.Password 
              name="password"
              placeholder="Enter your password..."
              />
          </Form.Item>
        </Col>
      </Row>
      </>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "40px" }}>
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
          initialValues={{ gender: "Male" }}
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
    </Layout>
  );
};

export default EmployeeWizard;
