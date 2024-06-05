import React, { useState, useEffect } from 'react';

import UploadForm from './components/UploadForm';
import UploadsList from './components/UploadsList';
import axios from 'axios';
import { BACKEND_URI } from './config/constants';
import anasayfa from './sayfalar/anasayfa';
import Kaydol2 from './sayfalar/Kaydol2';
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
    
    
    
  <p class="center large">This paragraph refers to two classes.</p>
    <div className="row">

      <div className="col-md-6">
        <div 
          className="card" 
          >
            <div className="card-body"><UploadForm getAllMedias = {getAllMedias} /></div> 
          </div>
      </div>
      <div className = "div1" /> {/* Add space using an empty div with margin */}
      <div className="col-md-6">
        <div 
          className="card" 
          >
            <div className="card-body"><UploadsList medias = {medias} /></div>
          </div>
      </div>
      
     <div>
      <anasayfa />
     </div>
      
      {/* shift alt a        yorum kisayolu style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}  */}
    </div>
    


    <BrowserRouter>
      <Route exact path="/anasayfa" component={anasayfa} />
      <Route exact path="/girisyap" component={girisyap} />
      <Route exact path="/kaydol2" component={Kaydol2} />
      <Route exact path="/item" component={Kaydol2} />

    </BrowserRouter>
  </>
  );
}

export default App;
