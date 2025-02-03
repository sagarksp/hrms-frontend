// src/api/roleService.js
import API_BASE_URL from '../../../config/config';
import axios from 'axios';

const API_URL = `${API_BASE_URL}/hrms/role`; // Update as needed

export const createRole = async (roleData) => {
  return axios.post(`${API_URL}/create`, roleData);
};

export const getRoles = async () => {
  return axios.get(`${API_URL}`);
};
