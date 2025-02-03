
import React from "react";
import dynamic from "next/dynamic";
import { Card } from "antd";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineGraph = ({ options, series }) => {
  return <div>
    <Card style={{width: 500}}>
    <ApexChart options={options} series={series} type="line" height={350} />
    </Card>
    </div>

};

export default LineGraph;
