import React, { useState, useEffect } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import UploadsList from './components/UploadsList';
import axios from 'axios';
import { BACKEND_URI } from './config/constants';
import anasayfa from './sayfalar/anasayfa';
import Kaydol from './sayfalar/Kaydol';
import girisyap from './sayfalar/girisyap';
import {BrowserRouter, Route} from 'react-router-dom'
import SignupForm from './components/SignupForm';
import Item from './sayfalar/Item';
import Videolar from './App';
import VideoEditPage from './components/VideoEditPage';

const Appp = () => {
  
  



  return (
  <>
    <BrowserRouter>
      <Route exact path="/anasayfa" component={anasayfa} />
      <Route exact path="/girisyap" component={girisyap} />
      <Route exact path="/SignupForm" component={SignupForm} />
      <Route exact path="/Item" component={Item} />
      <Route exact path="/Kaydol" component={Kaydol} />
      <Route exact path="/Videolar" component={Videolar} />
      <Route path="/edit/:mediaId" component={VideoEditPage} />
      //<Route path="/edit/:mediaId/trim" component={VideoEditPage} />
      
    </BrowserRouter>
  </>
  );
}

export default Appp;