// *** MODULES ***
const express = require('express');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const createError = require('http-errors');

// *** CONFIG ***
const _config = require('./config');

// *** MIDDLEWARES ***
const httpLogger = require('./middleware/logger');
const corsMiddleware = require('./middleware/cors');

// *** IMPORT ROUTES ***
const registerRoute = require('./routes/registerRoute');

// *** START EXPRESS APP ***
const app = express();

// *** LOGGER ***
app.use(httpLogger);
// *** BODY PARSER ***
app.use(bodyParser.json());
// *** RESPONSE TIME ***
app.use(responseTime());
// *** CORS ***
app.options('*', corsMiddleware);
app.use(corsMiddleware);

// *** ROUTES ***
app.post(`${_config.app.baseURL}/`, (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use(`${_config.app.baseURL}/register`, registerRoute);
// *** NOT FOUND ***
app.use('*', (req, res, next) => [next(createError(404))]);

// *** ERROR HANDLER ***
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
