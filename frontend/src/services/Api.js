// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:4000/api/cars';

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const create = async (carData) => {
  const response = await axios.post(API_URL, carData);
  return response.data;
};

const update = async (id, carData) => {
  const response = await axios.put(`${API_URL}/${id}`, carData);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove
};
