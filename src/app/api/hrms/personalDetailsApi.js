import axios from 'axios';


const PERSONAL_DETAILS_API_URL = 'http://localhost:8000/hrms/personaldetails';


export const personalSubmitForm = async (formData) => {
    const response = await axios.post(`${PERSONAL_DETAILS_API_URL}/submit-form`, formData);
    return response.data;
  };
  

  export const personalGetSubmittedForms = async () => {
    const response = await axios.get(`${PERSONAL_DETAILS_API_URL}/submit-form`);
    return response.data;
  };