const express = require('express');
const setupLogging = require('./setupLogging');
const router = require('./routes/index');

const app = express();

app.use(express.json());

setupLogging(app);

app.use(router);

module.exports = app;