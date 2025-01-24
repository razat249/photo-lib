import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageGrid.css'; // Assuming you have a CSS file for styling

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/razat249/photo-lib/contents/photo-lib/public/images',
          {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        const imageUrls = response.data.map((file) => file.download_url);
        console.log("🚀 ~ fetchImages ~ imageUrls:", imageUrls)
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="image-grid">
      {images.map((url, index) => (
        <div key={index} className="image-grid-item">
          <img src={url} alt={`Uploaded ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;