// TrimVideoPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const TrimVideoPage = () => {
  const { mediaId } = useParams();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
      <button onClick={handleTrim}>Trim</button> 
      <div>
    <input type="checkbox" id="dahilettrim" name="dahilettrim" />
    <label for="onaydahilet">video kesmeyi dahil et</label>
  </div>
    </div>
  );
};

export default TrimVideoPage;