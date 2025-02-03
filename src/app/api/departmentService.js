import axios from 'axios';
import API_BASE_URL from '../../../config/config';
const API_URL = `${API_BASE_URL}/hrms/departments`; // Update as needed

// Create a new department
export const createDepartment = async (departmentData) => {
  return axios.post(`${API_URL}`, departmentData);
};

// Get all departments
export const getDepartments = async () => {
  return axios.get(`${API_URL}`);
};

// Update a department by ID
export const updateDepartment = async (id, departmentData) => {
  return axios.put(`${API_URL}/${id}`, departmentData);
};

// Delete a department by ID
export const deleteDepartment = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
