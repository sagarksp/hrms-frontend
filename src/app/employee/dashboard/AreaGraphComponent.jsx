// AreaGraphComponent.js
import React from 'react';
import dynamic from "next/dynamic";
import { Card } from 'antd';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaGraphComponent = ({ options, series }) => {
  return (
    <div>
        <Card>
      <ApexChart options={options} series={series} type="area" height={350} />
      </Card>
    </div>
  );
};

export default AreaGraphComponent;
