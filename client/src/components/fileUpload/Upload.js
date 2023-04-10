// client.js
import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:5001/upload', formData).then((response) => {
      console.log("response: " + response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Upload;
