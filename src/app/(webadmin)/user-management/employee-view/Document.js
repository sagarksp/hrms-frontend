'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Row, Col, Form, Input, Button, Modal } from "antd";
import toast from 'react-hot-toast';

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [previews, setPreviews] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const [inputValue, setInputValue] = useState("hi"); // Initialize with "hi"

  const handleSubmit1 = () => {
    setInputValue("suraj"); // Update the value to "suraj" on button click
  };

  const onSubmit = async (data) => {
    try {
      const formData = await Object.keys(data).reduce(async (acc, key) => {
        const value = data[key];
        const updatedAcc = await acc;
        updatedAcc[key] = value[0] ? await toBase64(value[0]) : null;
        return updatedAcc;
      }, Promise.resolve({}));

      console.log('FormData being sent:', formData); // Log the formData to ensure it's correct

      await axios.post(`http://localhost:5000/hrms/document`, formData);
      toast.success('Employee data saved successfully!');
      
      reset();
      setPreviews({});
      setIsModalVisible(false); // Close modal on successful submission
    } catch (error) {
      console.error('Error:', error);
      // alert('Error saving employee data.');
      console.log('Error saving employee data.')
    }
  };

  const handleFilePreview = (file, key) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prev) => ({ ...prev, [key]: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => ({ ...prev, [key]: null }));
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const renderFilePreview = (preview) => {
    if (preview) {
      if (preview.includes("data:image")) {
        return <img src={preview} alt="Preview" className="mt-2 max-w-[80px] rounded shadow-md" />;
      } else if (preview.includes("data:application/pdf")) {
        return (
          <embed
            src={preview}
            width="80"
            height="80"
            type="application/pdf"
            className="mt-2 border rounded shadow-md"
          />
        );
      }
    }
    return null;
  };

  return (
    <>
      {/* Button to open the modal */}
      <div className="flex items-center justify-center   ">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Open Document Form
        </Button>
      </div>

      {/* Modal with the form */}
      <Modal
        title="Document Form"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000} // Set modal width
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className='bg-slate-50 p-3'>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Personal Details</h3>
            <div className="grid grid-cols-4 gap-6">
              {['photo', 'panCard', 'adharCard', 'voterId', 'familyCard1', 'familyCard2', 'familyCard3', 'cancelCheque'].map((key, index) => (
                <div key={index}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()} (Image/PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      {...register(key)}
                      onChange={(e) => handleFilePreview(e.target.files[0], key)}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Choose File
                    </button>
                  </div>
                  {renderFilePreview(previews[key])}
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-200 p-3'>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Employment Details</h3>
            <div className="grid grid-cols-4 gap-4">
              {['employmentHistory1', 'employmentHistory2', 'employmentHistory3'].map((key, index) => (
                <div key={index}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()} (Image/PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      {...register(key)}
                      onChange={(e) => handleFilePreview(e.target.files[0], key)}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Choose File
                    </button>
                  </div>
                  {renderFilePreview(previews[key])}
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-50 p-3'>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Education Details</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                'tenthMarksheetResult', 'tenthMarksheetDegree', 'twelfthMarksheetResult', 'twelfthMarksheetDegree',
                'diploma', 'graduationResult', 'graduationDegree', 'postGraduationResult', 'postGraduationDegree', 'other'
              ].map((key, index) => (
                <div key={index}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()} (Image/PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      {...register(key)}
                      onChange={(e) => handleFilePreview(e.target.files[0], key)}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Choose File
                    </button>
                  </div>
                  {renderFilePreview(previews[key])}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}
