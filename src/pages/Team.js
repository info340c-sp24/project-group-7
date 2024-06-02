import React, { useState } from 'react';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import './team.css';

const Team = ({ data, currentTeam, setCurrentTeam, authenticatedUser }) => {
  const [teamName, setTeamName] = useState(currentTeam);
  const [isEditing, setIsEditing] = useState(false);

  
  const updateUserTeam = async (userId, newTeamName) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "Ball", userId);
      const docSnapshot = await getDoc(userRef);

      if (docSnapshot.exists()) {
        await updateDoc(userRef, { team: newTeamName });
        console.log("Team updated successfully!");
      } else {
        await setDoc(userRef, { team: newTeamName });
        console.log("Team created successfully!");
      }
    } catch (error) {
      console.error("Error updating/creating team: ", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (authenticatedUser) {
      await updateUserTeam(authenticatedUser.uid, teamName);
      setIsEditing(false);
      setCurrentTeam(teamName);
    }
  };

  const handleChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleLeaveTeam = () => {
    const confirmation = window.confirm("Are you sure you want to leave the team?");
    if (confirmation) {
      setCurrentTeam(null);
    }
  };
  console.log("CURRENT TEAM DISPLAYED IN TEAM.js", currentTeam);
  const teamMembers = data.filter(profileObj => profileObj.team === currentTeam);

  return (
    <div className='team'>
      <div className="noTeam">
        {currentTeam ? (
          <div className='team-header'>
            <h2>Your team: {currentTeam}</h2>
          </div>
        ) : (
          <div className='team-header'>
            <h2>You don't have a team yet.</h2>
            {isEditing ? (
              <div>
                <input type="text" value={teamName} onChange={handleChange} />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <button className="createTeamBtn" onClick={handleEdit}>Create a team</button>
            )}

            <h3 className='freeAgentsTitle'>Free Agents:</h3>
          </div>
        )}

        <div className="table-responsive">
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Position</th>
                <th scope="col">PPG</th>
                <th scope="col">AST</th>
                <th scope="col">REB</th>
                <th scope="col">SPG</th>
                <th scope="col">BLK</th>
                <th scope="col">Games</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((profileObj) => (
                <tr key={profileObj.username}>
                  <td>{`${profileObj.firstName} ${profileObj.lastName}`}</td>
                  <td>{profileObj.email}</td>
                  <td>{profileObj.position}</td>
                  <td>{(profileObj.points / profileObj.games).toFixed(1)}</td>
                  <td>{(profileObj.assists / profileObj.games).toFixed(1)}</td>
                  <td>{(profileObj.rebounds / profileObj.games).toFixed(1)}</td>
                  <td>{(profileObj.steals / profileObj.games).toFixed(1)}</td>
                  <td>{(profileObj.blocks / profileObj.games).toFixed(1)}</td>
                  <td>{profileObj.games}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentTeam && (
          <div className="leaveTeamButtonContainer">
            <button className="leaveTeamBtn" onClick={handleLeaveTeam}>Leave Team</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;