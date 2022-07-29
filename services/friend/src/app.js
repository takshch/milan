const express = require('express');
const setupLogging = require('./setupLogging');

const app = express();

setupLogging(app);

app.use('*', (req, res) => {
  console.log({ ...req.params });
  res.status(200).send('Friend Service called');
});

module.exports = app;