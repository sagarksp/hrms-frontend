'use client';

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { getRoles } from "../../app/api/roleService";
import { getDepartments } from "../../app/api/departmentService";
import API_BASE_URL from "../../../config/config";

const BasicDetails = () => {
  const { step } = useSelector((state) => state.regForm);

  const [locations, setLocations] = useState([]);
  const [dispensaryNames, setDispensaryNames] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const validationSchema = Yup.object().shape({
    employeeCode: Yup.string().required("Please select Employee Code"),
    firstName: Yup.string().required("Please enter First Name"),
    middleName: Yup.string(),
    lastName: Yup.string(),
    employeeName: Yup.string().required("Please enter Employee Name"),
    nextEmployeeCode: Yup.string().required("Please enter Next Employee Code"),
    gender: Yup.string().required("Please select Gender"),
    category: Yup.string().required("Please select Category"),
    dob: Yup.date().required("Please select Date of Birth"),
    dateOfJoining: Yup.date().required("Please select Date of Joining"),
    location: Yup.string().required("Please select a Location"),
    dispensaryName: Yup.string(),
    metroOrNonMetro: Yup.string().required("Please select Metro or Non-Metro"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsResponse, areasResponse, rolesResponse, departmentsResponse, employeesResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/hrms/location`).then((res) => res.json()),
            fetch(`${API_BASE_URL}/hrms/area`).then((res) => res.json()),
            getRoles(),
            getDepartments(),
            axios.get(`${API_BASE_URL}/hrms/company/show`),
          ]);

        setLocations(locationsResponse.locations || []);
        setDispensaryNames(areasResponse.area || []);
        setRoles(rolesResponse.data.data || []);
        setDepartments(departmentsResponse.data.data || []);

        const uniqueEmployeeData = Array.from(
          new Set(employeesResponse.data.data.map((emp) => emp.companyName))
        ).map((code) => employeesResponse.data.data.find((emp) => emp.companyName === code));
        setEmployeeData(uniqueEmployeeData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLocationChange = async (value) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/despensary/${value}`);
      if (response.ok) {
        const data = await response.json();
        setDispensaryNames(data.disp);
      } else {
        throw new Error("Failed to fetch dispensary names");
      }
    } catch (error) {
      console.error("Error fetching dispensary names:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeChange = async (employeeCode) => {
    const employee = employeeData.find((emp) => emp.companyName === employeeCode);
    if (employee) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/hrms/next-employee-code/?prefix=${employee.alias}`
        );
        console.log("Next Employee Code: ", response.data.nextEmployeeCode);
      } catch (error) {
        console.error("Error fetching next employee code:", error);
      }
    } else {
      message.error("Employee not found");
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFileList(files);
      toast.success(`${files.length} file(s) uploaded`);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    toast.success("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Company Name:
          </label>
          <select
            {...register("employeeCode")}
            onChange={(e) => handleEmployeeChange(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select an employee</option>
            {employeeData.map((emp) => (
              <option key={emp.companyName} value={emp.companyName}>
                {emp.companyName}
              </option>
            ))}
          </select>
          {errors.employeeCode && <p className="text-red-500 text-sm">{errors.employeeCode.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> First Name:
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full rounded-md border px-3 py-2"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Middle Name:</label>
          <input
            type="text"
            {...register("middleName")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Last Name:</label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Essl Name:
          </label>
          <input
            type="text"
            {...register("employeeName")}
            className="w-full rounded-md border px-3 py-2"
          />
          {errors.employeeName && <p className="text-red-500 text-sm">{errors.employeeName.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Next Emp Code:
          </label>
          <input
            type="text"
            {...register("nextEmployeeCode")}
            className="w-full rounded-md border px-3 py-2 bg-gray-50"
          />
          {errors.nextEmployeeCode && <p className="text-red-500 text-sm">{errors.nextEmployeeCode.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Gender:
          </label>
          <select
            {...register("gender")}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Category:
          </label>
          <select
            {...register("category")}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="Higher">Higher</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Date Of Birth:
          </label>
          <input
            type="date"
            {...register("dob")}
            className="w-full rounded-md border px-3 py-2"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Date of Joining:
          </label>
          <input
            type="date"
            {...register("dateOfJoining")}
            className="w-full rounded-md border px-3 py-2"
          />
          {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <span className="text-red-500">*</span> Select ESI Location:
          </label>
          <select
            {...register("location")}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Dispensary Name:</label>
          <select
            {...register("dispensaryName")}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select a Dispensary</option>
            {dispensaryNames.map((disp) => (
              <option key={disp._id} value={disp._id}>
                {disp.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          <span className="text-red-500">*</span> Metro/Non-Metro (TDS):
        </label>
        <select
          {...register("metroOrNonMetro")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select Metro/Non-Metro</option>
          <option value="Metro">Metro</option>
          <option value="Non-Metro">Non-Metro</option>
        </select>
        {errors.metroOrNonMetro && <p className="text-red-500 text-sm">{errors.metroOrNonMetro.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload Photo:</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;




