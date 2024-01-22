import React, { useState } from 'react';


function Item() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items', { //OLDU!!!!!!!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await response.json();
      console.log('Item created:', data);
    } catch (error) {
      
    }
  };

  return (
    <div className="App">
      <h1>MERN Stack Create Operation</h1>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <button type="button" onClick={handleCreate}>
          Create Item
        </button>
      </form>
    </div>
  );
}

export default Item;
