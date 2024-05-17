import React from 'react';
import './team.css';

const Team = ({ data, currentTeam }) => {
  return (
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
  );
}

export default Team;
