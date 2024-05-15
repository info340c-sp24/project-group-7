import React from 'react';
import './profile.css';

const Signin = () => {
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form>
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
  );
}

export default Signin;