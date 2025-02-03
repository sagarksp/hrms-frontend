import React, { useState, useEffect, useCallback } from "react";
import { Input, Select } from "antd";
import axios from "axios";
import BarGraphComponent from "./BarGraphComponent";
import AreaGraphComponent from "./AreaGraphComponent";
import LineGraph from "./LineGraph";
import { useRouter } from "next/navigation";
const { Option } = Select;

const MyTable = ({ selectedEmployee, setSelectedEmployee }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("7");
  const [chartData, setChartData] = useState({});
  const [presenceData, setPresenceData] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("https://api.gtel.in/noceye/api/v1/attendance");
      console.log("response.data suraj123123",response.data)

      // Calculate late minutes and update data
      const updatedData = response.data.data.map((item) => {
        const inTime = new Date(item.InTime);
        const referenceTime = new Date(inTime);
        referenceTime.setHours(10, 0, 0, 0); // Assuming 10:00 AM is the reference start time
        const lateMinutes = Math.max(
          0,
          Math.round((inTime - referenceTime) / (1000 * 60))
        );
        return { ...item, LateMinutes: lateMinutes };
      });
      setData(updatedData);
      calculatePresenceByMonth(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const updateChartData = useCallback((employeeCode) => {
    const filteredData = data.filter(
      (item) => item.EmployeeCode === employeeCode
    );

    // Filter data based on selected date range
    let filteredDataByDate = filteredData;
    if (selectedDateRange !== "All") {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - selectedDateRange); // Subtract selectedDateRange from current date
      filteredDataByDate = filteredData.filter(
        (item) => new Date(item.InTime) >= startDate
      );
    }

    // Calculate total working hours
    const hoursData = filteredDataByDate.map((item) => {
      const inTime = new Date(item.InTime);
      const outTime = new Date(item.OutTime);
      const hoursWorked =
        Math.round(((outTime - inTime) / (1000 * 60 * 60)) * 10) / 10;
      return {
        date: inTime.toLocaleDateString(),
        hoursWorked,
      };
    });
    const aggregatedHoursData = hoursData.reduce((acc, current) => {
      if (acc[current.date]) {
        acc[current.date] += current.hoursWorked;
      } else {
        acc[current.date] = current.hoursWorked;
      }
      return acc;
    }, {});
    const hoursCategories = Object.keys(aggregatedHoursData);
    const hoursSeriesData = Object.values(aggregatedHoursData);

    // Calculate late minutes
    const lateMinutesData = filteredDataByDate.map((item) => {
      return {
        date: new Date(item.InTime).toLocaleDateString(),
        lateMinutes: item.LateMinutes,
      };
    });
    const aggregatedLateMinutesData = lateMinutesData.reduce((acc, current) => {
      if (acc[current.date]) {
        acc[current.date] += current.lateMinutes;
      } else {
        acc[current.date] = current.lateMinutes;
      }
      return acc;
    }, {});
    const lateMinutesSeriesData = Object.values(aggregatedLateMinutesData);

    // Get presence data for the selected employee
    const employeePresenceData = presenceData[employeeCode] || {};
    const presenceCategories = Object.keys(employeePresenceData);
    const presenceSeriesData = Object.values(employeePresenceData);

    setChartData({
      hoursSeries: [
        {
          name: "Total Working Hours",
          data: hoursSeriesData,
        },
      ],
      lateMinutesSeries: [
        {
          name: "Late Minutes",
          data: lateMinutesSeriesData,
        },
      ],
      presenceSeries: [
        {
          name: "Days Present",
          data: presenceSeriesData,
        },
      ],
      options: {
        chart: {
          type: "bar",
        },
        xaxis: {
          categories: hoursCategories,
        },
        title: {
          text: `Total Working Hours, Late Minutes, and Presence for ${employeeCode}`,
        },
      },
      presenceOptions: {
        chart: {
          type: "bar",
        },
        xaxis: {
          categories: presenceCategories,
        },
        title: {
          text: `Monthly Presence for ${employeeCode}`,
        },
      },
    });
  }, [data, selectedDateRange, presenceData]);

  const calculatePresenceByMonth = useCallback((data) => {
    const presenceData = data.reduce((acc, item) => {
      const inTime = new Date(item.InTime);
      const yearMonth = `${inTime.getFullYear()}-${inTime.getMonth() + 1}`;

      if (!acc[item.EmployeeCode]) {
        acc[item.EmployeeCode] = {};
      }
      if (!acc[item.EmployeeCode][yearMonth]) {
        acc[item.EmployeeCode][yearMonth] = new Set();
      }
      acc[item.EmployeeCode][yearMonth].add(inTime.toLocaleDateString());

      return acc;
    }, {});

    // Convert sets to their sizes to get the count of distinct days
    const formattedPresenceData = {};
    for (const employee in presenceData) {
      formattedPresenceData[employee] = {};
      for (const month in presenceData[employee]) {
        formattedPresenceData[employee][month] = presenceData[employee][month].size;
      }
    }

    setPresenceData(formattedPresenceData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, calculatePresenceByMonth]);

  useEffect(() => {
    if (selectedEmployee) {
      updateChartData(selectedEmployee);
    }
  }, [selectedEmployee, selectedDateRange, data, updateChartData]);

  const handleDateRangeChange = (value) => {
    setSelectedDateRange(value);
  };

  // Get unique employee codes
  const uniqueEmployeeCodes = [
    ...new Set(data.map((item) => item.EmployeeCode)),
  ];

  return (
    <div>
      {/* <Select
        placeholder="Select Employee"
        style={{ width: 200, marginBottom: 16 }}
        onChange={(value) => setSelectedEmployee(value)}
        allowClear
      > */}
        {uniqueEmployeeCodes.map((employeeCode) => (
          <Option key={employeeCode} value={employeeCode}>
            {employeeCode}
          </Option>
        ))}
      {/* </Select> */}
      <Select
        placeholder="Select Date Range"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleDateRangeChange}
        allowClear
      >
        <Option value="All">All</Option>
        <Option value={7}>Last 7 days</Option>
        <Option value={30}>Last 30 days</Option>
        <Option value={90}>Last 90 days</Option>
      </Select>
      {selectedEmployee &&
        chartData.hoursSeries &&
        chartData.lateMinutesSeries && (
          <>
            <BarGraphComponent
              options={{
                ...chartData.options,
                title: { text: `Total Working Hours for ${selectedEmployee}` },
              }}
              series={chartData.hoursSeries}
            />
            <br />
            <AreaGraphComponent
              options={{
                ...chartData.options,
                title: { text: `Late Minutes for ${selectedEmployee}` },
              }}
              series={chartData.lateMinutesSeries}
            />
            <br />
            <LineGraph
              options={chartData.presenceOptions}
              series={chartData.presenceSeries}
            />
          </>
        )}
    </div>
  );
};

export default MyTable;
