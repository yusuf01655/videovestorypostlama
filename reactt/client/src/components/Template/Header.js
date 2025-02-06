import React from 'react';
//import logo from './logo.png'; // Assuming you have a logo image
import './Headerr.css'
const Header = () => {
  return (
    <header className="app-header">  {/* Add a CSS class for styling */}
      {/* <img src={logo} alt="Your Application Logo" className="logo" /> */}
      <h1>My Awesome App</h1>
      <nav>
        <ul>
            <li><a href="#">COURSES</a></li>
            <li><a href="#">DISCUSS</a></li>
            <li><a href="#">TOP LEARNERS</a></li>
            <li><a href="#">BLOG</a></li>
        </ul>
    </nav>
    </header>
  );
};

export default Header;
