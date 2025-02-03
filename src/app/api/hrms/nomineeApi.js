import axios from 'axios';

const NOMINEE_API_URL = 'http://localhost:8000/hrms/nominees';


export const nomineeSubmitForm = async (formData) => {
    const response = await axios.post(`${NOMINEE_API_URL}/submit-form`, formData);
    return response.data;
  };


  export const nomineeGetSubmittedForms = async () => {
    const response = await axios.get(`${NOMINEE_API_URL}/submit-form`);
    return response.data;
  };