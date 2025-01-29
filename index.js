const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors);

app.use(cors()); // This will allow all origins by default


const Email = 'io.emma.addy@gmail.com';
const githubUrl = 'https://github.com/OD2022/yourrepo';

app.get('/endpoint', (req, res) => {
  try {
    // Get the current time in ISO 8601 format
    const currentTime = new Date().toISOString();

    // Create the response object
    const response = {
      email: Email,
      timestamp: currentTime,
      github: githubUrl
    };


    res.status(200).json(response);
  } catch (error) {
    console.error('Error occurred while processing the request:', error);
    
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request.'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
