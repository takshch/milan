const express = require('express');
const setupLogging = require('./setupLogging');

const app = express();

setupLogging(app);

app.use('*', (req, res) => {
  console.log({ ...req.params });
  res.status(200).send('FEED Service called');
});

module.exports = app;