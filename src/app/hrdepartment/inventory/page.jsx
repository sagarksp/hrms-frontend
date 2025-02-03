"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography, Modal, Input } from "antd"; // Import Modal, Input, and Typography from Ant Design
const { Text } = Typography;
import Layout from "../components/layout/Layout";
import dynamic from "next/dynamic";
import { FileAddOutlined } from "@ant-design/icons";

import Link from "next/link";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import LaptopList from "./LaptopTable";
import RouterTable from "./RouterTable";
import MobileTable from "./MobileTable";
import SimTable from "./SimTable";

function Inventory() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // State variables for counters
  const [mobileCount, setMobileCount] = useState(0);
  const [laptopCount, setLaptopCount] = useState(0);
  const [routerCount, setRouterCount] = useState(0);
  const [simCount, setSimCount] = useState(0);
  // State variables for modal visibility
  const [laptopModalVisible, setLaptopModalVisible] = useState(false);
  const [mobileModalVisible, setMobileModalVisible] = useState(false);
  const [simModalVisible, setSimModalVisible] = useState(false);
  const [routerModalVisible, setRouterModalVisible] = useState(false);

  // State variables for table visibility
  const [showLaptopTable, setShowLaptopTable] = useState(false);
  const [showRouterTable, setShowRouterTable] = useState(false);
  const [showMobileTable, setShowMobileTable] = useState(false);
  const [showSimTable, setShowSimTable] = useState(false);
  // State variable to track if "Mobile" text has been clicked

  const [mobileClicked, setMobileClicked] = useState(false);
  const [routerClicked, setRouterClicked] = useState(false);
  const [simClicked, setSimClicked] = useState(false);
  const [laptopClicked, setLaptopClicked] = useState(false);

  // State variables for laptop details form
  const [laptopDetails, setLaptopDetails] = useState({
    itemName: "Laptop",
    brandName: "",
    modelNumber: "",
    serialNumber: "",
    processor: "",
  });

  const [simDetails, setSimDetails] = useState({
    itemName: "Sim",
    simCardNumber: "",
    networkOperator: "",
    connectionNumber: "",
    circle: "",
    status: "",
  });

  const [routerDetails, setRouterDetails] = useState({
    itemName: "Router",
    brandName: "",
    modelNumber: "",
    serialNumber: "",
  });

  // State variables for mobile details form
  const [mobileDetails, setMobileDetails] = useState({
    itemName: "Mobile",
    brandName: "",
    imeiNumber: "",
    serialNumber: "",
  });

  useEffect(() => {
    async function fetchLaptopCount() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/noceye/api/v1/laptops`
        );
        if (response.ok) {
          const data = await response.json();
          // Extract laptop count from the response and update state
          setLaptopCount(data.data.length);
        } else {
          console.error("Failed to fetch laptop count:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching laptop count:", error.message);
      }
    }

    fetchLaptopCount();
  }, []);

  useEffect(() => {
    async function fetchMobileCount() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/noceye/api/v1/mobiles/show`
        );
        if (response.ok) {
          const data = await response.json();
          // Extract laptop count from the response and update state
          setMobileCount(data.data.length);
        } else {
          console.error("Failed to fetch laptop count:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching laptop count:", error.message);
      }
    }

    fetchMobileCount();
  }, []);

  useEffect(() => {
    async function fetchRouterCount() {
      try {
        const response = await fetch(
          "https://api.gtel.in/noceye/api/v1/routers/show"
        );
        if (response.ok) {
          const data = await response.json();
          // Extract laptop count from the response and update state
          setRouterCount(data.data.length);
        } else {
          console.error("Failed to fetch laptop count:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching laptop count:", error.message);
      }
    }

    fetchRouterCount();
  }, []);

  useEffect(() => {
    async function fetchSimCount() {
      try {
        const response = await fetch(
          "https://api.gtel.in/noceye/api/v1/sim/show"
        );
        if (response.ok) {
          const data = await response.json();
          // Extract laptop count from the response and update state
          console.log("fetchsimcount", data);
          setSimCount(data.data.length);
        } else {
          console.error("Failed to fetch laptop count:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching laptop count:", error.message);
      }
    }

    fetchSimCount();
  }, []);

  const submitLaptopDetails = async () => {
    try {
      const response = await fetch(
        "https://api.gtel.in/noceye/api/v1/laptops",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(laptopDetails),
        }
      );
      const body = await response.json();
      console.log("Response body:", body); // Log the response body
      if (response.ok) {
        // Optionally, you can handle success here
        console.log("Laptop details submitted successfully");
      } else {
        // Optionally, you can handle errors here
        console.error("Failed to submit laptop details:", body);
      }
    } catch (error) {
      console.error("Error submitting laptop details:", error.message);
    }
  };

  const submitRouterDetails = async () => {
    try {
      const response = await fetch(
        "https://api.gtel.in/noceye/api/v1/routers/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(routerDetails),
        }
      );
      const body = await response.json();
      console.log("Response body:", body);
      if (response.ok) {
        console.log("Router details submitted successfully");
      } else {
        console.error("Failed to submit router details:", body);
      }
    } catch (error) {
      console.error("Error submitting router details:", error.message);
    }
  };

  const submitMobileDetails = async () => {
    try {
      const response = await fetch(
        "https://api.gtel.in/noceye/api/v1/mobiles/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mobileDetails),
        }
      );
      const body = await response.json();
      console.log("Response body:", body);
      if (response.ok) {
        console.log("Mobile details submitted successfully");
      } else {
        console.error("Failed to submit mobile details:", body);
      }
    } catch (error) {
      console.error("Error submitting mobile details:", error.message);
    }
  };

  const submitSimDetails = async () => {
    try {
      const response = await fetch(
        "https://api.gtel.in/noceye/api/v1/sim/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(simDetails),
        }
      );
      const body = await response.json();
      console.log("Response body:", body);
      if (response.ok) {
        console.log("Mobile details submitted successfully");
      } else {
        console.error("Failed to submit mobile details:", body);
      }
    } catch (error) {
      console.error("Error submitting mobile details:", error.message);
    }
  };

  // Function to handle increment action
  const incrementCounter = (counterName) => {
    switch (counterName) {
      case "mobile":
        setMobileCount(mobileCount + 1);
        setMobileModalVisible(true);
        break;
      case "laptop":
        setLaptopCount(laptopCount + 1);
        setLaptopModalVisible(true);
        break;
      case "router":
        setRouterCount(routerCount + 1);
        setRouterModalVisible(true);
        break;
      case "sim":
        setSimCount(simCount + 1);
        setSimModalVisible(true);
        break;
      default:
        break;
    }
  };

  // Function to handle decrement action
  const decrementCounter = (counterName) => {
    switch (counterName) {
      case "mobile":
        setMobileCount(mobileCount - 1 >= 0 ? mobileCount - 1 : 0);
        break;
      case "laptop":
        setLaptopCount(laptopCount - 1 >= 0 ? laptopCount - 1 : 0);
        break;
      case "router":
        setRouterCount(routerCount - 1 >= 0 ? routerCount - 1 : 0);
        break;
      case "sim":
        setSimCount(simCount - 1 >= 0 ? simCount - 1 : 0);
        break;
      default:
        break;
    }
  };

  const toggleTableVisibility = (tableName) => {
    switch (tableName) {
      case "laptop":
        setShowLaptopTable(!showLaptopTable);
        break;
      case "router":
        setShowRouterTable(!showRouterTable);
        break;
      case "mobile":
        setShowMobileTable(!showMobileTable);
        break;
      case "sim":
        setShowSimTable(!showSimTable);
        break;
      default:
        break;
    }
  };
  // Function to handle input changes for laptop details
  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setLaptopDetails({ ...laptopDetails, [fieldName]: value });
  };

  // Function to handle input changes for mobile details
  const handleInputMobile = (e, fieldName) => {
    const { value } = e.target;
    setMobileDetails({ ...mobileDetails, [fieldName]: value });
  };

  const handleInputRouter = (e, fieldName) => {
    const { value } = e.target;
    setRouterDetails({ ...routerDetails, [fieldName]: value });
  };
  const handleInputSim = (e, fieldName) => {
    const { value } = e.target;
    setSimDetails({ ...simDetails, [fieldName]: value });
  };

  const chartOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["SIM", "Mobile", "Laptop", "Router"],
    },
  };

  const chartSeries = [
    {
      name: "Count",
      data: [simCount, mobileCount, laptopCount, routerCount],
    },
  ];

  return (
    <Layout>
      <div>
        <div
          style={{
            padding: "30px",
            backgroundColor: "#F2F2F7",
            display: "flex", // Use flexbox for horizontal layout
            justifyContent: "space-between", // Space items evenly
            alignItems: "center", // Align items vertically in the center
            border: "1px solid black"
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
            <Text
              style={{
                fontWeight: "700",
                cursor: "pointer",
                paddingRight: "10px",
              }}
              onClick={() => toggleTableVisibility("mobile")}
            >
              Mobile:{" "}
            </Text>
            <Button type="default" onClick={() => incrementCounter("mobile")}>
              +
            </Button>
            <Text style={{ margin: "0 10px" }}>{mobileCount}</Text>
            <Button type="default" onClick={() => decrementCounter("mobile")}>
              -
            </Button>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
            <Text
              style={{
                fontWeight: "700",
                cursor: "pointer",
                paddingRight: "10px",
              }}
              onClick={() => toggleTableVisibility("laptop")}
            >
              Laptop:{" "}
            </Text>
            <Button type="default" onClick={() => incrementCounter("laptop")}>
              +
            </Button>
            <Text style={{ margin: "0 10px" }}>{laptopCount}</Text>
            <Button type="default" onClick={() => decrementCounter("laptop")}>
              -
            </Button>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
            <Text
              style={{
                fontWeight: "700",
                cursor: "pointer",
                paddingRight: "10px",
              }}
              onClick={() => toggleTableVisibility("router")}
            >
              Router:{" "}
            </Text>
            <Button type="default" onClick={() => incrementCounter("router")}>
              +
            </Button>
            <Text style={{ margin: "0 10px" }}>{routerCount}</Text>
            <Button type="default" onClick={() => decrementCounter("router")}>
              -
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "700",
                cursor: "pointer",
                paddingRight: "10px",
              }}
              onClick={() => toggleTableVisibility("sim")}
            >
              SIM:{" "}
            </Text>
            <Button type="default" onClick={() => incrementCounter("sim")}>
              +
            </Button>
            <Text style={{ margin: "0 10px" }}>{simCount}</Text>
            <Button type="default" onClick={() => decrementCounter("sim")}>
              -
            </Button>
          </div>
        </div>
        <Link href="/hrdepartment/createinventory">
        <Button
          type="primary"
          style={{ position: "absolute", right: 13, zIndex: 111, top:140}}
          icon={<FileAddOutlined />}
        ></Button>
      </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
            width={600}
          />
          {showMobileTable && <MobileTable />}
          {showLaptopTable && <LaptopList />}
          {showRouterTable && <RouterTable />}
          {showSimTable && <SimTable />}
        </div>

        {/* Laptop details modal */}
        <Modal
          title="Enter Laptop Details"
          visible={laptopModalVisible}
          width={700}
          onOk={() => {
            setRouterModalVisible(false);
            submitLaptopDetails(); // Call the function to submit laptop details
          }}
          onCancel={() => setLaptopModalVisible(false)}
        >
          {/* Laptop details form */}
          <div style={{ display: "flex", gap: "50px" }}>
            {/* Left column */}
            <div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Laptop Brand:
                </Text>
                <br />
                <Input
                  placeholder="Enter Laptop Brand"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "brandName")}
                />
              </div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Processor Name:
                </Text>
                <br />
                <Input
                  placeholder="Enter Processor Name"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "processor")}
                />
              </div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  RAM:
                </Text>
                <br />
                <Input
                  placeholder="Enter RAM"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "ram")}
                />
              </div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Adapter/Charger:
                </Text>
                <br />
                <Input
                  placeholder="Enter Adapter/Charger"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "adapter")}
                />
              </div>
            </div>
            {/* Right column */}
            <div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Model Number:
                </Text>
                <br />
                <Input
                  placeholder="Enter Model Number"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "modelNumber")}
                />
              </div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Serial Number:
                </Text>
                <br />
                <Input
                  placeholder="Enter Serial Number"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "serialNumber")}
                />
              </div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Battery Backup:
                </Text>
                <br />
                <Input
                  placeholder="Enter Battery Backup"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "batteryBackup")}
                />
              </div>
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Touch Screen:
                </Text>
                <br />
                <Input
                  placeholder="Enter Touch Screen"
                  style={{ width: 250, borderRadius: "8px" }}
                  onChange={(e) => handleInputChange(e, "touchScreen")}
                />
              </div>
            </div>
          </div>
        </Modal>
        {/* Mobile details modal */}
        <Modal
          title="Enter Mobile Details"
          visible={mobileModalVisible}
          onOk={() => {
            setMobileModalVisible(false);
            submitMobileDetails();
          }}
          onCancel={() => setMobileModalVisible(false)}
          width={500}
        >
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Mobile Brand:
            </Text>
            <br />
            <Input
              placeholder="Enter Brand Name"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputMobile(e, "brandName")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              IMEI Number:
            </Text>
            <br />
            <Input
              placeholder="Enter IMEI Number"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputMobile(e, "imeiNumber")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Serial Number:
            </Text>
            <br />
            <Input
              placeholder="Enter Serial Number"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputMobile(e, "serialNumber")}
            />
          </div>
        </Modal>

        <Modal
          title="Enter Router Details"
          visible={routerModalVisible}
          onOk={() => {
            setRouterModalVisible(false);
            submitRouterDetails(); // Call the function to submit laptop details
          }}
          onCancel={() => setRouterModalVisible(false)}
          width={500}
        >
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Router Brand:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputRouter(e, "brandName")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Model Number:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputRouter(e, "modelNumber")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Serial Number:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputRouter(e, "serialNumber")}
            />
          </div>
        </Modal>
        <Modal
          title="Enter SIM Details"
          visible={simModalVisible}
          onOk={() => {
            setSimModalVisible(false);
            submitSimDetails(); // Call the function to submit laptop details
          }}
          onCancel={() => setSimModalVisible(false)}
          width={500}
        >
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              SIM Card Number:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputSim(e, "simCardNumber")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Network Operator:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputSim(e, "networkOperator")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Connection Number:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputSim(e, "connectionNumber")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Circle:
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputSim(e, "circle")}
            />
          </div>
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              Status:{" "}
            </Text>
            <br />
            <Input
              placeholder="Enter Laptop Brand"
              style={{ width: 400, borderRadius: "8px" }}
              onChange={(e) => handleInputSim(e, "status")}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

export default Inventory;
