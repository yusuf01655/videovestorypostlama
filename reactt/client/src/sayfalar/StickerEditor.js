import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import {Resizable} from 'react-resizable';

import sticker1 from '../stickerlar/sticker1.png';
import sticker2 from '../stickerlar/sticker2.png';
const StickerEditor = () => {
    const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });
  
    const [, drop] = useDrop({
      accept: 'sticker',
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        setStickerPosition({ x: left, y: top });
      },
    });
  
    const handleResize = (event, { size }) => {
      // Handle resizing logic here
    };
  
    const handleRotate = (angle) => {
      // Handle rotation logic here
    };
  
    return (
      <div ref={drop}>
        
          <Resizable
            width={100}
            height={100}
            onResize={handleResize}
          >
            <div
              style={{
                position: 'absolute',
                left: stickerPosition.x,
                top: stickerPosition.y,
                border: '1px solid #000',
              }}
            >
              {/* Your sticker content goes here */}
              <img src={sticker1} alt="Sticker" /> <br />
              <img src={sticker2} alt="Sticker" />
            </div>
          </Resizable>
        
      </div>
    );
  };
  
  export default StickerEditor;
  