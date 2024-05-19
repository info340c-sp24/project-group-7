import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './team.css'

export default function Agency({ data }) {
  const [sortByCriteria, setSortByCriteria] = useState(null);
  const [isAscending, setIsAscending] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('');

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

  let sortedData = [...data];
  if (sortByCriteria) {
    sortedData = _.sortBy(sortedData, sortByCriteria);
    if (isAscending === false) {
      sortedData.reverse();
    }
  }

  const filteredData = sortedData.filter((user) => user.team === null && (selectedPosition === '' || user.position === selectedPosition));

  return (
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
      </div>
      <table className="table w-100">
        <thead>
          <tr>
            <th className="text-center">
              Name
            </th>
            <th className="text-center">
              Email
            </th>
            <th className="text-center">
              Position
            </th>
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
              SPG
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
              <td className="text-center">{profileObj.position}</td>
              <td className="text-center">{profileObj.height}</td>
              <td className="text-center">{profileObj.weight}</td>
              <td className="text-center">{profileObj.wingspan}</td>
              <td className="text-center">{(profileObj.points / profileObj.games).toFixed(1)}</td>
              <td className="text-center">{(profileObj.assists / profileObj.games).toFixed(1)}</td>
              <td className="text-center">{(profileObj.rebounds / profileObj.games).toFixed(1)}</td>
              <td className="text-center">{(profileObj.steals / profileObj.games).toFixed(1)}</td>
              <td className="text-center">{(profileObj.blocks / profileObj.games).toFixed(1)}</td>
              <td className="text-center">{profileObj.games}</td>
              <td className="text-center">
                <Link to={`/profile/${profileObj.username}`}>
                  <span className="material-icons">add</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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