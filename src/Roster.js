import React from 'react';
import './team.css';

const Roster = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Position</th>
          <th scope="col">Points/Assists</th>
          <th scope="col">Games played</th>
          <th scope="col">Rebounds per game</th>
          <th scope="col">Steals per game</th>
          <th scope="col">Picture</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nathan Yung</td>
          <td>Small Guard</td>
          <td>20/20</td>
          <td>6</td>
          <td>3</td>
          <td>2</td>
          <td>
            <a href="#" target="_blank">
              <img src="img/pfp.jpg" alt="Donatello" className="cover" />
            </a>
          </td>
        </tr>
        <tr>
          <td>Paul Gialis</td>
          <td>Center</td>
          <td>30/30</td>
          <td>6</td>
          <td>3</td>
          <td>2</td>
          <td>
            <a href="#" target="_blank">
              <img src="img/pfp.jpg" alt="Leonardo" className="cover" />
            </a>
          </td>
        </tr>
        <tr>
          <td><a href="/profile">Zain Khan</a></td>
          <td>Point Guard</td>
          <td>40/40</td>
          <td>6</td>
          <td>3</td>
          <td>2</td>
          <td>
            <a href="#" target="_blank">
              <img src="img/pfp.jpg" alt="Michelangelo" className="cover" />
            </a>
          </td>
        </tr>
        <tr>
          <td>Michael Jordan</td>
          <td>Shooting Guard</td>
          <td>0/5</td>
          <td>6</td>
          <td>3</td>
          <td>2</td>
          <td>
            <a href="#" target="_blank">
              <img src="img/pfp.jpg" alt="Raphael" className="cover" />
            </a>
          </td>
        </tr>
        <tr>
          <td>Lebron James</td>
          <td>Power Forward</td>
          <td>50/50</td>
          <td>6</td>
          <td>3</td>
          <td>2</td>
          <td>
            <a href="#" target="_blank">
              <img src="img/pfp.jpg" alt="Splinter" className="cover" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Roster;