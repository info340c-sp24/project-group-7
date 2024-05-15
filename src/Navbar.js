import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-dark">
      <img src="img/Logo.png" alt="Logo" />
      <a className="navbar-brand" href="index.html">So You Think You Can Ball?</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="profile.html">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="team.html">Team</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="agency.html">Free Agency</a>
          </li>
          <li className="nav-item">
            <a className="nav-link signin" href="signin.html">Sign in</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;