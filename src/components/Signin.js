import React from 'react';
import { Navigate } from 'react-router-dom';
import './profile.css';

const Signin = ({ onLogin, authenticatedUser }) => {
  if (authenticatedUser) {
    return <Navigate to="/profile" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username } = e.target.elements;
    onLogin(username.value);
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
