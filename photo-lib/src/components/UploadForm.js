import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(filePreviews).then((previews) => {
      setPreviews(previews);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (files.length === 0) return;

    setLoading(true);

    try {
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const base64File = await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
          };
          reader.onerror = reject;
        });

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
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      setFiles([]);
      setPreviews([]);
    } finally {
      setLoading(false);
    }
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
    preview: {
      margin: '10px 0',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    loader: {
      margin: '10px 0',
      fontSize: '1.2rem',
      color: '#007bff',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input type="file" multiple onChange={handleFileChange} style={styles.input} />
      {previews.map((preview, index) => (
        <img key={index} src={preview} alt={`Preview ${index}`} style={styles.preview} />
      ))}
      {loading ? (
        <div style={styles.loader}>Uploading...</div>
      ) : (
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Upload
        </button>
      )}
    </form>
  );
};

export default UploadForm;