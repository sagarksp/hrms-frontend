import axios from 'axios';

const DEDUCTION_API_URL = 'http://localhost:8000/hrms/deductions';


export const deductionSubmitForm = async (formData) => {
    const response = await axios.post(`${DEDUCTION_API_URL}/submit-form`, formData);
    return response.data;
  };


  export const deductionGetSubmittedForms = async () => {
    const response = await axios.get(`${DEDUCTION_API_URL}/submit-form`);
    return response.data;
  };