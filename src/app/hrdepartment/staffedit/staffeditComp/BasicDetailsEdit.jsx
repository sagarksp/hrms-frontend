'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function BasicDetailsEdit({ id, setModalData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Fetch data and pre-fill the form
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/hrms/basicemployees/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        // Pre-fill form fields
        reset(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/hrms/basicemployees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update data");

      toast.success("Data updated successfully");
      setModalData(false); // Close the modal after saving
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 shadow-lg rounded-md sm:p-8 md:p-12 lg:p-16">
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">Edit Basic Details</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="employeeCode" className="block text-sm font-medium text-gray-700">
              Employee Code
            </label>
            <input
              type="text"
              id="employeeCode"
              readOnly
              disabled
              {...register("employeeCode", { required: "Employee Code is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.employeeCode && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeCode.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "First Name is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              {...register("middleName")}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: "Last Name is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="metroOrNonMetro" className="block text-sm font-medium text-gray-700">
              Metro/Non-Metro
            </label>
            <select
              id="metroOrNonMetro"
              {...register("metroOrNonMetro", { required: "This field is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Option</option>
              <option value="Metro">Metro</option>
              <option value="Non-Metro">Non-Metro</option>
            </select>
            {errors.metroOrNonMetro && (
              <p className="text-red-500 text-sm mt-1">{errors.metroOrNonMetro.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:ring focus:ring-gray-300"
            onClick={() => setModalData(false)} // Close the modal
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:ring focus:ring-blue-300 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
