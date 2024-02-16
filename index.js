const express = require('express');
const app = express();
const port = 3000;
// Create database connection and call all models
const db = require('./models');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('server is successfully running!');
});
