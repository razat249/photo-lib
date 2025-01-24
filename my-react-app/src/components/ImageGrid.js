import React from 'react';
import './ImageGrid.css'; // Assuming you have a CSS file for styling

const ImageGrid = ({ imageUrls }) => {
  return (
    <div className="image-grid">
      {imageUrls.map((url, index) => (
        <div key={index} className="image-grid-item">
          <img src={url} alt={`Uploaded ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;