import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';
import ReactPlayer from 'react-player';
import sticker1 from '../stickerlar/sticker1.png';
import sticker2 from '../stickerlar/sticker2.png';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Resizable from 'react-resizable';
import Rotatable from 'react-rotatable';

const EditVideoWithStickerPage = () => {
  const { mediaId } = useParams();
  const [stickerUrl, setStickerUrl] = useState('');
  const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });
  const playerRef = useRef(); 
  const [pipMode, setPipMode] = useState(false);
  const [canvasRef, setCanvasRef] = useState(null);
  const [videoWidth, setVideoWidth] = useState(400); // Adjust as needed
  const [videoHeight, setVideoHeight] = useState(400);

  const DroppableVideo = () => {
    const [{ isOver }, dropRef] = useDrop({
      accept: 'sticker',
      drop: (item, monitor) => {
        // Calculate sticker position on canvas
        const relativeX = monitor.getClientOffset().x - dropRef.current.offsetLeft;
        const relativeY = monitor.getClientOffset().y - dropRef.current.offsetTop;
  
        // Store sticker position and URL for editing
        setStickerPosition({ x: relativeX, y: relativeY });
        setStickerUrl(item.stickerUrl);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
  
    return (
      <div ref={dropRef} style={{ border: isOver ? '2px dashed blue' : 'none' }}>
        {/* Render the canvas and video player here */}
        <canvas ref={canvasRef} width={videoWidth} height={videoHeight} />
        <ReactPlayer
          ref={playerRef}
          url={`${BACKEND_URI}/api/v1/media/getVideo/${mediaId}`}
          playing
          muted
          onProgress={(progress) => drawVideoFrame(canvasRef.current, progress)}
        />
  
        {/* Draw any dropped stickers on the canvas */}
        {stickerUrl && (
          <img
            src={stickerUrl}
            alt="Sticker"
            style={{
              position: 'absolute',
              left: stickerPosition.x,
              top: stickerPosition.y,
            }}
          />
        )}
      </div>
    );
  };
  

  

  const drawVideoFrame = (canvas, progress) => {
    const videoEl = playerRef.current.getInternalPlayer().player; // Access video element
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  
    // Get the current video frame image
    const videoFrame = videoEl.canvas.captureStream(1).getVideoTracks()[0].frame;
  
    // Draw the video frame onto the canvas
    context.drawImage(videoFrame, 0, 0);
  };
  

  const DraggableSticker = ({ stickerUrl }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: 'sticker',
      item: { stickerUrl },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <img src={stickerUrl} alt="Sticker" />
      </div>
    );
  };
  const Player = () => {
    const [{ isOver }, dropRef] = useDrop({
      accept: 'sticker',
      drop: (item, monitor) => {
        setStickerUrl(item.stickerUrl);
        // Get position from monitor
      const { clientX: localX, clientY: localY } = monitor.getClientOffset();

      const offsetX = playerRef.current.getBoundingClientRect().left;
      const offsetY = playerRef.current.getBoundingClientRect().top;
      const adjustedLocalX = localX - offsetX;
      const adjustedLocalY = localY - offsetY;
      setStickerPosition({ x: adjustedLocalX, y: adjustedLocalY });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div ref={dropRef} style={{ border: isOver ? '2px dashed blue' : 'none' }}>
      
      <ReactPlayer
        url={`${BACKEND_URI}/api/v1/media/getVideo/${mediaId}`}
        width="400px"
        height="400px"
        playing
        muted
        controls
        ref={playerRef} 
        onDragLeave ={handleDragLeave}
        pip={pipMode}
        onProgress={(progress) => {
          // Update canvas whenever video frame advances
          drawVideoFrame(canvasRef.current, progress);
        }}
        
      />
      </div>
    );
  };
  const togglePiP = () => {
    setPipMode(!pipMode);
  };
  const handleEdit = async () => {
    try {
      await axios.post(`${BACKEND_URI}/api/v1/media/overlaysticker/${mediaId}`, {
        stickerUrl,
        stickerPosition,
      });

      
      alert('Video edited successfully!');
    } catch (error) {
      console.error('Error editing video:', error);
      alert('Error editing video');
    }
  };

  const handleDragLeave = (event) => {
    
    const globalX = event.clientX;
    const globalY = event.clientY;

   
    const offsetX = playerRef.current.wrapper.offsetLeft;
    const offsetY = playerRef.current.wrapper.offsetTop;

    
    const localX = globalX - offsetX;
    const localY = globalY - offsetY;

    
    setStickerPosition({ x: localX, y: localY });
  };
  const handleDragStart = (e) => {
   
    e.dataTransfer.setData('text/plain', {sticker1});
  };


  return (<>
    <div>
      <h2>Edit Video with Sticker</h2>

     
      <label>
        Sticker URL:
        <input
          type="text"
          value={stickerUrl}
          onChange={(e) => setStickerUrl(e.target.value)}
        />
      </label>

      
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
         
      <DndProvider backend={HTML5Backend}>
      <DroppableVideo />
         <table>
         <thead><tr>
        <th>stickerlar</th>
        <td>
        <DraggableSticker stickerUrl={sticker1} />
        </td>
        <DraggableSticker stickerUrl={sticker2} />
        <td></td></tr></thead>
      </table>
      </DndProvider>
      
      

      
    </div>
    
      <br />
      <button onClick={handleEdit}>Edit Video</button>
      <button onClick={togglePiP}>
        {pipMode ? 'Disable' : 'Enable'} Picture-in-Picture
      </button>
    </>);
};

export default EditVideoWithStickerPage;
