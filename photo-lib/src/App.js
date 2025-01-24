import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';

function App() {
  const [images, setImages] = useState([]);

  const addImage = (imageUrl) => {
    setImages((prevImages) => [...prevImages, imageUrl]);
  };

  const styles = {
    app: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    header: {
      backgroundColor: '#282c34',
      minHeight: '20vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    title: {
      fontSize: '2rem',
      margin: '0',
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '30% 70%',
      gap: '20px',
      width: '100%',
      maxWidth: '1200px',
    },
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Image Upload and Display</h1>
      <div style={styles.content}>
        <UploadForm addImage={addImage} />
        <ImageGrid images={images} />
      </div>
    </div>
  );
}

export default App;