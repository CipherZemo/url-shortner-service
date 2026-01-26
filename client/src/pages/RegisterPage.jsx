import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  //Use a single state object to hold all form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData, //It creates a shallow copy of the current formData object. This ensures that when we update one field (e.g., email), the other fields (name, password) are not erased.
      [e.target.name]: e.target.value, // Update the specific field that changed
    });
  };
  //Using square brackets around e.target.name is a JavaScript feature called Computed Property Names. It allows us to use a variable as a key name in an object literal. So, if the user types in the email input, e.target.name is "email", and this line effectively becomes 'email': e.target.value

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
    };

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      setSuccess('Registration successful! Please log in.');
      setFormData({ name: '', email: '', password: '' });// Optionally, clear the form

    } catch (err) {
      const errorMessage = err.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <p>Join us to start creating your own short links!</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name" type="text" placeholder="Enter your name" name="name" // The 'name' attribute is crucial for our dynamic handler
            value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email" type="email" placeholder="Enter your email" name="email" // 'name' attribute must match the state key
            value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password" type="password" placeholder="Choose a strong password" name="password" // 'name' attribute must match the state key
            value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn">Register</button>
      </form>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;