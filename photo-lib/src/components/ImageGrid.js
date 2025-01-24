import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [timer, setTimer] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
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
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    const interval = setInterval(() => {
      fetchImages();
      setTimer(10);
    }, 10000);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 10));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  const styles = {
    container: {
      width: '100%',
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    refreshButton: {
      margin: '20px 0',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    timer: {
      margin: '10px 0',
      fontSize: '1.2rem',
      color: '#333',
    },
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '15px',
    },
    imageGridItem: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      paddingBottom: '100%', // This ensures the item is square
    },
    imageGridItemImg: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    loader: {
      margin: '10px 0',
      fontSize: '1.2rem',
      color: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={fetchImages}
        style={styles.refreshButton}
      >
        Refresh
      </button>
      <div style={styles.timer}>Auto-refresh in: {timer}s</div>
      {loading ? (
        <div style={styles.loader}>Loading...</div>
      ) : (
        <div style={styles.imageGrid}>
          {images.map((url, index) => (
            <div
              key={index}
              style={styles.imageGridItem}
            >
              <img
                src={url}
                alt={`Uploaded ${index}`}
                style={styles.imageGridItemImg}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;