// TrimVideoPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";
import Timeline from '../components/Timeline';
import '../components/TimelineStyle.css';
import VideoTrimTimeline from '../components/VideoTrimTimeline';
import VideoTrimTimeline2 from "../components/VideoTrimTimeline2";
import VideoTrimTimeline3 from "../components/VideoTrimTimeline3";
import Slider from "../components/Slider";
const TrimVideoPage = () => {
  const { mediaId } = useParams();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const data = [
    {
      icon: <span className="material-icons">event</span>, // Replace with your icon component
      title: 'Event 1',
      subtitle: 'January 1st, 2024',
      content: 'Description of the event',
    },
    // ... more timeline items
  ];

  const handleTrim = async () => {
    try {
      // Send a request to trim the video
      await axios.post(`${BACKEND_URI}/api/v1/media/trim/${mediaId}`, { //TrimVideoPage.js:15
        startTime,
        endTime,
      });

      // Optionally, you can redirect to another page or show a success message
      alert("Video trimmed successfully!");
    } catch (error) {
      console.error("Error trimming video:", error);
      alert("Error trimming video");
    }
  };

  return (
    <div>
      <h2>Trim Video</h2>
      <label>
        Start Time:
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <br />
      <label>
        End Time:
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      <br />
      <div>
     
      <VideoTrimTimeline2
        
        
      />
     
     
    </div>
      <button onClick={handleTrim}>Trim</button> 
      <div>
    <input type="checkbox" id="dahilettrim" name="dahilettrim" />
    <label for="onaydahilet">video kesmeyi dahil et</label>
  </div>
    </div>
  );
};

export default TrimVideoPage;