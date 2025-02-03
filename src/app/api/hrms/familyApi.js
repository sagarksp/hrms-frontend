import axios from 'axios';

const FAMILY_API_URL = 'http://localhost:8000//hrms/family';


export const familySubmitForm = async (formData) => {
    const response = await axios.post(`${FAMILY_API_URL}/submit-form`, formData);
    return response.data;
  };


  export const familyGetSubmittedForms = async () => {
    const response = await axios.get(`${FAMILY_API_URL}/submit-form`);
    return response.data;
  };