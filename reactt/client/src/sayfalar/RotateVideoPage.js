// RotateVideoPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const RotateVideoPage = () => {
  const { mediaId } = useParams();
  const [rotationAngle, setRotationAngle] = useState("");

  const handleRotate = async () => {
    try {
      // Send a request to rotate the video
      await axios.post(`${BACKEND_URI}/api/v1/media/rotate/${mediaId}`, {
        rotationAngle,
      });

      // Optionally, you can redirect to another page or show a success message
      alert("Video rotated successfully!");
    } catch (error) {
      console.error("Error rotating video:", error);
      alert("Error rotating video");
    }
  };

  return (<div>
    <h2>Rotate Video</h2>
    {/* <label>
      Rotation Angle (in degrees):
      <input
        type="text"
        value={rotationAngle}
        onChange={(e) => setRotationAngle(e.target.value)}
      />
    </label> */}
    <br />
    <label>
      Döndürme seçenekleri:
      <select
        value={rotationAngle}
        onChange={(e) => setRotationAngle(e.target.value)}
      >
        <option value="0">90° counterclockwise and vertical flip</option>
        <option value="1">90° clockwise</option>
        <option value="2">90° counterclockwise</option>
        <option value="3">90° clockwise and vertical flip</option>
        <option value="4">180° döndür</option>
      </select>
    </label>
    <br />
    <button onClick={handleRotate}>Döndür</button>
  </div>);
};

export default RotateVideoPage;
