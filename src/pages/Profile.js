import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import './profile.css';

const Profile = ({ user, authenticatedUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [formData, setFormData] = useState(user ? { ...user } : {});
  const defaultImage = 'img/pfp.jpg';
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];

  //firebase
  useEffect(() => {
    console.log("hello");
    if (authenticatedUser) {
      const fetchProfile = async () => {
        const db = getFirestore();
        const userRef = doc(db, "Ball", authenticatedUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists() && !isEditClicked){
          
          const data = docSnap.data();

          console.log("logged fetch data: ", data);

          setFormData(data);
        } else {
          setIsEditing(true);
        }
      };

      fetchProfile();
    }
  }, []);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'position') {
      const updatedPositions = checked
        ? [...formData.position, value]
        : formData.position.filter((pos) => pos !== value);
      setFormData({
        ...formData,
        [name]: updatedPositions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.type === 'number' ? Number(value) : value,
      });
    }
  };

  const saveProfile = async () => {
    const db = getFirestore();
    const userRef = doc(db, "Ball", authenticatedUser.uid);
    const userData = { ...formData }; 

    userData.position = formData.position ? [...formData.position] : [];
    
    try {
      await setDoc(userRef, userData);
      console.log("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  
    console.log("Profile saved successfully! -- runs after everything runs");
  };

  const handleSave = async () => {
    await saveProfile();
    setIsEditing(false);
    setFormData(formData);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };
  console.log("form data: ", formData);
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

          <section className="position">
            <h2>Position</h2>
            {positions.map((pos) => (
              <label key={pos}>
                <input
                  type="checkbox"
                  name="position"
                  value={pos}
                  checked={formData.position.includes(pos)}
                  onChange={handleInputChange}
                />
                {pos}
              </label>
            ))}
          </section>

          <section className="location">
            <h2>Location</h2>
            <input
              type="text"
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}
              placeholder="State"
            />
            <input
              type="text"
              name="county"
              value={formData.county || ''}
              onChange={handleInputChange}
              placeholder="County"
            />
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
              placeholder="City"
            />
          </section>

          <section className="bio">
            <h2>Basketball Experience</h2>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </section>

          <section className="bio-data">
            <h2>Height (in)</h2>
            <input
              type="number"
              name="height"
              value={formData.height || ''}
              onChange={handleInputChange}
            />
            <h2>Weight (lb)</h2>
            <input
              type="number"
              name="weight"
              value={formData.weight || ''}
              onChange={handleInputChange}
            />
            <h2>Wingspan (in)</h2>
            <input
              type="number"
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
                  value={formData.points || ''}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Assists per game:
                <input
                  type="number"
                  name="assists"
                  value={formData.assists || ''}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Rebounds per game:
                <input
                  type="number"
                  name="rebounds"
                  value={formData.rebounds || ''}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Steals per game:
                <input
                  type="number"
                  name="steals"
                  value={formData.steals || ''}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                Blocks per game:
                <input
                  type="number"
                  name="blocks"
                  value={formData.blocks || ''}
                  onChange={handleInputChange}
                />
              </li>
            </ul>
          </section>

          <section className="contact-info">
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
              src={formData.img || defaultImage}
              alt={`${formData.firstName}`}
              style={{ width: '200px', height: '200px' }}
            />
          </section>

          <section className="position">
            <h2>Position</h2>
            <p>{Array.isArray(formData.position) && formData.position.length > 0 ? formData.position.join(', ') : 'Not Provided'}</p>
          </section>

          <section className="location">
            <h2>Location</h2>
            <p>State: {formData.state || 'Not Provided'}</p>
            <p>County: {formData.county || 'Not Provided'}</p>
            <p>City: {formData.city || 'Not Provided'}</p>
          </section>

          <section className="bio">
            <h2>Basketball Experience</h2>
            <p>{formData.experience || 'Not Provided'}</p>
          </section>

          <section className="bio-data">
            <h2>Height</h2>
            <p>{formData.height || 'Not Provided'}</p>
            <h2>Weight</h2>
            <p>{formData.weight || 'Not Provided'}</p>
            <h2>Wingspan</h2>
            <p>{formData.wingspan || 'Not Provided'}</p>
          </section>

          <section className="stats">
            <h2>Statistics</h2>
            <ul>
              <li>Games played: {formData.games || 0}</li>
              <li>Points per game: {formData.points || 0}</li>
              <li>Assists per game: {formData.assists || 0}</li>
              <li>Rebounds per game: {formData.rebounds || 0}</li>
              <li>Steals per game: {formData.steals || 0}</li>
              <li>Blocks per game: {formData.blocks || 0}</li>
            </ul>
          </section>

          <section className="contact-info">
            <h2>Contact Information</h2>
            <p>Email: {formData.email || 'Not Provided'}</p>
            <p>Phone: {formData.phone || 'Not Provided'}</p>
          </section>

          <button type="button" onClick={() => { setIsEditing(true); setIsEditClicked(true); }}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;