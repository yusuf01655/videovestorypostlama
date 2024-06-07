import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

import VideoPreview from './VideoPreview';
const TimelineContainer = styled.div`
  /* Your timeline container styles here */
  display: flex; /* Allow video and timeline bar to stack horizontally */
  align-items: center; /* Center video and timeline bar vertically */
  width: 100%; /* Match container width */
  height: 50px; /* Set a default height */
  background-color: #f0f0f0; /* Light gray background */
  border: 1px solid #ddd; /* Light border */
  padding: 5px; /* Add some padding */
  box-sizing: border-box; /* Ensure padding doesn't affect width/height */
`;


const TimelineBar = styled.div`
  /* Your timeline bar styles here */
  flex: 1; /* Take up remaining space in TimelineContainer */
  height: 10px; /* Set timeline bar height */
  background-color: #ddd; /* Gray background for the timeline */
  position: relative; /* Allow handles to be positioned absolutely */
`;


const Handle = styled.div`
  /* Your handle styles here */
  position: absolute;
  cursor: grab; /* Grab cursor on hover */
  &:active {
    cursor: grabbing; /* Grabbing cursor on drag */
  }
  width: 10px; /* Set handle width */
  height: 100%; /* Match timeline bar height */
  background-color: #333; /* Dark gray handle color */
  border-radius: 50%; /* Rounded corners for a smooth look */
  /* Adjust these for handle movement: */
  top: 0; /* Position handle at top of timeline bar */
`;


const TrimButton = styled.button`
  /* Your trim button styles here */
  margin-left: 10px; /* Add some space from the timeline */
  padding: 5px 10px; /* Set padding for button content */
  border: none; /* Remove default button border */
  border-radius: 5px; /* Rounded corners for button */
  background-color: #3399ff; /* Blue button color */
  color: white; /* White text color */
  font-weight: bold; /* Bold text for emphasis */
  cursor: pointer; /* Pointer cursor for clickable button */
`;


const VideoTrimTimeline = ({ videoRef, duration }) => {
  
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(duration || videoRef.current?.duration); // Handle missing duration
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
  const { mediaId } = useParams();

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    event.preventDefault();

    const timelineWidth = videoRef.current.parentNode.offsetWidth;
    const handleWidth = event.currentTarget.offsetWidth;
    const newPosition = event.clientX - handleWidth / 2;
    const newTime = (newPosition / (timelineWidth - handleWidth)) * duration;

    if (dragType === 'start') {
      setStartTime(Math.min(newTime, endTime));
    } else if (dragType === 'end') {
      setEndTime(Math.max(newTime, startTime));
    }
  };

  const handleMouseDown = (event, handleType) => {
    event.preventDefault();
    setIsDragging(true);
    setDragType(handleType);
  };

  const handleDragStart = (handleType) => (event) => {
    event.stopPropagation();

    const handleWidth = event.currentTarget.offsetWidth;
    const timelineWidth = videoRef.current.parentNode.offsetWidth;

    const handlePosition = event.clientX - event.currentTarget.offsetLeft;
    const clickPosition = event.clientX - videoRef.current.parentNode.offsetLeft;

    const newTime = (clickPosition / timelineWidth) * duration;

    if (handleType === 'start') {
      setStartTime(Math.min(newTime, endTime));
    } else {
      setEndTime(Math.max(newTime, startTime));
    }
  };

  const handleDrag = (handleType) => (event) => {
    event.stopPropagation();

    const handleWidth = event.currentTarget.offsetWidth;
    const timelineWidth = videoRef.current.parentNode.offsetWidth;

    const newPosition = event.clientX - handleWidth / 2;

    const newTime = (newPosition / (timelineWidth - handleWidth)) * duration;

    if (handleType === 'start') {
      setStartTime(Math.min(newTime, endTime));
    } else {
      setEndTime(Math.max(newTime, startTime));
    }
  };

  const handleTrimClick = () => {
    if ( startTime !== endTime) {
      /* onTrim(startTime, endTime); // Pass start and end times for trimming */
    }
  };

/*   useEffect(() => {
    const player = videoRef.current;
    if (!player) return;
    const videoElement = player.getInternalPlayer();
    if (!videoElement) return;
    const handleLoadedMetadata = () => {
      setEndTime(videoElement.duration);
      setStartTime(0);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef]); */

  return (
    <>
    
    <TimelineContainer>
    {/* <VideoPreview /> videoyu simdilik kaldiralim*/}
     
      <TimelineBar  
          onMouseDown={(event) => event.preventDefault()}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          >
        <Handle
          style={{ left: `${(startTime / duration) * 100}%` }}
          onMouseDown={(event) => handleMouseDown(event, 'start')}
          
        />
        <Handle
          style={{ right: `${(1 - endTime / duration) * 100}%` }}
          onMouseDown={(event) => handleMouseDown(event, 'end')}
          onDrag={handleDrag('end')}
        />
      </TimelineBar>
      <TrimButton onClick={handleTrimClick}>Trim</TrimButton>
    </TimelineContainer>
    </>);
};

export default VideoTrimTimeline;
