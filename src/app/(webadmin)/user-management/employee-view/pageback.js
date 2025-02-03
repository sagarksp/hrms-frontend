'use client'
import React, { useState, useEffect } from "react";
import {Form,Button,Steps,Typography,message} from "antd";
import {UserOutlined,SolutionOutlined,TeamOutlined,EditOutlined,DollarCircleOutlined,
       ClockCircleOutlined,CalendarOutlined,CheckSquareOutlined} from "@ant-design/icons";

import axios from "axios";
import { getRoles } from "../../../api/roleService"; 
import { getDepartments } from "../../../api/departmentService";
import API_BASE_URL from "../../../../../config/config";
import { useRouter } from 'next/navigation';


import BasicDetailsStep from "./BasicDetailsStep";
import EmploymentForm from './EmploymentForm';
import PersonalStepContent from './PersonalStepContent'; 
import SalaryDetailsContent from './SalaryDetailsContent';
import ApprovalMatrixContent from './ApprovalMatrixContent';
import ShiftDetailsContent from './ShiftDetailsContent';
import LoginDetailsContent from "./LoginDetailsContent";
import StepsForm from "./StepsForm";



const EmployeeWizard = ({ onSuccess }) => {
  const router = useRouter();

  const [shifts, setShifts] = useState([]);
  const [locationss, setLocationss] = useState([]);
  const [dispname,setDispName] = useState([]);
  const [area, setArea] = useState([]);

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
  const [ifscCode, setIfscCode] = useState('');
  const [error, setError] = useState(null);

  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    branchName: '',
  });
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
  const fetchBankDetails = async (ifsc) => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
      console.log(response.data.BANK)

      setBankDetails({
        bankName: response.data.BANK,
        branchName: response.data.BRANCH,
      });
      form.setFieldsValue({
        bankName: response.data.BANK
      });
      form.setFieldsValue({
        branch: response.data.BRANCH
      });
      setError(null); // Reset error if any
    } catch (err) {
      setError('Invalid IFSC Code or unable to fetch data');
      setBankDetails({ bankName: '', branchName: '' });
    }
  };
  const handleIfscChange = (e) => {
    const code = e.target.value.toUpperCase();
    setIfscCode(code);

    // Call API only if IFSC code has 11 characters
    if (code.length === 11) {
      fetchBankDetails(code);
    } else {
      setBankDetails({ bankName: '', branchName: '' });
      setError(null);
    }
  };
  const handleFileChange = async (type, info) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const isValid = info.fileList.every((file) => validateFile(file, allowedTypes));

    if (isValid) {
      const formData = new FormData();
      //console.log(object)
      formData.append(type, info.file.originFileObj || info.file); // Use info.file directly if originFileObj is not available
      // Call the API directly after the file is selected
      try {
        const response = await axios.post('https://api.gtel.in/hrms/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Set file status to done
        console.log(response.data.files[type])
        setFileList({ ...fileList, [type]: info.fileList });
        setFilInfo(response.data.files[type])
        message.success(`${type.toUpperCase()} uploaded successfully!`);
      } catch (error) {
        message.error(`Failed to upload ${type}.`);
      }
    }
  };
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/hrms/shift');
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

  useEffect(() => {
    // Fetch locations
    const fetchArea = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hrms/area`);
        console.log("area")
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArea(data.area);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchArea();
  }, []);

  const handleLocationChange = async (value) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/hrms/despensary/${value}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDispName(data.disp)
      //console.log('test',dispname)
      //form.setFieldsValue({ dispensaryName: data.disp.name }); // Update the dispensary name field
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      //form.setFieldsValue({ dispensaryName: '' }); // Clear the dispensary name if there's an error
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
    axios.get(`${API_BASE_URL}/hrms/company/show`)
      .then(response => {
        // console.log('API Responseeeeeee:', response.data.data);

        // Create a set to store unique employee codes
        const uniqueEmployeeData = Array.from(new Set(response.data.data.map(emp => emp.companyName)))
          .map(code => {
            return response.data.data.find(emp => emp.companyName === code);
          });

        setEmployeeData(uniqueEmployeeData);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleEmployeeChange = async (employeeCode) => {
    console.log('Selected Employee Code:', employeeCode); // Log the selected employee code
    setSelectedEmployeeCode(employeeCode); // Update selected employee code

    const employee = employeeData.find(emp => emp.companyName === employeeCode);

    if (employee) {
      console.log('Selected Employee Details:', employee); // Log the selected employee details
      setSelectedEmployee(employee);

      try {
        const response = await axios.get(`${API_BASE_URL}/hrms/next-employee-code/?prefix=${employee.alias}`); // Adjust URL as per your backend route
        setLocations(response.data);
        console.log("nextCode", response)
        form.setFieldsValue({
          nextEmployeeCode: response.data.nextEmployeeCode
        });
      } catch (error) {
        form.setFieldsValue({
          nextEmployeeCode: '' // Clear the employee name field or handle accordingly
        });
      }
    } else {
      console.log('Employee not found for code:', employeeCode); // Log when employee is not found
      // Handle case where employee does not exist
      setSelectedEmployee(null); // Optionally clear selected employee state
      form.setFieldsValue({
        nextEmployeeCode: '' // Clear the employee name field or handle accordingly
      });
      message.error('Employee not found');
    }
  };


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
    console.log('info', info)
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

    form.validateFields()
    .then(values => {
        console.log('template', values)
        console.log('Current Step:', currentStep);

        if (currentStep === 0) {
          console.log("suraj data-->")
          const formData = new FormData();
          console.log(values,"hi")

          const { employeeCode, nextEmployeeCode,firstName, middleName, lastName, gender, category, dob, dateOfJoining, location, dispensaryName, biometricMachineLocation, profTaxLocation, metroOrNonMetro, avatar, employeeName } = values
          //console.log("this is shabbir",values)

          console.log("suraj data-->2")
          formData.append('employeeCode', employeeCode)
          formData.append('nextEmployeeCode',nextEmployeeCode)
          formData.append('firstName', firstName)
          formData.append('middleName', middleName)
          formData.append('lastName', lastName)
          formData.append('gender', gender)
          formData.append('category', category)
          formData.append('dob', dob)
          formData.append('dateOfJoining', dateOfJoining)
          formData.append('location', location)
          formData.append('dispensaryName', dispensaryName)
          formData.append('biometricMachineLocation', biometricMachineLocation)
          formData.append('profTaxLocation', profTaxLocation)
          formData.append('metroOrNonMetro', metroOrNonMetro)
          formData.append('avatar', JSON.stringify(avatar))
          formData.append('uploadFileInfo', JSON.stringify(fileinfo, null, 2))
          formData.append('employeeName', employeeName)


          const data = {
            employeeCode: formData.get('employeeCode'),
            nextEmployeeCode:formData.get('nextEmployeeCode'),
            firstName: formData.get('firstName'),
            middleName: formData.get('middleName'),
            lastName: formData.get('lastName'),
            gender: formData.get('gender'),
            category: formData.get('category'),
            dob: formData.get('dob'),
            dateOfJoining: formData.get('dateOfJoining'),
            location: formData.get('location'),
            dispensaryName: formData.get('dispensaryName'),
            biometricMachineLocation: formData.get('biometricMachineLocation'),
            profTaxLocation: formData.get('profTaxLocation'),
            metroOrNonMetro: formData.get('metroOrNonMetro'),
            avatar: formData.get('avatar'),
            uploadFileInfo: formData.get('uploadFileInfo'),
            employeeName: formData.get('employeeName')
          }

          console.log("object", formData.get('uploadFileInfo'))
          console.log("object2", formData.get('uploadFileInfo'))
          const uploadFileInfoString = formData.get('uploadFileInfo');
          console.log('Raw string data:', uploadFileInfoString);

         console.log('1235')

          try {
            // Attempt to decode if needed
            const decodedString = decodeURIComponent(uploadFileInfoString);
            console.log('1234')

            // Attempt to parse JSON
            const fileInfo = JSON.parse(decodedString);
            console.log('Decoded and parsed JSON data:', fileInfo);
          } catch (error) {
            console.error('Error decoding or parsing:', error);
          }



         console.log(data,'123su')


          axios.post(`${API_BASE_URL}/hrms/basicemployees`, data)
            .then(response => {
              console.log('Employee added:', response.data);
              setCurrentStep(currentStep + 1);
              console.log('1234 call')
            })
            .catch(error => {
              console.error('Error adding employee:', error);
              console.log(data,'123err')
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
        } else if (currentStep === 2) {
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
        } else if (currentStep === 5) {
          axios.post(`${API_BASE_URL}/hrms/requests`, values)
            .then(response => {
              console.log('Another API response:', response.data);
              setCurrentStep(currentStep + 1);
            })
            .catch(error => {
              console.error('Error with another API:', error);
            });
        } else if (currentStep === 6) {
          axios.post(`${API_BASE_URL}/hrms/shifts`, values)
            .then(response => {
              console.log('Another API response:', response.data);
              setCurrentStep(currentStep + 1);
            })
            .catch(error => {
              console.error('Error with another API:', error);
            });
        } else {
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

  const onFinish = () => {
    form
      .validateFields()
      .then(values => {
        axios.post(`${API_BASE_URL}/hrms/signup`, values)
          .then(response => {
            console.log('Employee created:', response.data);
            //onSuccess(); // Notify the parent component of the successful submission
            form.resetFields(); // Reset the form fields
            router.push('/hrdepartment/staffview');
          })
          .catch(error => {
            console.error('There was an error creating the employee!', error);
          });
      })
      .catch(error => {
        console.error('Validation Failed:', error);
      });
  };





  const steps = [
    {
      title: "Basic Details",
      icon: (
        <UserOutlined
          style={{
            background: currentStep === 0 ? "#1890ff" : "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <BasicDetailsStep
          employeeData={employeeData}
          selectedEmployeeCode={selectedEmployeeCode}
          handleEmployeeChange={handleEmployeeChange}
          locationss={locationss}
          handleLocationChange={handleLocationChange}
          loading={loading}
          dispname={dispname}
          area={area}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form2={form2}
          onLocationFinish={onLocationFinish}
          handleFileChange={handleFileChange}
          fileList={fileList}
        />
      ),
    },
    {
      title: "Employment",
      icon: (
        <SolutionOutlined
          style={{
            background: currentStep === 1 ? "#1890ff" : "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <EmploymentForm 
          area={area} 
          fileList={fileList} 
          handleFileChange={handleFileChange}
        />
      ),
    },
    {
      title: "Personal",
      icon: (
        <TeamOutlined
          style={{
            background: currentStep === 2 ? "#1890ff" : "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <PersonalStepContent
          fileList={fileList}
          handleFileChange={handleFileChange}
          ifscCode={ifscCode}
          handleIfscChange={handleIfscChange}
          bankDetails={bankDetails}
        />
      ),
    },
    {
      title: "User Defined Field",
      icon: (
        <EditOutlined
          style={{
            background: currentStep === 3 ? "#1890ff" : "#a78a7f",
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
      title: 'Salary Details',
      icon: (
        <DollarCircleOutlined
          style={{
            background: currentStep === 4 ? '#1890ff' : '#a78a7f',
            padding: '15px',
            borderRadius: '50%',
            color: 'white',
          }}
        />
      ),
      content: <SalaryDetailsContent />, // Use the new component here
    },
    {
      title: "Approval Matrix",
      icon: (
        <CheckSquareOutlined
          style={{
            background: currentStep === 5 ? "#1890ff" : "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: <ApprovalMatrixContent />, // Use the new component here
    },
    {
      title: "Shift Details",
      icon: (
        <ClockCircleOutlined
          style={{
            background: currentStep === 6 ? "#1890ff" : "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: (
        <ShiftDetailsContent
          shifts={shifts}
          enableTempSchedule={enableTempSchedule}
          setEnableTempSchedule={setEnableTempSchedule}
        />
      ),
    },
    {
      title: "Leave Details",
      icon: (
        <CalendarOutlined
          style={{
            background: currentStep === 7 ? "#1890ff" : "#a78a7f",
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
            background: currentStep === 8 ? "#1890ff" : "#a78a7f",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
          }}
        />
      ),
      content: <LoginDetailsContent departments={departments} roles={roles} />,
    },
  ];

  

  return (
<>

    <StepsForm
    steps={steps}
    currentStep={currentStep}
    form={form}
    onFinish={onFinish}
    prev={prev}
    next={next}
    goToStep={goToStep}
  />
 </>
  );
};

export default EmployeeWizard;
