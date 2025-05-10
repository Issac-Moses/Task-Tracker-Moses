import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', formData);
      alert('Registration Successful');
    } catch (error) {
      console.error(error);
      alert('Registration Failed');
    }
  };

  return (
    <AuthForm
      formType="register"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Register;
