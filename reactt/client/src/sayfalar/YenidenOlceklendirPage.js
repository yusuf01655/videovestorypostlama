// ScaleVideoPage.jsScaleVideoPage
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const ScaleVideoPage = ({ scaleVideo, setScaleVideo }) => {
  
  const [videoPozisyonu, setVideoPozisyonu] = useState({ genislik: 0, yukseklik: 0 });
  const { mediaId } = useParams();
  const handleEdit =  () => {
    
    
    try {
      // Send a request to edit the video with text
         axios.post(`${BACKEND_URI}/api/v1/media/yenidenolceklendir/${mediaId}`, {
        
        videoPozisyonu,
      });

      // Optionally, you can redirect to another page or show a success message
      alert('Video edited successfully!');
    } catch (error) {
      console.error('Error editing video:', error);
      alert('Error editing video');
    }
  };
  return (
    <div>
      <h1>Yeniden Olceklendir</h1>
      {/* <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Text"
      /> */}
      <label>
        Genislik pixeli:
        <input
          type="number"
          value={videoPozisyonu.genislik}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              genislik: parseInt(e.target.value, 10),
            }))
          }
        />
      </label>
      <label>
        Yukseklik pixeli:
        <input
          type="number"
          value={videoPozisyonu.yukseklik}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              yukseklik: parseInt(e.target.value, 10),
            }))
          }
        />
      
      </label>
      <input type="checkbox" id="dahiletscale" name="dahiletscale" checked={scaleVideo}
        onChange={(e) => setScaleVideo(e.target.checked)} />
    <label for="dahiletscale">video yeniden ölçeklendirmeyi dahil et</label><button onClick={handleEdit}>Edit Video</button>
    </div>
  );

  
};

export default ScaleVideoPage;
