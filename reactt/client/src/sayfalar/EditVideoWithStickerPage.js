// src/sayfalar/EditVideoWithStickerPage.js

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';
import ReactPlayer from 'react-player';
import sticker1 from '../stickerlar/sticker1.png';
import sticker2 from '../stickerlar/sticker2.png';
import './StickerPage.css';
const EditVideoWithStickerPage = () => {
  const { mediaId } = useParams();
  const [stickerUrl, setStickerUrl] = useState('');
  const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const selectionRef = useRef(null);
  
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const playerRef = useRef(); // create a ref for the video element
  const canvasRef = useRef();
  const images = [
    // Replace with your image URLs
    
  ];
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Add this to the top of your component
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - overlayRef.current.offsetLeft);
    setStartY(e.clientY - overlayRef.current.offsetTop);
  };

  const handleMouseMoveForCrop = (e) => {
    if (isDragging) {
      const x = e.clientX - startX;
      const y = e.clientY - startY;

      setCropData((prevCropData) => ({
        ...prevCropData,
        x: x >= 0 ? x : 0,
        y: y >= 0 ? y : 0,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCropChange = (newCropData) => {
    setCropData(newCropData);
  };

  const handleCropButtonClick = () => {
    // Implement video cropping logic using cropData
    console.log('Video cropped:', cropData);
  };
 
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
     {/*  <label>
        Sticker URL:
        <input
          type="text"
          value={stickerUrl}
          onChange={(e) => setStickerUrl(e.target.value)}
        />
      </label> */}

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
      <div className='video-crop-container' >
      <ReactPlayer
        url={`${BACKEND_URI}/api/v1/media/getVideo/${mediaId}`}
        width="400px"
        height="400px"
        playing
        controls
        ref={playerRef} // add a ref attribute to the ReactPlayer component
        onMouseMove={handleMouseMove} // add a onMouseMove event handler to the ReactPlayer component
        className = 'video'
      />
      <div 
      ref = {overlayRef} 
      className='crop-overlay' 
      style={{
        position: 'absolute',
        left: cropData.x + 'px',
        top: cropData.y + 'px',
        width: cropData.width + 'px',
        height: cropData.height + 'px',
      }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveForCrop}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div ref = {selectionRef} className='selection'></div>
        <img src={sticker1} style= {{ width: '100%', height: '100%', objectFit: 'contain',}} alt='sticker1'/>
      </div>
     
     
      </div>
      <table>
        <th>stickerlar</th>
        <tr><td></td><img src={sticker2} alt='sticker2'/><td></td></tr>
      </table>
      
      
      

      {/* Button to trigger the edit */}
    </div>
    
      <br />
      <button onClick={handleEdit}>Edit Video</button>
      <button onClick={handleCropButtonClick}>Crop Video</button>
    </>);
};

export default EditVideoWithStickerPage;