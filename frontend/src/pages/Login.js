import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-backend.onrender.com/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Login Successful');
    } catch (error) {
      console.error(error);
      alert('Login Failed');
    }
  };

  return (
    <AuthForm
      formType="login"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
