require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
// Create database connection and call all models
const { sequelize } = require('./models');
const { registerRoutes } = require('./routes');
const startServer = async () => {
  await sequelize.authenticate();
};

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
startServer();
registerRoutes(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('server is successfully running!');
});
