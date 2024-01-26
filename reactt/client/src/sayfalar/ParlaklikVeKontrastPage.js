// KirpVideoPage.jsKirpVideoPage
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const ParlaklikVeKontrastPage = () => {
  
  const [videoPozisyonu, setVideoPozisyonu] = useState({ parlaklik: 0, kontrast: 0 });
  const { mediaId } = useParams();
  const handleEdit =  () => {
    
    
    try {
      // Send a request to edit the video with text
         axios.post(`${BACKEND_URI}/api/v1/media/parlaklikvekontrast/${mediaId}`, {
        
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
      <h1>Parlaklik ve Kontrast Ayarla</h1>
      {/* <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Text"
      /> */}
      <label>
        Parlaklik:
        <input
          type="number"
          value={videoPozisyonu.parlaklik}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              parlaklik: parseFloat(e.target.value, 10),
            }))
          }
        />
      </label>
      <label>
        Kontrast:
        <input
          type="number"
          value={videoPozisyonu.kontrast}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              kontrast: parseFloat(e.target.value, 10),
            }))
          }
        />
      </label>
      
      

      <button onClick={handleEdit}>Kirp</button>
    </div>
  );

  
};

export default ParlaklikVeKontrastPage;
