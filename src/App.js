import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore"; 
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
import './style.css'
import profilesData from './data/profiles.json';

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const user = sessionStorage.getItem('authenticatedUser');
    return user ? JSON.parse(user) : null;
  });
  const [currentTeam, setCurrentTeam] = useState(authenticatedUser ? authenticatedUser.team : null);
  const [loginError, setLoginError] = useState(null);

  //firebase stuffs:
  const [profilesData, setProfilesData] = useState([]);
  const [data, setData] = useState([]);
  const db = getFirestore();

  const fetchDataFromFirestore = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "Ball"));
    const data = [];
    console.log(data);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  useEffect(() => {
    const fetchProfilesData = async () => {
      const db = getFirestore();
      const profilesCollection = collection(db, "Ball");
      const querySnapshot = await getDocs(profilesCollection);
      const profiles = querySnapshot.docs.map((doc) => doc.data());
      console.log('Fetched profiles data from Firestore:', profiles);
      setProfilesData(profiles);
    };

    fetchProfilesData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetchDataFromFirestore();
  //     setData(result);
  //   };
  //   fetchData();
  // }, []);

  //

  useEffect(() => {
    if (authenticatedUser) {
      sessionStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
      setCurrentTeam(authenticatedUser.team);
    } else {
      sessionStorage.removeItem('authenticatedUser');
      setCurrentTeam(null);
    }
  }, [authenticatedUser]);

  const handleLogin = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setAuthenticatedUser(user);
      setLoginError(null); // clear any previous error
    } catch (error) {
      console.error(error);
      setLoginError(error.message);
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

  // console.log('profiles data being passed on: ', profilesData);
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
        <Route path="/signin" element={<Signin onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} authenticatedUser={authenticatedUser} />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;