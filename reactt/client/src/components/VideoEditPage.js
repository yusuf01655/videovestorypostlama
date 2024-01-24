// VideoEditPage.js

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const VideoEditPage = ({ match }) => {
    const { mediaId } = match.params;
  return (
    <div>
      <h2>Edit Video</h2>
      <ul>
        <li>
          <Link to={`/edit/${mediaId}/trim`}>Trim Video</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/rotate`}>Rotate Video</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/overlaysticker`}>Videoya sticker ekle</Link>
        </li>
        {/* Add more links for other editing actions */}
      </ul>
    </div>
  );
};

export default VideoEditPage;
