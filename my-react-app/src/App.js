import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  const addImage = (imageUrl) => {
    setImages((prevImages) => [...prevImages, imageUrl]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Upload and Display</h1>
        <UploadForm addImage={addImage} />
        <ImageGrid images={images} />
      </header>
    </div>
  );
}

export default App;