import React from 'react';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
  return (
    <div>
      
      <nav className='navbar'>
      <button onClick={toggleSidebar} className='toggleButton'>
        ☰
      </button>
        <div className='navlogo'>
          <h1>Number Plate</h1>
        </div>
        <ul className='navLinks'>
        <li><a href="#home" className='navItem'>Home</a></li>
        <li><a href="#about" className='navItem'>About</a></li>
        <li><a href="#services" className='navItem'>Services</a></li>
        <li><a href="#contact" className='navItem'>Contact</a></li>
      </ul>
      </nav>
    </div>
  )
}


export default Navbar
