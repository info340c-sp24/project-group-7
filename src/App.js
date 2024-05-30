import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"; 
import { auth } from './firebase';
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Team from './pages/Team';
import Agency from './pages/Agency';
import Signin from './pages/Signin';
import './style.css';

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const user = sessionStorage.getItem('authenticatedUser');
    return user ? JSON.parse(user) : null;
  });
  const [currentTeam, setCurrentTeam] = useState(authenticatedUser ? authenticatedUser.team : null);
  const [loginError, setLoginError] = useState(null);

  const [profilesData, setProfilesData] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchProfilesData = async () => {
      const profilesCollection = collection(db, "Ball");
      const querySnapshot = await getDocs(profilesCollection);
      const profiles = querySnapshot.docs.map((doc) => doc.data());
      console.log('Fetched profiles data from Firestore:', profiles);
      setProfilesData(profiles);
    };

    fetchProfilesData();
  }, [db]);

  useEffect(() => {
    if (authenticatedUser) {
      sessionStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
      setCurrentTeam(authenticatedUser.team);
    } else {
      sessionStorage.removeItem('authenticatedUser');
      setCurrentTeam(null);
    }
  }, [authenticatedUser]);

  const handleLogin = async (identifier, password) => {
    const auth = getAuth();
    const db = getFirestore();

    const isEmail = (str) => /\S+@\S+\.\S+/.test(str);

    if (isEmail(identifier)) {
      // Login with email
      try {
        const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
        const user = userCredential.user;
        setAuthenticatedUser(user);
        setLoginError(null); // Clear any previous error
      } catch (error) {
        console.error(error);
        setLoginError(error.message);
      }
    } else {
      // Login with username
      try {
        const usersCollection = collection(db, "Ball");
        const q = query(usersCollection, where("username", "==", identifier));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const email = userData.email;

          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          setAuthenticatedUser(user);
          setLoginError(null); // Clear any previous error
        } else {
          setLoginError("Username not found");
        }
      } catch (error) {
        console.error(error);
        setLoginError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setAuthenticatedUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  const updateUser = (updatedUser) => {
    setAuthenticatedUser(updatedUser);
    const userIndex = profilesData.findIndex(profile => profile.username === updatedUser.username);
    if (userIndex !== -1) {
      profilesData[userIndex] = updatedUser;
    }
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} authenticatedUser={authenticatedUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Profile
              user={authenticatedUser}
              updateUser={updateUser}
              authenticatedUser={authenticatedUser}
            />
          }
        />
        <Route
          path="/team"
          element={authenticatedUser ? <Team data={profilesData} currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} /> : <Navigate to="/signin" />}
        />
        <Route path="/agency" element={<Agency data={profilesData} />} />
        <Route
          path="/signin"
          element={<Signin onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} authenticatedUser={authenticatedUser} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;