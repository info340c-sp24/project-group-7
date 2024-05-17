import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './profile.css';

const Profile = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user ? { ...user } : {});

  if (!user) {
    return <Navigate to="/signin" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form>
          <section className="profile-pic">
            <img src={formData.img || 'default-image-path.jpg'} alt={`Picture of ${formData.firstName}`} style={{ width: '200px', height: '200px' }} />
            <input type="text" name="img" value={formData.img} onChange={handleInputChange} placeholder="Image URL" />
          </section>

          <section className="Bio">
            <h2>Basketball Experience</h2>
            <input type="text" name="experience" value={formData.experience || ''} onChange={handleInputChange} />
          </section>

          <section className="BioData">
            <h2>Height</h2>
            <input type="text" name="height" value={formData.height || ''} onChange={handleInputChange} />
            <h2>Weight</h2>
            <input type="text" name="weight" value={formData.weight || ''} onChange={handleInputChange} />
            <h2>Wingspan</h2>
            <input type="text" name="wingspan" value={formData.wingspan || ''} onChange={handleInputChange} />
          </section>

          <section className="Stats">
            <h2>Statistics</h2>
            <ul>
              <li>Games played: <input type="number" name="games" value={formData.games} onChange={handleInputChange} /></li>
              <li>Points per game: <input type="number" name="points" value={formData.points} onChange={handleInputChange} /></li>
              <li>Assists per game: <input type="number" name="assists" value={formData.assists} onChange={handleInputChange} /></li>
              <li>Rebounds per game: <input type="number" name="rebounds" value={formData.rebounds} onChange={handleInputChange} /></li>
              <li>Steals per game: <input type="number" name="steals" value={formData.steals} onChange={handleInputChange} /></li>
              <li>Blocks per game: <input type="number" name="blocks" value={formData.blocks} onChange={handleInputChange} /></li>
            </ul>
          </section>

          <section className="Contact-info">
            <h2>Contact Information</h2>
            <p>Email: {formData.email}</p>
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="Phone" />
          </section>

          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <section className="profile-pic">
            <img src={user.img || 'default-image-path.jpg'} alt={`Picture of ${user.firstName}`} style={{ width: '200px', height: '200px' }} />
          </section>

          <section className="Bio">
            <h2>Basketball Experience</h2>
            <p>{user.experience || 'Not Provided'}</p>
          </section>

          <section className="BioData">
            <h2>Height</h2>
            <p>{user.height || 'Not Provided'}</p>
            <h2>Weight</h2>
            <p>{user.weight || 'Not Provided'}</p>
            <h2>Wingspan</h2>
            <p>{user.wingspan || 'Not Provided'}</p>
          </section>

          <section className="Stats">
            <h2>Statistics</h2>
            <ul>
              <li>Games played: {user.games}</li>
              <li>Points per game: {user.points}</li>
              <li>Assists per game: {user.assists}</li>
              <li>Rebounds per game: {user.rebounds}</li>
              <li>Steals per game: {user.steals}</li>
              <li>Blocks per game: {user.blocks}</li>
            </ul>
          </section>

          <section className="Contact-info">
            <h2>Contact Information</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone || 'Not Provided'}</p>
          </section>

          <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;