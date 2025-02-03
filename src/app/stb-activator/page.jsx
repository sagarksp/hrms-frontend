'use client'
import React, { useEffect, useState } from 'react';
import { Table, DatePicker, Pagination, Space, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState([moment().subtract(7, 'days'), moment()]);

  const extractUniqueLocation = (record) => {
    const locationRegex = /\(([^)]+)\)/; // Regex to extract location within parentheses
    const locations = record.split(',').map(punch => {
      const matches = punch.match(locationRegex);
      return matches ? matches[1] : ''; // Return location if found, otherwise empty string
    });
    // Filter unique locations and join them
    const uniqueLocations = Array.from(new Set(locations)).filter(loc => loc !== '').join(', ');
    return uniqueLocations;
  };

  const fetchAttendanceData = async (page, limit, dateRange) => {
    let fromDate, toDate;

    if (dateRange && dateRange[0] && dateRange[1]) {
      fromDate = dateRange[0].format('YYYY-MM-DD');
      toDate = dateRange[1].format('YYYY-MM-DD');
    } else {
      fromDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
      toDate = moment().format('YYYY-MM-DD');
    }

    try {
      const response = await axios.get(`https://api.gtel.in/hrms/attendance`, {
        params: {
          from: fromDate,
          to: toDate,
          page: page,
          limit: limit
        }
      });

      const transformedData = response.data.data.map(record => {
        const inTime = moment(record.InTime);
        const beginTime = moment(`${inTime.format('YYYY-MM-DD')} ${record.BeginTime}`, 'YYYY-MM-DD HH:mm:ss');

        // Calculate late minutes
        const lateMinutes = inTime.isAfter(beginTime) 
          ? inTime.diff(beginTime, 'minutes') 
          : 0;

        // Extract unique locations from PunchRecords
        const uniqueLocations = extractUniqueLocation(record.PunchRecords);

        return {
          ...record,
          InDate: inTime.format('YYYY-MM-DD'),
          InTimeOnly: inTime.format('HH:mm:ss'),
          OutDate: moment(record.OutTime).format('YYYY-MM-DD'),
          OutTimeOnly: moment(record.OutTime).format('HH:mm:ss'),
          LateMinutes: lateMinutes,
          Locations: uniqueLocations // Add the unique locations here
        };
      });

      setAttendanceData(transformedData);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData(page, limit, dateRange);
  }, [page, limit, dateRange]);

  const columns = [
    {
      title: 'Employee Code',
      dataIndex: 'EmployeeCode',
      key: 'EmployeeCode',
    },
    {
      title: 'Employee Name',
      dataIndex: 'EmployeeName',
      key: 'EmployeeName',
    },
    {
      title: 'In Date',
      dataIndex: 'InDate',
      key: 'InDate',
    },
    {
      title: 'In Time',
      dataIndex: 'InTimeOnly',
      key: 'InTimeOnly',
    },
    {
      title: 'Out Date',
      dataIndex: 'OutDate',
      key: 'OutDate',
    },
    {
      title: 'Out Time',
      dataIndex: 'OutTimeOnly',
      key: 'OutTimeOnly',
    },
    {
      title: 'Punch Records',
      dataIndex: 'PunchRecords',
      key: 'PunchRecords',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Begin Time',
      dataIndex: 'BeginTime',
      key: 'BeginTime',
    },
    {
      title: 'End Time',
      dataIndex: 'EndTime',
      key: 'EndTime',
    },
    {
      title: 'Late Minutes',
      dataIndex: 'LateMinutes',
      key: 'LateMinutes',
    },
    {
      title: 'Locations', // New column for unique locations
      dataIndex: 'Locations',
      key: 'Locations',
    },
  ];

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([moment().subtract(7, 'days'), moment()]);
    }
  };

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  // Function to calculate total late employees
  const getTotalLateEmployees = () => {
    return attendanceData.filter(record => record.LateMinutes > 0).length;
  };

  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker
          defaultValue={dateRange}
          format="YYYY-MM-DD"
          onChange={handleDateChange}
          allowClear
        />
        <Title level={4}>Total Late Employees: {getTotalLateEmployees()}</Title>
      </Space>
      <Table
        columns={columns}
        dataSource={attendanceData}
        pagination={false}
        rowKey="_id"
        style={{ marginTop: '20px' }}
      />
      <Pagination
        current={page}
        total={total}
        pageSize={limit}
        onChange={handlePaginationChange}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default Attendance;
