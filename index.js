const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
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

routes.registerRoutes(app);

app.get('/health-check', (req, res) => {
  res.send({ success: true });
});

try {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
} catch (err) {
  console.log(`servers setup failed: ${err}`);
}
