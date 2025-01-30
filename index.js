const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors()); 


const Email = 'io.emma.addy@gmail.com';
const githubUrl = 'https://github.com/OD2022/hng_stage0';

app.get('/stage0', (req, res) => {
  try {

    const currentTime = new Date().toISOString();

    const response = {
      email: Email,
      current_datetime: currentTime,
      github_url: githubUrl
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
  console.log(`Server running at http://localhost:${port}`);
});
