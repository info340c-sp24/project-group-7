import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './signin.css';

const Signin = ({ onLogin, onGoogleLogin, authenticatedUser }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  if (authenticatedUser) {
    return <Navigate to="/profile" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = e.target.elements;
    try {
      await onLogin(identifier.value, password.value);
      setSignInError(null); // Clear any previous error
    } catch (error) {
      console.error(error);
      setSignInError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { newUsername, newEmail, newPassword } = e.target.elements;
    const auth = getAuth();
    const db = getFirestore();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, newEmail.value, newPassword.value);
      const user = userCredential.user;

      // Add the username to Firestore
      await addDoc(collection(db, "Ball"), {
        uid: user.uid,
        username: newUsername.value,
        email: newEmail.value,
        team: null // Assuming new users don't have a team initially
      });

      // Log in the user after sign-up
      await onLogin(newEmail.value, newPassword.value);
      setSignUpError(null); // Clear any previous error
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
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="identifier">Username or Email</label>
              <input type="text" id="identifier" name="identifier" required className="input-field" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required className="input-field-pass" />
            </div>
            <button type="submit" className="btn">Sign In</button>
            <button type="button" className="google-btn" onClick={onGoogleLogin}>Sign In with Google</button>
          </form>
          {signInError && <p className="error-message">{signInError}</p>}
          <p>Don't have an account? <a href="#" onClick={() => setShowSignUp(true)}>Create one!</a></p>
          {showSignUp && (
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="newUsername">Username</label>
                <input type="text" id="newUsername" name="newUsername" required className="input-field" />
              </div>
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
          {signUpError && <p className="error-message">{signUpError}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signin;