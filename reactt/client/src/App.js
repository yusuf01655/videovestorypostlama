import React, { useState, useEffect } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import UploadsList from './components/UploadsList';
import axios from 'axios';
import { BACKEND_URI } from './config/constants';
import anasayfa from './sayfalar/anasayfa';
import kaydol from './sayfalar/kaydol';
import girisyap from './sayfalar/girisyap';
import {BrowserRouter, Route} from 'react-router-dom'

const App = () => {
  const [medias,setMedias] = useState([])

  useEffect(() => {
    getAllMedias();
  }, []);
  const getAllMedias = () => {
    axios.get(`${BACKEND_URI}/api/v1/media/all`).then(result => {
      setMedias(result.data)  //veri alinirsa ayarlanacak
    }).catch(error => {
      setMedias([]);  //hata verirse bos dizi donecek
      console.log(error);
      alert("src > App.js > App > getAllMedias kisminda hata ");
    })
  }
  return (
  <>
    <div className="row">

      <div className="col-md-6">
        <div 
          className="card" 
          style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}>
            <div className="card-body"><UploadForm getAllMedias = {getAllMedias} /></div>
          </div>
      </div>

      <div className="col-md-6">
        <div 
          className="card" 
          style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}>
            <div className="card-body"><UploadsList medias = {medias} /></div>
          </div>
      </div>
      <br />
     <div>
      <anasayfa />
     </div>
      
      {/* shift alt a        yorum kisayolu */}
    </div>
    


    <BrowserRouter>
      <Route exact path="/anasayfa" component={anasayfa} />
      <Route exact path="/girisyap" component={girisyap} />
      <Route exact path="/kaydol" component={kaydol} />
    </BrowserRouter>
  </>
  );
}

export default App;
