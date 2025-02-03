import axios from 'axios';

const BASIC_API_URL = 'http://localhost:8000/hrms/basicemployees';
const GENERAL_API_URL = 'http://localhost:8000/hrms/generalemployees';

export const getCategories = async () => {
  const response = await axios.get(`${BASIC_API_URL}/categories`);
  console.log(response.data)
  return response.data;
};

export const getProfTaxLocations = async () => {
  const response = await axios.get(`${BASIC_API_URL}/prof-tax-locations`);
  return response.data;
};

export const getEsiLocations = async () => {
  const response = await axios.get(`${BASIC_API_URL}/esi-locations`);
  return response.data;
};

export const getWeekOffCategories = async () => {
  const response = await axios.get(`${BASIC_API_URL}/week-off-categories`);
  return response.data;
};

export const getMetroNonMetroOptions = async () => {
  const response = await axios.get(`${BASIC_API_URL}/metro-non-metro`);
  return response.data;
};

export const submitForm = async (formData) => {
  const response = await axios.post(`${BASIC_API_URL}/submit-form`, formData);
  return response.data;
};

export const getSubmittedForms = async () => {
  const response = await axios.get(`${BASIC_API_URL}/submit-form`);
  return response.data;
};


// General Employee routes
export const getDepartments = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/departments`);
   
    return response.data;
  };
  
  export const getDesignations = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/designations`);
    return response.data;
  };
  
  export const getGrades = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/grades`);
    return response.data;
  };
  
  export const getCostCentres = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/cost-centres`);
    return response.data;
  };
  
  export const getBranches = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/branches`);
    return response.data;
  };
  
  export const getPayModes = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/pay-modes`);
    return response.data;
  };
  
  export const getUserTypes = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/user-types`);
    return response.data;
  };
  
  export const getStopPayments = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/stop-payments`);
    return response.data;
  };
  
  export const getItaxRegimeTypes = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/itax-regime-types`);
    return response.data;
  };



  export const generalSubmitForm = async (formData) => {
    const response = await axios.post(`${GENERAL_API_URL}/submit-form`, formData);
    return response.data;
  };

  export const generalGetSubmittedForms = async () => {
    const response = await axios.get(`${GENERAL_API_URL}/submit-form`);
    return response.data;
  };