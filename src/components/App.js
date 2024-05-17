import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Footer from './Footer';
import Team from './Team';
import Agency from './Agency';
import Signin from './Signin';
import './style.css';
import profilesData from '../data/profiles.json';

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
        {authenticatedUser && <Route path="/team" element={<Team data={profilesData} currentTeam={currentTeam} />} />}
        <Route path="/agency" element={<Agency data={profilesData} />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} authenticatedUser={authenticatedUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;