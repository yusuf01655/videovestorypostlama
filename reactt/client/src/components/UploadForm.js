import { BACKEND_URI } from "../config/constants";
import axios from "axios";
import React, { useState } from "react";
import styles from '../components/UploadForm.module.css';
const UploadForm = ({ getAllMedias }) => {
    const [name, setName] = useState("");
    const [videos,setVideos] = useState([]);
    const handleSubmit = (e) =>{
        e.preventDefault();
        let formdata = new FormData();
        for (let key in videos) { formdata.append("videos", videos[key]); }
        formdata.append("name", name);
        axios.post(`${BACKEND_URI}/api/v1/media/create`, formdata).then((success) => {
          getAllMedias();
        alert("Submitted successfully");
      }).catch((error) => {
        console.log(error);
        alert("Error happened in UploadForm handleSubmit ");
      });
  };


    return( <><form onSubmit={handleSubmit}>
        <div className= {"form-group"}>
            <label  htmlFor="name">isim</label>
            <input type="text" name="name" id="name" className={styles.materialinput__field} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label  htmlFor="videos">Video yükle</label>
                <input type="file" name="videos" id="videos" multiple className="form-control" accept=".mp4, .mkv" onChange={(e) => {setVideos(e.target.files);}}/>
            </div>
            <button type="submit" className={styles.materialbutton}>Gönder</button>
        </form> <br /></>);
    };
export default UploadForm;
