import React from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadsList = ({ medias, getAllMedias }) => {
  const handleDelete = async (mediaId) => {
    try {
        console.log("Deleting media with ID:", mediaId);
      // Send a request to delete the video
      await axios.delete(`${BACKEND_URI}/api/v1/media/delete/${mediaId}`);
      // Trigger a callback to update the media list
      getAllMedias();
      alert("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Error deleting video");
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th width="200">İsim</th>
              <th>Videolar</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {medias &&
              medias.map((media) => {
                return (
                  <tr key={media._id}>
                    <td>
                      {media.name} <br /> {media._id}
                    </td>
                    <td>
                      {media.videos.map((video) => {
                        return (
                          <div key={video}>
                            <video preload="auto" width="320" height="240" controls>
                              <source src={`${BACKEND_URI}${video}`} />
                              Tarayıcınız video HTML etiketini desteklemiyor.
                            </video>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(media._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadsList;
