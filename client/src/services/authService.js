import axios from 'axios';
const API_URL = '/api/auth/';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;

  } catch (error) {
    console.error('API Error: User registration failed', error);
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
      
    } else {
      throw new Error('An unexpected error occurred during registration.');
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_URL + 'login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;

  } catch (error) {
    console.error('API Error: User login failed', error);
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);

    } else {
      throw new Error('An unexpected error occurred during login.');
    }
  }
};