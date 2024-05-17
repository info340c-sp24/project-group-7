import React, { useState }  from 'react';
import './team.css';

const Team = ({ data, currentTeam, setCurrentTeam }) => {
  const [teamName, setTeamName] = useState(currentTeam);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  // edit the db stuff
  const handleSave = () => {
    // Here you would typically make an API call to update the user's team in your database
    // For now, we'll just update the state
    setIsEditing(false);
    setCurrentTeam(teamName);
  };

  const handleChange = (event) => {
    setTeamName(event.target.value);
  };
  return (
    <div className="noTeam">
      {currentTeam ? (
        <h2>Your team: {currentTeam}</h2>
      ) : (
       
        <div className="teamMessageContainer">
          <h2>You don't have a team yet.</h2>
          {isEditing ? (
            <div>
              <input type="text" value={teamName} onChange={handleChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <button onClick={handleEdit}>Create a team</button>
          )}
          
          <h3>Free Agents:</h3>
        </div>
      )}

      {
      
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
          {data.filter(profileObj => profileObj.team === currentTeam).map((profileObj) => (
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
}
  </div>
  );
}

export default Team;