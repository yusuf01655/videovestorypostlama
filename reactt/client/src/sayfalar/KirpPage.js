// KirpVideoPage.jsKirpVideoPage
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const KirpVideoPage = () => {
  
  const [videoPozisyonu, setVideoPozisyonu] = useState({ genislik: 0, yukseklik: 0, x: 0, y:0 });
  const { mediaId } = useParams();
  const handleEdit =  () => {
    
    
    try {
      // Send a request to edit the video with text
         axios.post(`${BACKEND_URI}/api/v1/media/kirp/${mediaId}`, {
        
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
      <h1>Kirp</h1>
      {/* <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Text"
      /> */}
      <label>
        Genislik:
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
        Yukseklik:
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
      <label>
        x:
        <input
          type="number"
          value={videoPozisyonu.x}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              x: parseInt(e.target.value, 10),
            }))
          }
        />
      </label>
      <label>
        y:
        <input
          type="number"
          value={videoPozisyonu.y}
          onChange={(e) =>
            setVideoPozisyonu((prevPosition) => ({
              ...prevPosition,
              y: parseInt(e.target.value, 10),
            }))
          }
        />
      </label>

      <button onClick={handleEdit}>Kirp</button>
    </div>
  );

  
};

export default KirpVideoPage;
