const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
dotenv.config();
const port = process.env.PORT || 5001;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000
  })
);

// Enable cors support to accept cross origin requests
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

// Enable helmet js middlewares to configure secure headers
app.use(helmet());

// Enable gzip compression module for REST API
app.use(compression());

app.get('/health-check', (req, res) => {
  res.send({ success: true });
});

const setupServer = async () => {
  try {
    // Add auth
    // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    await mongoose.connect('mongodb://127.0.0.1:27017/test1');
    console.log('mongo connected successfully');

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });

    routes.registerRoutes(app);
  } catch (err) {
    console.log(`servers setup failed: ${err}`);
  }
};

setupServer();
