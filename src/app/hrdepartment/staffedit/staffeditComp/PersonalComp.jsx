import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const PersonalComp = ({ setModalData, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing data for editing
    axios
      .get(`http://localhost:5000/hrms/personal-details/${id}`)
      .then((response) => {
        const defaultValues = {
          personalEmail: '',
          remarks: '',
          phone: '',
          bloodGroup: '',
          address1: '',
          address2: '',
          place: '',
          city: '',
          pinCode: '',
          printCheque: '',
          bankAccountNumber: '',
          bankBranchCode: '',
          correspondenceAddress1: '',
          correspondenceAddress2: '',
          correspondencePlace: '',
          correspondenceCity: '',
          correspondencePhone: '',
          correspondencePinCode: '',
          personalMobileNo: '',
          officeMobileNo: '',
          officeExtensionNo: '',
          handicap: '',
          ...response.data, // Merge API response with defaults
        };
        reset(defaultValues); // Populate form with data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:5000/hrms/personal-details/${id}`, data)
      .then((response) => {
        toast.success('Data updated successfully!');
        setModalData(null); // Close modal or reset modal data
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        toast.error('Failed to update data.');
      });
  };

  const handleCancel = () => {
    setModalData(null); // Close modal
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-[90vh] overflow-auto w-[80%] rounded-lg"> {/* Set height to 80vh */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="personalEmail" className="block font-medium text-gray-700">
              Personal Email
            </label>
            <input
              id="personalEmail"
              {...register('personalEmail', { required: 'Email is required' })}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.personalEmail && <p className="text-red-500 text-sm">{errors.personalEmail.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              {...register('phone', { required: 'Phone is required' })}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="address1" className="block font-medium text-gray-700">
              Address 1
            </label>
            <input
              id="address1"
              {...register('address1')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address2" className="block font-medium text-gray-700">
              Address 2
            </label>
            <input
              id="address2"
              {...register('address2')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="city" className="block font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              {...register('city')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="pinCode" className="block font-medium text-gray-700">
              Pin Code
            </label>
            <input
              id="pinCode"
              {...register('pinCode')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bloodGroup" className="block font-medium text-gray-700">
              Blood Group
            </label>
            <input
              id="bloodGroup"
              {...register('bloodGroup')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="remarks" className="block font-medium text-gray-700">
              Remarks
            </label>
            <textarea
              id="remarks"
              {...register('remarks')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Additional fields */}
          <div>
            <label htmlFor="place" className="block font-medium text-gray-700">
              Place
            </label>
            <input
              id="place"
              {...register('place')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="printCheque" className="block font-medium text-gray-700">
              Print Cheque
            </label>
            <input
              id="printCheque"
              {...register('printCheque')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bankAccountNumber" className="block font-medium text-gray-700">
              Bank Account Number
            </label>
            <input
              id="bankAccountNumber"
              {...register('bankAccountNumber')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bankBranchCode" className="block font-medium text-gray-700">
              Bank Branch Code
            </label>
            <input
              id="bankBranchCode"
              {...register('bankBranchCode')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="correspondenceAddress1" className="block font-medium text-gray-700">
              Correspondence Address 1
            </label>
            <input
              id="correspondenceAddress1"
              {...register('correspondenceAddress1')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="correspondenceAddress2" className="block font-medium text-gray-700">
              Correspondence Address 2
            </label>
            <input
              id="correspondenceAddress2"
              {...register('correspondenceAddress2')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="correspondencePlace" className="block font-medium text-gray-700">
              Correspondence Place
            </label>
            <input
              id="correspondencePlace"
              {...register('correspondencePlace')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="correspondenceCity" className="block font-medium text-gray-700">
              Correspondence City
            </label>
            <input
              id="correspondenceCity"
              {...register('correspondenceCity')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="correspondencePhone" className="block font-medium text-gray-700">
              Correspondence Phone
            </label>
            <input
              id="correspondencePhone"
              {...register('correspondencePhone')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="correspondencePinCode" className="block font-medium text-gray-700">
              Correspondence Pin Code
            </label>
            <input
              id="correspondencePinCode"
              {...register('correspondencePinCode')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="personalMobileNo" className="block font-medium text-gray-700">
              Personal Mobile No
            </label>
            <input
              id="personalMobileNo"
              {...register('personalMobileNo')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="officeMobileNo" className="block font-medium text-gray-700">
              Office Mobile No
            </label>
            <input
              id="officeMobileNo"
              {...register('officeMobileNo')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="officeExtensionNo" className="block font-medium text-gray-700">
              Office Extension No
            </label>
            <input
              id="officeExtensionNo"
              {...register('officeExtensionNo')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div>
            <label htmlFor="handicap" className="block font-medium text-gray-700">
              Handicap
            </label>
            <input
              id="handicap"
              {...register('handicap')}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalComp;
