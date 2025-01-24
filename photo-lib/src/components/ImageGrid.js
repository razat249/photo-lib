import React from 'react';
import './ImageGrid.css'; // Assuming you have a CSS file for styling

const importAll = (r) => {
  return r.keys().map(r);
};

const images = importAll(require.context('../../public/images', false, /\.(png|jpe?g|svg)$/));

const ImageGrid = () => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-grid-item">
          <img src={image} alt={`Uploaded ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;