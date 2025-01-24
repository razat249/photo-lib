import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'your-username'; // Replace with your GitHub username
const REPO_NAME = 'your-repo'; // Replace with your repository name
const ACCESS_TOKEN = 'your-access-token'; // Replace with your GitHub access token

export const uploadImage = async (file) => {
  const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.name}`;
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      const content = reader.result.split(',')[1]; // Get base64 content
      const data = {
        message: 'Upload image',
        content: content,
      };

      try {
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `token ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        resolve(response.data.content.download_url); // Return the URL of the uploaded image
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};