import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import react-hot-toast

const SalaryDetailsComp = ({ setModalData, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    // Fetch data when component is mounted
    axios
      .get(`http://localhost:5000/hrms/financial-details/${id}`)
      .then((response) => {
        // Set form values with the fetched data
        const data = response.data;
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            setValue(key, data[key]);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setIsLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = (data) => {
    // Send updated data to the backend with PUT request
    axios
      .put(`http://localhost:5000/hrms/financial-details/${id}`, data)
      .then((response) => {
        toast.success("Salary details updated successfully!"); // Show success toast
        setModalData(null); // Close modal or reset modal data
      })
      .catch((error) => {
        toast.error("Error updating salary details"); // Show error toast
        console.error("Error updating salary details", error);
      });
  };

  const handleCancel = () => {
    setModalData(null); // Close the modal without saving
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fixed Basic */}
        <div>
          <label className="block text-gray-700">Fixed Basic</label>
          <Controller
            control={control}
            name="fixedBasic"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fixedBasic ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.fixedBasic && (
            <p className="text-red-500 text-sm">{errors.fixedBasic.message}</p>
          )}
        </div>

        {/* Arrear Basic */}
        <div>
          <label className="block text-gray-700">Arrear Basic</label>
          <Controller
            control={control}
            name="arrearBasic"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.arrearBasic ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.arrearBasic && (
            <p className="text-red-500 text-sm">{errors.arrearBasic.message}</p>
          )}
        </div>

        {/* Earnings Total */}
        <div>
          <label className="block text-gray-700">Earnings Total</label>
          <Controller
            control={control}
            name="earningsTotal"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.earningsTotal ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.earningsTotal && (
            <p className="text-red-500 text-sm">{errors.earningsTotal.message}</p>
          )}
        </div>

        {/* Income Tax */}
        <div>
          <label className="block text-gray-700">Income Tax</label>
          <Controller
            control={control}
            name="incomeTax"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.incomeTax ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.incomeTax && (
            <p className="text-red-500 text-sm">{errors.incomeTax.message}</p>
          )}
        </div>

        {/* Deductions Total */}
        <div>
          <label className="block text-gray-700">Deductions Total</label>
          <Controller
            control={control}
            name="deductionsTotal"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.deductionsTotal ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.deductionsTotal && (
            <p className="text-red-500 text-sm">{errors.deductionsTotal.message}</p>
          )}
        </div>

        {/* Personal Details ID */}
        <div>
          <label className="block text-gray-700">Personal Details ID</label>
          <Controller
            control={control}
            name="personalDetails_id"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.personalDetails_id ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalDetails_id && (
            <p className="text-red-500 text-sm">{errors.personalDetails_id.message}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SalaryDetailsComp;
