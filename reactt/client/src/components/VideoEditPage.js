// VideoEditPage.js

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const VideoEditPage = ({ match }) => {
    const { mediaId } = match.params;
  return (
    <div>
      <h2>Video Duzenleme islemleri</h2>
      <ul>
        <li>
          <Link to={`/edit/${mediaId}/trim`}>Trim Video belirli zaman araliginda videoyu kes. </Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/rotate`}>Videoyu dondur</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/overlaysticker`}>Videoya sticker ekle</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/overlaytext`}>Videoya metin ekle</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/gritonlamaliyap`}>Videoyu Gri tonlamali Yap</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/yenidenolceklendir`}>Video cozunurlugu Yeniden Olceklendir</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/kirp`}>Video Kirp</Link>
        </li>
        <li>
          <Link to={`/edit/${mediaId}/parlaklikvekontrast`}>Parlaklik ve kontrast ayarla</Link>
        </li>
        {/* Add more links for other editing actions */}
      </ul>
    </div>
  );
};

export default VideoEditPage;
