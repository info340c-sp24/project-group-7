import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './signin.css';

const Signin = ({ onLogin, onGoogleLogin, authenticatedUser }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState(null);


  if (authenticatedUser) {
    return <Navigate to="/profile" />;
  }

   const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = e.target.elements;
  try {
    onLogin(email.value, password.value);
    setSignUpError(null); // clear any previous error
  } catch (error) {
    console.error(error);
    setSignUpError(error.message);
  }
};

const handleSignUp = async (e) => {
  e.preventDefault();
  const { newEmail, newPassword } = e.target.elements;
  try {
    onLogin(newEmail.value, newPassword.value);
    setSignUpError(null); // clear any previous error
  } catch (error) {
    console.error(error);
    setSignUpError(error.message);
  }
};

  return (
    <div className='signin'>
      <div className="signin-container">
        <div className="signin-content">
          <h2>Sign In</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const { email, password } = e.target.elements;
            onLogin(email.value, password.value)}}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required className="input-field" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required className="input-field-pass" />
            </div>
            <button type="submit" className="btn">Sign In</button>
            <button type="button" className="google-btn" onClick={onGoogleLogin}>Sign In with Google</button>
          </form>
          <p>Don't have an account? <a href="#" onClick={() => setShowSignUp(true)}>Create one!</a></p>
          {showSignUp && (
            <form onSubmit={(e) => handleSignUp(e)}>
              <div className="form-group">
                <label htmlFor="newEmail">Email</label>
                <input type="email" id="newEmail" name="newEmail" required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Password</label>
                <input type="password" id="newPassword" name="newPassword" required className="input-field-pass" />
              </div>
              <button type="submit" className="btn">Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
