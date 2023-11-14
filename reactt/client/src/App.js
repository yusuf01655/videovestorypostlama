import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <>
    <div className="row">

      <div className="col-md-6">
        <div 
          className="card" 
          style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}>
            <div className="card-body">
              <UploadForm getAllMedias={getAllMedias} />
            </div>
          </div>
      </div>

      <div className="col-md-6">
        <div 
          className="card" 
          style={{height: "auto", width: "800px", margin: "40px", border: "1px solid black",}}>
            <div className="card-body">
              <UploadsList medias={medias} />
            </div>
          </div>
      </div>

    </div>

  
  </>
  );
}

export default App;
