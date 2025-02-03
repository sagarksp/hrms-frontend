import axios from 'axios';

const EARNING_API_URL = 'http://localhost:8000/hrms/earnings';

export const earningSubmitForm = async (formData) => {
    const response = await axios.post(`${EARNING_API_URL}/submit-form`, formData);
    return response.data;
  };


  export const earningGetSubmittedForms = async () => {
    const response = await axios.get(`${EARNING_API_URL}/submit-form`);
    return response.data;
  };