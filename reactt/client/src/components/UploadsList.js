import React from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
const UploadsList = ({medias}) => {
    const history = useHistory(); // Use useHistory hook
    const handleDelete = async (mediaId) => {
        try {
            console.log("Deleting media with ID:", mediaId);
          // Send a request to delete the video
          await axios.delete(`${BACKEND_URI}/api/v1/media/delete/${mediaId}`);
          // Trigger a callback to update the media list
          //getAllMedias();
          alert("Video deleted successfully");
        } catch (error) {
          console.error("Error deleting video:", error);
          alert("Error deleting video");
        }
      };
      const handleEdit = (mediaId) => {
        
        console.log("Editing media with ID:", mediaId);
       
        history.push(`/edit/${mediaId}`);
      };
    
    return( 
    <div className="row">
        <div className="col-md-12">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="200" >İsim</th>
                        <th>Videolar</th>

                    </tr>
                </thead>
                <tbody>
                    {medias && medias.map(media => {
                        return(
                            <tr>
                                <td>{media.name} <br /> {media._id}</td>
                                <td>{media.videos.map(video =>{
                                    return(
                                        <video preload="auto" width="320" height="240" controls>
                                            <source src={`${BACKEND_URI}${video}`} />
                                            ;tarayiciniz video html etiketini desteklemiyor..
                                        </video>
                                    )
                                })}</td>
                                <td>
                      <button
                        onClick={() => handleDelete(media._id)}
                        className="btn btn-danger"
                      >
                        Sil
                      </button>
                    </td>
                    <td><button onClick={() => handleEdit(media._id)} className="btn btn-primary ml-2"> Edit</button></td>
                    
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default UploadsList;


