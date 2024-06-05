import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="app-footer">  {/* Add a CSS class for styling */}
      <p>&copy; {year} My Awesome App. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
