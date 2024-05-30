import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./signin.css";
import { auth, db } from "../firebase";

const Signin = ({
  onLogin,
  onGoogleLogin,
  authenticatedUser,
  setAuthenticatedUser,
}) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  if (authenticatedUser) {
    return <Navigate to="/profile" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;
      setAuthenticatedUser(user);
      onLogin(email.value, password.value);
      setSignUpError(null); // Clear any previous error
    } catch (error) {
      console.error(error);
      setSignUpError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { newEmail, newPassword } = e.target.elements;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newEmail.value,
        newPassword.value
      );
      const user = userCredential.user;
      setAuthenticatedUser(user);

      // Store additional user data in Firestore using the uid
      await setDoc(doc(db, "Ball", user.uid), {
        email: newEmail.value,
      });

      setSignUpError(null); // Clear any previous error
    } catch (error) {
      console.error(error);
      setSignUpError(error.message);
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-content">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="input-field-pass"
              />
            </div>
            <button type="submit" className="btn">
              Sign In
            </button>
            <button
              type="button"
              className="google-btn"
              onClick={onGoogleLogin}
            >
              Sign In with Google
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={() => setShowSignUp(true)}>
              Create one!
            </a>
          </p>
          {showSignUp && (
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="newEmail">Email</label>
                <input
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  required
                  className="input-field-pass"
                />
              </div>
              <button type="submit" className="btn">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
