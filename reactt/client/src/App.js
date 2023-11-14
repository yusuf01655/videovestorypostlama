import React from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import UploadsList from './components/UploadsList';
const App = () => {
  return (
  <>
    <div className="row">

      <div className="col-md-6">
        <div 
          className="card" 
          style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}>
            <div className="card-body"><UploadForm/></div>
          </div>
      </div>

      <div className="col-md-6">
        <div 
          className="card" 
          style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}>
            <div className="card-body"><UploadsList/></div>
          </div>
      </div>

    </div>

  
  </>
  );
}

export default App;
