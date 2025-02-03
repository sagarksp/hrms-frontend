import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const MobileTable = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get(
          "https://api.gtel.in/noceye/api/v1/mobiles/show"
        );
        setLaptops(response.data.data);
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
      title: "IMEI Number",
      dataIndex: "imeiNumber",
      key: "imeiNumber",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "70%", paddingLeft: "100px" }}>
         {/* <Counter item="Laptop:" countt={laptops.length} /> */}
      <h4 style={{ textAlign: "center" }}>Mobile Data Table</h4>
      <Table dataSource={laptops} columns={columns} />
      {/* Pass count as a prop to Counter component */}
     
    </div>
  );
};

export default MobileTable;
