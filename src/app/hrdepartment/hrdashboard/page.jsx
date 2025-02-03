'use client'
import React, { useEffect, useState } from "react";
import { Table, Spin, DatePicker, Card, Row, Col, Modal, Select } from "antd";
import axios from "axios";
import moment from "moment";
import dynamic from "next/dynamic";
import styles from "./CustomSpin.module.css"; // Import CSS module styles
const { RangePicker } = DatePicker; // Add this line to import RangePicker

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import Layout from "../components/layout/Layout";
// import MyTable from ""
// import MonthlyAttendenceCalendars from "../../employee/dashboard/MonthlyAttendanceCalendars";
import Image from "next/image";
const { Option } = Select;

const CustomSpin = () => (
  <div className={styles["custom-spin-container"]}>
    <Image
      src="https://www.gtel.in/wp-content/uploads/2019/07/logo.png"
      alt="Loading"
      className={`${styles["custom-spin-img"]} ${styles["pulse-animation"]}`}
      width={100} // Set the width of the image
      height={100} // Set the height of the image
    />
    <p>Loading...</p>
  </div>
);

const AttendanceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MM-YYYY")
  );
  const [totals, setTotals] = useState({});
  const [defaultDate, setDefaultDate] = useState(moment());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDateTotals, setSelectedDateTotals] = useState({
    totalLate: 0,
    totalPresent: 0,
    totalAbsent: 0,
    totalWeeklyOffPresent: 0, // Initialize totalWeeklyOffPresent
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false); // State for location-wise modal
  const [isPresentModalVisible, setIsPresentModalVisible] = useState(false); // State for present modal
  const [isAbsentModalVisible, setIsAbsentModalVisible] = useState(false); // State for absent modal
  const [modalWidth, setModalWidth] = useState(800); // Initial width, adjust as needed
  const [selectedLocationData, setSelectedLocationData] = useState([]); // State to hold data for the selected location

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.gtel.in/noceye/api/v1/attendance"
        );
        // console.log("API Data:", response.data.data);

        // Transform data to include 'Present', 'Late', 'Absent', 'LateMinutes', 'Date', and 'Location' fields
        const transformedData = response.data.data.map((item) => {
          const inTime = new Date(item.InTime);
          const BeginTimeParts = item.BeginTime.split(":"); // Split the BeginTime into hours and minutes

          const BeginTimeHours = parseInt(BeginTimeParts[0], 10); // Get hours
          const BeginTimeMinutes = parseInt(BeginTimeParts[1], 10); // Get minutes

          // Get hours and minutes from inTime
          const inTimeHours = inTime.getHours();
          const inTimeMinutes = inTime.getMinutes();

          // Calculate the late minutes
          let lateMinutes;
          if (
            inTimeHours > BeginTimeHours ||
            (inTimeHours === BeginTimeHours && inTimeMinutes > BeginTimeMinutes)
          ) {
            // If inTime is greater than BeginTime, calculate the difference
            lateMinutes =
              (inTimeHours - BeginTimeHours) * 60 +
              (inTimeMinutes - BeginTimeMinutes);
          } else {
            lateMinutes = 0; // If inTime is not greater than BeginTime, set lateMinutes to 0
          }

          // Extract location from PunchRecords
          const location = item.PunchRecords
            ? item.PunchRecords.match(/\(([^)]+)\)/)[1]
            : "";

          return {
            ...item,
            Present: item.P1Status === "P" || item.P1Status === "Lt" ? 1 : 0,
            Late: item.P1Status === "Lt" ? 1 : 0,
            Absent: item.P1Status === "A" ? 1 : 0,
            LateMinutes: lateMinutes,
            Date: moment(inTime).format("DD-MM-YYYY"),
            Location: location,
          };
        });

        setData(transformedData);

        // Calculate total late, total present, total absent, and total weekly off present counts for each date
        const totalsObj = transformedData.reduce((acc, curr) => {
          const { Date, Present, Late, Absent, Status } = curr;
          acc[Date] = acc[Date] || {
            totalLate: 0,
            totalPresent: 0,
            totalAbsent: 0,
            totalWeeklyOffPresent: 0,
          };
          acc[Date].totalLate += Late;
          acc[Date].totalPresent += Present; // Include late in present count
          acc[Date].totalAbsent += Absent; // Count absences
          acc[Date].totalWeeklyOffPresent += Status === "WeeklyOff" ? 1 : 0; // Count weekly off present
          return acc;
        }, {});

        setTotals(totalsObj);

        // Set totals for today's date by default
        const today = moment().format("DD-MM-YYYY");
        const todayTotals = totalsObj[today] || {
          totalLate: 0,
          totalPresent: 0,
          totalAbsent: 0,
          totalWeeklyOffPresent: 0,
        };
        setSelectedDateTotals(todayTotals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate the width of the modal based on the number of columns
    const numColumns = 9; // Adjust based on your actual number of columns
    const calculatedWidth = numColumns * 150; // Adjust the factor as needed
    setModalWidth(calculatedWidth);
  }, [data]);

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("DD-MM-YYYY") : null;
      console.log("Selected Date:", formattedDate); // Log the selected date

    setSelectedDate(formattedDate);
    if (formattedDate) {
      const totalsForDate = totals[formattedDate] || {
        totalLate: 0,
        totalPresent: 0,
        totalAbsent: 0,
        totalWeeklyOffPresent: 0,
      };
      setSelectedDateTotals(totalsForDate);
    } else {
      setSelectedDateTotals({
        totalLate: 0,
        totalPresent: 0,
        totalAbsent: 0,
        totalWeeklyOffPresent: 0,
      });
    }
  };

  const handleEmployeeChange = (value) => {
    console.log("value", value);
    setSelectedEmployee(value);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenLocationModal = () => {
    setIsLocationModalVisible(true);
  };

  const handleCloseLocationModal = () => {
    setIsLocationModalVisible(false);
  };

  const handleOpenPresentModal = () => {
    setIsPresentModalVisible(true);
  };

  const handleClosePresentModal = () => {
    setIsPresentModalVisible(false);
  };

  const handleOpenAbsentModal = () => {
    setIsAbsentModalVisible(true);
  };

  const handleCloseAbsentModal = () => {
    setIsAbsentModalVisible(false);
  };

  const handlePieChartClick = (event, chartContext, config) => {
    const clickedLocation = config.dataPointIndex; // Assuming the location index corresponds to data point index
    const location = uniqueLocations[clickedLocation]; // Get the location name
    const locationData = filteredData.filter(
      (item) => item.Location === location && item.Late === 1
    );
    setSelectedLocationData(locationData);
    setIsLocationModalVisible(true); // Open the modal
  };

  const filteredData = data.filter((item) => {
    return (
      (!selectedDate || item.Date === selectedDate) &&
      (!selectedEmployee || item.EmployeeName === selectedEmployee)
    );
  });

 // Assuming 'data' is your fetched data array
const uniqueEmployees = [...new Set(data.map(item => item.EmployeeCode))].map(code => {
  const employee = data.find(item => item.EmployeeCode === code);
  return {
    EmployeeName: employee.EmployeeName,
    EmployeeCode: employee.EmployeeCode,
    Location: employee.Location,
  };
});

  const uniqueLocations = [...new Set(data.map((item) => item.Location))]; // Unique locations

  const columns = [
    {
      title: "Begin Time",
      dataIndex: "BeginTime",
      key: "BeginTime",
    },
    {
      title: "Employee Code",
      dataIndex: "EmployeeCode",
      key: "EmployeeCode",
    },
    {
      title: "Employee Name",
      dataIndex: "EmployeeName",
      key: "EmployeeName",
    },
    {
      title: "End Time",
      dataIndex: "EndTime",
      key: "EndTime",
    },
    {
      title: "In Time",
      dataIndex: "InTime",
      key: "InTime",
      sorter: (a, b) => new Date(a.InTime) - new Date(b.InTime),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Out Time",
      dataIndex: "OutTime",
      key: "OutTime",
    },
    {
      title: "P1 Status",
      dataIndex: "P1Status",
      key: "P1Status",
    },
    {
      title: "Late (minutes)",
      dataIndex: "LateMinutes",
      key: "LateMinutes",
      sorter: (a, b) => a.LateMinutes - b.LateMinutes,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Punch Records",
      dataIndex: "PunchRecords",
      key: "PunchRecords",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
    },
    {
      title: "Attendance Date",
      dataIndex: "AttendanceDate",
      key: "AttendanceDate",
    },
  ];

  const locationColumns = [
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
    },
    {
      title: "Late (minutes)",
      dataIndex: "LateMinutes",
      key: "LateMinutes",
      render: (text, record) => (
        <span>
          {
            filteredData.filter(
              (item) => item.Location === record.Location && item.Late === 1
            ).length
          }
        </span>
      ),
    },
  ];

  // Data for Apex Pie Chart
  const locationData = uniqueLocations.map((location) => {
    return {
      location: location,
      lateCount: filteredData.filter(
        (item) => item.Location === location && item.Late === 1
      ).length,
    };
  });

  const pieChartOptions = {
    chart: {
      type: "pie",
      width: 600,
      height: 600,
      events: {
        click: handlePieChartClick, // Attach click event handler to the pie chart
      },
    },
    labels: locationData.map((item) => item.location),
    colors: [
      "white",
      "#2a9d8f",
      "#fb8500",
      "#ffb703",
      "#03045e",
      "#FF33FF",
      "#FF5733",
      "#33FF57",
      "#5733FF",
      "#FFFF33",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const pieChartSeries = locationData.map((item) => item.lateCount);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin indicator={<CustomSpin />} spinning={loading}>
          {loading ? null : <CustomSpin />}
        </Spin>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Layout>
        <Row gutter={16}>
          <Col span={12}>
            <DatePicker onChange={handleDateChange} defaultValue={moment()} />
            <RangePicker onChange={handleDateChange} defaultValue={moment()} />
          </Col>
        </Row>

        {selectedDate && (
          <Row
            gutter={16}
            style={{ margin: "20px 0", display: "flex", alignItems: "center" }}
          >
            <Col flex="1 1 auto">
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontWeight: 500,
                }}
              >
                Late Attendance by Location on {selectedDate}
              </h2>
              <Card>
                <ApexChart
                  options={pieChartOptions}
                  series={pieChartSeries}
                  type="pie"
                  height={500}
                  width={500}
                />
              </Card>
            </Col>
            <Col flex="0 1 500px" style={{ marginLeft: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Card
                  onClick={handleOpenModal}
                  style={{
                    cursor: "pointer",
                    background: "#FF6F61", // Coral
                    width: "48%",
                  }}
                >
                  <p>
                    <strong>Total Late:</strong> {selectedDateTotals.totalLate}
                  </p>
                </Card>
                <Card
                  onClick={handleOpenPresentModal}
                  style={{
                    background: "#77DD77", // Pastel Green
                    width: "48%",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <strong>Total Present:</strong>{" "}
                    {selectedDateTotals.totalPresent}
                  </p>
                </Card>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Card
                  onClick={handleOpenAbsentModal}
                  style={{
                    background: "#F6BD60", // Gold
                    width: "48%",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <strong>Total Absent:</strong>{" "}
                    {selectedDateTotals.totalAbsent}
                  </p>
                </Card>
                <Card
                  onClick={handleOpenAbsentModal}
                  style={{
                    background: "#FFD700", // Yellow
                    width: "48%",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <strong>WeeklyOff Present:</strong>{" "}
                    {selectedDateTotals.totalWeeklyOffPresent}
                  </p>
                </Card>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Card
                  onClick={handleOpenAbsentModal}
                  style={{
                    background: "#E5989B", // Rose Pink
                    width: "48%",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <strong>WeeklyOff:</strong>{" "}
                    {selectedDateTotals.totalWeeklyOff}
                  </p>
                </Card>
                <Card
                  onClick={handleOpenAbsentModal}
                  style={{
                    background: "#cdb4db", // Yellow
                    width: "48%",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    <strong>Noticed Employees:</strong>{" "}
                    {selectedDateTotals.totalWeeklyOffPresent}
                  </p>
                </Card>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={12}>
            <Select
              showSearch
              placeholder="Select Employee For Data"
              onChange={handleEmployeeChange}
              style={{ width: "60%", color: "#fff" }}
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
               {uniqueEmployees.map((employee) => (
        <Option
          key={employee.EmployeeName}
          value={employee.EmployeeName}
        >
          {`${employee.EmployeeName} (${employee.EmployeeCode}) - ${employee.Location}`}
        </Option>
      ))}
            </Select>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <Table dataSource={filteredData} columns={columns} rowKey="_id" />
        <Modal
          title="Late Attendance Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={modalWidth} // Set the width dynamically
        >
          <Table
            dataSource={filteredData.filter((item) => item.Late === 1)}
            columns={columns.filter(
              (column) =>
                column.dataIndex !== "BeginTime" &&
                column.dataIndex !== "EndTime"
            )}
            rowKey="_id"
            pagination={false}
          />
        </Modal>
        <Modal
          title="Late Attendance Data by Location"
          visible={isLocationModalVisible}
          onCancel={handleCloseLocationModal}
          footer={null}
          width={modalWidth} // Set the width dynamically
        >
          <Table
            dataSource={selectedLocationData} // Render data for the selected location
            columns={columns.filter(
              (column) =>
                column.dataIndex !== "BeginTime" &&
                column.dataIndex !== "EndTime"
            )}
            rowKey="_id"
            pagination={false}
          />
        </Modal>
        <Modal
          title="Present Attendance Details"
          visible={isPresentModalVisible}
          onCancel={handleClosePresentModal}
          footer={null}
          width={modalWidth} // Set the width dynamically
        >
          <Table
            dataSource={filteredData.filter((item) => item.Present === 1)}
            columns={columns.filter(
              (column) =>
                column.dataIndex !== "BeginTime" &&
                column.dataIndex !== "EndTime"
            )}
            rowKey="_id"
            pagination={false}
          />
        </Modal>
        <Modal
          title="Absent Attendance Details"
          visible={isAbsentModalVisible}
          onCancel={handleCloseAbsentModal}
          footer={null}
          width={modalWidth} // Set the width dynamically
        >
          <Table
            dataSource={filteredData.filter((item) => item.Absent === 1)}
            columns={columns.filter(
              (column) =>
                column.dataIndex !== "BeginTime" &&
                column.dataIndex !== "EndTime"
            )}
            rowKey="_id"
            pagination={false}
          />
        </Modal>
        {/* <MyTable
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        /> */}
        {/* <div style={{ paddingBottom: "20px" }}>
          <MonthlyAttendenceCalendars
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div> */}
      </Layout>
    </div>
  );
};

export default AttendanceTable;
