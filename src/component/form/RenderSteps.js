'use client';

import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { getRoles } from "../../app/api/roleService"; 
import { getDepartments } from "../../app/api/departmentService";
import API_BASE_URL from "../../../config/config";
import { steps } from "./Data";
import BasicDetails from "./BasicDetails";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.regForm);


  return (
    <div className="w-[1244px]">
      <div className="relative mb-2 flex md:w-full justify-center">
        {steps.map((item) => (
          <div className="flex flex-col items-center" key={item.id}>
            <button
              className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
            >
              {step > item.id ? "✔" : item.id}
            </button>
            <p
              className={`mt-2 text-xs text-center ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <BasicDetails/>
      )}
    </div>
  );
};

export default RenderSteps;







