// OverlayTextToVideoPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const OverlayTextToVideoPage = () => {
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const { mediaId } = useParams();
  const handleEdit =  () => {
    
    
    try {
      // Send a request to edit the video with text
         axios.post(`${BACKEND_URI}/api/v1/media/overlaytext/${mediaId}`, {
        
        textPosition,
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
      <h1>Videoya Metin Ekle</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Text"
      />
      <label>
        X Position:
        <input
          type="number"
          value={textPosition.x}
          onChange={(e) =>
            setTextPosition((prevPosition) => ({
              ...prevPosition,
              x: parseInt(e.target.value, 10),
            }))
          }
        />
      </label>
      <label>
        Y Position:
        <input
          type="number"
          value={textPosition.y}
          onChange={(e) =>
            setTextPosition((prevPosition) => ({
              ...prevPosition,
              y: parseInt(e.target.value, 10),
            }))
          }
        />
      </label>
      <button onClick={handleEdit}>Metni ekle</button>
    </div>
  );

  
};

export default OverlayTextToVideoPage;
