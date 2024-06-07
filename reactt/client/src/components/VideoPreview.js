
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { BACKEND_URI } from '../config/constants';
const VideoPreview = () => {
  
  const mediaId = '66431ad78586904cadbc8936';


  return (
    <div>
      <ReactPlayer
       url={`${BACKEND_URI}/api/v1/media/getVideo/${mediaId}`}
      controls
      width="720px"
        height="1280px"
        
        />
    </div>
  );
};

export default VideoPreview;
