import React, { useState } from 'react';
import _ from 'lodash';
import './team.css';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export default function Agency({ data, authenticatedUser }) {
  console.log('Agency data being passed on: ', data);
  console.log('Authenticated user: ', authenticatedUser);
  const [sortByCriteria, setSortByCriteria] = useState(null);
  const [isAscending, setIsAscending] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [filterByLocation, setFilterByLocation] = useState(false);

  const handleClick = (event) => {
    const { name } = event.currentTarget;

    if (sortByCriteria !== name) {
      setSortByCriteria(name);
      setIsAscending(true);
    } else {
      setIsAscending((prevAscending) => {
        if (prevAscending === true) {
          return false;
        } else {
          setSortByCriteria(null);
          return null;
        }
      });
    }
  };

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  const handleLocationFilterChange = () => {
    setFilterByLocation(!filterByLocation);
  };

  let sortedData = [...data];
  if (sortByCriteria) {
    sortedData = _.sortBy(sortedData, sortByCriteria);
    if (isAscending === false) {
      sortedData.reverse();
    }
  }

  const filteredData = sortedData.filter((user) => {
    if (filterByLocation && authenticatedUser && authenticatedUser.state && authenticatedUser.county) {
      return (
        user.team === null &&
        (Array.isArray(user.position) ? user.position.includes(selectedPosition) : user.position === selectedPosition || selectedPosition === '') &&
        user.state === authenticatedUser.state &&
        user.county === authenticatedUser.county
      );
    } else {
      if (selectedPosition === '') {
        return user.team === null;
      } else {
        return user.team === null && (Array.isArray(user.position) ? user.position.includes(selectedPosition) : user.position === selectedPosition);
      }
    }
  });
  

  const handleAddToTeam = async (user) => {
    if (!authenticatedUser || !authenticatedUser.team) {
      console.error('Authenticated user does not have a team.');
      return;
    }

    try {
      const db = getFirestore();
      const userRef = doc(db, "Ball", user.username);
      await updateDoc(userRef, { team: authenticatedUser.team });
      console.log(`User ${user.username} has been added to team ${authenticatedUser.team}`);
    } catch (error) {
      console.error('Error adding user to team: ', error);
    }
  };

  return (
    <div className='team'>
      <div className="table-responsive">
        <div className="filter-container">
          <label htmlFor="position-filter">Filter by Position:</label>
          <select id="position-filter" value={selectedPosition} onChange={handlePositionChange}>
            <option value="">None</option>
            <option value="PG">PG</option>
            <option value="SG">SG</option>
            <option value="SF">SF</option>
            <option value="PF">PF</option>
            <option value="C">C</option>
          </select>
          <div>
            <input
              type="checkbox"
              id="location-filter"
              checked={filterByLocation}
              onChange={handleLocationFilterChange}
            />
            <label htmlFor="location-filter">Filter by Location</label>
          </div>
        </div>
        <table className="table w-100">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Position</th>
              <th className="text-center">
                <SortButton
                  name="height"
                  active={sortByCriteria === 'height'}
                  ascending={sortByCriteria === 'height' && isAscending}
                  onClick={handleClick}
                />
                Height
              </th>
              <th className="text-center">
                <SortButton
                  name="weight"
                  active={sortByCriteria === 'weight'}
                  ascending={sortByCriteria === 'weight' && isAscending}
                  onClick={handleClick}
                />
                Weight
              </th>
              <th className="text-center">
                <SortButton
                  name="wingspan"
                  active={sortByCriteria === 'wingspan'}
                  ascending={sortByCriteria === 'wingspan' && isAscending}
                  onClick={handleClick}
                />
                Wingspan
              </th>
              <th className="text-center">
                <SortButton
                  name="points"
                  active={sortByCriteria === 'points'}
                  ascending={sortByCriteria === 'points' && isAscending}
                  onClick={handleClick}
                />
                PPG
              </th>
              <th className="text-center">
                <SortButton
                  name="assists"
                  active={sortByCriteria === 'assists'}
                  ascending={sortByCriteria === 'assists' && isAscending}
                  onClick={handleClick}
                />
                AST
              </th>
              <th className="text-center">
                <SortButton
                  name="rebounds"
                  active={sortByCriteria === 'rebounds'}
                  ascending={sortByCriteria === 'rebounds' && isAscending}
                  onClick={handleClick}
                />
                REB
              </th>
              <th className="text-center">
                <SortButton
                  name="steals"
                  active={sortByCriteria === 'steals'}
                  ascending={sortByCriteria === 'steals' && isAscending}
                  onClick={handleClick}
                />
                STL
              </th>
              <th className="text-center">
                <SortButton
                  name="blocks"
                  active={sortByCriteria === 'blocks'}
                  ascending={sortByCriteria === 'blocks' && isAscending}
                  onClick={handleClick}
                />
                BLK
              </th>
              <th className="text-center">
                <SortButton
                  name="games"
                  active={sortByCriteria === 'games'}
                  ascending={sortByCriteria === 'games' && isAscending}
                  onClick={handleClick}
                />
                Games
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((profileObj) => (
              <tr key={profileObj.username}>
                <td>{`${profileObj.firstName} ${profileObj.lastName}`}</td>
                <td className="text-center">{profileObj.email}</td>
                <td className="text-center">{Array.isArray(profileObj.position) ? profileObj.position.join(', ') : profileObj.position}</td>
                <td className="text-center">{profileObj.height}</td>
                <td className="text-center">{profileObj.weight}</td>
                <td className="text-center">{profileObj.wingspan}</td>
                <td className="text-center">{(profileObj.points / profileObj.games).toFixed(1)}</td>
                <td className="text-center">{(profileObj.assists / profileObj.games).toFixed(1)}</td>
                <td className="text-center">{(profileObj.rebounds / profileObj.games).toFixed(1)}</td>
                <td className="text-center">{(profileObj.steals / profileObj.games).toFixed(1)}</td>
                <td className="text-center">{(profileObj.blocks / profileObj.games).toFixed(1)}</td>
                <td className="text-center">{profileObj.games}</td>
                {authenticatedUser && authenticatedUser.team && (
                  <td className="text-center">
                    <button onClick={() => handleAddToTeam(profileObj)}>
                      <span className="material-icons">add</span>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortButton(props) {
  let iconClasses = '';
  let iconText = '|';

  if (props.active) {
    iconClasses += ` active`;
    iconText = props.ascending ? 'arrow_upward' : 'arrow_downward';
  }

  return (
    <button className="btn btn-sm btn-sort" name={props.name} onClick={props.onClick}>
      <span className={`material-icons${iconClasses}`} aria-label={`sort by ${props.name}`}>
        {iconText}
      </span>
    </button>
  );
}
