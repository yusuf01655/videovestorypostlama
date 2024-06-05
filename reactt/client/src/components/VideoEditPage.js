// VideoEditPage.js
import {React,useState} from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import TrimVideoPage from '../sayfalar/TrimVideoPage';
import RotateVideoPage from '../sayfalar/RotateVideoPage';
import EditVideoWithStickerPage from '../sayfalar/EditVideoWithStickerPage';
import VideoyaMetinEkle from '../sayfalar/VideoyaMetinEkle';
import GriTonlamaliVideoPage from '../sayfalar/GriTonlamaliVideoPage';
import YenidenOlceklendirPage from '../sayfalar/YenidenOlceklendirPage';
import KirpPage from '../sayfalar/KirpPage';
import ParlaklikVeKontrastPage from '../sayfalar/ParlaklikVeKontrastPage';
import Bulaniklastir from '../sayfalar/Bulaniklastir';
const VideoEditPage = ({ match }) => {
    const { mediaId } = match.params;
     const [scaleVideo, setScaleVideo] = useState(false); 
  const [parlaklikVeKontrast, setParlaklikVeKontrast] = useState(false);
  const handleButton =  () => {
    
    
    console.log("isscaleVideo:"+scaleVideo+" parlaklikontrast:"+parlaklikVeKontrast);
  };
  return (
    
    <div>
      <TrimVideoPage /> <br />
      <RotateVideoPage />
      <EditVideoWithStickerPage />
      <VideoyaMetinEkle />
      <GriTonlamaliVideoPage />
      <YenidenOlceklendirPage
       scaleVideo={scaleVideo}
      setScaleVideo={setScaleVideo} 
    />
    <ParlaklikVeKontrastPage
      parlaklikVeKontrast={parlaklikVeKontrast}
      setParlaklikVeKontrast={setParlaklikVeKontrast}
    />
      <KirpPage />
  
      <Bulaniklastir />
      <h2>Video Duzenleme islemleri</h2>
      <button onClick={handleButton}>consola yaz degeri</button>
      

      <ul>
        <li>
          <Link to={`/edit/${mediaId}/trim`}>Trim Video belirli zaman araliginda videoyu kes. </Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/rotate`}>Videoyu dondur</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/overlaysticker`}>Videoya sticker ekle</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/overlaytext`}>Videoya metin ekle</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/gritonlamaliyap`}>Videoyu Gri tonlamali Yap</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/yenidenolceklendir`}>Video cozunurlugu Yeniden Olceklendir</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/kirp`}>Video Kirp</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/parlaklikvekontrast`}>Parlaklik ve kontrast ayarla</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/bulaniklastir`}>Bulaniklastir</Link>
        </li>
        {/* Add more links for other editing actions */}
      </ul>
    </div>
  );
};

export default VideoEditPage;
