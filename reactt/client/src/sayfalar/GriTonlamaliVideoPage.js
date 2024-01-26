// OverlayTextToVideoPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const GriTonlamaliVideoPage = () => {
  
  const { mediaId } = useParams();
  const handleGriTonla =  () => {
    
    
    try {
      // Send a request to edit the video with text
         axios.post(`${BACKEND_URI}/api/v1/media/gritonlamaliyap/${mediaId}`, {
        
        
      });

      // Optionally, you can redirect to another page or show a success message
      alert('Video gri tonlamali yapildi!');
    } catch (error) {
      console.error('Error editing video:', error);
      alert('Error editing video');
    }
  };
  return (
    <div>
      <h1>Videoyu Gri Tonlamali Yap</h1>
      
      
      
      <button onClick={handleGriTonla}>Gri tonlamayi gerceklestir</button>
    </div>
  );

  
};

export default GriTonlamaliVideoPage;
