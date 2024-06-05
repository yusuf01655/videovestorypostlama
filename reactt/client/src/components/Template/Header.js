import React from 'react';
//import logo from './logo.png'; // Assuming you have a logo image

const Header = () => {
  return (
    <header className="app-header">  {/* Add a CSS class for styling */}
      {/* <img src={logo} alt="Your Application Logo" className="logo" /> */}
      <h1>My Awesome App</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
