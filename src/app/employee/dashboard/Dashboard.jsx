"use client";
import React from "react";
import { useState, useEffect } from "react";
// import Layout from "@/layouts/hrms/Layout";
import Layout from "../../../layouts/hrms/Layout";
import MonthlyAttendanceCalendars from "./MonthlyAttendanceCalendars";
import "react-calendar/dist/Calendar.css";
import QuickLinksCard from "./QuickLinksCard";
import MyTable from "./MyTable";
import styles from "./style.module.css";
import API_BASE_URL from "../../../../config/config";
import Messages from "./messages";
import MessagingCard from "./MessagingCard";
import EmployeeCard from './EmployeeCard';
import CustomSpin from "./CustomSpin";



const Dashboard = ({ accessData }) => {
  console.log("dashboard", accessData);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const url = `${API_BASE_URL}/hrms/authdata`;
       
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
      
        if (response.ok) {
          const result = await response.json();
          const employeeData = result.data[0];
     
          
          const { email, department, basicemployees, role, uploadFileInfo } = employeeData;



     
          setUserData({
            email,
            department: department?.name,
            role: role?.name,
            firstName: basicemployees?.firstName,
            lastName: basicemployees?.lastName,
            employeeCode: basicemployees?.employeeCode,
            role:department?.roles?.name,
            uploadFileInfo: basicemployees?.uploadFileInfo[0]?.path,
            profileImage:basicemployees?.profileImage
          })
         
          setSelectedEmployee( basicemployees?.employeeCode)
          
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Something went wrong");

        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  if (loading) return <CustomSpin />;


  return (
    <Layout>
      <>
        <div className="container max-w-full" style={{ backgroundColor: "#F2F2F7", padding: "20px" }} >
          <div className={styles.cardContainer}>
           
            <EmployeeCard userData={userData} />
            {/* <Messages /> */}
            <MessagingCard/>

            <QuickLinksCard className={styles.quickLinksCard} employeeName={userData}/>
          </div>

          <br />
          <MyTable selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
          <br />
        
          <div style={{ paddingBottom: "40px" }}>
            <MonthlyAttendanceCalendars selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}/>
          </div>


        </div>
      </>
    </Layout>
  );
};

export default Dashboard;










