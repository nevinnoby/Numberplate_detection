import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
      <ul className="sidebar-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><a href="#logout">Logout</a></li>
      </ul>
    </div>
    </div>
  )
}

export default Sidebar
