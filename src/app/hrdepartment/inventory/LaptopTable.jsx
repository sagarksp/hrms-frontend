import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const LaptopTable = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          "https://api.gtel.in/noceye/api/v1/laptops"
        );
        setLaptops(response.data.data);
        console.log(response.data.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const columns = [
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Processor",
      dataIndex: "processor",
      key: "processor",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Model Number",
      dataIndex: "modelNumber",
      key: "modelNumber",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "70%", paddingLeft: "100px", height: "80%", overflowY: "scroll" }}>
      <h4 style={{ textAlign: "center" }}>Laptop Data Table</h4>
      <Table dataSource={laptops} columns={columns} scroll={{ y: 300 }} />
    </div>
  );
};

export default LaptopTable;
