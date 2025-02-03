import axios from 'axios';
import API_BASE_URL from '../../config/config';
// Define your API endpoint
// const API_URL = `${API_BASE_URL}/hrms/authdata';

export const checkPermission = async () => {
  try {
    
    const url = `${API_BASE_URL}/hrms/authdata`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });

   
    const data = await response.json();

  

    // Check if data contains the expected structure
    if (data && data.data && data.data.length > 0) {
      // Access the permissions array from the first user object
      const permissions = data.data[0]?.department.roles.permissions;
     
      return permissions;
    } else {
     
      return null; // or handle the error as needed
    }
  } catch (error) {
   
    // Handle error appropriately
    return null; // or handle the error as needed
  }
};
