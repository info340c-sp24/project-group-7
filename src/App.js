import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Footer from './Footer';
import Roster from './Roster';
import Agency from './Agency';
import Signin from './Signin';
import './style.css';

const App = (props) => {
  const displayedData = props.profileData

  return (
    <Router>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Roster />} />
          <Route path="/agency" element={<Agency data={displayedData} />} />
          <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;