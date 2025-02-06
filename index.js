const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors()); 


const Email = 'io.emma.addy@gmail.com';
const githubUrl = 'https://github.com/OD2022/hng_stage0';


function isArmstrong(number) {
  const digits = number.toString().split('');
  const numLength = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), numLength), 0);
  return sum === number;
}


function digitSum(number) {
  return number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Stage 1 endpoint
app.get('/api/classify-number', async (req, res) => {
  const { number } = req.query;

  if (isNaN(number)) {
      return res.status(400).json({
          number: "alphabet",
          error: true
      });
  }

  const num = parseInt(number);
  try {
      const response = await axios.get(`http://numbersapi.com/${num}?json`);
      const funFact = response.data.text;


      const properties = [];
      if (isArmstrong(num)) properties.push('armstrong');
      if (num % 2 !== 0) properties.push('odd');
      else properties.push('even');


      const result = {
          number: num,
          is_armstrong: isArmstrong(num),
          is_odd: num % 2 !== 0,
          is_even: num % 2 === 0,
          digit_sum: digitSum(num),
          fun_fact: funFact
      };

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: 'Unable to fetch fun fact' });
  }
});



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
