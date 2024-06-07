import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './TrimVideoLine.css';
const TrimSection = () => {
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(100);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);

  const handleTrimStartDrag = (e) => {
    setTrimStart(e.clientX);
  };

  const handleTrimEndDrag = (e) => {
    setTrimEnd(e.clientX);
  };

  const handleTrimStartMouseUp = () => {
    // Trigger event to notify parent component of trim start change
  };

  const handleTrimEndMouseUp = () => {
    // Trigger event to notify parent component of trim end change
  };
  const handleStartDrag = (event, ui) => {
    setStartPosition(ui.x);
  };

  const handleEndDrag = (event, ui) => {
    setEndPosition(ui.x);
  };

  const calculateTimecode = (position) => {
    const totalSeconds = position / 100 * 60; // Convert pixels to seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
    <div className="trim-section">
      <div className="video-container">
        {/* Your video player or content goes here */}
      </div>
      
      <div className="trim-handles">
      <div
                className="slider"
                style={{
                    width: '100%',
                    height: '20px',
                    backgroundColor: 'lightgray',
                    borderRadius: '5px',
                    position: 'relative',
                }}
            ></div>
        <Draggable
          axis="x"
          position={{ x: startPosition, y: 0 }}
          onDrag={handleStartDrag}
          bounds={{ left: 0, right: endPosition }}
        >
          <div className="handle start-handle">
            <i className="fas fa-grip-lines"></i>
            <span className="timecode">{calculateTimecode(startPosition)}</span>
          </div>
        </Draggable>

        <Draggable
          axis="x"
          position={{ x: endPosition, y: 0 }}
          onDrag={handleEndDrag}
          bounds={{ left: startPosition, right: '100%' }}
        >
          <div className="handle end-handle">
            <i className="fas fa-grip-lines"></i>
            <span className="timecode">{calculateTimecode(endPosition)}</span>
          </div>
        </Draggable>
      </div>

      <div className="trim-bar">
        <div
          className="trim-range"
          style={{
            width: `${endPosition - startPosition}%`,
            left: `${startPosition}%`,
          }}
        />
      </div>
    </div>
    <div className="trim-video-line-container">
      <div className="video-timeline">
        <div
          className="trim-handle"
          style={{ left: `${trimStart}px` }}
          onMouseDown={(e) => handleTrimStartDrag(e)}
          onMouseUp={handleTrimStartMouseUp}
        />
        <div
          className="trim-handle"
          style={{ left: `${trimEnd}px` }}
          onMouseDown={(e) => handleTrimEndDrag(e)}
          onMouseUp={handleTrimEndMouseUp}
        />
      </div>
    </div>
    </>
  );
};

export default TrimSection;