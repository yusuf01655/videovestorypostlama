import React, { useState } from 'react';
import './TrimVideoLine.css';

const TrimVideoLine = () => {
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

  return (
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
  );
};

export default TrimVideoLine;