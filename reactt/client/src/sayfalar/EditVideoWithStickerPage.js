// src/sayfalar/EditVideoWithStickerPage.js

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';
import ReactPlayer from 'react-player';
import sticker1 from '../stickerlar/sticker1.png';
import sticker2 from '../stickerlar/sticker2.png';
import './StickerPage.css';
import VideoTrimTimeline2 from '../components/VideoTrimTimeline2';
import ornek from '../components/ornek';
import * as Slider from '@radix-ui/react-slider';
const EditVideoWithStickerPage = () => {

  const { mediaId } = useParams();
  const [stickerUrl, setStickerUrl] = useState('');
  const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [scaledWidth,setScaledWitdh] = useState(0.0);
    const [scaledHeight,setScaledHeight] =  useState(0.0);
    const [rotationDegree, setRotationDegree] =  useState(0.0);

  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const selectionRef = useRef(null);
  
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const playerRef = useRef(); // create a ref for the video element
  const canvasRef = useRef();
  const boxWrapperRef = useRef();
  const images = [
    // Replace with your image URLs
    
  ];
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Add this to the top of your component
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(300); // 5 minutes in seconds
  const [trimRange, setTrimRange] = useState([0, duration]);
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= trimRange[1]) {
            setIsPlaying(false);
            return trimRange[0];
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, trimRange]);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handlePlayPause = () => {
    if (currentTime >= trimRange[1]) {
      setCurrentTime(trimRange[0]);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const boxWrapper = document.querySelector('.box-wrapper');
    const rightMid = document.getElementById("right-mid");
const leftMid = document.getElementById("left-mid");
const topMid = document.getElementById("top-mid");
const bottomMid = document.getElementById("bottom-mid");

const leftTop = document.getElementById("left-top");
const rightTop = document.getElementById("right-top");
const rightBottom = document.getElementById("right-bottom");
const leftBottom = document.getElementById("left-bottom");
const rotate = document.getElementById("rotate");
const box = document.getElementById('box');



function repositionElement(x, y) {
  boxWrapper.style.left = x + 'px';
  boxWrapper.style.top = y + 'px';
}

function resize(w, h) {
  box.style.width = w + 'px';
  box.style.height = h + 'px';
}
    // Now you can add event listeners or perform other operations with boxWrapper
    // Example: boxWrapper.addEventListener(...)
    // drag support
boxWrapper.addEventListener('mousedown', function (event) {
  if (event.target.className.indexOf("dot") > -1) {
      return;
  }

  initX = this.offsetLeft;
  initY = this.offsetTop;
  mousePressX = event.clientX;
  mousePressY = event.clientY;


  function eventMoveHandler(event) {
      repositionElement(initX + (event.clientX - mousePressX),
          initY + (event.clientY - mousePressY));
  }

  boxWrapper.addEventListener('mousemove', eventMoveHandler, false);
  window.addEventListener('mouseup', function eventEndHandler() {
      boxWrapper.removeEventListener('mousemove', eventMoveHandler, false);
      window.removeEventListener('mouseup', eventEndHandler);
  }, false);
rightMid.addEventListener('mousedown', e => resizeHandler(e, false, false, true, false));
leftMid.addEventListener('mousedown', e => resizeHandler(e, true, false, true, false));
topMid.addEventListener('mousedown', e => resizeHandler(e, false, true, false, true));
bottomMid.addEventListener('mousedown', e => resizeHandler(e, false, false, false, true));
leftTop.addEventListener('mousedown', e => resizeHandler(e, true, true, true, true));
rightTop.addEventListener('mousedown', e => resizeHandler(e, false, true, true, true));
rightBottom.addEventListener('mousedown', e => resizeRightBottomHandler(e, false, false, true, true));
leftBottom.addEventListener('mousedown', e => resizeHandler(e, true, false, true, true));
// handle rotation

rotate.addEventListener('mousedown', function (event) {
    // if (event.target.className.indexOf("dot") > -1) {
    //     return;
    // }

    initX = this.offsetLeft;
    initY = this.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;


    var arrow = document.querySelector("#box");
    var arrowRects = arrow.getBoundingClientRect();
    var arrowX = arrowRects.left + arrowRects.width / 2;
    var arrowY = arrowRects.top + arrowRects.height / 2;

    function eventMoveHandler(event) {
        var angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox(angle * 180 / Math.PI);
    }
    console.log("boxWrapper:", boxWrapper);
    window.addEventListener('mousemove', eventMoveHandler, false);

    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}, false);

}, false);
// done drag support
function resizeRightBottomHandler(event, left = false, top = false, xResize = false, yResize = false) {
  initX = boxWrapper.offsetLeft;
  initY = boxWrapper.offsetTop;
  mousePressX = event.clientX;
  mousePressY = event.clientY;

  initW = box.offsetWidth;
  initH = box.offsetHeight;

  initRotate = getCurrentRotation(boxWrapper);
  var initRadians = initRotate * Math.PI / 180;
  var cosFraction = Math.cos(initRadians);
  var sinFraction = Math.sin(initRadians);
  // Calculate the aspect ratio of the image
  var aspectRatio = initW / initH;

  function eventMoveHandler(event) {
      var wDiff = (event.clientX - mousePressX);
      var hDiff = (event.clientY - mousePressY);
      var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
      var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

      var newW = initW, newH = initH, newX = initX, newY = initY;

      if (xResize) {
        var scaleFactor = 1;

          if (left) {
              scaleFactor = (initW - rotatedWDiff) / initW;
          } else {
            scaleFactor = (initW + rotatedWDiff) / initW;
          }
          newW *= scaleFactor;
      newH = newW / aspectRatio;
      
         
          newX += 0.5 * (initW - newW) * cosFraction;
      newY += 0.5 * (initW - newW) * sinFraction;
      }

      if (yResize) {
        // Calculate the scaling factor based on the aspect ratio
      var scaleFactor = 1;

          if (top) {
            scaleFactor = (initH - rotatedHDiff) / initH;  
          } else {
            scaleFactor = (initH + rotatedHDiff) / initH;
          }
          newH *= scaleFactor;
      newW = newH * aspectRatio;

      newX -= 0.5 * (initH - newH) * sinFraction;
      newY += 0.5 * (initH - newH) * cosFraction;
      }

      resize(newW, newH);
      repositionElement(newX, newY);
  }


  window.addEventListener('mousemove', eventMoveHandler, false);
  window.addEventListener('mouseup', function eventEndHandler() {
      window.removeEventListener('mousemove', eventMoveHandler, false);
      window.removeEventListener('mouseup', eventEndHandler);
  }, false);
}
function resizeHandler(event, left = false, top = false, xResize = false, yResize = false) {
  initX = boxWrapper.offsetLeft;
  initY = boxWrapper.offsetTop;
  mousePressX = event.clientX;
  mousePressY = event.clientY;

  initW = box.offsetWidth;
  initH = box.offsetHeight;

  initRotate = getCurrentRotation(boxWrapper);
  var initRadians = initRotate * Math.PI / 180;
  var cosFraction = Math.cos(initRadians);
  var sinFraction = Math.sin(initRadians);
  function eventMoveHandler(event) {
      var wDiff = (event.clientX - mousePressX);
      var hDiff = (event.clientY - mousePressY);
      var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
      var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

      var newW = initW, newH = initH, newX = initX, newY = initY;

      if (xResize) {
          if (left) {
              newW = initW - rotatedWDiff;
              if (newW < minWidth) {
                newW = minWidth;
                rotatedWDiff = initW - minWidth;
              }
          } else {
              newW = initW + rotatedWDiff;
              if (newW < minWidth) {
                newW = minWidth;
                rotatedWDiff = minWidth - initW;
              }
          }
          newX += 0.5 * rotatedWDiff * cosFraction;
          newY += 0.5 * rotatedWDiff * sinFraction;
      }

      if (yResize) {
          if (top) {
              newH = initH - rotatedHDiff;
              if (newH < minHeight) {
                newH = minHeight;
                rotatedHDiff = initH - minHeight;
              }
          } else {
              newH = initH + rotatedHDiff;
              if (newH < minHeight) {
                newH = minHeight;
                rotatedHDiff = minHeight - initH;
              }
          }
          newX -= 0.5 * rotatedHDiff * sinFraction;
          newY += 0.5 * rotatedHDiff * cosFraction;
      }

      resize(newW, newH);
      repositionElement(newX, newY);
  }


  window.addEventListener('mousemove', eventMoveHandler, false);
  window.addEventListener('mouseup', function eventEndHandler() {
      window.removeEventListener('mousemove', eventMoveHandler, false);
      window.removeEventListener('mouseup', eventEndHandler);
  }, false);
}
function rotateBox(deg) {
  boxWrapper.style.transform = `rotate(${deg}deg)`;
}
console.log("boxWrapper:", boxWrapper);



// handle resize


resize(300, 200);
repositionElement(200, 200);







///
  }, []);

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
     // setStickerUrl(sticker1);
      console.log("sticker urlmiz: "+stickerUrl);
      console.log("sticker pozisyonumuz:"+stickerPosition.x +" "+ stickerPosition.y);
      // Send a request to edit the video with sticker
      await axios.post(`${BACKEND_URI}/api/v1/media/overlaysticker/${mediaId}`, {
        stickerUrl,
        stickerPosition,
        rotationDegree,
        scaledHeight,
        scaledWidth
      });

      // Optionally, you can redirect to another page or show a success message
      alert('Video edited successfully!');
    } catch (error) {
      console.error('Error editing video:', error);
      alert('Error editing video');
    }
  };
  const handleMouseMove = (event) => {

  }

  const handleMouseUpResimKoordinati = (event) => {
    const boxWrapper = boxWrapperRef.current;

  const boxOffsetX = boxWrapper.offsetLeft;
  const boxOffsetY = boxWrapper.offsetTop;
  const playerOffsetX = playerRef.current.wrapper.offsetLeft;
  const playerOffsetY = playerRef.current.wrapper.offsetTop;

  const boxRelativeX = boxOffsetX - playerOffsetX;
  const boxRelativeY = boxOffsetY - playerOffsetY;

  // Set state
  setStickerPosition({
    x: boxRelativeX,
    y: boxRelativeY
  });
  var divWidth = boxWrapper.offsetWidth;
  var divHeight = boxWrapper.offsetHeight;
  setRotationDegree(getCurrentRotation(boxWrapper));
  setScaledWitdh(divWidth);
  setScaledHeight(divHeight);
  console.log("dondurme acisi: "+getCurrentRotation(boxWrapper));
  console.log("boyut, yukseklik: "+divHeight+" genislik: "+divWidth);
  

  };

  ///
  
// var boxWrapper = document.getElementById("box-wrapper");
const minWidth = 40;
const minHeight = 40;


var initX, initY, mousePressX, mousePressY, initW, initH, initRotate;




function getCurrentRotation(el) {
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "none";
    if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        return (angle < 0 ? angle + 360 : angle); 
    }
    return 0;
}



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
        width="720px"
        height="1280px"
        playing
        controls
        ref={playerRef} // add a ref attribute to the ReactPlayer component
        
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
     
     
      <div className="box-wrapper" id="box-wrapper" ref={boxWrapperRef} onMouseUp= {handleMouseUpResimKoordinati}>
    <div className="box" id="box">
        <div className="dot rotate" id="rotate"></div>
        <div className="dot left-top" id="left-top"></div>
        <div className="dot left-bottom" id="left-bottom"></div>
        <div className="dot top-mid" id="top-mid"></div>
        <div className="dot bottom-mid" id="bottom-mid"></div>
        <div className="dot left-mid" id="left-mid"></div>
        <div className="dot right-mid" id="right-mid"></div>
        <div className="dot right-bottom" id="right-bottom"></div>
        <div className="dot right-top" id="right-top"></div>
        <div className="rotate-link"></div>
    </div></div>


      
</div>


      <table>
        <th>stickerlar</th>
        <tr><td></td><img src={sticker2} alt='sticker2'/><td></td></tr>
      </table>
      
      
      

      {/* Button to trigger the edit */}
    </div>
    
      <br /><button onClick={handleEdit}>Edit Video</button>
      <input type="checkbox" id="dahilettrim" name="dahilettrim" />
    <label for="onaydahilet">video kesmeyi dahil et</label>
    <div className="container max-w-lg p-4 bg-white rounded shadow"> {/* Bootstrap container for max-width, padding, bg-white, rounded, shadow */}
      <div className="mb-3"> {/* Bootstrap mb-3 for margin-bottom */}
        <div className="bg-light border border-2 border-dashed rounded w-100" style={{ height: '12rem' }} /> {/* bg-light for gray-200, border, border-dashed, rounded, w-100 for full-width, inline style for h-48 */}
      </div>

      <div className="d-grid gap-3"> {/* Bootstrap d-grid gap-3 for space-y-6 (using grid gap for vertical spacing) */}
        <div className="d-flex align-items-center justify-content-between mb-2"> {/* Bootstrap d-flex, align-items-center, justify-content-between, mb-2 for mb-4 */}
          <button
            onClick={handlePlayPause}
            className="btn btn-primary rounded" // btn-primary for blue-600/700, rounded for rounded-lg
            style={{ transition: 'background-color 0.15s ease-in-out' }} // inline style for transition-colors
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="text-secondary"> {/* text-secondary for gray-600 */}
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="position-relative pt-4"> {/* position-relative for relative, pt-4 for pt-6 */}
          <Slider.Root
            className="position-relative d-flex align-items-center user-select-none touch-none w-100 h-5" // position-relative, d-flex, align-items-center, user-select-none, touch-none, w-100, h-5
            value={trimRange}
            max={duration}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={setTrimRange}
          >
            <Slider.Track className="bg-light position-relative flex-grow-1 rounded-pill" style={{ height: '0.5rem' }}> {/* bg-light, position-relative, flex-grow-1, rounded-pill, inline style for h-2 */}
              <Slider.Range className="position-absolute bg-primary rounded-pill" style={{ height: '100%' }} /> {/* position-absolute, bg-primary, rounded-pill, inline style for h-full */}
            </Slider.Track>
            <Slider.Thumb
              className="block rounded-circle border border-primary bg-white" // block, rounded-circle, border, border-primary, bg-white
              style={{ width: '1.25rem', height: '1.25rem', hover: 'bg-light', focus: 'outline-none', focusRing: 'ring-2 ring-primary' }} // inline styles for w-5, h-5, hover, focus
              aria-label="Start time"
            />
            <Slider.Thumb
              className="block rounded-circle border border-primary bg-white" // block, rounded-circle, border, border-primary, bg-white
              style={{ width: '1.25rem', height: '1.25rem', hover: 'bg-light', focus: 'outline-none', focusRing: 'ring-2 ring-primary' }} // inline styles for w-5, h-5, hover, focus
              aria-label="End time"
            />
          </Slider.Root>

          <div className="position-absolute top-0 start-0 end-0 d-flex justify-content-between px-2 text-body-secondary small"> {/* position-absolute, top-0, start-0, end-0, d-flex, justify-content-between, px-2, text-body-secondary, small */}
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index}>{formatTime((duration / 5) * index)}</span>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between text-secondary small"> {/* d-flex, justify-content-between, text-secondary, small */}
          <div>Start: {formatTime(trimRange[0])}</div>
          <div>End: {formatTime(trimRange[1])}</div>
        </div>

        <div className="d-flex justify-content-between gap-3"> {/* d-flex, justify-content-between, gap-3 for gap-4 */}
          <button
            onClick={() => setTrimRange([0, duration])}
            className="btn btn-light text-secondary rounded flex-grow-1" // btn-light for gray-200, text-secondary for gray-700, rounded, flex-grow-1 for flex-1
            style={{ transition: 'background-color 0.15s ease-in-out' }} // inline style for transition-colors
          >
            Reset
          </button>
          <button
            className="btn btn-success text-white rounded flex-grow-1" // btn-success for green-600/700, text-white, rounded, flex-grow-1 for flex-1
            style={{ transition: 'background-color 0.15s ease-in-out' }} // inline style for transition-colors
          >
            Apply Trim
          </button>
        </div>
      </div>
    </div>
    </>);
};

export default EditVideoWithStickerPage;