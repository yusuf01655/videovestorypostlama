import { BACKEND_URI } from "../config/constants";
import React, { useState } from "react";
const UploadForm = () => {
    const [name, setName] = useState("");
    const [videos,setVideos] = useState([]);
    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    return <><form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">isim</label>
            <input type="text" name="name" id="name" className="form-control" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="videos">Video yükle</label>
                <input type="file" name="videos" id="videos" multiple className="form-control" accept=".mp4, .mkv" onChange={(e) => {setVideos(e.target.files);}}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Gönder</button>
        </form></>;
};
export default UploadForm;
