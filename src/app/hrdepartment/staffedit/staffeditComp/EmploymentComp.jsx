import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import react-hot-toast

const EmploymentComp = ({ setModalData, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    // Fetch data when component is mounted
    axios
      .get(`http://localhost:5000/hrms/employees/${id}`)
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
      .put(`http://localhost:5000/hrms/employees/${id}`, data)
      .then((response) => {
        toast.success("Data updated successfully!"); // Show success toast
        setModalData(null); // Close modal or reset modal data
      })
      .catch((error) => {
        toast.error("Error updating data"); // Show error toast
        console.error("Error updating data", error);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Father Name */}
        <div>
          <label className="block text-gray-700">Father's Name</label>
          <Controller
            control={control}
            name="fatherName"
            rules={{ required: "Father's Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fatherName ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm">{errors.fatherName.message}</p>
          )}
        </div>

        {/* Department */}
        {/* <div>
          <label className="block text-gray-700">Department</label>
          <Controller
            control={control}
            name="department"
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.department ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}
        </div> */}

        {/* Designation */}
        <div>
          <label className="block text-gray-700">Designation</label>
          <Controller
            control={control}
            name="designation"
            rules={{ required: "Designation is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.designation ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation.message}</p>
          )}
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-gray-700">Marital Status</label>
          <Controller
            control={control}
            name="maritalStatus"
            rules={{ required: "Marital Status is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.maritalStatus ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm">{errors.maritalStatus.message}</p>
          )}
        </div>

        {/* Confirmation Period */}
        {/* <div>
          <label className="block text-gray-700">Confirmation Period</label>
          <Controller
            control={control}
            name="confirmationPeriod"
            rules={{ required: "Confirmation Period is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmationPeriod ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.confirmationPeriod && (
            <p className="text-red-500 text-sm">{errors.confirmationPeriod.message}</p>
          )}
        </div> */}

        {/* Confirmation Date */}
        {/* <div>
          <label className="block text-gray-700">Confirmation Date</label>
          <Controller
            control={control}
            name="confirmationDate"
            rules={{ required: "Confirmation Date is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmationDate ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.confirmationDate && (
            <p className="text-red-500 text-sm">{errors.confirmationDate.message}</p>
          )}
        </div> */}

        {/* Date of Anniversary */}
        <div>
          <label className="block text-gray-700">Date of Anniversary</label>
          <Controller
            control={control}
            name="dateOfAnniversary"
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            )}
          />
        </div>

        {/* Retirement Age */}
        <div>
          <label className="block text-gray-700">Retirement Age</label>
          <Controller
            control={control}
            name="retirementAge"
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            )}
          />
        </div>

        {/* Date of Retirement */}
        <div>
          <label className="block text-gray-700">Date of Retirement</label>
          <Controller
            control={control}
            name="dateOfRetirement"
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            )}
          />
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

export default EmploymentComp;
