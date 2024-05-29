import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import './profile.css';

const Profile = ({ user, updateUser, authenticatedUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user ? { ...user } : {});
  const defaultImage = 'img/pfp.jpg';

  //firestore save
  const saveProfile = async () => {
    const db = getFirestore();
    const userRef = doc(db, "Ball", authenticatedUser.uid);
  
    try {
      await setDoc(userRef, formData);
      console.log("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  };


  useEffect(() => {
  const fetchProfile = async () => {
    const db = getFirestore();
    const userRef = doc(db, "Ball", authenticatedUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      
      updateUser(docSnap.data());
      setFormData(docSnap.data());
    } else {
      setIsEditing(true); //edit profile
    }
  };

  if (authenticatedUser) {
    fetchProfile();
  }
}, [authenticatedUser]);




  // end of firestore code added

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

  // Old handle save
  // const handleSave = () => {
  //   updateUser(formData);
  //   setIsEditing(false);
  // };
  //firestore handle save
  const handleSave = () => {
    saveProfile();
    setIsEditing(false);
  };
  //

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };
//
  return (
    <div className='profile'>
      {isEditing ? (
        <form>
          <section className="profile-pic">
            <img
              src={formData.img || defaultImage}
              alt={`${formData.firstName}`}
              style={{ width: '200px', height: '200px' }}
            />
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
          </section>

          <section className="bio">
            <h2>Basketball Experience</h2>
            <input
              type="text"
              name="experience"
              value={formData.experience || ''}
              onChange={handleInputChange}
            />
          </section>

          <section className="bio-data">
            <h2>Height</h2>
            <input
              type="text"
              name="height"
              value={formData.height || ''}
              onChange={handleInputChange}
            />
            <h2>Weight</h2>
            <input
              type="text"
              name="weight"
              value={formData.weight || ''}
              onChange={handleInputChange}
            />
            <h2>Wingspan</h2>
            <input
              type="text"
              name="wingspan"
              value={formData.wingspan || ''}
              onChange={handleInputChange}
            />
          </section>

          <section className="stats">
            <h2>Statistics</h2>
            <ul>
              <li>
                Games played:
                <input
                  type="number"
                  name="games"
                  value={formData.games}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Points per game:
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Assists per game:
                <input
                  type="number"
                  name="assists"
                  value={formData.assists}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Rebounds per game:
                <input
                  type="number"
                  name="rebounds"
                  value={formData.rebounds}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Steals per game:
                <input
                  type="number"
                  name="steals"
                  value={formData.steals}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Blocks per game:
                <input
                  type="number"
                  name="blocks"
                  value={formData.blocks}
                  onChange={handleInputChange}
                />
              </li>
            </ul>
          </section>

          <section className="Contact-info">
            <h2>Contact Information</h2>
            <p>Email: {formData.email}</p>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </section>

          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <section className="profile-pic">
            <img
              src={user.img || defaultImage}
              alt={`${user.firstName}`}
              style={{ width: '200px', height: '200px' }}
            />
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
              <li>Games played: {user.games || 0}</li>
              <li>Points per game: {user.points || 0}</li>
              <li>Assists per game: {user.assists || 0}</li>
              <li>Rebounds per game: {user.rebounds || 0}</li>
              <li>Steals per game: {user.steals || 0}</li>
              <li>Blocks per game: {user.blocks || 0}</li>
            </ul>
          </section>

          <section className="Contact-info">
            <h2>Contact Information</h2>
            <p>Email: {user.email || 'Not Provided'}</p>
            <p>Phone: {user.phone || 'Not Provided'}</p>
          </section>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;