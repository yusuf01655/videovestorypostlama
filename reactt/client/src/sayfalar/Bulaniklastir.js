// KirpVideoPage.jsKirpVideoPage
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const Bulaniklastir = () => {
  
  const [videoPozisyonu, setVideoPozisyonu] = useState({ blurstrength1: 0, blurstrength2: 0 });
  const { mediaId } = useParams();
  const handleEdit =  () => {
    
    
    try {
      // Send a request to edit the video with text
         axios.post(`${BACKEND_URI}/api/v1/media/bulaniklastir/${mediaId}`, {
        
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
      <h1>Bulaniklastir</h1>
      {/* <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Text"
      /> */}
      <label>
        Parlaklik parametre 1:
        <input
          type="number"
          value={videoPozisyonu.blurstrength1}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              blurstrength1: parseFloat(e.target.value, 10),
            }))
          }
        />
      </label>
      <label>
        Parlaklik parametre 2:
        <input
          type="number"
          value={videoPozisyonu.blurstrength2}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              blurstrength2: parseFloat(e.target.value, 10),
            }))
          }
        />
      </label>
      
      

      <input type="checkbox" id="dahiletbulaniklastir" name="dahiletbulaniklastir" />
    <label for="dahiletbulaniklastir">video bulanıklaştırmayı dahil et</label><button onClick={handleEdit}>Edit Video</button>
    </div>
  );

  
};

export default Bulaniklastir;
