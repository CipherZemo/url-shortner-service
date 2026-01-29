import axios from 'axios';

export const createShortUrl = async (data, token = null) => {
  try {
    const config = {};
    if (token) {
      config.headers = {
        'x-auth-token': token  // Send token if user is logged in
      };
    }
    //We use a relative path because our Vite proxy will automatically forward this request to our backend server (http://localhost:5000/api/shorten).
    const response = await axios.post('/api/shorten', data, config);
    return response.data;

  } catch (error) {
    console.error('API Error: Failed to create short URL', error);

    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

