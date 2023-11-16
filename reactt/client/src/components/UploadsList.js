import React from "react";
import { BACKEND_URI } from "../config/constants";
const UploadsList = ({medias}) => {
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
                                <td>{media.name}</td>
                                <td>{media.videos.map(video =>{
                                    return(
                                        <video preload="auto" width="320" height="240" controls>
                                            <source src={`${BACKEND_URI}${video}`} />
                                            ;tarayiciniz video html etiketini desteklemiyor..
                                        </video>
                                    )
                                })}</td>
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

