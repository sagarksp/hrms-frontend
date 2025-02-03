// api/resources.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/hrms/resources';

export const fetchResources = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const addResource = async (resource) => {
  try {
    await axios.post(BASE_URL, resource);
  } catch (error) {
    console.error('Error adding resource:', error);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};
