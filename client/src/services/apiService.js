import axios from 'axios';

export const createShortUrl = async (longUrl) => {

  try {
    //We use a relative path because our Vite proxy will automatically forward this request to our backend server (http://localhost:5000/api/shorten).
    const response = await axios.post('/api/shorten', { longUrl });


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
