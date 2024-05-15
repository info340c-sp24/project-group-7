import React from 'react';
import './index.css';

const Home = () => {
    return (
        <div className="container">
            <div className="row card-container">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"><a href="profile.html">Profile</a></h5>
                            <p className="card-text">Create and manage your own personal profile to let others know more about you and how you play</p>
                            <img src="img/profile.png" alt="Profile Icon" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"><a href="team.html">Team</a></h5>
                            <p className="card-text">Check out your current team lineup and other members' profiles</p>
                            <img src="img/team.png" alt="Team Icon" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"><a href="agency.html">Free Agency</a></h5>
                            <p className="card-text">Find players who don't have a team and draft them to your own</p>
                            <img src="img/agency.png" alt="Free Agency Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;