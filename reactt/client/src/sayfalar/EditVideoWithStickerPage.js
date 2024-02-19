// src/sayfalar/EditVideoWithStickerPage.js

import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';
import ReactPlayer from 'react-player';

const EditVideoWithStickerPage = () => {
  const { mediaId } = useParams();
  const [stickerUrl, setStickerUrl] = useState('');
  const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });
  const playerRef = useRef(); // create a ref for the video element
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

  const handleMouseMove = (event) => {
    // Get the global coordinates of the cursor
    const globalX = event.clientX;
    const globalY = event.clientY;

    // Get the offset of the ReactPlayer element from the viewport edges
    const offsetX = playerRef.current.wrapper.offsetLeft;
    const offsetY = playerRef.current.wrapper.offsetTop;

    // Calculate the local coordinates of the cursor relative to the ReactPlayer element
    const localX = globalX - offsetX;
    const localY = globalY - offsetY;

    // Set the sticker position state to the local coordinates
    setStickerPosition({ x: localX, y: localY });
  };

  return (<>
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
        width="720px"
        height="1280px"
        playing
        controls
        ref={playerRef} // add a ref attribute to the ReactPlayer component
        onMouseMove={handleMouseMove} // add a onMouseMove event handler to the ReactPlayer component
      />

      {/* Button to trigger the edit */}
      <br />
      
    </div>
    <button onClick={handleEdit}>Edit Video</button>
    </>);
};

export default EditVideoWithStickerPage;
