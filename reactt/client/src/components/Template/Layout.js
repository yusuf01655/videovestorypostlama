import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Section from './Section';
//import Article from './Article';
import Aside from './Aside';
import Footer from './Footer';
import EditVideoWithStickerPage from '../../sayfalar/EditVideoWithStickerPage';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">  {/* Add a CSS class for styling */}
      <Header />
      <Nav />
      <Section />
     {/*  <Article /> */}
      <Aside />
    
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
