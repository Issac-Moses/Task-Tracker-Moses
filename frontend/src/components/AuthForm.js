import React from 'react';

function AuthForm({ formType, formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType === 'login' ? 'Login' : 'Register'}</h2>

      {formType === 'register' && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      )}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">
        {formType === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}

export default AuthForm;
