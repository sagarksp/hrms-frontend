// utils/api.js
import API_BASE_URL from "../../config/config";
export const authenticatedData = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hrms/authdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `userSession=${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      throw error;
    }
  };
  