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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://api.github.com/repos/rpatwa/photo-lib/images', formData, {
        headers: {
          'Authorization': `token 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`,
          'Content-Type': 'application/json',
        },
      });
      onUpload(response.data.content.download_url);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;