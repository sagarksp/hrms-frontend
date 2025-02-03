'use client';
import React, { useState, useEffect } from "react";
import { Form, Button, Steps, Typography, message } from "antd";
import axios from "axios";
import { getRoles } from "../../app/api/roleService"; 
import { getDepartments } from "../../app/api/departmentService";
import API_BASE_URL from "../../../config/config";
import { useSelector } from "react-redux";
import { steps } from './Data';
import BasicDetails from "./BasicDetails";
import Employment from "./Employment";
import Personal from "./Personal";
import SalaryDetails from "./SalaryDetails";
import ApprovalMatrix from "./ApprovalMatrix";
import ShiftDetails from "./ShiftDetails";
import LoginDetails from "./LoginDetails";
import Review from "./Review";

const RenderSteps = ({ onSuccess }) => {
  const { step } = useSelector((state) => state.regForm);

  const [locationss, setLocationss] = useState([]);
  const [dispname, setDispName] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeCode, setSelectedEmployeeCode] = useState(null);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    const fetchArea = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hrms/area`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDispName(data.area);
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
      setDispName(data.disp);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await getRoles();
        setRoles(rolesResponse.data.data);

        const departmentsResponse = await getDepartments();
        setDepartments(departmentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/hrms/company/show`)
      .then(response => {
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
    setSelectedEmployeeCode(employeeCode);
    const employee = employeeData.find(emp => emp.companyName === employeeCode);
    if (employee) {
      setSelectedEmployee(employee);
      try {
        const response = await axios.get(`${API_BASE_URL}/hrms/next-employee-code/?prefix=${employee.alias}`);
        form.setFieldsValue({
          nextEmployeeCode: response.data.nextEmployeeCode
        });
      } catch (error) {
        form.setFieldsValue({
          nextEmployeeCode: ''
        });
      }
    } else {
      setSelectedEmployee(null);
      form.setFieldsValue({
        nextEmployeeCode: ''
      });
      message.error('Employee not found');
    }
  };

  return (
    <div className="w-[1244px]">
      <div className="relative mb-2 flex md:w-full justify-center">
        {steps.map((item) => (
          <div className="flex flex-col items-center" key={item.id}>
            <button
              className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                item.id
              )}
            </button>
            <p
              className={`mt-2 text-xs text-center ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <BasicDetails 
          employeeData={employeeData}
          handleEmployeeChange={handleEmployeeChange}
          locationss={locationss}
          handleLocationChange={handleLocationChange}
          dispname={dispname}
        />
      )}
      {step === 2 && <Employment />}
      {step === 3 && <Personal />}
      {step === 4 && <SalaryDetails />}
      {step === 5 && <ApprovalMatrix />}
      {step === 6 && <ShiftDetails />}
      {step === 7 && <LoginDetails />}
      {step === 8 && <Review />}
    </div>
  );
};

export default RenderSteps;
