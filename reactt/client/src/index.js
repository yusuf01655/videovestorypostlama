import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Appp from './Appp';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));
root.render(<Appp />);

/* ReactDOM.render(
  <React.StrictMode>
    <Appp />
  </React.StrictMode>,
  document.getElementById('root')
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
