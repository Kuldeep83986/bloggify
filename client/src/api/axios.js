// src/api/axios.js
import axios from 'axios';

function safeParseJSON(item) {
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // your backend URL
});

// Attach token automatically
instance.interceptors.request.use((config) => {
  const user = safeParseJSON(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
