import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './team.css';

export default function Agency(props) {

  const [sortByCriteria, setSortByCriteria] = useState(null);
  const [isAscending, setIsAscending] = useState(null);

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

  let sortedData = [...props.data];
  if (sortByCriteria) {
    sortedData = _.sortBy(sortedData, sortByCriteria);
    if (isAscending === false) {
      sortedData.reverse();
    }
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th className="text-end">
              Contact
            </th>
            <th className="text-center">
              Position
            </th>
            <th>
              <SortButton
                name="points"
                active={sortByCriteria === 'points'}
                ascending={sortByCriteria === 'points' && isAscending}
                onClick={handleClick}
              />
              Points
            </th>
            <th>
              <SortButton
                name="assists"
                active={sortByCriteria === 'assists'}
                ascending={sortByCriteria === 'assists' && isAscending}
                onClick={handleClick}
              />
              Assists
            </th>
            <th>
              <SortButton
                name="rebounds"
                active={sortByCriteria === 'rebounds'}
                ascending={sortByCriteria === 'rebounds' && isAscending}
                onClick={handleClick}
              />
              Rebounds
            </th>
            <th>
              <SortButton
                name="games"
                active={sortByCriteria === 'games'}
                ascending={sortByCriteria === 'games' && isAscending}
                onClick={handleClick}
              />
              Games
            </th>
            <th>
              <SortButton
                name="steals"
                active={sortByCriteria === 'steals'}
                ascending={sortByCriteria === 'steals' && isAscending}
                onClick={handleClick}
              />
              Steals
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((profileObj) => (
            <AgentDataRow key={profileObj.username} profileObj={profileObj} />
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

function AgentDataRow({ profileObj }) {
  return (
    <tr>
      <td>{`${profileObj.firstName} ${profileObj.lastName}`}</td>
      <td className="text-end">{profileObj.contact}</td>
      <td className="text-center">{profileObj.position}</td>
      <td>{profileObj.points}</td>
      <td>{profileObj.assists}</td>
      <td>{profileObj.rebounds}</td>
      <td>{profileObj.games}</td>
      <td>{profileObj.steals}</td>
        <td>
            <Link to={`/profile/${profileObj.username}`}>
                <span className="material-icons">add</span>
            </Link>
        </td>
    </tr>
      
  );
}
