// src/apis/shiftApi.js
import axios from 'axios';
import API_BASE_URL from '../../../../config/config';


const API_URL = `${API_BASE_URL}/hrms`;

export const addShift = async (fromTime, toTime) => {
  const response = await axios.post(`${API_URL}/shifts`, { fromTime, toTime });
  return response.data;
};

export const deleteShift = async (id) => {
  await axios.delete(`${API_URL}/shifts/${id}`);
};

export const fetchShifts = async () => {
  const response = await axios.get(`${API_URL}/shifts`);
  return response.data;
};
