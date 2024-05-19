import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  useEffect(() => {
    if (authenticatedUser) {
      sessionStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
      setCurrentTeam(authenticatedUser.team);
    } else {
      sessionStorage.removeItem('authenticatedUser');
      setCurrentTeam(null);
    }
  }, [authenticatedUser]);

  const handleLogin = (username) => {
    const user = profilesData.find(profile => profile.username === username);
    if (user) {
      setAuthenticatedUser(user);
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
          element={<Profile user={authenticatedUser} updateUser={updateUser} />} 
        />
        <Route 
          path="/team" 
          element={authenticatedUser ? <Team data={profilesData} currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} /> : <Navigate to="/signin" />} 
        />
        <Route path="/agency" element={<Agency data={profilesData} />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} authenticatedUser={authenticatedUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;