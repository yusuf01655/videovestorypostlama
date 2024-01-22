import React, { useState } from 'react';
import Axios from 'axios'
function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)
  
  const addNewNumber = () => {
    Axios.post('http://localhost:8080/add-phone',{name,phone})
  }
  return (
    <div className="container">
        <label htmlFor="">Name: </label>
        <input type="text" onChange={(e) => {setName(e.target.value)}}/><br/><br/>
        <label htmlFor="">Phone: </label>
        <input type="number" onChange={(e) => {setPhone(e.target.value)}}/><br/><br/>
        <button onClick={addNewNumber}>Add New Number</button>
    </div> 
  );
  }

export default App;