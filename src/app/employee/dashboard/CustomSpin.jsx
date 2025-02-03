"use client";
import React from "react";
import Image from "next/image";
import styless from "../../hrdepartment/hrdashboard/CustomSpin.module.css";


const CustomSpin = () => (
  <div className={styless["custom-spin-container"]}>
    <Image
      src="https://www.gtel.in/wp-content/uploads/2019/07/logo.png"
      alt="Loading"
      className={`${styless["custom-spin-img"]} ${styless["pulse-animation"]}`}
      width={100} // Set the width of the image
      height={100} // Set the height of the image
    />
  </div>
);

export default CustomSpin;
