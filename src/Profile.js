import React from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div>
      <section className="profile-pic">
        <img src="img/Zain-Khan-Picture.jpg" alt="Picture of Zain" style={{ width: '200px', height: '200px' }} />
      </section>

      <section className="Bio">
        <h2>Basketball Experience</h2>
        <p>Bellarmine College Preparatory Varsity</p>
      </section>

      <section className="BioData">
        <h2> Height</h2>
        <p> 6'1</p>
        <h2> Weight</h2>
        <p> 175 lbs</p>
        <h2> Wingspan</h2>
        <p> 192 cm</p>
      </section>

      <section className="Stats">
        <h2> Statistics</h2>
        <ul>
          <li>Games played: 7</li>
          <li>Points per game: 15.2</li>
          <li>Assists per game: 5.4</li>
          <li>Rebounds per game: 3.1</li>
          <li>Steals per game: 2.0</li>
        </ul>
      </section>

      <section className="Contact-info">
        <h2>Contact Information</h2>
        <p>Email: khanzainh@gmail.com</p>
        <p>Phone: 987-654-3210</p>
      </section>
    </div>
  );
}

export default Profile;
