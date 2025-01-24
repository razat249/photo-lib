import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64File = reader.result.split(',')[1];

      try {
        const response = await axios.put(
          `https://api.github.com/repos/razat249/photo-lib/contents/photo-lib/public/images/${file.name}`,
          {
            message: `Upload ${file.name}`,
            content: base64File,
          },
          {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        onUpload(response.data.content.download_url);
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%',
      maxWidth: '400px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <button
        type="submit"
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;