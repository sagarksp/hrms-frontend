import axios from 'axios';

const API_URL = `${API_BASE_URL}/hrms/permission`;

export const createPermission = (permission) => {
  return axios.post(API_URL, permission);
};

export const getPermissions = () => {
  return axios.get(API_URL);
};
