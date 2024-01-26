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
import TrimVideoPage from './sayfalar/TrimVideoPage';
import RotateVideoPage from './sayfalar/RotateVideoPage';
import EditVideoWithStickerPage from './sayfalar/EditVideoWithStickerPage';
import VideoyaMetinEkle from './sayfalar/VideoyaMetinEkle';
import GriTonlamaliVideoPage from './sayfalar/GriTonlamaliVideoPage';
import YenidenOlceklendirPage from './sayfalar/YenidenOlceklendirPage';
import KirpPage from './sayfalar/KirpPage';
import ParlaklikVeKontrastPage from './sayfalar/ParlaklikVeKontrastPage';
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
      <Route path="/edit/:mediaId/trim" component={TrimVideoPage} />
      <Route path="/edit/:mediaId/rotate" component={RotateVideoPage} />
      <Route path="/edit/:mediaId/overlaysticker" component={EditVideoWithStickerPage} />
      <Route path="/edit/:mediaId/overlaytext" component={VideoyaMetinEkle} />
      <Route path="/edit/:mediaId/gritonlamaliyap" component={GriTonlamaliVideoPage} />
      <Route path="/edit/:mediaId/yenidenolceklendir" component={YenidenOlceklendirPage} />
      <Route path="/edit/:mediaId/kirp" component={KirpPage} />
      <Route path="/edit/:mediaId/parlaklikvekontrast" component={ParlaklikVeKontrastPage} />
      
    </BrowserRouter>
  </>
  );
}

export default Appp;
