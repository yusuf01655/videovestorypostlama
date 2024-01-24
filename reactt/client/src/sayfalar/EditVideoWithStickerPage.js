// src/sayfalar/EditVideoWithStickerPage.js

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';
import ReactPlayer from 'react-player';

const EditVideoWithStickerPage = () => {
  const { mediaId } = useParams();
  const [stickerUrl, setStickerUrl] = useState('');
  const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });

  const handleEdit = async () => {
    try {
      // Send a request to edit the video with sticker
      await axios.post(`${BACKEND_URI}/api/v1/media/overlaysticker/${mediaId}`, {
        stickerUrl,
        stickerPosition,
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
      <h2>Edit Video with Sticker</h2>

      {/* Input for Sticker URL */}
      <label>
        Sticker URL:
        <input
          type="text"
          value={stickerUrl}
          onChange={(e) => setStickerUrl(e.target.value)}
        />
      </label>

      {/* Input for Sticker Position */}
      <label>
        X Position:
        <input
          type="number"
          value={stickerPosition.x}
          onChange={(e) =>
            setStickerPosition((prevPosition) => ({
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
          value={stickerPosition.y}
          onChange={(e) =>
            setStickerPosition((prevPosition) => ({
              ...prevPosition,
              y: parseInt(e.target.value, 10),
            }))
          }
        />
      </label>

      {/* ReactPlayer to preview the edited video */}
      <ReactPlayer
        url={`${BACKEND_URI}/api/v1/media/getVideo/${mediaId}`}
        width="100%"
        height="400px"
        playing
        controls
      />

      {/* Button to trigger the edit */}
      <button onClick={handleEdit}>Edit Video</button>
    </div>
  );
};

export default EditVideoWithStickerPage;
