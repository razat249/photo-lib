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

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;