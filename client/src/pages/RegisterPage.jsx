import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import Alert from '../components/Alert';

const RegisterPage = () => {
  //Use a single state object to hold all form data
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email address is invalid.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
  };

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

    const validationErrors = validate();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    };

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      setSuccess('Registration successful! Redirecting to login....');
      setFormData({ name: '', email: '', password: '' });// Optionally, clear the form

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Registeration failed. Pls try again');

    }
  };

  return (
    <div className="auth-container">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-2">Create Your Account</h2>
          <p className="text-center text-slate-500 mb-6">Join us to start creating your own short links!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                id="name" type="text" placeholder="Enter your name" name="name" // The 'name' attribute is crucial for our dynamic handler
                value={formData.name} onChange={handleChange} className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`} required />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                id="email" type="email" placeholder="Enter your email" name="email" // 'name' attribute must match the state key
                value={formData.email} onChange={handleChange} className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} required />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                id="password" type="password" placeholder="Choose a strong password" name="password" // 'name' attribute must match the state key
                value={formData.password} onChange={handleChange} className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`} required />
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>


            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">
              Register</button>
          </form>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} />}

          <p className="mt-6 text-center text-sm">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;