const config = require('config');
const express = require('express');
const setupLogging = require('./logging');
const setupProxies = require('./proxy');
const ROUTES = require('./routes');

const app = express();

const PORT = config.get('port');

if (!PORT) {
  throw new Error('port is not available in config');
}

setupLogging(app);
setupProxies(app, ROUTES);

module.exports = app;